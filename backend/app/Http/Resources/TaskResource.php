<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                => $this->id,
            'title'             => $this->title,
            'description'       => $this->description,
            'estimated_minutes' => $this->estimated_minutes,
            'due_date'          => $this->due_date?->toDateString(),
            'priority'          => $this->priority,
            'status'            => $this->status,
            'is_completed'      => $this->status === 'completed',
            'created_at'        => $this->created_at?->toIso8601String(),
            'updated_at'        => $this->updated_at?->toIso8601String(),
        ];
    }
}
