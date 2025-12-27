<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\WhatsAppSetting;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'User Admin',
            'email' => 'useradmin@gmail.com',
            'password' => bcrypt('de#VA#12345'),
        ]);

        WhatsAppSetting::create([
            'whatsapp' => '085334703299'
        ]);
    }
}
