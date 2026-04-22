<?php

use App\Http\Controllers\Api\AiChatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/ai/chat', [AiChatController::class, 'chat'])
    ->middleware('throttle:ai-chat');

Route::middleware(['auth:sanctum', 'throttle:ai-chat'])
    ->post('/ai/chat/me', [AiChatController::class, 'chatAsUser']);


