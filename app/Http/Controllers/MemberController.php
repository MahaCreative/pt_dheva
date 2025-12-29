<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\User;
use App\Models\WhatsAppSetting;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function index($referal_code)
    {
        return inertia('Member/Member');
    }

    public function search(Request $request, $referal_code)
    {

        $members = Member::where('id_member', '=', $request->search)
            ->first();
        return response()->json($members);
    }

    public function show(Request $request, $referal_code, $id_member)
    {
        $member = Member::with('profit')->where('id_member', $id_member)->first();
        $user = User::where('id', $member->user_id)->first();
        $whatsApp = WhatsAppSetting::where('user_id', $user->id)->first();
        return inertia('Member/Show', compact('member', 'whatsApp'));
    }

    public function penarikan_saldo(Request $request, $referal_code, $id_member)
    {
        $member = Member::where('id_member', $id_member)->first();
        $user = User::where('id', $member->user_id)->first();
        $settingWa = WhatsAppSetting::where('user_id', $user->id)->first();

        // normalisasi nomor target: jika diawali 0 => ganti leading 0 menjadi +62
        $target = $settingWa->whatsapp ?? '';
        if (str_starts_with($target, '0')) {
            $target = '+62' . substr($target, 1);
        } elseif (!str_starts_with($target, '+') && str_starts_with($target, '62')) {
            // jika mulai dengan 62 tanpa plus, tambahkan +
            $target = '+' . $target;
        }

        SendMessageWa::send(
            [
                'target' => $target,
                'message' => "Permintaan Penarikan Saldo dari Member:\n\nID Member: " . $member->id_member . "\nNama: " . $member->nama_member . "\nWhatsApp Member:" . $member->no_telp . "\n\nSegera proses permintaan ini."
            ]
        );
    }
}
