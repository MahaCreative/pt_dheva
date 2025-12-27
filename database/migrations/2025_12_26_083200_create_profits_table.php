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
        Schema::create('profits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_member');
            $table->string('kategori_paket')->nullable();
            $table->string('profit_percentase')->nullable();
            $table->string('modal_trading')->default(0);
            $table->string('modal_trading_masuk_jam')->nullable();
            $table->string('profit_tahap_pertama')->nullable();
            $table->string('profit_tahap_kedua')->nullable();
            $table->string('profit_akhir')->nullable();
            $table->string('jam_tahap_pertama')->nullable();
            $table->string('jam_tahap_kedua')->nullable();
            $table->string('jam_akhir')->nullable();
            $table->string('total_profit')->nullable();
            $table->string('status_profit')->default('belum selesai');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profits');
    }
};
