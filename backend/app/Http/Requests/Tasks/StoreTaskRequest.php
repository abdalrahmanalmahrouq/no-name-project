<?php

namespace App\Http\Requests\Tasks;

use App\Models\Task;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'             => ['required', 'string', 'max:255'],
            'description'       => ['nullable', 'string', 'max:5000'],
            'estimated_minutes' => ['nullable', 'integer', 'min:1', 'max:1440'],
            'due_date'          => ['nullable', 'date_format:Y-m-d', 'after_or_equal:today'],
            'priority'          => ['nullable', Rule::in(Task::PRIORITIES)],
            'status'            => ['nullable', Rule::in(Task::STATUSES)],
        ];
    }
}
