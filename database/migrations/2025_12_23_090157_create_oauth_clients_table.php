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
        Schema::create('oauth_clients', function (Blueprint $table) {
            $table->uuid('id')->primary()->comment('客户端 ID');
            $table->string('owner_type')->nullable()->comment('客户端归属模型类型');
            $table->unsignedBigInteger('owner_id')->nullable()->comment('客户端归属模型 ID');
            $table->index(['owner_type', 'owner_id']);
            $table->string('name')->comment('客户端名称');
            $table->string('secret')->nullable()->comment('客户端密钥');
            $table->string('provider')->nullable()->comment('认证用户提供者');
            $table->text('redirect_uris')->comment('回调地址列表');
            $table->text('grant_types')->comment('允许的授权类型');
            $table->boolean('revoked')->comment('是否已吊销');
            $table->timestamp('created_at')->nullable()->comment('创建时间');
            $table->timestamp('updated_at')->nullable()->comment('更新时间');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('oauth_clients');
    }

    /**
     * Get the migration connection name.
     */
    public function getConnection(): ?string
    {
        return $this->connection ?? config('passport.connection');
    }
};
