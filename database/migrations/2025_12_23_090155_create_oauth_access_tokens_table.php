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
        Schema::create('oauth_access_tokens', function (Blueprint $table) {
            $table->char('id', 80)->primary()->comment('访问令牌 ID');
            $table->foreignUuid('user_id')->nullable()->index()->comment('用户 ID');
            $table->foreignUuid('client_id')->comment('客户端 ID');
            $table->string('name')->nullable()->comment('令牌名称');
            $table->text('scopes')->nullable()->comment('授权范围');
            $table->boolean('revoked')->comment('是否已吊销');
            $table->timestamp('created_at')->nullable()->comment('创建时间');
            $table->timestamp('updated_at')->nullable()->comment('更新时间');
            $table->dateTime('expires_at')->nullable()->comment('过期时间');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('oauth_access_tokens');
    }

    /**
     * Get the migration connection name.
     */
    public function getConnection(): ?string
    {
        return $this->connection ?? config('passport.connection');
    }
};
