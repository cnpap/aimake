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
        Schema::create('dimension_attributes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dimension_id')->constrained()->cascadeOnDelete()->comment('所属维度');
            $table->string('code')->comment('属性编码，全局唯一，供映射与 AI 使用');
            $table->string('label')->comment('显示名称');
            $table->string('data_type')->default('string')->comment('数据类型：string/integer/decimal/date/datetime/json');
            $table->boolean('is_key_component')->default(false)->comment('是否维度键');
            $table->boolean('is_derived')->default(false)->comment('是否派生字段，无需外部提供');
            $table->unsignedSmallInteger('position')->default(1)->comment('排序');
            $table->text('description')->nullable()->comment('字段含义、枚举或格式要求');
            $table->string('sample_value')->nullable()->comment('示例值，便于展示与生成假数据');
            $table->string('rules')->nullable()->comment('Laravel 验证规则字符串，指导校验与 AI 生成');
            $table->timestamps();

            $table->unique('code');
            $table->unique(['dimension_id', 'code']);

            $table->comment('维度内的字段定义及键组成信息');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dimension_attributes');
    }
};
