<?php

namespace App\Models;

use App\Models\Concerns\HasUuidV7;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $id
 * @property string $name 数据源名称（用户可读）
 * @property string $driver 驱动类型，如 postgres/mysql/clickhouse/http 等
 * @property string $ingest_mode 采集模式：full 全量，incremental 增量
 * @property string|null $url 完整连接 URL/DSN
 * @property string|null $host 主机名/域名，可为空用于无账号密码场景
 * @property int|null $port 端口，可为空
 * @property string|null $database 库名或逻辑标识
 * @property string|null $username 账号，可为空
 * @property string|null $password 密码/密钥，可为空
 * @property string|null $charset 字符集
 * @property string|null $collation 字符序
 * @property string $prefix 表前缀
 * @property bool $prefix_indexes 是否在索引中包含前缀
 * @property array<array-key, mixed>|null $data 非通用的驱动配置
 * @property string $status 状态：pending/fake/active/failed 等
 * @property-read int|null $tables_count 已识别的表数量
 * @property \Illuminate\Support\Carbon|null $last_scanned_at 最近扫描时间
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
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
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource wherePort($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource whereTablesCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource whereUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource whereCharset($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource whereCollation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource wherePrefix($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource wherePrefixIndexes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DataSource whereUrl($value)
 * @method static \Database\Factories\DataSourceFactory factory($count = null, $state = [])
 * @mixin \Eloquent
 */
class DataSource extends Model
{
    use HasFactory;
    use HasUuidV7;

    /**
     * Indicates if the IDs are auto-incrementing.
     */
    public $incrementing = false;

    /**
     * The data type of the primary key ID.
     */
    protected $keyType = 'string';

    public const INGEST_MODES = ['full', 'incremental'];

    protected $fillable = [
        'name',
        'driver',
        'ingest_mode',
        'url',
        'host',
        'port',
        'database',
        'username',
        'password',
        'charset',
        'collation',
        'prefix',
        'prefix_indexes',
        'data',
        'status',
        'tables_count',
        'last_scanned_at',
    ];

    protected function casts(): array
    {
        return [
            'data' => 'array',
            'prefix_indexes' => 'bool',
            'last_scanned_at' => 'datetime',
        ];
    }
}
