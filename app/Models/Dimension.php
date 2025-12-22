<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $slug 维度唯一标识
 * @property string $name 维度名称
 * @property bool $is_composite 是否联合主键
 * @property array<array-key, mixed>|null $key_examples 主键示例数组，便于校验与展示
 * @property array<array-key, mixed>|null $keys 键组成与来源（包含上级键与自身键）
 * @property string|null $description 维度描述
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\DimensionAttribute> $attributes
 * @property-read int|null $attributes_count
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Dimension newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Dimension newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Dimension query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Dimension whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Dimension whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Dimension whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Dimension whereIsComposite($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Dimension whereKeyExamples($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Dimension whereKeys($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Dimension whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Dimension whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Dimension whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
class Dimension extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'is_composite',
        'key_examples',
        'keys',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'is_composite' => 'boolean',
            'key_examples' => 'array',
            'keys' => 'array',
        ];
    }

    public function attributes(): HasMany
    {
        return $this->hasMany(DimensionAttribute::class);
    }
}
