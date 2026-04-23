<?php

namespace App\Http\Controllers\Api\Tasks;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tasks\UpdateTaskStatusRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Services\TaskService;

class TaskStatusController extends Controller
{
    public function __construct(private readonly TaskService $tasks)
    {
    }

    public function update(UpdateTaskStatusRequest $request, Task $task): TaskResource
    {
        $this->authorize('update', $task);

        $task = $this->tasks->changeStatus($task, $request->validated('status'));

        return new TaskResource($task);
    }
}
