<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\UpdateProfileRequest;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function update(UpdateProfileRequest $request){
        $user = $request->user();
        $data = $request->validated();

        if($request->hasFile('image')){
            if($user->image){
                Storage::disk('public')->delete($user->image);
            }
            $data['image'] = $request->file('image')->store('avatars', 'public');
        }
        $user->update($data);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user'    => $user->fresh(),
        ], 200);
    }
}
