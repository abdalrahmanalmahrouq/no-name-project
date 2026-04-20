<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\AiAgentException;
use App\Http\Controllers\Controller;
use App\Services\AiAgentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AiChatController extends Controller
{
    public function __construct(private readonly AiAgentService $agent)
    {
    }

    public function chat(Request $request): JsonResponse
    {
        $data = $request->validate([
            'message' => ['required', 'string', 'max:500'],
            'history' => ['sometimes', 'array', 'max:10'],
            'history.*.role' => ['required_with:history', 'string', 'in:user,assistant'],
            'history.*.text' => ['required_with:history', 'string', 'max:2000'],
        ]);

        try {
            $reply = $this->agent->chat($data['message'], $data['history'] ?? []);
        } catch (AiAgentException $e) {
            return response()->json(['error' => $e->getMessage()], 502);
        }

        return response()->json(['reply' => $reply]);
    }
}
