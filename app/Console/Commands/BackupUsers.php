<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class BackupUsers extends Command
{
    protected $signature = 'db:backup-users';
    protected $description = 'Backup tabel users dan whatsapp settings';

    public function handle()
    {
        // Ambil data
        $users = DB::table('users')->get();
        $whatsApp = DB::table('whats_app_settings')->get();

        if ($users->isEmpty() && $whatsApp->isEmpty()) {
            $this->warn('Tidak ada data untuk dibackup');
            return Command::FAILURE;
        }

        // Folder backup
        $path = storage_path('app/backup');
        File::ensureDirectoryExists($path);

        $timestamp = now()->format('Ymd_His');

        // File users
        if (!$users->isEmpty()) {
            $usersFile = $path . "/users_backup_{$timestamp}.json";
            File::put($usersFile, json_encode($users, JSON_PRETTY_PRINT));
            $this->info('Backup users berhasil: ' . basename($usersFile));
        }

        // File WhatsApp settings
        if (!$whatsApp->isEmpty()) {
            $waFile = $path . "/whatsapp_settings_backup_{$timestamp}.json";
            File::put($waFile, json_encode($whatsApp, JSON_PRETTY_PRINT));
            $this->info('Backup WhatsApp settings berhasil: ' . basename($waFile));
        }

        return Command::SUCCESS;
    }
}
