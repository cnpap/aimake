<?php

use App\Actions\DataSource\IntrospectDataSourceService;
use App\DataSource\Metadata\ColumnMetadata;
use App\DataSource\Metadata\TableMetadata;
use App\Models\DataSource;
use Tests\TestCase;

uses(TestCase::class);

it('内省真实数据库并返回 data_sources 表结构', function (): void {
    $this->artisan('migrate:fresh', ['--force' => true])->assertExitCode(0);
    $this->artisan('db:seed', ['--force' => true])->assertExitCode(0);

    $dataSource = DataSource::query()->firstOrFail();

    expect($dataSource->id)->not->toBeEmpty();

    $service = app(IntrospectDataSourceService::class);
    $tables = collect($service->listTables($dataSource->id));

    /** @var TableMetadata|null $dataSourcesTable */
    $dataSourcesTable = $tables->first(
        static fn (TableMetadata $table): bool => $table->tableName === 'data_sources'
    );

    expect($dataSourcesTable)->not->toBeNull();
    expect($dataSourcesTable->columns)->toBeArray();

    $columnNames = collect($dataSourcesTable->columns)
        ->map(static fn (ColumnMetadata $column): string => $column->name);

    expect($columnNames)->toContain('name');
    expect($columnNames)->toContain('driver');
    expect($columnNames)->toContain('ingest_mode');
    expect($columnNames)->toContain('status');
});
