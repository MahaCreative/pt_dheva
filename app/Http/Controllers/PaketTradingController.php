<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaketTradingController extends Controller
{
    public function index()
    {
        return inertia('PaketTrading');
    }
}
