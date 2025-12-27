<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $guarded = [];

    public function profit()
    {
        return $this->hasMany(Profit::class, 'id_member', 'id');
    }
}
