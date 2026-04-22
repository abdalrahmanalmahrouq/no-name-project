<?php

namespace App\Services;

use App\Models\User;

class UserContextBuilder
{
    public function __construct(
        private readonly RoutinesContextBuilder $routines,
    ) {
    }

    /**
     * Build a plain-text snapshot of facts about the authenticated user
     * that the AI assistant is allowed to read. This is the SINGLE source
     * of truth for what Nova ever knows about a logged-in user.
     *
     * Add/remove fields here ONLY. Never expose hashed passwords, tokens,
     * other users' data, or anything sensitive.
     */
    public function build(User $user): string
    {
        return $this->profileBlock($user)
            ."\n\n## Routines\n"
            .$this->routines->build($user);
    }

    private function profileBlock(User $user): string
    {
        $fields = [
            'name'                  => $user->name ?: '(not set)',
            'email'                 => $user->email,
            'joined'                => optional($user->created_at)->toFormattedDateString() ?: '(unknown)',
            'google_account_linked' => ! empty($user->google_id) ? 'yes' : 'no',
            'has_avatar'            => ! empty($user->image) ? 'yes' : 'no',
        ];

        $lines = ['## Profile'];
        foreach ($fields as $key => $value) {
            $lines[] = "- {$key}: {$value}";
        }

        return implode("\n", $lines);
    }
}
