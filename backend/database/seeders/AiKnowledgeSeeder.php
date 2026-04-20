<?php

namespace Database\Seeders;

use App\Models\AiKnowledge;
use Illuminate\Database\Seeder;

class AiKnowledgeSeeder extends Seeder
{
    public function run(): void
    {
        AiKnowledge::query()->delete();

        AiKnowledge::create([
            'type' => 'context',
            'title' => 'Project overview',
            'answer' => 'No-Name Project is a simple, modern workspace built for focus and speed. '
                .'It offers a clean landing page, email/password authentication, Google sign-in, '
                .'and a personal dashboard where users can manage their profile and settings.',
            'sort_order' => 1,
        ]);

        AiKnowledge::create([
            'type' => 'context',
            'title' => 'Audience and tone',
            'answer' => 'The assistant (Nova) helps guests on the landing page understand the product '
                .'and decide whether to sign up. Keep replies short, friendly, and action-oriented.',
            'sort_order' => 2,
        ]);

        $faqs = [
            [
                'question' => 'What is No-Name Project?',
                'answer' => 'It is a minimal, modern workspace focused on speed and clarity. '
                    .'Sign up to get a personal dashboard and profile.',
            ],
            [
                'question' => 'How do I get started?',
                'answer' => 'Click "Get Started" on the landing page to register with email and password, '
                    .'or use "Continue with Google" for a one-click sign-in.',
            ],
            [
                'question' => 'Is there a free plan?',
                'answer' => 'Yes, you can create an account and explore the core features for free. '
                    .'Paid plans are not yet announced.',
            ],
            [
                'question' => 'Can I sign in with Google?',
                'answer' => 'Yes. On the login or register page, click "Continue with Google" to sign in '
                    .'with your Google account.',
            ],
            [
                'question' => 'I forgot my password, what should I do?',
                'answer' => 'On the login page, click "Forgot password" and follow the emailed reset link.',
            ],
            [
                'question' => 'How do I update my profile?',
                'answer' => 'After signing in, open the dashboard and go to profile settings to update '
                    .'your name and avatar.',
            ],
        ];

        foreach ($faqs as $i => $faq) {
            AiKnowledge::create([
                'type' => 'faq',
                'question' => $faq['question'],
                'answer' => $faq['answer'],
                'sort_order' => $i + 1,
            ]);
        }
    }
}
