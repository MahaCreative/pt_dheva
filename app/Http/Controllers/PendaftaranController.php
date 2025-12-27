<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Profit;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Controllers\SendMessageWa;
use App\Models\WhatsAppSetting;

class PendaftaranController extends Controller
{
    private function generateMemberId()
    {
        do {
            $id = strtoupper(Str::random(8)); // A-Z & 0-9
        } while (\App\Models\Member::where('id_member', $id)->exists());

        return $id;
    }
    public function index()
    {
        return inertia('Pendaftaran');
    }

    public function store(Request $request)
    {
        $whatsApp = WhatsAppSetting::first();
        // dd($request->all());
        $request->validate([
            'nama_member'      => 'required|string|max:255',
            'nik'              => 'required|numeric',
            'email'            => 'required|email',
            'no_telp'          => 'required|numeric|min_digits:11',
            'jenis_kelamin'    => 'required|in:Laki-laki,Perempuan',
            'tempat_lahir'     => 'nullable|string|max:100',
            'tanggal_lahir'    => 'required|date',
            'provinsi'         => 'required|string|max:100',
            'kota'             => 'required|string|max:100',
            'alamat_lengkap'   => 'nullable|string',
            'kode_pos'         => 'nullable|numeric',
            'pekerjaan'        => 'required|string|max:100',
            'sumber_dana'      => 'nullable|string|max:100',
            'nama_rekening'    => 'required|string|max:255',
            'nomor_rekening'   => 'required|numeric|min_digits:6',
            'nama_bank'        => 'required|string|max:100',
        ]);

        $member = Member::create([
            'id_member'       => $this->generateMemberId(),
            'nama_member'     => $request->nama_member,
            'nik'             => $request->nik,
            'email'           => $request->email,
            'no_telp'         => $request->no_telp,
            'jenis_kelamin'   => $request->jenis_kelamin,
            'tempat_lahir'    => $request->tempat_lahir,
            'tanggal_lahir'   => $request->tanggal_lahir,
            'provinsi'        => $request->provinsi,
            'kota'            => $request->kota,
            'alamat_lengkap'  => $request->alamat_lengkap,
            'kode_pos'        => $request->kode_pos,
            'pekerjaan'       => $request->pekerjaan,
            'sumber_dana'     => $request->sumber_dana,
            'nama_rekening'   => $request->nama_rekening,
            'nomor_rekening'  => $request->nomor_rekening,
            'nama_bank'       => $request->nama_bank,
        ]);

        Profit::create([
            'id_member' => $member->id,
        ]);
        $message = "
Halo Admin, Terdapat 1 Pendaftaran Baru Dengan Informasi Berikut Ini
Nama: {$member->nama_member}
No. Telp: {$member->no_telp}
Kota: {$member->kota}
Pekerjaan: {$member->pekerjaan}
ID Member: {$member->id_member}
        ";
        SendMessageWa::send(
            [
                'target' => $whatsApp->whatsapp,
                'message' => $message,
            ]
        );

        return redirect()->back()->with('success', 'Pendaftaran berhasil');
    }
}
