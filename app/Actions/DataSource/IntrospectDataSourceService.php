<?php

namespace App\Actions\DataSource;

use App\Actions\DataSource\Adapters\DataSourceIntrospectAdapter;
use App\Actions\DataSource\Adapters\MysqlIntrospectAdapter;
use App\Actions\DataSource\Adapters\PostgresIntrospectAdapter;
use App\Actions\DataSource\Adapters\SqliteIntrospectAdapter;
use App\DataSource\Metadata\TableMetadata;
use App\Models\DataSource;
use InvalidArgumentException;

class IntrospectDataSourceService
{
    public function __construct(
        public MysqlIntrospectAdapter $mysqlAdapter,
        public PostgresIntrospectAdapter $postgresAdapter,
        public SqliteIntrospectAdapter $sqliteAdapter,
    ) {}

    /**
     * 基于数据源配置通过 Doctrine 内省表与字段。
     *
     * @return list<TableMetadata>
     */
    public function listTables(int $dataSourceId): array
    {
        $dataSource = DataSource::query()->findOrFail($dataSourceId);
        $adapter = $this->resolveAdapter($dataSource->driver);

        return $adapter->listTables($dataSource);
    }

    protected function resolveDriver(string $driver): string
    {
        return match ($driver) {
            'postgres', 'pgsql' => 'pgsql',
            'mysql', 'mariadb' => 'mysql',
            default => $driver,
        };
    }

    protected function resolveAdapter(string $driver): DataSourceIntrospectAdapter
    {
        return match ($this->resolveDriver($driver)) {
            'pgsql' => $this->postgresAdapter,
            'mysql' => $this->mysqlAdapter,
            'sqlite' => $this->sqliteAdapter,
            default => throw new InvalidArgumentException("Unsupported data source driver [{$driver}]."),
        };
    }
}
