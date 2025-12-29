import { Link, usePage } from '@inertiajs/react';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import MuiIcon from './components/MuiIcon';
import data from './pages/data';

export default function Layout({ children }) {
    const { auth, referal_code } = usePage().props;
    const ref = useRef(null);
    const navRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        let x = 0;
        const interval = setInterval(() => {
            x -= 0.4;
            if (ref.current) {
                ref.current.style.transform = `translateX(${x}px)`;
            }
        }, 16);
        return () => clearInterval(interval);
    }, []);

    // Handle outside click to close menu
    useEffect(() => {
        function handleClickOutside(event) {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isMenuOpen]);

    const navItems = [
        { label: 'Home', href: `/${referal_code}/` },
        { label: 'Paket Trading', href: `/${referal_code}/paket-trading` },
        { label: 'Legalitas', href: `/${referal_code}/legalitas` },
        {
            label: 'Tentang Kami',
            children: [
                { label: 'Office', href: `/${referal_code}/office` },
                { label: 'Profil', href: `/${referal_code}/profil` },
                { label: 'Dasar Prinsip', href: `/${referal_code}/dasar-prinsip` }
            ]
        },
        { label: 'Pendaftaran', href: `/${referal_code}/pendaftaran-member` },
        { label: 'ID Member', href: `/${referal_code}/member-area` },
        auth.user ? { label: 'Dashboard', href: '/dashboard' } : { label: 'Login', href: '/login' }
    ];

    const [openDropdown, setOpenDropdown] = useState(null);

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-slate-950">
            {/* ================= BACKGROUND ================= */}
            <div className="fixed inset-0">
                <div className="absolute inset-0 bg-[url('/image/blog-signup-background.jpg')] bg-cover bg-center opacity-15" />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950" />
            </div>

            <div className="relative z-10 flex min-h-screen flex-col">
                {/* ================= HEADER ================= */}
                <motion.header
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="relative z-40 border-b border-white/10 bg-slate-900/80 shadow-xl backdrop-blur-xl"
                >
                    <div className="max-w-8xl mx-auto px-4" ref={navRef}>
                        <div className="flex items-center justify-between py-4">
                            <img src="/image/PT-DHERVA-INVESTINDO-14-1-20258.png" alt="Dherva Investindo" className="h-10 md:h-12" />

                            {/* STATUS */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="hidden items-center gap-2 rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-2 md:flex"
                            >
                                <span className="h-2 w-2 animate-pulse rounded-full bg-red-400" />
                                <span className="text-sm font-semibold text-red-300">CS OFFLINE</span>
                            </motion.div>

                            {/* MOBILE BUTTON */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="rounded-lg bg-slate-800 p-2 text-white transition-colors hover:bg-slate-700 md:hidden"
                            >
                                {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                            </button>
                        </div>

                        {/* ================= NAV ================= */}
                        <AnimatePresence>
                            {(isMenuOpen || window.innerWidth >= 768) && (
                                <motion.nav
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.35 }}
                                    className="flex flex-col border-t border-white/10 md:flex-row"
                                >
                                    {navItems.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            {item.children ? (
                                                <div
                                                    onMouseEnter={() => setOpenDropdown(i)}
                                                    onMouseLeave={() => setOpenDropdown(null)}
                                                    className="relative"
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                                                        className="group relative block w-full px-4 py-4 text-left text-sm font-semibold text-gray-200 uppercase transition hover:text-amber-400"
                                                    >
                                                        {item.label}
                                                        <span className="absolute bottom-2 left-4 h-[2px] w-0 bg-amber-400 transition-all group-hover:w-6" />
                                                    </button>

                                                    {/* Dropdown */}
                                                    {openDropdown === i && (
                                                        <div className="absolute top-10 left-0 z-[999] mt-1 w-52 rounded bg-slate-800/90 shadow-lg md:mt-2">
                                                            {item.children.map((c, idx) => (
                                                                <Link
                                                                    key={idx}
                                                                    href={c.href}
                                                                    onClick={() => setIsMenuOpen(false)}
                                                                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-amber-400 hover:text-slate-900"
                                                                >
                                                                    {c.label}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <Link
                                                    href={item.href}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="group relative block px-4 py-4 text-sm font-semibold text-gray-200 uppercase transition hover:text-amber-400"
                                                >
                                                    {item.label}
                                                    <span className="absolute bottom-2 left-4 h-[2px] w-0 bg-amber-400 transition-all group-hover:w-6" />
                                                </Link>
                                            )}
                                        </motion.div>
                                    ))}
                                </motion.nav>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.header>

                {/* ================= TICKER ================= */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="z-10 border-b border-white/10 bg-black/40 py-2 backdrop-blur"
                >
                    <div ref={ref} className="font-domine text-sm whitespace-nowrap text-gray-300">
                        {data}
                    </div>
                </motion.div>

                {/* ================= CONTENT ================= */}
                <main className="flex-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-10xl mx-auto px-4 py-10"
                    >
                        {children}
                    </motion.div>
                </main>

                {/* ================= FOOTER ================= */}
                <footer className="border-t border-white/10 bg-slate-900/80 backdrop-blur-xl">
                    <div className="mx-auto max-w-7xl px-4 py-14">
                        {/* PARTNERS */}
                        <div className="mb-14 grid grid-cols-2 gap-8 md:grid-cols-4">
                            {[
                                {
                                    img: '/image/Logo Kementerian Keuangan Indonesia (Kemenkeu) (PNG-240px) - FileVector69.png',
                                    title: 'KEMENKEU',
                                    desc: 'Kementerian Keuangan Republik Indonesia'
                                },
                                {
                                    img: '/image/PngItem_1528431.png',
                                    title: 'LPS',
                                    desc: 'Lembaga Penjamin Simpanan'
                                },
                                {
                                    img: '/image/unnamed-1084x542-696x348.png',
                                    title: 'BAPPEBTI',
                                    desc: 'Pengawas Perdagangan Berjangka Komoditi'
                                },
                                {
                                    img: '/image/LOGO PNG.png',
                                    title: 'DHERVA',
                                    desc: 'PT. Dherva Investindo',
                                    accent: true
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -6 }}
                                    transition={{ duration: 0.4 }}
                                    className={`rounded-2xl p-6 text-center shadow-xl ${
                                        item.accent ? 'border border-amber-400/40 bg-slate-800/70' : 'border border-white/10 bg-white/5'
                                    }`}
                                >
                                    {item.img && <img src={item.img} className="mx-auto mb-4 h-16" />}
                                    <h3 className="font-oswald text-xl font-bold text-white">{item.title}</h3>
                                    <p className="mt-1 text-xs text-gray-400">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* INFO */}
                        <div className="grid grid-cols-1 gap-8 border-t border-white/10 pt-10 md:grid-cols-3">
                            <Info title="Tentang Kami">
                                PT. Dherva Investindo adalah platform investasi terpercaya dengan sistem trading profesional.
                            </Info>
                            <Info title="Kontak">
                                <MuiIcon name="phone" /> CS 24/7
                                <br />
                                📧 info@dherva.com
                            </Info>
                            <Info title="Jam Operasional">
                                Senin - Jumat: 09.00 - 17.00 WIB
                                <br />
                                Weekend: Tutup
                            </Info>
                        </div>

                        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
                            © 2025 PT. Dherva Investindo — Designed with 💙
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

function Info({ title, children }) {
    return (
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h4 className="mb-3 font-oswald text-sm font-bold text-amber-400">{title}</h4>
            <p className="font-domine text-xs text-gray-400">{children}</p>
        </motion.div>
    );
}
