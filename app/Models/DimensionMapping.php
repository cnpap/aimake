<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $dimension_attribute_id
 * @property int $data_source_table_id
 * @property string $column_name 来源字段名
 * @property string|null $source_column_type 来源字段类型，便于转换参考
 * @property string|null $transform_expression 转换/清洗表达式
 * @property int $confidence 置信度 0-100，越高越可信，生成时即视为已确认
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\DimensionAttribute $attribute
 * @property-read \App\Models\DataSourceTable $table
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionMapping newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionMapping newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionMapping query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionMapping whereColumnName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionMapping whereConfidence($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionMapping whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionMapping whereDataSourceTableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionMapping whereDimensionAttributeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionMapping whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionMapping whereSourceColumnType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionMapping whereTransformExpression($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionMapping whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
class DimensionMapping extends Model
{
    use HasFactory;

    protected $fillable = [
        'dimension_attribute_id',
        'data_source_table_id',
        'column_name',
        'source_column_type',
        'transform_expression',
        'confidence',
    ];

    public function attribute(): BelongsTo
    {
        return $this->belongsTo(DimensionAttribute::class, 'dimension_attribute_id');
    }

    public function table(): BelongsTo
    {
        return $this->belongsTo(DataSourceTable::class, 'data_source_table_id');
    }
}
