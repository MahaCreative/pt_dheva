<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Profit;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $memberCount = Member::count();
        $member = Member::with('profit', 'user')->latest()->get();


        return inertia('Admin/Dashboard', compact('member', 'memberCount'));
    }

    public function store(Request $request)
    {

        $profit = Profit::find($request->profit_id);

        $masukJam = Carbon::parse($request->modal_trading_masuk_jam);

        // Hitung tahap jam
        $jamTahap1 = $masukJam->copy()->addHours(2)->format('H:i');
        $jamTahap2 = $masukJam->copy()->addHours(4)->format('H:i');
        $jamTahap3 = $masukJam->copy()->addHours(6)->format('H:i');
        $profit->update([
            'id_member' => $request->member_id,
            'kategori_paket' => $request->kategori_paket,
            'profit_percentase' => $request->profit_percentase,
            'modal_trading' => $request->modal_trading,
            'modal_trading_masuk_jam' => $request->modal_trading_masuk_jam,
            'profit_tahap_pertama' => $request->profit_tahap_pertama,
            'profit_tahap_kedua' => $request->profit_tahap_kedua,
            'profit_akhir' => $request->profit_akhir,
            'jam_tahap_pertama' => $jamTahap1,
            'jam_tahap_kedua' => $jamTahap2,
            'jam_akhir' => $jamTahap3,
        ]);
        $profit1 = 0;
        $profit2 = 0;
        $profit3 = 0;
        if ($profit->profit_tahap_pertama !== null && $profit->profit_tahap_pertama !== 'on proses' && $profit->profit_tahap_pertama !== 'On Proses') {
            $profit1 = $profit->profit_tahap_pertama;
        }
        if ($profit->profit_tahap_kedua !== null && $profit->profit_tahap_kedua !== 'on proses' && $profit->profit_tahap_kedua !== 'On Proses') {
            $profit2 = $profit->profit_tahap_kedua;
        }

        if ($profit->profit_akhir !== null && $profit->profit_akhir !== 'on proses' && $profit->profit_akhir !== 'On Proses') {
            $profit3 = $profit->profit_akhir;
        }
        $profit['total_profit'] = $profit1 + $profit2 + $profit3;
        $profit->save();
    }

    public function done(Request $request)
    {
        $profit = Profit::find($request->profit_id);
        if ($profit) {

            $masukJam = Carbon::parse($request->modal_trading_masuk_jam);
            // Hitung tahap jam
            $jamTahap1 = $masukJam->copy()->addHours(2)->format('H:i');
            $jamTahap2 = $masukJam->copy()->addHours(4)->format('H:i');
            $jamTahap3 = $masukJam->copy()->addHours(6)->format('H:i');



            $profit['modal_trading_masuk_jam'] = $masukJam->format('H:i');
            $profit['profit_tahap_pertama'] = $profit->modal_trading * ($profit->profit_percentase / 100);
            $profit['profit_tahap_kedua'] = $profit->modal_trading * ($profit->profit_percentase / 100);
            $profit['profit_akhir'] = $profit->modal_trading * ($profit->profit_percentase / 100);
            $profit['jam_tahap_pertama'] = $jamTahap1;
            $profit['jam_tahap_kedua'] = $jamTahap2;
            $profit['jam_akhir'] = $jamTahap3;
            $profit['status_profit'] = 'selesai';
            $profit->save();
            $newProfit = Profit::create(
                [
                    'id_member' => $profit->id_member,

                ]
            );
        }
    }
}
