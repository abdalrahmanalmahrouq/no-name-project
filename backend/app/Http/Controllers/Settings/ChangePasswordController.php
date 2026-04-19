<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Settings\ChangePasswordRequest;
use Illuminate\Support\Facades\Auth;

class ChangePasswordController extends Controller
{
    public function update(ChangePasswordRequest $request){
        $user = $request->user();
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 400);
        }
        $user->update([
            'password' => Hash::make($request->new_password),
        ]);

        Auth::logoutOtherDevices($request->new_password);
        $request->session()->regenerate();   
        
        return response()->json(['message' => 'Password changed successfully'], 200);
    }
}
