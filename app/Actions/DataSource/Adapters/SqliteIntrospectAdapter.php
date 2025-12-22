<?php

namespace App\Actions\DataSource\Adapters;

use App\DataSource\Metadata\ColumnMetadata;
use App\DataSource\Metadata\TableMetadata;
use App\Models\DataSource;
use Illuminate\Database\DatabaseManager;
use Illuminate\Support\Facades\Config;

class SqliteIntrospectAdapter implements DataSourceIntrospectAdapter
{
    public function __construct(public DatabaseManager $database) {}

    /**
     * @return list<TableMetadata>
     */
    public function listTables(DataSource $dataSource): array
    {
        $reuseDefaultConnection = $this->shouldReuseDefaultConnection($dataSource);
        $connectionName = $this->connectionName($dataSource);

        if ($reuseDefaultConnection) {
            $connection = $this->database->connection(config('database.default'));
        } else {
            $connectionConfig = $this->buildConnectionConfig($dataSource);
            Config::set("database.connections.{$connectionName}", $connectionConfig);
            $connection = $this->database->connection($connectionName);
        }

        $tables = $this->introspectTables($connection);

        if (! $reuseDefaultConnection) {
            $this->database->purge($connectionName);
        }

        return $tables;
    }

    /**
     * @return list<TableMetadata>
     */
    protected function introspectTables($connection): array
    {
        if (method_exists($connection, 'getDoctrineSchemaManager')) {
            $schemaManager = $connection->getDoctrineSchemaManager();

            return collect($schemaManager->listTables())
                ->map(
                    static function ($table): TableMetadata {
                        $columns = collect($table->getColumns())
                            ->map(
                                static fn ($column): ColumnMetadata => new ColumnMetadata(
                                    $column->getName(),
                                    $column->getType()?->getName(),
                                    $column->getComment() ?: null
                                )
                            )
                            ->values()
                            ->all();

                        return new TableMetadata(
                            $table->getNamespaceName(),
                            $table->getName(),
                            $table->getOption('comment') ?: null,
                            $columns
                        );
                    }
                )
                ->values()
                ->all();
        }

        $schemaBuilder = $connection->getSchemaBuilder();

        return collect($schemaBuilder->getTables())
            ->map(
                function (array $table) use ($schemaBuilder): TableMetadata {
                    $columns = collect($schemaBuilder->getColumns($table['schema_qualified_name'] ?? $table['name']))
                        ->map(
                            static fn (array $column): ColumnMetadata => new ColumnMetadata(
                                $column['name'],
                                $column['type_name'] ?? ($column['type'] ?? null),
                                $column['comment'] ?? null
                            )
                        )
                        ->values()
                        ->all();

                    return new TableMetadata(
                        $table['schema'] ?? null,
                        $table['name'],
                        $table['comment'] ?? null,
                        $columns,
                        $table['schema_qualified_name'] ?? null
                    );
                }
            )
            ->values()
            ->all();
    }

    protected function shouldReuseDefaultConnection(DataSource $dataSource): bool
    {
        return ($dataSource->database ?? null) === ':memory:';
    }

    protected function connectionName(DataSource $dataSource): string
    {
        return "introspect_ds_{$dataSource->id}";
    }

    protected function buildConnectionConfig(DataSource $dataSource): array
    {
        return array_filter(
            [
                'driver' => 'sqlite',
                'url' => $dataSource->url,
                'database' => $dataSource->database,
                'prefix' => $dataSource->prefix ?? '',
                'prefix_indexes' => $dataSource->prefix_indexes ?? true,
                ...($dataSource->data ?? []),
            ],
            static fn ($value): bool => $value !== null
        );
    }
}
