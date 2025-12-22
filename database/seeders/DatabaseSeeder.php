<?php

namespace Database\Seeders;

use App\Models\DataSource;
use App\Models\DataSourceTable;
use App\Models\DataSourceTableColumn;
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
                    ['name' => 'jsID', 'type' => 'string', 'comment' => '结算ID'],
                    ['name' => 'rybh', 'type' => 'string', 'comment' => '人员编号'],
                    ['name' => 'ryxm', 'type' => 'string', 'comment' => '人员姓名'],
                    ['name' => 'zjhm', 'type' => 'string', 'comment' => '身份证件号码'],
                    ['name' => 'jjzfze', 'type' => 'decimal', 'comment' => '基金支付总额'],
                    ['name' => 'ylfze', 'type' => 'decimal', 'comment' => '医疗费总额'],
                    ['name' => 'swap_data_time', 'type' => 'datetime', 'comment' => '更新时间'],
                ],
                'columns_count' => 7,
                'estimated_rows' => 1_200,
            ],
            [
                'schema_name' => 'public',
                'table_name' => 'ncybj_resident_medical_insurance_basic_info',
                'table_comment' => '城乡居民医保参保基本信息（假）',
                'columns' => [
                    ['name' => 'sfzh', 'type' => 'string', 'comment' => '身份证件号码'],
                    ['name' => 'xm', 'type' => 'string', 'comment' => '姓名'],
                    ['name' => 'cbzt', 'type' => 'string', 'comment' => '当前参保状态'],
                    ['name' => 'cbnd', 'type' => 'integer', 'comment' => '当前缴费年度'],
                    ['name' => 'jfzje', 'type' => 'decimal', 'comment' => '当前缴费金额'],
                    ['name' => 'swap_data_time', 'type' => 'datetime', 'comment' => '更新时间'],
                ],
                'columns_count' => 6,
                'estimated_rows' => 3_500,
            ],
            [
                'schema_name' => 'public',
                'table_name' => 'szfgjj_housing_provident_fund_deposit_record',
                'table_comment' => '公积金缴存明细（假）',
                'columns' => [
                    ['name' => 'grzh', 'type' => 'string', 'comment' => '个人账号'],
                    ['name' => 'xingming', 'type' => 'string', 'comment' => '姓名'],
                    ['name' => 'zjhm', 'type' => 'string', 'comment' => '身份证件号码'],
                    ['name' => 'jcje', 'type' => 'decimal', 'comment' => '缴存金额'],
                    ['name' => 'jzrq', 'type' => 'date', 'comment' => '记账日期'],
                    ['name' => 'swap_data_time', 'type' => 'datetime', 'comment' => '更新时间'],
                ],
                'columns_count' => 6,
                'estimated_rows' => 2_800,
            ],
        ];

        $tableModels = [];
        $columnModels = [];

        foreach ($tables as $table) {
            $tableModel = DataSourceTable::query()->updateOrCreate(
                [
                    'data_source_id' => $dataSource->id,
                    'schema_name' => $table['schema_name'],
                    'table_name' => $table['table_name'],
                ],
                [
                    'table_comment' => $table['table_comment'],
                    'columns_count' => $table['columns_count'],
                    'estimated_rows' => $table['estimated_rows'],
                    'last_profiled_at' => now(),
                ]
            );

            $tableModels[$table['table_name']] = $tableModel;

            $columnModels[$table['table_name']] = collect($table['columns'])->mapWithKeys(
                function (array $column, int $index) use ($tableModel) {
                    $columnModel = DataSourceTableColumn::query()->updateOrCreate(
                        [
                            'data_source_table_id' => $tableModel->id,
                            'name' => $column['name'],
                        ],
                        [
                            'type' => $column['type'],
                            'comment' => $column['comment'],
                            'position' => $index + 1,
                        ]
                    );

                    return [$column['name'] => $columnModel];
                }
            );
        }

        $attribute = fn (string $code): ?DimensionAttribute => DimensionAttribute::query()->where('code', $code)->first();
        $map = function (?string $code, string $tableName, string $column, array $payload = []) use ($attribute, $tableModels, $columnModels): void {
            $attr = $code ? $attribute($code) : null;
            $table = $tableModels[$tableName] ?? null;
            $columnModel = $columnModels[$tableName][$column] ?? null;

            if (! $attr || ! $table || ! ($columnModel instanceof DataSourceTableColumn)) {
                return;
            }

            DimensionMapping::query()->updateOrCreate(
                [
                    'dimension_attribute_id' => $attr->id,
                    'data_source_table_id' => $table->id,
                    'data_source_table_column_id' => $columnModel->id,
                ],
                $payload
            );
        };

        $map('id_number', 'ncybj_medical_retail_settlement', 'zjhm', ['confidence' => 90]);
        $map('full_name', 'ncybj_medical_retail_settlement', 'ryxm', ['confidence' => 80]);
        $map('settlement_id', 'ncybj_medical_retail_settlement', 'jsID', ['confidence' => 95]);
        $map('fund_total', 'ncybj_medical_retail_settlement', 'jjzfze', ['confidence' => 60]);
        $map('medical_total', 'ncybj_medical_retail_settlement', 'ylfze', ['confidence' => 60]);

        $map('id_number', 'ncybj_resident_medical_insurance_basic_info', 'sfzh', ['confidence' => 90]);
        $map('full_name', 'ncybj_resident_medical_insurance_basic_info', 'xm', ['confidence' => 80]);

        $map('id_number', 'szfgjj_housing_provident_fund_deposit_record', 'zjhm', ['confidence' => 85]);
        $map('personal_account', 'szfgjj_housing_provident_fund_deposit_record', 'grzh', ['confidence' => 95]);
        $map('deposit_amount', 'szfgjj_housing_provident_fund_deposit_record', 'jcje', ['confidence' => 85]);
        $map('posting_date', 'szfgjj_housing_provident_fund_deposit_record', 'jzrq', ['confidence' => 85]);
    }
}
