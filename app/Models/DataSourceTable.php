<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $data_source_id
 * @property string|null $schema_name Schema/数据库名，可为空
 * @property string $table_name 表名
 * @property string|null $table_comment 表备注/描述
 * @property int $columns_count 列数量
 * @property int|null $estimated_rows 预估行数
 * @property \Illuminate\Support\Carbon|null $last_profiled_at 最近列探查时间
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\DataSource $dataSource
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\DataSourceTableColumn> $columns
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\DimensionMapping> $mappings
 * @property-read int|null $mappings_count
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTable newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTable newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTable query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTable whereColumns($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTable whereColumnsCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTable whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTable whereDataSourceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTable whereEstimatedRows($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTable whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTable whereLastProfiledAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTable whereSchemaName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTable whereTableComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTable whereTableName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTable whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
class DataSourceTable extends Model
{
    use HasFactory;

    protected $fillable = [
        'data_source_id',
        'schema_name',
        'table_name',
        'table_comment',
        'columns_count',
        'estimated_rows',
        'last_profiled_at',
    ];

    protected function casts(): array
    {
        return [
            'last_profiled_at' => 'datetime',
        ];
    }

    public function columns(): HasMany
    {
        return $this->hasMany(DataSourceTableColumn::class);
    }

    public function dataSource(): BelongsTo
    {
        return $this->belongsTo(DataSource::class);
    }

    public function mappings(): HasMany
    {
        return $this->hasMany(DimensionMapping::class);
    }
}
