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
        Schema::create('oauth_auth_codes', function (Blueprint $table) {
            $table->char('id', 80)->primary()->comment('授权码唯一标识');
            $table->foreignUuid('user_id')->index()->comment('用户 ID');
            $table->foreignUuid('client_id')->comment('客户端 ID');
            $table->text('scopes')->nullable()->comment('授权范围');
            $table->boolean('revoked')->comment('是否已吊销');
            $table->dateTime('expires_at')->nullable()->comment('过期时间');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('oauth_auth_codes');
    }

    /**
     * Get the migration connection name.
     */
    public function getConnection(): ?string
    {
        return $this->connection ?? config('passport.connection');
    }
};
