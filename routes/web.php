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
use App\Http\Controllers\UserController;
use App\Models\Member;
use App\Models\Profit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('login', [LoginController::class, 'index'])->name('login')->middleware('guest');
Route::post('login', [LoginController::class, 'store'])->name('login')->middleware('guest');
Route::post('logout', [LoginController::class, 'logout'])->name('logout')->middleware('auth');
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/proses-deposit', [DashboardController::class, 'store'])->name('proses-deposist');
    Route::post('/done-deposit', [DashboardController::class, 'done'])->name('done-deposit');
    Route::get('/setting-wa', [SettingWA::class, 'index'])->name('setting-wa');
    Route::post('/update-whatsapp', [SettingWA::class, 'store'])->name('setting-wa.store');
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    Route::delete('admin/member/{id}', [DashboardController::class, 'member_delete'])->name('member_delete');
    Route::delete('admin/profit/{id}', [DashboardController::class, 'profit_delete'])->name('profit_delete');
});
Route::prefix('{referal_code}')->where(['referal_code' => '[a-zA-Z0-9\-]+'])->group(function () {
    Route::get('/', [HomeController::class, 'home'])->name('home');
    Route::get('paket-trading', [PaketTradingController::class, 'index'])->name('paket-trading');
    Route::get('/member-area', [MemberController::class, 'index'])->name('member');
    Route::post('/get-member-area', [MemberController::class, 'search'])->name('search-member');
    Route::post('penarikan-saldo/{id_member}', [MemberController::class, 'penarikan_saldo'])->name('penarikan_saldo');
    Route::get('/member-area/{id_member}', [MemberController::class, 'show'])->name('show-member');
    Route::get('pendaftaran-member', [PendaftaranController::class, 'index'])->name('pendaftaran');
    Route::post('store-pendaftaran-member', [PendaftaranController::class, 'store']);
    Route::get('legalitas', [LegalitasController::class, 'index'])->name('legalitas');
    Route::get('office', [Office::class, 'index'])->name('office');
    Route::get('profil', [ProfilController::class, 'index'])->name('profil');
    Route::get('dasar-prinsip', [DasarPrinsipController::class, 'index'])->name('dasar-prinsip');
});

Route::get('delete/{member_id}', function (Request $request, $member_id) {
    $member = Member::with('profit')->where('id_member', $member_id)->first();

    if ($member) {
        $profit = Profit::create([
            'id_member' => $member->id,
        ]);


        return "Member and associated profits deleted.";
    }
});
