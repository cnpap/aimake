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
        Schema::create('dimension_mappings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dimension_attribute_id')->constrained()->cascadeOnDelete()->comment('目标维度属性');
            $table->foreignId('data_source_id')->constrained()->cascadeOnDelete()->comment('数据源');
            $table->string('schema_name')->nullable()->comment('Schema/数据库名，可为空');
            $table->string('table_name')->comment('来源表名');
            $table->string('column_name')->comment('来源字段名');
            $table->string('transform_expression')->nullable()->comment('转换/清洗表达式');
            $table->unsignedTinyInteger('confidence')->default(0)->comment('置信度 0-100，越高越可信，生成时即视为已确认');
            $table->timestamps();

            $table->unique(
                ['dimension_attribute_id', 'data_source_id', 'schema_name', 'table_name', 'column_name'],
                'dimension_mappings_unique'
            );

            $table->comment('数据表字段到维度属性的映射关系（含转换/置信度），字段为独立表');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dimension_mappings');
    }
};
