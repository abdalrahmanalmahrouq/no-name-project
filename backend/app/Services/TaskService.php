<?php

namespace App\Services;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\ValidationException;

class TaskService
{
    public function listForUser(User $user): Collection
    {
        return $user->tasks()
            ->orderByRaw("FIELD(status, 'in_progress', 'pending', 'completed', 'archived')")
            ->orderByRaw('due_date IS NULL, due_date ASC')
            ->orderByRaw("FIELD(priority, 'high', 'medium', 'low')")
            ->orderByDesc('created_at')
            ->get();
    }

    public function create(User $user, array $attributes): Task
    {
        return $user->tasks()->create($attributes);
    }

    public function update(Task $task, array $attributes): Task
    {
        if ($this->statusChangeIsBlocked($task, $attributes)) {
            $this->throwOverdueStatusError();
        }

        $task->update($attributes);

        return $task->fresh();
    }

    public function changeStatus(Task $task, string $status): Task
    {
        if ($task->isOverdue()) {
            $this->throwOverdueStatusError();
        }

        $task->status = $status;
        $task->save();

        return $task->fresh();
    }

    public function delete(Task $task): void
    {
        $task->delete();
    }

    /**
     * A status change is blocked when the task would still be overdue after
     * applying the incoming update (i.e. due_date remains in the past and the
     * new status is not completed/archived). If the same request moves the
     * due date forward, the change is allowed.
     */
    private function statusChangeIsBlocked(Task $task, array $attributes): bool
    {
        if (! array_key_exists('status', $attributes)) {
            return false;
        }

        $newStatus = $attributes['status'];
        if ($newStatus === $task->status) {
            return false;
        }

        $newDueDate = array_key_exists('due_date', $attributes)
            ? $attributes['due_date']
            : optional($task->due_date)->toDateString();

        if (! $newDueDate) {
            return false;
        }

        if (in_array($newStatus, ['completed', 'archived'], true)) {
            return false;
        }

        return $newDueDate < today()->toDateString();
    }

    private function throwOverdueStatusError(): void
    {
        throw ValidationException::withMessages([
            'status' => 'You cannot change the status of an overdue task. Update the due date first, or delete the task.',
        ]);
    }
}
