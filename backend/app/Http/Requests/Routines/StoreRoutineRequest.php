<?php

namespace App\Http\Requests\Routines;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRoutineRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'         => ['required', 'string', 'max:255'],
            'icon'          => ['nullable', 'string', 'max:64'],
            'time_of_day'   => ['required', Rule::in(['morning', 'afternoon', 'evening', 'night', 'anytime'])],
            'active_days'   => ['nullable', 'array'],
            'active_days.*' => [Rule::in(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'])],
        ];
    }
}
