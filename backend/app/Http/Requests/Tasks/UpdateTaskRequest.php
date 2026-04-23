<?php

namespace App\Http\Requests\Tasks;

use App\Models\Task;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'             => ['sometimes', 'required', 'string', 'max:255'],
            'description'       => ['nullable', 'string', 'max:5000'],
            'estimated_minutes' => ['nullable', 'integer', 'min:1', 'max:1440'],
            'due_date'          => ['nullable', 'date_format:Y-m-d'],
            'priority'          => ['sometimes', Rule::in(Task::PRIORITIES)],
            'status'            => ['sometimes', Rule::in(Task::STATUSES)],
        ];
    }
}
