import { Link } from '@inertiajs/react';

export default function Header({ user, onSettingsClick }) {
    return (
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-md">
            <div className="flex items-center justify-between px-6 py-4">
                <div>
                    <h1 className="font-oswald text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="font-domine text-sm text-gray-600">Selamat datang kembali</p>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href="/"
                        as="button"
                        className="rounded-lg bg-blue-500 px-4 py-2.5 font-oswald text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg"
                    >
                        Home
                    </Link>
                    <button
                        onClick={onSettingsClick}
                        className="rounded-lg bg-blue-500 px-4 py-2.5 font-oswald text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg"
                    >
                        ⚙️ Settings
                    </button>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="rounded-lg bg-orange-50 px-4 py-2.5 font-oswald text-sm font-semibold text-orange-600 transition-all hover:bg-orange-100 hover:shadow-lg"
                    >
                        🚪 Logout
                    </Link>
                </div>
            </div>
        </header>
    );
}
