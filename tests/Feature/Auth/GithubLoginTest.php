<?php

use App\Models\User;
use Laravel\Socialite\Contracts\Provider;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;

test('github redirect page', function () {
    $provider = Mockery::mock(Provider::class);
    $provider->shouldReceive('redirect')->andReturn(redirect('https://github.com/login'));

    Socialite::shouldReceive('driver')->with('github')->andReturn($provider);

    $response = $this->get(route('github.redirect'));

    $response->assertRedirect('https://github.com/login');
});

test('github callback creates new user and logs in', function () {
    $socialUser = (new SocialiteUser)
        ->setRaw(['id' => 123])
        ->map([
            'id' => 123,
            'nickname' => 'octocat',
            'name' => 'Octo Cat',
            'email' => 'octo@example.com',
        ]);

    $provider = Mockery::mock(Provider::class);
    $provider->shouldReceive('user')->andReturn($socialUser);

    Socialite::shouldReceive('driver')->with('github')->andReturn($provider);

    $response = $this->get(route('github.callback'));

    $response->assertRedirect(route('dashboard', absolute: false));
    $this->assertAuthenticated();
    $this->assertDatabaseHas('users', ['email' => 'octo@example.com']);
});

test('github callback reuses existing user', function () {
    $existing = User::factory()->create(['email' => 'octo@example.com']);

    $socialUser = (new SocialiteUser)
        ->setRaw(['id' => 456])
        ->map([
            'id' => 456,
            'nickname' => 'octocat',
            'name' => 'Octo Cat',
            'email' => 'octo@example.com',
        ]);

    $provider = Mockery::mock(Provider::class);
    $provider->shouldReceive('user')->andReturn($socialUser);

    Socialite::shouldReceive('driver')->with('github')->andReturn($provider);

    $response = $this->get(route('github.callback'));

    $response->assertRedirect(route('dashboard', absolute: false));
    $this->assertAuthenticatedAs($existing);
    $this->assertDatabaseCount('users', 1);
});

test('github callback without email is rejected', function () {
    $socialUser = (new SocialiteUser)
        ->setRaw(['id' => 789])
        ->map([
            'id' => 789,
            'nickname' => 'octo-no-email',
            'name' => 'Octo No Email',
            'email' => null,
        ]);

    $provider = Mockery::mock(Provider::class);
    $provider->shouldReceive('user')->andReturn($socialUser);

    Socialite::shouldReceive('driver')->with('github')->andReturn($provider);

    $response = $this->get(route('github.callback'));

    $response->assertRedirect(route('login'));
    $this->assertGuest();
});
