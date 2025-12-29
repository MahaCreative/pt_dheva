<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\WhatsAppSetting;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    private function generateMemberId()
    {
        do {
            $id = strtoupper(Str::random(8)); // A-Z & 0-9
        } while (\App\Models\Member::where('id_member', $id)->exists());

        return $id;
    }

    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'User Admin',
            'email' => 'useradmin@gmail.com',
            'password' => bcrypt('de#VA#12345'),
            'role' => 'admin',
            'referal_code' => $this->generateMemberId(),
            'link' => 'http://127.0.0.1:8000'
        ]);

        WhatsAppSetting::create([
            'user_id' => 1,
            'whatsapp' => '085334703291'
        ]);
    }
}
