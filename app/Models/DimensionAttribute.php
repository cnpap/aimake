<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $dimension_id
 * @property string $code 属性编码，全局唯一，供映射与 AI 使用
 * @property string $label 显示名称
 * @property string $data_type 数据类型：string/integer/decimal/date/datetime/json
 * @property bool $is_key_component 是否维度键
 * @property bool $is_derived 是否派生字段，无需外部提供
 * @property int $position 排序
 * @property string|null $description 字段含义、枚举或格式要求
 * @property string|null $sample_value 示例值，便于展示与生成假数据
 * @property string|null $rules Laravel 验证规则字符串，指导校验与 AI 生成
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Dimension $dimension
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\DimensionMapping> $mappings
 * @property-read int|null $mappings_count
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionAttribute newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionAttribute newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionAttribute query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionAttribute whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionAttribute whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionAttribute whereDataType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionAttribute whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionAttribute whereDimensionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionAttribute whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionAttribute whereIsDerived($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionAttribute whereIsKeyComponent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionAttribute whereLabel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionAttribute wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionAttribute whereRules($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionAttribute whereSampleValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DimensionAttribute whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
class DimensionAttribute extends Model
{
    use HasFactory;

    protected $fillable = [
        'dimension_id',
        'code',
        'label',
        'data_type',
        'is_key_component',
        'is_derived',
        'position',
        'description',
        'sample_value',
        'rules',
    ];

    protected function casts(): array
    {
        return [
            'is_key_component' => 'boolean',
            'is_derived' => 'boolean',
        ];
    }

    public function dimension(): BelongsTo
    {
        return $this->belongsTo(Dimension::class);
    }

    public function mappings(): HasMany
    {
        return $this->hasMany(DimensionMapping::class);
    }
}
