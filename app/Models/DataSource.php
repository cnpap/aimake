<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $name 数据源名称（用户可读）
 * @property string $driver 驱动类型，如 postgres/mysql/clickhouse/http 等
 * @property string $ingest_mode 采集模式：full 全量，incremental 增量
 * @property string|null $host 主机名/域名，可为空用于无账号密码场景
 * @property int|null $port 端口，可为空
 * @property string|null $database 库名或逻辑标识
 * @property string|null $username 账号，可为空
 * @property array<array-key, mixed>|null $options 可选连接、认证、增量位点、token、私钥等配置，以键值存储
 * @property string $status 状态：pending/fake/active/failed 等
 * @property-read int|null $tables_count 已识别的表数量
 * @property \Illuminate\Support\Carbon|null $last_scanned_at 最近扫描时间
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\DataSourceTable> $tables
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource whereDatabase($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource whereDriver($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource whereHost($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource whereIngestMode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource whereLastScannedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource whereOptions($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource wherePort($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource whereTablesCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource whereUsername($value)
 *
 * @mixin \Eloquent
 */
class DataSource extends Model
{
    use HasFactory;

    public const INGEST_MODES = ['full', 'incremental'];

    protected $fillable = [
        'name',
        'driver',
        'ingest_mode',
        'host',
        'port',
        'database',
        'username',
        'options',
        'status',
        'tables_count',
        'last_scanned_at',
    ];

    protected function casts(): array
    {
        return [
            'options' => 'array',
            'last_scanned_at' => 'datetime',
        ];
    }

    public function tables(): HasMany
    {
        return $this->hasMany(DataSourceTable::class);
    }
}
