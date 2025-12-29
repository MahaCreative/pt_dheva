<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class RestoreUsers extends Command
{
    protected $signature = 'db:restore-users {timestamp?}';
    protected $description = 'Restore users dan whatsapp settings dari file backup';

    public function handle()
    {
        $path = storage_path('app/backup');

        if (!File::exists($path)) {
            $this->error('Folder backup tidak ditemukan');
            return Command::FAILURE;
        }

        // Cari file berdasarkan timestamp
        $timestamp = $this->argument('timestamp');

        if ($timestamp) {
            $usersFile = "$path/users_backup_{$timestamp}.json";
            $waFile = "$path/whatsapp_settings_backup_{$timestamp}.json";
        } else {
            // Ambil file terbaru
            $usersFile = collect(File::files($path))
                ->filter(fn($f) => str_contains($f->getFilename(), 'users_backup_'))
                ->sortByDesc(fn($f) => $f->getMTime())
                ->first();

            $waFile = collect(File::files($path))
                ->filter(fn($f) => str_contains($f->getFilename(), 'whatsapp_settings_backup_'))
                ->sortByDesc(fn($f) => $f->getMTime())
                ->first();
        }

        if (!$usersFile || !$waFile) {
            $this->error('File backup tidak ditemukan');
            return Command::FAILURE;
        }

        $this->warn('Memulai restore database...');
        DB::beginTransaction();

        try {
            // Kosongkan tabel (AMAN)
            DB::table('users')->truncate();
            DB::table('whats_app_settings')->truncate();

            // Restore users
            $users = json_decode(File::get($usersFile), true);
            foreach ($users as $user) {
                DB::table('users')->insert($user);
            }

            // Restore WhatsApp
            $wa = json_decode(File::get($waFile), true);
            foreach ($wa as $row) {
                DB::table('whats_app_settings')->insert($row);
            }

            DB::commit();
            $this->info('Restore BERHASIL 🎉');
        } catch (\Throwable $e) {
            DB::rollBack();
            $this->error('Restore GAGAL: ' . $e->getMessage());
            return Command::FAILURE;
        }

        return Command::SUCCESS;
    }
}
