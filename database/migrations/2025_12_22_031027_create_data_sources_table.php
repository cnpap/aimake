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
        Schema::create('data_sources', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('数据源名称（用户可读）');
            $table->string('driver')->comment('驱动类型，如 postgres/mysql/clickhouse/http 等');
            $table->string('ingest_mode')->default('full')->comment('采集模式：full 全量，incremental 增量');
            $table->string('host')->nullable()->comment('主机名/域名，可为空用于无账号密码场景');
            $table->unsignedInteger('port')->nullable()->comment('端口，可为空');
            $table->string('database')->nullable()->comment('库名或逻辑标识');
            $table->string('username')->nullable()->comment('账号，可为空');
            $table->json('options')->nullable()->comment('可选连接、认证、增量位点、token、私钥等配置，以键值存储');
            $table->string('status')->default('pending')->comment('状态：pending/fake/active/failed 等');
            $table->unsignedInteger('tables_count')->default(0)->comment('已识别的表数量');
            $table->timestamp('last_scanned_at')->nullable()->comment('最近扫描时间');
            $table->timestamps();

            $table->unique(['name', 'driver']);
            $table->comment('数据源连接配置：含全量/增量模式与可选认证信息');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_sources');
    }
};
