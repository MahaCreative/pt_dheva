import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header({ user, onSettingsClick }) {
    const { auth } = usePage().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const menuItems = [
        { label: 'Home', href: '/', icon: HomeIcon },
        { label: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
        ...(auth.user.role == 'admin' ? [{ label: 'Users', href: '/users', icon: PeopleIcon }] : []),
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
                        <h1 className="font-oswald text-xl sm:text-2xl font-bold text-white">Dashboard</h1>
                        <p className="font-domine text-xs sm:text-sm text-blue-100">Selamat datang kembali</p>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-2 lg:gap-3">
                        {menuItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    as="button"
                                    className="rounded-md bg-white/10 px-3 sm:px-4 py-2 font-oswald text-xs sm:text-sm font-semibold text-white transition-all duration-200 hover:bg-white/20 hover:shadow-md backdrop-blur-sm flex items-center gap-2"
                                >
                                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="hidden sm:inline">{item.label}</span>
                                </Link>
                            );
                        })}
                        <button
                            onClick={onSettingsClick}
                            className="rounded-md bg-white/10 px-3 sm:px-4 py-2 font-oswald text-xs sm:text-sm font-semibold text-white transition-all duration-200 hover:bg-white/20 hover:shadow-md backdrop-blur-sm flex items-center gap-2"
                        >
                            <SettingsIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="rounded-md bg-red-500/80 px-3 sm:px-4 py-2 font-oswald text-xs sm:text-sm font-semibold text-white transition-all duration-200 hover:bg-red-600 hover:shadow-md flex items-center gap-2"
                        >
                            <LogoutIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition-all"
                    >
                        {isMenuOpen ? (
                            <CloseIcon className="w-6 h-6" />
                        ) : (
                            <MenuIcon className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div ref={menuRef} className="md:hidden border-t border-white/20 bg-blue-700/50 backdrop-blur-md">
                        <nav className="flex flex-col gap-2 px-4 py-3">
                            {menuItems.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        as="button"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="rounded-md bg-white/10 px-4 py-2.5 font-oswald text-sm font-semibold text-white text-left transition-all duration-200 hover:bg-white/20 flex items-center gap-3"
                                    >
                                        <IconComponent className="w-5 h-5" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                            <button
                                onClick={() => {
                                    onSettingsClick();
                                    setIsMenuOpen(false);
                                }}
                                className="rounded-md bg-white/10 px-4 py-2.5 font-oswald text-sm font-semibold text-white text-left transition-all duration-200 hover:bg-white/20 flex items-center gap-3"
                            >
                                <SettingsIcon className="w-5 h-5" />
                                Settings
                            </button>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                onClick={() => setIsMenuOpen(false)}
                                className="rounded-md bg-red-500/80 px-4 py-2.5 font-oswald text-sm font-semibold text-white text-left transition-all duration-200 hover:bg-red-600 flex items-center gap-3"
                            >
                                <LogoutIcon className="w-5 h-5" />
                                Logout
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
