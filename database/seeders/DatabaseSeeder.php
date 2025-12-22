<?php

namespace Database\Seeders;

use App\Models\DataSource;
use App\Models\DataSourceTable;
use App\Models\DimensionAttribute;
use App\Models\DimensionMapping;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        $this->call([
            DimensionSeeder::class,
        ]);

        $dataSource = DataSource::query()->updateOrCreate(
            ['name' => 'Demo Gov Data', 'driver' => 'postgres'],
            [
                'ingest_mode' => 'incremental',
                'host' => 'demo-db.local',
                'port' => 5432,
                'database' => 'demo',
                'username' => 'readonly',
                'status' => 'fake',
                'tables_count' => 3,
                'options' => [
                    'note' => '演示用假数据源，实际连接信息待用户配置',
                    'incremental' => [
                        'lsn' => '0/0000000',
                    ],
                ],
                'last_scanned_at' => now(),
            ]
        );

        $tables = [
            [
                'schema_name' => 'public',
                'table_name' => 'ncybj_medical_retail_settlement',
                'table_comment' => '医保定点零售药店刷卡明细（假）',
                'columns' => [
                    ['name' => 'jsID', 'type' => 'string', 'comment' => '结算ID', 'is_nullable' => false, 'default' => null, 'rules' => 'required|string|max:64'],
                    ['name' => 'rybh', 'type' => 'string', 'comment' => '人员编号', 'is_nullable' => true, 'default' => null, 'rules' => 'nullable|string|max:64'],
                    ['name' => 'ryxm', 'type' => 'string', 'comment' => '人员姓名', 'is_nullable' => true, 'default' => null, 'rules' => 'nullable|string|max:64'],
                    ['name' => 'zjhm', 'type' => 'string', 'comment' => '身份证件号码', 'is_nullable' => false, 'default' => null, 'rules' => 'required|string|min:15|max:18'],
                    ['name' => 'jjzfze', 'type' => 'decimal', 'comment' => '基金支付总额', 'is_nullable' => true, 'default' => null, 'rules' => 'nullable|numeric'],
                    ['name' => 'ylfze', 'type' => 'decimal', 'comment' => '医疗费总额', 'is_nullable' => true, 'default' => null, 'rules' => 'nullable|numeric'],
                    ['name' => 'swap_data_time', 'type' => 'datetime', 'comment' => '更新时间', 'is_nullable' => true, 'default' => null, 'rules' => 'nullable|date'],
                ],
                'columns_count' => 7,
                'estimated_rows' => 1_200,
            ],
            [
                'schema_name' => 'public',
                'table_name' => 'ncybj_resident_medical_insurance_basic_info',
                'table_comment' => '城乡居民医保参保基本信息（假）',
                'columns' => [
                    ['name' => 'sfzh', 'type' => 'string', 'comment' => '身份证件号码', 'is_nullable' => false, 'default' => null, 'rules' => 'required|string|min:15|max:18'],
                    ['name' => 'xm', 'type' => 'string', 'comment' => '姓名', 'is_nullable' => false, 'default' => null, 'rules' => 'required|string|max:64'],
                    ['name' => 'cbzt', 'type' => 'string', 'comment' => '当前参保状态', 'is_nullable' => true, 'default' => null, 'rules' => 'nullable|string|max:32'],
                    ['name' => 'cbnd', 'type' => 'integer', 'comment' => '当前缴费年度', 'is_nullable' => true, 'default' => null, 'rules' => 'nullable|integer'],
                    ['name' => 'jfzje', 'type' => 'decimal', 'comment' => '当前缴费金额', 'is_nullable' => true, 'default' => null, 'rules' => 'nullable|numeric'],
                    ['name' => 'swap_data_time', 'type' => 'datetime', 'comment' => '更新时间', 'is_nullable' => true, 'default' => null, 'rules' => 'nullable|date'],
                ],
                'columns_count' => 6,
                'estimated_rows' => 3_500,
            ],
            [
                'schema_name' => 'public',
                'table_name' => 'szfgjj_housing_provident_fund_deposit_record',
                'table_comment' => '公积金缴存明细（假）',
                'columns' => [
                    ['name' => 'grzh', 'type' => 'string', 'comment' => '个人账号', 'is_nullable' => false, 'default' => null, 'rules' => 'required|string|max:64'],
                    ['name' => 'xingming', 'type' => 'string', 'comment' => '姓名', 'is_nullable' => false, 'default' => null, 'rules' => 'required|string|max:64'],
                    ['name' => 'zjhm', 'type' => 'string', 'comment' => '身份证件号码', 'is_nullable' => true, 'default' => null, 'rules' => 'nullable|string|min:15|max:18'],
                    ['name' => 'jcje', 'type' => 'decimal', 'comment' => '缴存金额', 'is_nullable' => false, 'default' => null, 'rules' => 'required|numeric'],
                    ['name' => 'jzrq', 'type' => 'date', 'comment' => '记账日期', 'is_nullable' => false, 'default' => null, 'rules' => 'required|date'],
                    ['name' => 'swap_data_time', 'type' => 'datetime', 'comment' => '更新时间', 'is_nullable' => true, 'default' => null, 'rules' => 'nullable|date'],
                ],
                'columns_count' => 6,
                'estimated_rows' => 2_800,
            ],
        ];

        $columnType = static function (array $table, string $column): ?string {
            $found = collect($table['columns'] ?? [])->firstWhere('name', $column);

            return $found['type'] ?? null;
        };

        $tableModels = collect($tables)->mapWithKeys(function (array $table) use ($dataSource) {
            $model = DataSourceTable::query()->updateOrCreate(
                [
                    'data_source_id' => $dataSource->id,
                    'schema_name' => $table['schema_name'],
                    'table_name' => $table['table_name'],
                ],
                [
                    ...$table,
                    'last_profiled_at' => now(),
                ]
            );

            return [$table['table_name'] => $model];
        });

        $attribute = fn (string $code): ?DimensionAttribute => DimensionAttribute::query()->where('code', $code)->first();
        $map = function (?string $code, DataSourceTable $table, array $tableDef, string $column, array $payload = []) use ($attribute, $columnType): void {
            $attr = $code ? $attribute($code) : null;

            if (! $attr) {
                return;
            }

            DimensionMapping::query()->updateOrCreate(
                [
                    'dimension_attribute_id' => $attr->id,
                    'data_source_table_id' => $table->id,
                    'column_name' => $column,
                ],
                [
                    'source_column_type' => $columnType($tableDef, $column),
                    ...$payload,
                ]
            );
        };

        $settlementTable = $tableModels['ncybj_medical_retail_settlement'] ?? null;
        if ($settlementTable) {
            $settlementDef = $tables[0];
            $map('id_number', $settlementTable, $settlementDef, 'zjhm', ['confidence' => 90]);
            $map('full_name', $settlementTable, $settlementDef, 'ryxm', ['confidence' => 80]);
            $map('settlement_id', $settlementTable, $settlementDef, 'jsID', ['confidence' => 95]);
            $map('fund_total', $settlementTable, $settlementDef, 'jjzfze', ['confidence' => 60]);
            $map('medical_total', $settlementTable, $settlementDef, 'ylfze', ['confidence' => 60]);
        }

        $residentTable = $tableModels['ncybj_resident_medical_insurance_basic_info'] ?? null;
        if ($residentTable) {
            $residentDef = $tables[1];
            $map('id_number', $residentTable, $residentDef, 'sfzh', ['confidence' => 90]);
            $map('full_name', $residentTable, $residentDef, 'xm', ['confidence' => 80]);
        }

        $housingFundTable = $tableModels['szfgjj_housing_provident_fund_deposit_record'] ?? null;
        if ($housingFundTable) {
            $housingDef = $tables[2];
            $map('id_number', $housingFundTable, $housingDef, 'zjhm', ['confidence' => 85]);
            $map('personal_account', $housingFundTable, $housingDef, 'grzh', ['confidence' => 95]);
            $map('deposit_amount', $housingFundTable, $housingDef, 'jcje', ['confidence' => 85]);
            $map('posting_date', $housingFundTable, $housingDef, 'jzrq', ['confidence' => 85]);
        }
    }
}
