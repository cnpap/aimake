<?php

use App\Http\Controllers\Auth\GithubController;
use App\Http\Controllers\DataSourceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('auth/github/redirect', [GithubController::class, 'redirect'])->name('github.redirect');
Route::get('auth/github/callback', [GithubController::class, 'callback'])->name('github.callback');

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

    Route::get('agents/create', function () {
        return Inertia::render('Agents/Create');
    })->name('agents.create');

    Route::post('agents', function () {
        sleep(1); // Simulate network delay

        return redirect()->route('agents.index');
    })->name('agents.store');

    Route::get('tools', function () {
        return Inertia::render('Tools/Index');
    })->name('tools.index');

    Route::get('tools/docs', function () {
        return Inertia::render('Tools/Docs', [
            'specUrl' => request('specUrl'),
            'name' => request('name'),
            'version' => request('version'),
            'baseUrl' => request('baseUrl'),
        ]);
    })->name('tools.docs');

    Route::get('design', function () {
        return Inertia::render('Design/Index');
    })->name('design.index');

    Route::resource('data-sources', DataSourceController::class);
});

require __DIR__.'/settings.php';
