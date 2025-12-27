<?php

namespace App\Http\Controllers;

use App\Models\WhatsAppSetting;
use Illuminate\Http\Request;

class SettingWA extends Controller
{
    public function store(Request $request)
    {

        $wa = WhatsAppSetting::first();
        $wa->update(['whatsapp' => $request->whatsapp]);
    }
}
