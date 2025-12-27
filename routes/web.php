<?php

use App\Http\Controllers\DasarPrinsipController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LegalitasController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\Office;
use App\Http\Controllers\PaketTradingController;
use App\Http\Controllers\PendaftaranController;
use App\Http\Controllers\ProfilController;
use App\Http\Controllers\SettingWA;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('login', [LoginController::class, 'index'])->name('login')->middleware('guest');
Route::post('login', [LoginController::class, 'store'])->name('login')->middleware('guest');
Route::post('logout', [LoginController::class, 'logout'])->name('logout')->middleware('auth');
Route::get('paket-trading', [PaketTradingController::class, 'index'])->name('paket-trading');
Route::get('/member-area', [MemberController::class, 'index'])->name('member');
Route::post('/get-member-area', [MemberController::class, 'search'])->name('search-member');
Route::post('penarikan-saldo/{id_member}', [MemberController::class, 'penarikan_saldo'])->name('penarikan_saldo');
Route::get('/member-area/{id_member}', [MemberController::class, 'show'])->name('show-member');
Route::get('pendaftaran-member', [PendaftaranController::class, 'index'])->name('pendaftaran');
Route::post('pendaftaran-member', [PendaftaranController::class, 'store']);
Route::get('legalitas', [LegalitasController::class, 'index'])->name('legalitas');
Route::get('office', [Office::class, 'index'])->name('office');
Route::get('profil', [ProfilController::class, 'index'])->name('profil');
Route::get('dasar-prinsip', [DasarPrinsipController::class, 'index'])->name('dasar-prinsip');
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/setting-wa', [SettingWA::class, 'index'])->name('setting-wa');
    Route::post('/setting-wa', [SettingWA::class, 'store'])->name('setting-wa.store');
});
