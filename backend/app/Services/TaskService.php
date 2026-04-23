<?php

namespace App\Services;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

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
        $task->update($attributes);

        return $task->fresh();
    }

    public function changeStatus(Task $task, string $status): Task
    {
        $task->status = $status;
        $task->save();

        return $task->fresh();
    }

    public function delete(Task $task): void
    {
        $task->delete();
    }
}
