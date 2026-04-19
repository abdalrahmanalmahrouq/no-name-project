<?php 

use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\ChangePasswordController;
use Illuminate\Support\Facades\Route;

Route::patch('/user/profile', [ProfileController::class, 'update'])
    ->middleware('auth')
    ->name('profile.update');

Route::patch('/user/change-password', [ChangePasswordController::class, 'update'])
    ->middleware('auth')
    ->name('change.password.update');