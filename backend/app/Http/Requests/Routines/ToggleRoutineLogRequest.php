<?php

namespace App\Http\Requests\Routines;

use Illuminate\Foundation\Http\FormRequest;

class ToggleRoutineLogRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'log_date'     => ['nullable', 'date_format:Y-m-d'],
            'is_completed' => ['nullable', 'boolean'],
        ];
    }
}
