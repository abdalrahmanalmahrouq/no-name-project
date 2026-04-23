<?php

use App\Http\Controllers\Api\AiChatController;
use App\Http\Controllers\Api\Routines\RoutineController;
use App\Http\Controllers\Api\Routines\RoutineLogController;
use App\Http\Controllers\Api\Tasks\TaskController;
use App\Http\Controllers\Api\Tasks\TaskStatusController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/ai/chat', [AiChatController::class, 'chat'])
    ->middleware('throttle:ai-chat');

Route::middleware(['auth:sanctum', 'throttle:ai-chat'])
    ->post('/ai/chat/me', [AiChatController::class, 'chatAsUser']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('routines', RoutineController::class);
    Route::post('routines/{routine}/toggle', [RoutineLogController::class, 'toggle']);

    Route::apiResource('tasks', TaskController::class);
    Route::patch('tasks/{task}/status', [TaskStatusController::class, 'update']);
});

