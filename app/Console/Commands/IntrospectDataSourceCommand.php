<?php

namespace App\Console\Commands;

use App\Actions\DataSource\IntrospectDataSourceService;
use App\DataSource\Metadata\ColumnMetadata;
use App\DataSource\Metadata\TableMetadata;
use App\Models\DataSource;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;

class IntrospectDataSourceCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'data-source:introspect {dataSourceId? : 数据源 ID，省略则交互选择}'
        .' {--table= : 直接指定要查看的表名，省略则交互选择}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '交互式查看数据源内省结果（数据源 -> 表 -> 列）';

    public function __construct(public IntrospectDataSourceService $service)
    {
        parent::__construct();
    }

    public function handle(): int
    {
        $dataSources = DataSource::query()
            ->orderBy('id')
            ->get(['id', 'name', 'driver', 'database', 'status', 'tables_count']);

        if ($dataSources->isEmpty()) {
            $this->warn('暂无数据源，请先创建数据源记录。');

            return self::FAILURE;
        }

        $this->info('可用数据源：');
        $this->table(
            ['ID', '名称', '驱动', '数据库/DSN', '状态', '表数量'],
            $dataSources->map(
                static fn (DataSource $source): array => [
                    $source->id,
                    $source->name,
                    $source->driver,
                    $source->database ?? $source->url ?? '-',
                    $source->status ?? '-',
                    $source->tables_count ?? 0,
                ]
            )
                ->toArray()
        );

        $dataSourceId = $this->argument('dataSourceId')
            ?? $this->choice(
                '选择要内省的数据源 ID',
                $dataSources->pluck('id')->map(fn (int $id): string => (string) $id)->toArray(),
                (string) $dataSources->first()->id
            );

        /** @var DataSource|null $dataSource */
        $dataSource = $dataSources->firstWhere('id', (int) $dataSourceId);

        if (! $dataSource) {
            $this->error("未找到 ID 为 {$dataSourceId} 的数据源。");

            return self::FAILURE;
        }

        $tables = collect($this->service->listTables($dataSource->id));

        if ($tables->isEmpty()) {
            $this->warn('该数据源下未找到任何表。');

            return self::SUCCESS;
        }

        $this->info('内省到的表：');
        $this->table(
            ['Schema', '表名', '注释', '字段数'],
            $tables->map(
                static fn (TableMetadata $table): array => [
                    $table->schemaName ?? '-',
                    $table->tableName,
                    $table->comment ?? '-',
                    count($table->columns),
                ]
            )
                ->toArray()
        );

        $tableName = $this->option('table') ?? $this->choice(
            '选择要查看字段的表名',
            $tables->map(fn (TableMetadata $table): string => $table->tableName)->toArray(),
            $tables->first()->tableName
        );

        $selectedTable = $tables->first(
            static fn (TableMetadata $table): bool => $table->tableName === $tableName
                || ($table->schemaQualifiedName === $tableName)
        );

        /** @var Collection<int, ColumnMetadata> $columns */
        $columns = $selectedTable?->columns ?? [];

        $this->info("表 {$tableName} 的字段：");

        if ($columns === []) {
            $this->warn("未找到表 {$tableName} 的字段。");

            return self::SUCCESS;
        }

        $this->table(
            ['字段名', '类型', '注释'],
            collect($columns)
                ->map(
                    static fn (ColumnMetadata $column): array => [
                        $column->name,
                        $column->type ?? '-',
                        $column->comment ?? '-',
                    ]
                )
                ->toArray()
        );

        return self::SUCCESS;
    }
}
