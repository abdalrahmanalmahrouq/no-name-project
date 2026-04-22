<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\AiAgentException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Ai\ChatRequest;
use App\Services\AiAgentService;
use App\Services\UserContextBuilder;
use Illuminate\Http\JsonResponse;

class AiChatController extends Controller
{
    public function __construct(
        private readonly AiAgentService $agent,
        private readonly UserContextBuilder $userContext,
    ) {
    }

    public function chat(ChatRequest $request): JsonResponse
    {
        $data = $request->validated();

        try {
            $reply = $this->agent->chat($data['message'], $data['history'] ?? []);
        } catch (AiAgentException $e) {
            return response()->json(['error' => $e->getMessage()], 502);
        }

        return response()->json(['reply' => $reply]);
    }

    public function chatAsUser(ChatRequest $request): JsonResponse
    {
        $data = $request->validated();

        $userContext = $this->userContext->build($request->user());

        try {
            $reply = $this->agent->chat(
                $data['message'],
                $data['history'] ?? [],
                $userContext,
            );
        } catch (AiAgentException $e) {
            return response()->json(['error' => $e->getMessage()], 502);
        }

        return response()->json(['reply' => $reply]);
    }
}
