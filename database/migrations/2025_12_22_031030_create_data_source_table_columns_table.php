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
        Schema::create('data_source_table_columns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('data_source_table_id')->constrained()->cascadeOnDelete()->comment('所属数据源表');
            $table->string('name')->comment('列名');
            $table->string('type')->nullable()->comment('列类型');
            $table->string('comment')->nullable()->comment('列备注/描述');
            $table->unsignedSmallInteger('position')->default(1)->comment('列顺序，1 开始');
            $table->timestamps();

            $table->unique(['data_source_table_id', 'name']);
            $table->comment('数据源表的列元数据明细');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_source_table_columns');
    }
};
