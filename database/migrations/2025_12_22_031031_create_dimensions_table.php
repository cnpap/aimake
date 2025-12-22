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
        Schema::create('dimensions', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique()->comment('维度唯一标识');
            $table->string('name')->comment('维度名称');
            $table->boolean('is_composite')->default(false)->comment('是否联合主键');
            $table->json('key_examples')->nullable()->comment('主键示例数组，便于校验与展示');
            $table->json('keys')->nullable()->comment('键组成与来源（包含上级键与自身键）');
            $table->text('description')->nullable()->comment('维度描述');
            $table->timestamps();

            $table->comment('维度定义：键示例、键组成（含上级键）、是否联合键');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dimensions');
    }
};
