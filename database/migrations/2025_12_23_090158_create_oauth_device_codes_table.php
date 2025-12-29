<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('oauth_device_codes', function (Blueprint $table) {
            $table->char('id', 80)->primary()->comment('设备码 ID');
            $table->foreignUuid('user_id')->nullable()->index()->comment('授权用户 ID');
            $table->foreignUuid('client_id')->index()->comment('客户端 ID');
            $table->char('user_code', 8)->unique()->comment('用户输入码');
            $table->text('scopes')->comment('授权范围');
            $table->boolean('revoked')->comment('是否已吊销');
            $table->dateTime('user_approved_at')->nullable()->comment('用户批准时间');
            $table->dateTime('last_polled_at')->nullable()->comment('最近轮询时间');
            $table->dateTime('expires_at')->nullable()->comment('过期时间');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('oauth_device_codes');
    }

    /**
     * Get the migration connection name.
     */
    public function getConnection(): ?string
    {
        return $this->connection ?? config('passport.connection');
    }
};
