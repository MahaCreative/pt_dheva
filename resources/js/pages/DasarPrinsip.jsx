import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Layout from '../Layout';

export default function DasarPrinsip() {
    return (
        <>
            <Head>
                <title>Dasar Prinsip & Kode Etik - PT Dherva Investindo</title>
                <meta
                    name="description"
                    content="Dasar prinsip, kebijakan, dan kode etik PT Dherva Investindo. Independensi dan komitmen integritas."
                />
                <meta name="keywords" content="kode etik, dasar prinsip, Dherva Investindo, manajer investasi" />
                <meta name="robots" content="index,follow" />
            </Head>

            <div className="bg-white py-12">
                <div className="mx-auto max-w-5xl px-4">
                    <motion.h1 initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-4 text-3xl font-bold text-emerald-700">
                        Dasar Prinsip & Kode Etik
                    </motion.h1>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-700">
                        PT Dherva Investindo adalah perusahaan manajer investasi yang independen dan tidak terafiliasi dengan perusahaan pialang
                        maupun penjamin emisi, sehingga kebijakan investasinya bebas dari konflik kepentingan.
                    </motion.p>

                    <div className="mt-6 rounded-lg bg-gradient-to-br from-emerald-50 to-white p-6 shadow">
                        <h3 className="mb-2 text-lg font-semibold text-emerald-700">Kode Etik</h3>
                        <p className="mb-4 text-sm text-slate-600">Silakan unduh atau lihat pratinjau dokumen kode etik kami.</p>

                        <div className="flex items-center gap-3">
                            <a
                                href="/KODE_ETIK_MANAJER_INVESTASI_PT_ONEWAY_INDONESIA111.pdf"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-md bg-orange-600 px-4 py-2 text-white hover:bg-orange-500"
                            >
                                Unduh PDF
                            </a>
                            <a href="#preview" className="text-sm text-orange-600 hover:underline">
                                Lihat pratinjau
                            </a>
                        </div>
                    </div>

                    <div id="preview" className="mt-6 h-[70vh]">
                        <iframe
                            src={'/KODE_ETIK_MANAJER_INVESTASI_PT_ONEWAY_INDONESIA111.pdf'}
                            title="PDF Preview"
                            className="h-full w-full rounded-lg shadow"
                        />
                    </div>

                    <div className="mt-8">
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

DasarPrinsip.layout = (page) => <Layout children={page} />;
