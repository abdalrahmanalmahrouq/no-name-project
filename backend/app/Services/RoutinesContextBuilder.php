<?php

namespace App\Services;

use App\Models\Routine;
use App\Models\RoutineLog;
use App\Models\User;
use Illuminate\Support\Carbon;

class RoutinesContextBuilder
{
    /**
     * Build a plain-text snapshot of the user's routines and recent log
     * activity. This is the SINGLE source of truth that the AI assistant
     * is allowed to see about routines/habits for this user.
     *
     * Keep it concise — this string is embedded in the system prompt on
     * every chat turn.
     */
    public function build(User $user): string
    {
        $today    = today();
        $todayKey = $this->dayKey($today);

        $routines = $user->routines()->with('todayLog')->get();

        if ($routines->isEmpty()) {
            return "Today is {$today->format('l, Y-m-d')}.\n- The user has not created any routines yet.";
        }

        $activeToday = $routines->filter(fn (Routine $r) => $this->isActiveOn($r, $todayKey))->values();
        $notToday    = $routines->reject(fn (Routine $r) => $this->isActiveOn($r, $todayKey))->values();

        $lines = ["Today is {$today->format('l, Y-m-d')}."];

        if ($activeToday->isNotEmpty()) {
            $lines[] = '';
            $lines[] = "Active routines today ({$activeToday->count()}):";
            foreach ($activeToday as $routine) {
                $log    = $routine->todayLog->first();
                $status = ($log && $log->is_completed) ? 'completed today' : 'not completed today';
                $days   = $this->formatDays($routine->active_days);
                $lines[] = "- \"{$routine->title}\" (time of day: {$routine->time_of_day}; days: {$days}) — {$status}";
            }
        }

        if ($notToday->isNotEmpty()) {
            $lines[] = '';
            $lines[] = "Other routines (not scheduled today):";
            foreach ($notToday as $routine) {
                $days = $this->formatDays($routine->active_days);
                $lines[] = "- \"{$routine->title}\" (time of day: {$routine->time_of_day}; days: {$days})";
            }
        }

        $done    = $activeToday->filter(fn (Routine $r) => (bool) $r->todayLog->first()?->is_completed)->count();
        $total   = $activeToday->count();
        $percent = $total === 0 ? 0 : (int) round($done / $total * 100);

        $lines[] = '';
        $lines[] = "Today's progress: {$done} of {$total} active routines completed ({$percent}%).";

        $lines[] = '';
        $lines[] = 'Completions in the last 7 days:';
        foreach ($this->recentCompletionSummary($user, $today) as $line) {
            $lines[] = "- {$line}";
        }

        return implode("\n", $lines);
    }

    /**
     * @return list<string>
     */
    private function recentCompletionSummary(User $user, Carbon $today): array
    {
        $start = $today->copy()->subDays(6)->startOfDay();

        $logs = RoutineLog::query()
            ->where('user_id', $user->id)
            ->where('is_completed', true)
            ->whereBetween('log_date', [$start->toDateString(), $today->toDateString()])
            ->get(['log_date'])
            ->groupBy(fn (RoutineLog $log) => Carbon::parse($log->log_date)->toDateString());

        $summary = [];
        for ($i = 0; $i < 7; $i++) {
            $date  = $today->copy()->subDays($i);
            $key   = $date->toDateString();
            $count = $logs->has($key) ? $logs[$key]->count() : 0;
            $label = match ($i) {
                0       => 'today',
                1       => 'yesterday',
                default => $date->format('l'),
            };
            $summary[] = "{$key} ({$label}): {$count} completion(s)";
        }

        return $summary;
    }

    private function isActiveOn(Routine $routine, string $dayKey): bool
    {
        $days = $routine->active_days ?? [];

        return empty($days) || in_array($dayKey, $days, true);
    }

    /**
     * @param  array<int, string>|null  $days
     */
    private function formatDays(?array $days): string
    {
        if (empty($days) || count($days) === 7) {
            return 'every day';
        }

        return implode(', ', $days);
    }

    private function dayKey(Carbon $date): string
    {
        return strtolower(substr($date->format('D'), 0, 3));
    }
}
