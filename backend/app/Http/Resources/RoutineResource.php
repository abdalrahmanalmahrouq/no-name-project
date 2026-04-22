<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoutineResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $todayLog = $this->whenLoaded('todayLog', fn () => $this->todayLog->first());

        return [
            'id'                  => $this->id,
            'title'               => $this->title,
            'icon'                => $this->icon,
            'time_of_day'         => $this->time_of_day,
            'active_days'         => $this->active_days ?? [],
            'completed_today'     => $todayLog ? (bool) $todayLog->is_completed : false,
            'created_at'          => $this->created_at?->toIso8601String(),
            'updated_at'          => $this->updated_at?->toIso8601String(),
        ];
    }
}
