<?php

namespace App\Http\Controllers\Api\Routines;

use App\Http\Controllers\Controller;
use App\Http\Requests\Routines\ToggleRoutineLogRequest;
use App\Http\Resources\RoutineResource;
use App\Models\Routine;
use Illuminate\Support\Carbon;

class RoutineLogController extends Controller
{
    public function toggle(ToggleRoutineLogRequest $request, Routine $routine): RoutineResource
    {
        $this->authorize('update', $routine);

        $date = $request->input('log_date')
            ? Carbon::parse($request->input('log_date'))->toDateString()
            : today()->toDateString();

        $log = $routine->logs()->firstOrNew(['log_date' => $date]);

        $log->user_id      = $request->user()->id;
        $log->is_completed = $request->has('is_completed')
            ? (bool) $request->boolean('is_completed')
            : ! ($log->exists && $log->is_completed);

        $log->save();

        return new RoutineResource($routine->load('todayLog'));
    }
}
