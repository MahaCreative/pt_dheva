import { Link } from '@inertiajs/react';
import MuiIcon from './MuiIcon';

export default function Sidebar({ isOpen, setIsOpen }) {
    const menuItems = [
        { icon: 'home', label: 'Home', href: '/' },
        { icon: 'chart', label: 'Dashboard', href: '/admin' },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 left-6 z-50 rounded-full bg-blue-600 p-3 text-white shadow-lg md:hidden"
            >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 h-full ${isOpen ? 'w-1/2' : 'w-0 md:w-64'} overflow-hidden bg-blue-900 text-white shadow-xl transition-transform duration-300 ease-in-out md:translate-x-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Logo Area */}
                <div className="border-b border-blue-700 px-6 py-8">
                    <h1 className="font-oswald text-2xl font-bold">DHERVA</h1>
                    <p className="text-xs text-blue-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Investasi Platform
                    </p>
                </div>

                {/* Menu Items */}
                <nav className="px-4 py-6">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 hover:bg-orange-600 hover:shadow-lg"
                        >
                            <span className="text-xl text-white">
                                <MuiIcon name={item.icon} fontSize="small" />
                            </span>
                            <span className="font-oswald text-sm font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Footer */}
                <div className="absolute right-0 bottom-0 left-0 border-t border-blue-700 bg-blue-950 px-6 py-4">
                    <p className="text-xs text-blue-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                        © 2025 PT. Dherva Investindo
                    </p>
                </div>
            </aside>
        </>
    );
}
