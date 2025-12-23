<?php

use App\Models\DataSource;
use App\Models\User;

beforeEach(function () {
    $this->withoutVite();
});

test('guest cannot access data source pages', function () {
    $this->get(route('data-sources.index'))->assertRedirect(route('login'));
});

test('authenticated user can see data source list', function () {
    $this->actingAs(User::factory()->create());

    $this->get(route('data-sources.index'))->assertOk();
});

test('can create a data source', function () {
    $this->actingAs(User::factory()->create());

    $payload = [
        'name' => 'Orders DB',
        'driver' => 'postgres',
        'ingest_mode' => 'full',
        'host' => 'localhost',
        'port' => 5432,
        'database' => 'orders',
        'username' => 'admin',
        'password' => 'secret',
        'charset' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
        'prefix' => '',
        'prefix_indexes' => true,
    ];

    $response = $this->post(route('data-sources.store'), $payload);

    $response->assertRedirect();

    $this->assertDatabaseHas('data_sources', [
        'name' => 'Orders DB',
        'driver' => 'postgres',
        'ingest_mode' => 'full',
    ]);
});

test('can update a data source', function () {
    $this->actingAs(User::factory()->create());

    $dataSource = DataSource::factory()->create([
        'name' => 'Old Name',
        'driver' => 'mysql',
    ]);

    $response = $this->put(route('data-sources.update', $dataSource), [
        'name' => 'New Name',
        'driver' => 'mysql',
        'ingest_mode' => 'incremental',
        'host' => 'db.internal',
    ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('data_sources', [
        'id' => $dataSource->id,
        'name' => 'New Name',
        'ingest_mode' => 'incremental',
        'host' => 'db.internal',
    ]);
});

test('can delete a data source', function () {
    $this->actingAs(User::factory()->create());

    $dataSource = DataSource::factory()->create();

    $response = $this->delete(route('data-sources.destroy', $dataSource));

    $response->assertRedirect();

    $this->assertDatabaseMissing('data_sources', [
        'id' => $dataSource->id,
    ]);
});
