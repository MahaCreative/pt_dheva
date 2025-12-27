<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\WhatsAppSetting;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function index()
    {
        return inertia('Member/Member');
    }

    public function search(Request $request)
    {
        $members = Member::where('id_member', '=', $request->search)
            ->first();
        return response()->json($members);
    }

    public function show(Request $request, $id_member)
    {
        $member = Member::with('profit')->where('id_member', $id_member)->first();
        return inertia('Member/Show', compact('member'));
        dd($member);
    }

    public function penarikan_saldo(Request $request, $id_member)
    {
        $settingWa = WhatsAppSetting::first();
        $member = Member::where('id_member', $id_member)->first();
        SendMessageWa::send(
            [
                'target' => $settingWa->whatsapp,
                'message' => "Permintaan Penarikan Saldo dari Member:\n\nID Member: " . $member->id_member . "\nNama: " . $member->nama_member . "\nWhatsApp Member:" . $member->no_telp . "\n\nSegera proses permintaan ini."
            ]
        );
    }
}
