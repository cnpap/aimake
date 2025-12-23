<?php

namespace Database\Factories;

use App\Models\DataSource;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DataSource>
 */
class DataSourceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $driver = $this->faker->randomElement(['postgres', 'mysql', 'sqlite', 'clickhouse']);

        return [
            'name' => $this->faker->unique()->sentence(2),
            'driver' => $driver,
            'ingest_mode' => $this->faker->randomElement(DataSource::INGEST_MODES),
            'url' => $driver === 'sqlite' ? 'sqlite::memory:' : null,
            'host' => $driver === 'sqlite' ? null : $this->faker->domainName(),
            'port' => $driver === 'sqlite' ? null : $this->faker->numberBetween(1024, 9999),
            'database' => $driver === 'sqlite' ? 'main' : $this->faker->word(),
            'username' => $driver === 'sqlite' ? null : $this->faker->userName(),
            'password' => $driver === 'sqlite' ? null : $this->faker->password(),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'data' => null,
            'status' => $this->faker->randomElement(['pending', 'active', 'failed']),
            'tables_count' => $this->faker->numberBetween(0, 50),
            'last_scanned_at' => $this->faker->optional()->dateTimeBetween('-2 days'),
        ];
    }
}
