<?php

namespace App\Http\Controllers\Api\Routines;

use App\Http\Controllers\Controller;
use App\Http\Requests\Routines\StoreRoutineRequest;
use App\Http\Requests\Routines\UpdateRoutineRequest;
use App\Http\Resources\RoutineResource;
use App\Models\Routine;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class RoutineController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $routines = $request->user()
            ->routines()
            ->with('todayLog')
            ->orderBy('time_of_day')
            ->orderByDesc('created_at')
            ->get();

        return RoutineResource::collection($routines);
    }

    public function store(StoreRoutineRequest $request): JsonResponse
    {
        $routine = $request->user()->routines()->create($request->validated());

        return (new RoutineResource($routine->load('todayLog')))
            ->response()
            ->setStatusCode(201);
    }

    public function show(Request $request, Routine $routine): RoutineResource
    {
        $this->authorize('view', $routine);

        return new RoutineResource($routine->load('todayLog'));
    }

    public function update(UpdateRoutineRequest $request, Routine $routine): RoutineResource
    {
        $this->authorize('update', $routine);

        $routine->update($request->validated());

        return new RoutineResource($routine->load('todayLog'));
    }

    public function destroy(Request $request, Routine $routine): JsonResponse
    {
        $this->authorize('delete', $routine);

        $routine->delete();

        return response()->json(['message' => 'Routine deleted.']);
    }
}
