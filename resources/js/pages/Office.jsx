import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Layout from '../Layout';

export default function Office() {
    return (
        <>
            <Head>
                <title>Office - PT Dherva Investindo</title>
                <meta
                    name="description"
                    content="Alamat kantor dan kontak resmi PT Dherva Investindo. Virtual office di Indonesia dan headquarters di Singapore."
                />
                <meta name="keywords" content="Dherva Investindo, kantor, alamat, kontak, investasi" />
                <meta name="robots" content="index,follow" />
            </Head>

            <div className="bg-slate-50 py-12">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                        <div>
                            <motion.h1
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="mb-4 text-4xl font-extrabold text-emerald-800"
                            >
                                Kantor & Hubungi Kami
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-lg text-slate-700"
                            >
                                PT Dherva Investindo adalah Manajer Investasi independen. Izin Manajer Investasi: <strong>KEP-09/BL/MI/2015</strong>.
                                Semua kebijakan investasi dijalankan tanpa konflik kepentingan.
                            </motion.p>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-lg bg-gradient-to-br from-emerald-50 to-white p-5 shadow">
                                    <h4 className="text-sm font-semibold text-emerald-600">Virtual Office (Indonesia)</h4>
                                    <p className="mt-2 text-sm text-slate-700">
                                        Batamindo Industrial Park, Jl. S. Parman No. Kav. 160, Sei Beduk, Batam
                                    </p>
                                </div>
                                <div className="rounded-lg bg-gradient-to-br from-orange-50 to-white p-5 shadow">
                                    <h4 className="text-sm font-semibold text-orange-600">Headquarters (Singapore)</h4>
                                    <p className="mt-2 text-sm text-slate-700">Eu Tong Sen Street, #58-05/27 The Central Singapore - 593879</p>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-4">
                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-white shadow hover:bg-sky-500"
                                >
                                    Hubungi Kami
                                </a>
                                <a href="/image/OFFICE.png" target="_blank" rel="noreferrer" className="text-sm text-slate-600 hover:underline">
                                    Lihat foto kantor
                                </a>
                            </div>
                        </div>

                        <motion.div
                            initial={{ scale: 0.98, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center justify-center"
                        >
                            <img src="/image/OFFICE.png" alt="Office" className="w-full max-w-md rounded-lg object-cover shadow-lg" />
                        </motion.div>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <motion.div whileHover={{ y: -6 }} className="rounded-xl bg-gradient-to-br from-emerald-50 to-white p-6 shadow">
                            <h3 className="text-lg font-semibold text-emerald-700">Investasi</h3>
                            <p className="mt-2 text-sm text-slate-600">
                                Penanaman modal jangka panjang untuk memperoleh keuntungan melalui saham dan surat berharga lainnya.
                            </p>
                        </motion.div>
                        <motion.div whileHover={{ y: -6 }} className="rounded-xl bg-gradient-to-br from-orange-50 to-white p-6 shadow">
                            <h3 className="text-lg font-semibold text-orange-700">Pengelolaan Investasi</h3>
                            <p className="mt-2 text-sm text-slate-600">
                                Perumusan kebijakan, pengawasan, dan pelaksanaan investasi oleh tim profesional.
                            </p>
                        </motion.div>
                        <motion.div whileHover={{ y: -6 }} className="rounded-xl bg-gradient-to-br from-emerald-50 to-white p-6 shadow">
                            <h3 className="text-lg font-semibold text-emerald-600">Kebijakan</h3>
                            <p className="mt-2 text-sm text-slate-600">Tidak memiliki kantor cabang; semua transaksi dikelola oleh kantor pusat.</p>
                        </motion.div>
                    </div>

                    <div className="mt-10">
                        <iframe
                            scrolling="no"
                            allowTransparency="true"
                            frameBorder={0}
                            src="https://www.tradingview-widget.com/embed-widget/ticker-tape/?locale=id#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22OANDA%3ASPX500USD%22%2C%22title%22%3A%22S%26P%20500%22%7D%2C%7B%22proName%22%3A%22OANDA%3ANAS100USD%22%2C%22title%22%3A%22Nasdaq%20100%22%7D%2C%7B%22proName%22%3A%22FX_IDC%3AEURUSD%22%2C%22title%22%3A%22EUR%2FUSD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3ABTCUSD%22%2C%22title%22%3A%22BTC%2FUSD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3AETHUSD%22%2C%22title%22%3A%22ETH%2FUSD%22%7D%5D%2C%22colorTheme%22%3A%22light%22%2C%22isTransparent%22%3Afalse%2C%22displayMode%22%3A%22adaptive%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A78%2C%22utm_source%22%3A%22www.dhervainvestindo.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22ticker-tape%22%2C%22page-uri%22%3A%22www.dhervainvestindo.com%2Fp%2Foffice.html%22%7D"
                            title="ticker tape TradingView widget"
                            lang="en"
                            style={{
                                userSelect: 'none',
                                boxSizing: 'border-box',
                                display: 'block',
                                height: 46,
                                width: '100%'
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

Office.layout = (page) => <Layout children={page} />;
