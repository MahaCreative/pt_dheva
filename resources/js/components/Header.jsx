import { Link, usePage } from '@inertiajs/react';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import { useEffect, useRef, useState } from 'react';

export default function Header({ user, onSettingsClick }) {
    const { auth } = usePage().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const menuItems = [
        { label: 'Home', href: '/', icon: HomeIcon },
        { label: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
        ...(auth.user.role == 'admin' ? [{ label: 'Users', href: '/users', icon: PeopleIcon }] : [])
    ];

    // Handle outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isMenuOpen]);

    return (
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-3 sm:py-4">
                    {/* Logo / Title */}
                    <div className="flex-shrink-0">
                        <h1 className="font-oswald text-xl font-bold text-white sm:text-2xl">Dashboard</h1>
                        <p className="font-domine text-xs text-blue-100 sm:text-sm">Selamat datang kembali</p>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden items-center gap-2 md:flex lg:gap-3">
                        {menuItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    as="button"
                                    className="flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 font-oswald text-xs font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:shadow-md sm:px-4 sm:text-sm"
                                >
                                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                                    <span className="hidden sm:inline">{item.label}</span>
                                </Link>
                            );
                        })}
                        <button
                            onClick={onSettingsClick}
                            className="flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 font-oswald text-xs font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:shadow-md sm:px-4 sm:text-sm"
                        >
                            <SettingsIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex items-center gap-2 rounded-md bg-red-500/80 px-3 py-2 font-oswald text-xs font-semibold text-white transition-all duration-200 hover:bg-red-600 hover:shadow-md sm:px-4 sm:text-sm"
                        >
                            <LogoutIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="rounded-md bg-white/10 p-2 text-white transition-all hover:bg-white/20 md:hidden"
                    >
                        {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div ref={menuRef} className="border-t border-white/20 bg-blue-700/50 backdrop-blur-md md:hidden">
                        <nav className="flex flex-col gap-2 px-4 py-3">
                            {menuItems.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        as="button"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-3 rounded-md bg-white/10 px-4 py-2.5 text-left font-oswald text-sm font-semibold text-white transition-all duration-200 hover:bg-white/20"
                                    >
                                        <IconComponent className="h-5 w-5" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                            <button
                                onClick={() => {
                                    onSettingsClick();
                                    setIsMenuOpen(false);
                                }}
                                className="flex items-center gap-3 rounded-md bg-white/10 px-4 py-2.5 text-left font-oswald text-sm font-semibold text-white transition-all duration-200 hover:bg-white/20"
                            >
                                <SettingsIcon className="h-5 w-5" />
                                Settings
                            </button>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-3 rounded-md bg-red-500/80 px-4 py-2.5 text-left font-oswald text-sm font-semibold text-white transition-all duration-200 hover:bg-red-600"
                            >
                                <LogoutIcon className="h-5 w-5" />
                                Logout
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
