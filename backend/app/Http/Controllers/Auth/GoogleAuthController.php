<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    public function redirect(){
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function callback(){
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = User::firstOrNew(['email' => $googleUser->email]);

        $user->name = $googleUser->name;
        $user->google_id = $googleUser->id;

        // Only store the Google avatar when the user has no image yet,
        // so a locally uploaded picture is never overwritten on re-login.
        if (! $user->image && $googleUser->avatar) {
            $user->image = $googleUser->avatar;
        }

        $user->save();

        Auth::login($user);
        return redirect(env('FRONTEND_URL').'/');
    }
}
