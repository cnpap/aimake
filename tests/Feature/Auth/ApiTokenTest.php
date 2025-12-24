<?php

use App\Models\User;

test('can issue passport personal access token', function (): void {
    $user = User::factory()->create();

    $response = $this->postJson('/api/token', [
        'email' => $user->email,
        'password' => 'password',
        'token_name' => 'cli',
    ]);

    $response->assertOk()->assertJsonStructure([
        'token',
        'token_type',
        'expires_at',
    ]);

    $token = $response->json('token');

    $meResponse = $this->withHeaders([
        'Authorization' => 'Bearer '.$token,
    ])->getJson('/api/me');

    $meResponse->assertOk()->assertJsonPath('id', $user->id);
});

test('rejects invalid credentials when issuing token', function (): void {
    $user = User::factory()->create();

    $response = $this->postJson('/api/token', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $response->assertUnauthorized();
});
