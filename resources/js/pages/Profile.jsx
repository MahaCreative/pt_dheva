import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Layout from '../Layout';

export default function Profile() {
    return (
        <>
            <Head>
                <title>Tentang - PT Dherva Investindo</title>
                <meta name="description" content="Profil PT Dherva Investindo — visi, misi, dan pengalaman manajer investasi sejak 1999." />
                <meta name="keywords" content="Dherva Investindo, profil, visi, misi, pengalaman" />
                <meta name="robots" content="index,follow" />
            </Head>

            <div className="bg-gradient-to-b from-white to-slate-50 py-12">
                <div className="mx-auto max-w-5xl px-4">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                        <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="h-1/2 w-full lg:w-1/3">
                            <img src="/image/PROFILE.jpg" alt="Profile" className="h-full rounded-xl object-cover shadow-lg" />
                        </motion.div>

                        <div className="w-full lg:w-2/3">
                            <motion.h1 initial={{ y: -6 }} animate={{ y: 0 }} className="text-4xl font-bold text-emerald-700">
                                Tentang PT Dherva Investindo
                            </motion.h1>
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }} className="mt-3 text-slate-700">
                                PT Dherva Investindo adalah manajer investasi yang menyediakan solusi investasi profesional sejak 1999. Kami berfokus
                                pada pencapaian tujuan investasi nasabah melalui strategi yang disiplin, integritas, dan tim berpengalaman.
                            </motion.p>

                            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                                <div className="rounded-lg bg-gradient-to-br from-emerald-50 to-white p-4 text-center shadow">
                                    <div className="text-2xl font-bold text-emerald-700">1999</div>
                                    <div className="text-sm text-slate-500">Berdiri</div>
                                </div>
                                <div className="rounded-lg bg-gradient-to-br from-orange-50 to-white p-4 text-center shadow">
                                    <div className="text-2xl font-bold text-orange-700">15+</div>
                                    <div className="text-sm text-slate-500">Tahun Pengalaman</div>
                                </div>
                                <div className="rounded-lg bg-gradient-to-br from-emerald-50 to-white p-4 text-center shadow">
                                    <div className="text-2xl font-bold text-emerald-600">Discretionary</div>
                                    <div className="text-sm text-slate-500">Pengelolaan Dana</div>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div>
                                    <h4 className="text-lg font-semibold text-emerald-700">Visi</h4>
                                    <p className="text-sm text-slate-600">Menjadi pilihan utama nasabah sebagai pengelola investasi terpercaya.</p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-orange-700">Misi</h4>
                                    <p className="text-sm text-slate-600">
                                        Memberikan hasil investasi yang optimal dengan integritas dan kehati-hatian.
                                    </p>
                                </div>
                            </div>
                        </div>
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

Profile.layout = (page) => <Layout children={page} />;
