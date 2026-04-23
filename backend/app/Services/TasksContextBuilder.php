<?php

namespace App\Services;

use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Carbon;

class TasksContextBuilder
{
    /**
     * Build a plain-text snapshot of the user's to-do list.
     *
     * This string is embedded inside the AI system prompt on every chat
     * turn, so it must stay short and unambiguous. The model is told it
     * may ONLY answer task questions using what's written here.
     */
    public function build(User $user): string
    {
        $today = today();

        $tasks = $user->tasks()
            ->orderByRaw('due_date IS NULL, due_date ASC')
            ->orderByDesc('created_at')
            ->get();

        if ($tasks->isEmpty()) {
            return "Today is {$today->format('l, Y-m-d')}.\n- The user has not added any tasks yet.";
        }

        $buckets = $this->groupByBucket($tasks, $today);

        $lines = ["Today is {$today->format('l, Y-m-d')}."];

        $lines = array_merge($lines, $this->renderBucket('Overdue tasks (not completed, due before today)', $buckets['overdue']));
        $lines = array_merge($lines, $this->renderBucket("Today's tasks", $buckets['today']));
        $lines = array_merge($lines, $this->renderBucket('Upcoming tasks (due in the future)', $buckets['upcoming']));
        $lines = array_merge($lines, $this->renderBucket('Tasks with no due date', $buckets['someday']));
        $lines = array_merge($lines, $this->renderBucket('Recently completed tasks', $buckets['completed']));

        $lines[] = '';
        $lines[] = $this->summaryLine($buckets);

        return implode("\n", $lines);
    }

    /**
     * Sort every task into one of five buckets the AI cares about.
     *
     * @return array<string, \Illuminate\Support\Collection>
     */
    private function groupByBucket($tasks, Carbon $today): array
    {
        $buckets = [
            'overdue'   => collect(),
            'today'     => collect(),
            'upcoming'  => collect(),
            'someday'   => collect(),
            'completed' => collect(),
        ];

        foreach ($tasks as $task) {
            if ($task->status === 'archived') {
                continue;
            }

            if ($task->status === 'completed') {
                $buckets['completed']->push($task);

                continue;
            }

            $due = $task->due_date;

            if (! $due) {
                $buckets['someday']->push($task);

                continue;
            }

            if ($due->lt($today)) {
                $buckets['overdue']->push($task);
            } elseif ($due->isSameDay($today)) {
                $buckets['today']->push($task);
            } else {
                $buckets['upcoming']->push($task);
            }
        }

        return $buckets;
    }

    /**
     * Turn one bucket of tasks into a labelled list of lines, or [] if empty.
     *
     * @return list<string>
     */
    private function renderBucket(string $heading, $tasks): array
    {
        if ($tasks->isEmpty()) {
            return [];
        }

        $lines = ['', "{$heading} ({$tasks->count()}):"];

        foreach ($tasks as $task) {
            $lines[] = '- '.$this->formatTask($task);
        }

        return $lines;
    }

    /**
     * Format a single task into one human-readable line.
     */
    private function formatTask(Task $task): string
    {
        $parts = ["\"{$task->title}\""];

        $parts[] = "priority: {$task->priority}";
        $parts[] = "status: {$task->status}";

        if ($task->due_date) {
            $parts[] = "due: {$task->due_date->toDateString()}";
        }

        if ($task->estimated_minutes) {
            $parts[] = "estimate: {$task->estimated_minutes}m";
        }

        return implode('; ', $parts);
    }

    /**
     * Build the one-line "today: X done of Y, Z overdue" summary.
     *
     * @param  array<string, \Illuminate\Support\Collection>  $buckets
     */
    private function summaryLine(array $buckets): string
    {
        $todayActive = $buckets['today']->count();
        $overdue     = $buckets['overdue']->count();
        $doneToday   = $buckets['completed']
            ->filter(fn (Task $t) => $t->due_date && $t->due_date->isToday())
            ->count();

        return "Summary: {$todayActive} task(s) due today still open, "
            ."{$doneToday} completed today, {$overdue} overdue.";
    }
}
