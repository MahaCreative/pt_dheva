import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Layout from '../Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import MuiIcon from '../components/MuiIcon';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};
export default function Home() {
    return (
        <>
            <Head>
                <title>Home - PT Dherva Investindo</title>
                <meta
                    name="description"
                    content="PT Dherva Investindo — platform investasi terpercaya untuk trading forex dengan profit bertahap dan diawasi OJK."
                />
                <meta name="keywords" content="Dherva Investindo, investasi, trading forex, manajer investasi, OJK" />
                <meta name="robots" content="index,follow" />
                <meta property="og:title" content="PT Dherva Investindo - Investasi Cerdas" />
                <meta property="og:description" content="Platform investasi terpercaya, profit bertahap, aman dan diawasi OJK." />
                <meta property="og:image" content="/image/PT-DHERVA-INVESTINDO-14-1-20258.png" />
            </Head>

            <div className="space-y-12">
                {/* Hero Section */}
                <div className="mb-12 text-center text-blue-800">
                    <h1 className="mb-4 font-oswald text-xl font-bold text-white md:text-3xl">Investasi Cerdas untuk Masa Depan Cerah</h1>
                    <p className="mx-auto mb-8 max-w-2xl font-domine text-sm text-blue-700 text-white md:text-xl">
                        Platform investasi terpercaya dengan profit yang kompetitif dan sistem keamanan tingkat bank
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/pendaftaran-member">
                            <Button variant="primary" size="lg">
                                <MuiIcon name="rocket" className="mr-2 inline-block" /> Daftar Sekarang
                            </Button>
                        </Link>
                        <Link href="/paket-trading">
                            <Button variant="outline" size="lg" className="border-blue-200 text-white hover:bg-blue-500">
                                <MuiIcon name="chart" className="mr-2 inline-block" /> Lihat Paket
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Promotional Content */}
                <Card title="Presentasi Platform" className="w-full" icon={<MuiIcon name="movie" />}>
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

                    <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                        <iframe
                            className="absolute inset-0 h-full w-full rounded-lg border-none outline-none"
                            loading="lazy"
                            allow="fullscreen"
                            allowFullScreen={true}
                            src="https://www.canva.com/design/DAG8uWqDuTY/FWuWqoti01g-C_4_RRL8dg/view?embed"
                        />
                    </div>
                </Card>

                {/* Video Section */}
                {/* <Card title="Video Testimoni" subtitle="Dengarkan kisah sukses para investor kami" icon={<MuiIcon name="movie" />}>
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg bg-black">
                    <video
                        className="absolute inset-0 h-full w-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        src="/image/684564549b55b62b5a5358f2.mp4"
                    />
                </div>
            </Card> */}

                {/* Market Ticker */}
                <Card title="Ticker Pasar Realtime" icon={<MuiIcon name="chart" />}>
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

                    <div className="space-y-16">
                        {/* ================= HERO ================= */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.7 }}
                            className="relative overflow-hidden rounded-3xl bg-white p-10 shadow-[0_30px_90px_rgba(0,0,0,0.06)]"
                        >
                            <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />
                            <div className="absolute bottom-0 -left-32 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />

                            <h1 className="font-oswald text-base leading-tight font-bold text-blue-800 md:text-2xl md:text-5xl">
                                BISNIS TRADING DENGAN PROFIT BERJENJANG
                                <br />
                                DAN BERANI TAMPIL BEDA
                            </h1>

                            <div className="mt-6 max-w-4xl space-y-4 font-domine text-sm leading-relaxed text-blue-700 md:text-xl">
                                <p>
                                    <strong>PT. Dherva Investindo</strong> mempersembahkan layanan bisnis trading yang mudah, aman, dan terpercaya.
                                    Anda hanya menunggu hasil sesuai sistem bagi hasil yang telah ditetapkan.
                                </p>
                                <p>
                                    PT. Dherva Investindo menjalankan usahanya secara mandiri dan terpisah sebagai perusahaan manajer trading yang
                                    profesional dan inovatif. Visi kami adalah menjadi perusahaan manajer trading terkemuka di pasar regional.
                                </p>
                            </div>
                        </motion.div>

                        {/* ================= KEUNTUNGAN ================= */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {[
                                {
                                    title: 'Profit Bertahap',
                                    desc: 'Pencairan profit dilakukan secara bertahap setiap 2 jam.',
                                    icon: 'timer'
                                },
                                {
                                    title: 'Modal Aman',
                                    desc: 'Modal kembali bersamaan dengan profit pada akhir kontrak.',
                                    icon: 'wallet'
                                },
                                {
                                    title: 'Pencairan Tepat Waktu',
                                    desc: 'Proses pencairan cepat sesuai waktu yang telah ditentukan.',
                                    icon: 'bolt'
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.15 }}
                                    whileHover={{ y: -8 }}
                                    className="relative rounded-2xl bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_35px_90px_rgba(0,0,0,0.2)]"
                                >
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg">
                                        <MuiIcon name={item.icon} fontSize="large" />
                                    </div>
                                    <h3 className="font-oswald text-lg font-bold text-blue-900 md:text-2xl">{item.title}</h3>
                                    <p className="mt-2 font-domine text-xs text-blue-950 md:text-lg">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* ================= SKEMA ================= */}
                        <Card
                            title="Skema Pencairan"
                            subtitle="Sistem pencairan profit setiap paket trading"
                            className="rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.3)]"
                        >
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                {[
                                    { paket: 'PAKET A', profit: '15%' },
                                    { paket: 'PAKET B', profit: '20%' },
                                    { paket: 'PAKET C', profit: '25%' }
                                ].map((p, i) => (
                                    <motion.div
                                        key={i}
                                        variants={fadeUp}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.15 }}
                                        whileHover={{ y: -10 }}
                                        className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.1)]"
                                    >
                                        <div className="h-2 bg-gradient-to-r from-blue-600 to-orange-500" />

                                        <div className="p-6">
                                            <h3 className="event:text-blue-900 font-oswald text-xl font-bold odd:text-orange-500 md:text-2xl">
                                                {p.paket}
                                            </h3>

                                            <div className="mt-4 space-y-3 font-domine text-base text-blue-700 md:text-xl">
                                                <div className="flex items-center gap-2">
                                                    <MuiIcon fontSize="large" name="trending" className="text-lg text-orange-500 md:text-2xl" />
                                                    Profit {p.profit} per 2 jam
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MuiIcon fontSize="large" name="repeat" className="text-lg text-orange-600 md:text-2xl" />
                                                    Maksimal 3 kali pencairan
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MuiIcon fontSize="large" name="wallet" className="text-lg text-orange-700 md:text-2xl" />
                                                    Modal & profit cair di akhir kontrak
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </Card>

                        {/* ================= CTA ================= */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative overflow-hidden rounded-3xl bg-blue-50 p-8 text-blue-800 shadow-[0_35px_100px_rgba(0,0,0,0.06)]"
                        >
                            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-orange-400/30 blur-3xl" />

                            <p className="max-w-3xl font-domine text-base leading-relaxed md:text-xl">
                                <strong>Segera Join</strong> bersama PT Dherva Investindo Trading Forex penghasil uang. Anda hanya melakukan deposit
                                dan menunggu per 2 jam penghasilan masuk secara instan ke rekening Anda tanpa melakukan aktivitas apapun.
                            </p>

                            <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center gap-3">
                                    <MuiIcon name="shield" className="text-lg text-orange-400 md:text-2xl" />
                                    <div>
                                        <p className="font-semibold">Terdaftar dan diawasi oleh</p>
                                        <p className="text-lg font-bold">OJK – Otoritas Jasa Keuangan</p>
                                    </div>
                                </div>

                                <div className="rounded-xl bg-blue-900 px-6 py-3 text-center font-oswald text-xs font-bold text-orange-500 shadow-lg md:text-base">
                                    SEMAKIN BESAR MODAL ANDA
                                    <br />
                                    SEMAKIN BESAR PROFIT ANDA TERIMA
                                </div>
                            </div>
                        </motion.div>
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
                </Card>

                {/* Why Choose Us */}
                <div>
                    <h2 className="mb-8 text-center font-oswald text-lg font-bold text-white md:text-2xl"> Mengapa Memilih Kami?</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {[
                            {
                                icon: 'trophy',
                                title: 'Terpercaya',
                                desc: 'Terdaftar dan diawasi oleh lembaga keuangan resmi Indonesia'
                            },
                            {
                                icon: 'money',
                                title: 'Profit Tinggi',
                                desc: 'Return investasi yang kompetitif dan transparan'
                            },
                            {
                                icon: 'security',
                                title: 'Aman',
                                desc: 'Sistem keamanan berlapis dengan enkripsi tingkat bank'
                            },
                            {
                                icon: 'bolt',
                                title: 'Cepat',
                                desc: 'Proses deposit dan penarikan dalam hitungan menit'
                            },
                            {
                                icon: 'phone',
                                title: 'Support Profesional',
                                desc: 'Tim customer service siap membantu 24 jam setiap hari'
                            },
                            {
                                icon: 'trending',
                                title: 'Transparan',
                                desc: 'Laporan lengkap dan real-time untuk setiap transaksi Anda'
                            }
                        ].map((item, index) => (
                            <Card key={index} className="bg-white">
                                <div className="text-center text-blue-800">
                                    <div className="mb-3 text-lg md:text-2xl">
                                        <MuiIcon name={item.icon} />
                                    </div>
                                    <h3 className="mb-2 font-oswald text-lg font-bold md:text-2xl">{item.title}</h3>
                                    <p className="font-domine text-lg text-blue-600">{item.desc}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Final CTA */}
                <div className="rounded-xl bg-orange-100 p-8 text-center text-blue-800">
                    <h2 className="mb-3 font-oswald text-base font-bold md:text-xl">Siap Memulai Investasi Anda?</h2>
                    <p className="mb-6 font-domine text-xs md:text-base">
                        Bergabunglah dengan ribuan investor sukses dan raih keuntungan konsisten bersama kami
                    </p>
                    <Link href="/pendaftaran-member">
                        <Button variant="secondary" size="lg" className="bg-white hover:bg-blue-500">
                            💎 Daftar Sekarang - Gratis
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}

Home.layout = (page) => <Layout>{page}</Layout>;
