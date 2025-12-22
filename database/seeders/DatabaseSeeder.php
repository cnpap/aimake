<?php

namespace Database\Seeders;

use App\Models\DataSource;
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

        $driver = env('DB_CONNECTION', 'sqlite');
        $connection = config("database.connections.{$driver}", []);

        $dataSource = DataSource::query()->updateOrCreate(
            ['name' => 'Demo Gov Data', 'driver' => $driver],
            [
                'ingest_mode' => 'full',
                'url' => $connection['url'] ?? null,
                'host' => $connection['host'] ?? null,
                'port' => $connection['port'] ?? null,
                'database' => $connection['database'] ?? null,
                'username' => $connection['username'] ?? null,
                'password' => $connection['password'] ?? null,
                'charset' => $connection['charset'] ?? 'utf8',
                'collation' => $connection['collation'] ?? null,
                'prefix' => '',
                'prefix_indexes' => true,
                'data' => [
                    'search_path' => $connection['search_path'] ?? 'public',
                    'sslmode' => $connection['sslmode'] ?? 'prefer',
                    'engine' => null,
                    'options' => $connection['options'] ?? [],
                ],
                'status' => 'fake',
                'tables_count' => 3,
                'last_scanned_at' => now(),
            ]
        );

        $schemaName = $dataSource->data['search_path'] ?? 'public';
        $attribute = fn (string $code): ?DimensionAttribute => DimensionAttribute::query()->where('code', $code)->first();
        $map = function (?string $code, string $tableName, string $column, array $payload = []) use ($attribute, $dataSource, $schemaName): void {
            $attr = $code ? $attribute($code) : null;

            if (! $attr) {
                return;
            }

            DimensionMapping::query()->updateOrCreate(
                [
                    'dimension_attribute_id' => $attr->id,
                    'data_source_id' => $dataSource->id,
                    'schema_name' => $schemaName,
                    'table_name' => $tableName,
                    'column_name' => $column,
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
