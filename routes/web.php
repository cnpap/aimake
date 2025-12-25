<?php

use App\Http\Controllers\DataSourceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('scenarios', function () {
        return Inertia::render('Scenarios/Index');
    })->name('scenarios.index');

    Route::get('agents', function () {
        return Inertia::render('Agents/Index');
    })->name('agents.index');

    Route::resource('data-sources', DataSourceController::class);
});

require __DIR__.'/settings.php';
