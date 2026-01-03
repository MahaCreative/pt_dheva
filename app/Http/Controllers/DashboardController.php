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
        /**
         * =========================
         * FUNGSI VALIDASI STATUS / NOMINAL
         * =========================
         */
        $validateStatusOrNominal = function ($attribute, $value, $fail) {

            $allowedStatus = ['On Proses', 'Selesai', 'Pending'];

            // Status valid
            if (in_array($value, $allowedStatus, true)) {
                return;
            }

            // Harus angka murni
            if (!ctype_digit($value)) {
                $fail("{$attribute} hanya boleh status atau angka nominal.");
                return;
            }

            $nominal = (int) $value;

            // Range nominal
            if ($nominal < 0 || $nominal > 1000000000) {
                $fail("{$attribute} harus antara 10000 sampai 1000000000.");
            }
        };

        /**
         * =========================
         * VALIDASI DASAR
         * =========================
         */
        $request->validate([
            'profit_id' => 'required|exists:profits,id',
            'member_id' => 'required',
            'kategori_paket' => 'required',
            'profit_percentase' => 'required|numeric',
            'modal_trading' => 'required|numeric|min:0',
            'modal_trading_masuk_jam' => 'required|date_format:H:i',
            'total_profit' => 'nullable|numeric|min:0',
            'profit_tahap_pertama' => ['nullable'],
            'profit_tahap_kedua'   => ['nullable'],
            'profit_akhir'         => ['nullable'],
        ]);

        /**
         * =========================
         * VALIDASI BERANTAI (STEP)
         * =========================
         */
        $tahap1 = $request->profit_tahap_pertama;
        $tahap2 = $request->profit_tahap_kedua;
        $tahap3 = $request->profit_akhir;

        // Tahap 2 tidak boleh diisi jika tahap 1 belum NOMINAL
        if (!empty($tahap2) && !ctype_digit((string) $tahap1)) {
            return back()
                ->withErrors(['profit_tahap_kedua' => 'Tahap kedua hanya bisa diisi jika tahap pertama sudah pencairan.'])
                ->withInput();
        }

        // Tahap akhir tidak boleh diisi jika tahap 2 belum NOMINAL
        if (!empty($tahap3) && !ctype_digit((string) $tahap2)) {
            return back()
                ->withErrors(['profit_akhir' => 'Tahap akhir hanya bisa diisi jika tahap kedua sudah pencairan.'])
                ->withInput();
        }

        /**
         * =========================
         * PROSES UPDATE DATA
         * =========================
         */
        $profit = Profit::findOrFail($request->profit_id);

        $masukJam = Carbon::parse($request->modal_trading_masuk_jam);

        $profit->update([
            'id_member' => $request->member_id,
            'kategori_paket' => $request->kategori_paket,
            'profit_percentase' => $request->profit_percentase,
            'modal_trading' => $request->modal_trading,
            'modal_trading_masuk_jam' => $request->modal_trading_masuk_jam,
            'profit_tahap_pertama' => $tahap1,
            'profit_tahap_kedua' => $tahap2,
            'profit_akhir' => $tahap3,
            'jam_tahap_pertama' => $masukJam->copy()->addHours(2)->format('H:i'),
            'jam_tahap_kedua' => $masukJam->copy()->addHours(4)->format('H:i'),
            'jam_akhir' => $masukJam->copy()->addHours(6)->format('H:i'),
            'total_profit' => $request->total_profit,
        ]);

        /**
         * =========================
         * HITUNG TOTAL PROFIT
         * =========================
         */


        return redirect()->back()->with('success', 'Transaksi berhasil disimpan');
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
