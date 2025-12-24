<?php

use App\Http\Controllers\Api\TokenController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/token', [TokenController::class, 'store'])->name('api.token');

Route::middleware('auth:api')->group(function (): void {
    Route::get('/me', function (Request $request) {
        return $request->user();
    })->name('api.me');
});
