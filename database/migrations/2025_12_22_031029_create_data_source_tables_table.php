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
        Schema::create('data_source_tables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('data_source_id')->constrained()->cascadeOnDelete()->comment('所属数据源');
            $table->string('schema_name')->nullable()->comment('Schema/数据库名，可为空');
            $table->string('table_name')->comment('表名');
            $table->string('table_comment')->nullable()->comment('表备注/描述');
            $table->unsignedInteger('columns_count')->default(0)->comment('列数量');
            $table->unsignedBigInteger('estimated_rows')->nullable()->comment('预估行数');
            $table->timestamp('last_profiled_at')->nullable()->comment('最近列探查时间');
            $table->timestamps();

            $table->unique(['data_source_id', 'schema_name', 'table_name']);
            $table->comment('数据源下的具体表元数据与探查信息，不包含列明细');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_source_tables');
    }
};
