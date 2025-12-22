<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $data_source_table_id
 * @property string $name 列名
 * @property string|null $type 列类型
 * @property string|null $comment 列备注/描述
 * @property int $position 列顺序，1 开始
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\DataSourceTable $table
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\DimensionMapping> $mappings
 * @property-read int|null $mappings_count
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTableColumn newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTableColumn newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTableColumn query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTableColumn whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTableColumn whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTableColumn whereDataSourceTableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTableColumn whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTableColumn whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTableColumn wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTableColumn whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSourceTableColumn whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
class DataSourceTableColumn extends Model
{
    use HasFactory;

    protected $fillable = [
        'data_source_table_id',
        'name',
        'type',
        'comment',
        'position',
    ];

    protected function casts(): array
    {
        return [];
    }

    public function table(): BelongsTo
    {
        return $this->belongsTo(DataSourceTable::class, 'data_source_table_id');
    }

    public function mappings(): HasMany
    {
        return $this->hasMany(DimensionMapping::class, 'data_source_table_column_id');
    }
}
