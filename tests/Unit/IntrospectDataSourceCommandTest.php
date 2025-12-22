<?php

use App\Models\DataSource;
use Tests\TestCase;

uses(TestCase::class);

it('prints tables and columns for sqlite data source', function (): void {
    $this->artisan('migrate', ['--force' => true])->assertExitCode(0);

    $dataSource = DataSource::query()->create([
        'name' => 'CLI Test',
        'driver' => 'sqlite',
        'ingest_mode' => 'full',
        'database' => ':memory:',
        'prefix' => '',
        'prefix_indexes' => true,
        'status' => 'active',
        'data' => [],
    ]);

    $this->artisan('data-source:introspect', [
        'dataSourceId' => $dataSource->id,
        '--table' => 'data_sources',
    ])
        ->expectsOutputToContain('可用数据源')
        ->expectsOutputToContain('data_sources')
        ->expectsOutputToContain('字段名')
        ->expectsOutputToContain('name')
        ->assertExitCode(0);
});
