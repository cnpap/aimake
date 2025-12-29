<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Schema;
use Laravel\Passport\ClientRepository;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->ensurePersonalAccessClient();
    }

    private function ensurePersonalAccessClient(): void
    {
        if (! Schema::hasTable('oauth_clients')) {
            return;
        }

        /** @var ClientRepository $clients */
        $clients = $this->app->make(ClientRepository::class);

        try {
            $clients->personalAccessClient(config('auth.guards.api.provider'));
        } catch (\RuntimeException) {
            $clients->createPersonalAccessGrantClient(
                'Personal Access Client',
                config('auth.guards.api.provider'),
            );
        }
    }
}
