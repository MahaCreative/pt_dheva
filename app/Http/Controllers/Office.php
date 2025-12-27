<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Office extends Controller
{
    public function index()
    {
        return inertia('Office');
    }
}
