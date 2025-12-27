import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Layout from '../Layout';

const legalitasData = [
    {
        id: 1,
        link: 'POJK Nomor 01/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Pemeringkat Efek',
        pdfUrl: '/1-Converted-converted.pdf'
    },
    {
        id: 2,
        link: 'POJK Nomor 02/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Perandar Surat Berharga',
        pdfUrl: '/2-Converted-converted.pdf'
    },
    {
        id: 3,
        link: 'POJK Nomor 03/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Penyelenggara Layanan Alat Pengindeks Konstituen',
        pdfUrl: '/3-Converted-converted.pdf'
    },
    {
        id: 4,
        link: 'POJK Nomor 04/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Penyelenggara Layanan Perdagangan Alternatif',
        pdfUrl: '/4-Converted-converted.pdf'
    },
    {
        id: 5,
        link: 'POJK Nomor 05/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Pialang Berjangka',
        pdfUrl: '/5-Converted-converted.pdf'
    },
    {
        id: 6,
        link: 'POJK Nomor 06/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Perwalian',
        pdfUrl: '/6-Converted-converted.pdf'
    },
    {
        id: 7,
        link: 'POJK Nomor 07/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Wali Amanah',
        pdfUrl: '/7-Converted-converted.pdf'
    },
    {
        id: 8,
        link: 'POJK Nomor 08/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Penyelenggara Layanan Agen Penjualan',
        pdfUrl: '/8-Converted-converted.pdf'
    },
    {
        id: 9,
        link: 'POJK Nomor 09/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Penasehat Investasi',
        pdfUrl: '/9-Converted-converted.pdf'
    },
    {
        id: 10,
        link: 'POJK Nomor 10/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Penjamin Emisi Efek',
        pdfUrl: '/10-Converted-converted.pdf'
    },
    {
        id: 11,
        link: 'POJK Nomor 11/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Publik',
        pdfUrl: '/11-Converted-converted.pdf'
    },
    {
        id: 12,
        link: 'POJK Nomor 12/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Efek',
        pdfUrl: '/12-Converted-converted.pdf'
    },
    {
        id: 13,
        link: 'POJK Nomor 13/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Sekuritas',
        pdfUrl: '/13-Converted-converted.pdf'
    },
    {
        id: 14,
        link: 'POJK Nomor 14/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Pengelola Investasi',
        pdfUrl: '/14-Converted-converted.pdf'
    },
    {
        id: 15,
        link: 'POJK Nomor 15/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Reksa Dana',
        pdfUrl: '/15-Converted-converted.pdf'
    },
    {
        id: 16,
        link: 'POJK Nomor 16/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Bursa Efek',
        pdfUrl: '/16-Converted-converted.pdf'
    },
    {
        id: 17,
        link: 'POJK Nomor 17/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Lembaga Kliring dan Penjaminan',
        pdfUrl: '/17-Converted-converted.pdf'
    },
    {
        id: 18,
        link: 'POJK Nomor 18/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Lembaga Penyimpanan dan Penyelesaian',
        pdfUrl: '/18-Converted-converted.pdf'
    },
    {
        id: 19,
        link: 'POJK Nomor 19/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Bank Kustodian',
        pdfUrl: '/19-Converted-converted.pdf'
    },
    {
        id: 20,
        link: 'POJK Nomor 20/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Pedagang Forex',
        pdfUrl: '/19-Converted-converted.pdf'
    },
    {
        id: 21,
        link: 'POJK Nomor 21/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Penyelenggara Layanan Pinjam Meminjam Uang Berbasis Teknologi Informasi',
        pdfUrl: '/21-Converted-converted.pdf'
    },
    {
        id: 22,
        link: 'POJK Nomor 22/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Penyelenggara Layanan Urun Dana Berbasis Teknologi Informasi',
        pdfUrl: '/22-Converted-converted.pdf'
    },
    {
        id: 23,
        link: 'POJK Nomor 23/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Penyedia Layanan Investasi Digital',
        pdfUrl: '/23-Converted-converted.pdf'
    },
    {
        id: 24,
        link: 'POJK Nomor 24/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Penyelenggara Robo-Advisor',
        pdfUrl: '/24-Converted-converted.pdf'
    },
    {
        id: 25,
        link: 'POJK Nomor 25/POJK.04/2015',
        deskripsi: 'Perilaku Perusahaan Penyelenggara Layanan Kripto-Aset',
        pdfUrl: '/25-Converted-converted.pdf'
    },
    {
        id: 26,
        link: 'Peraturan OJK Nomor 01/POJK.05/2015',
        deskripsi: 'Pembentukan dan Pengorganisasian Bursa Efek',
        pdfUrl: '/26-Converted-converted.pdf'
    },
    {
        id: 27,
        link: 'Peraturan OJK Nomor 02/POJK.05/2015',
        deskripsi: 'Pembentukan dan Pengorganisasian Lembaga Kliring dan Penjaminan',
        pdfUrl: '/27-Converted-converted.pdf'
    },
    {
        id: 28,
        link: 'Peraturan OJK Nomor 03/POJK.05/2015',
        deskripsi: 'Pembentukan dan Pengorganisasian Lembaga Penyimpanan dan Penyelesaian',
        pdfUrl: '/28-Converted-converted.pdf'
    },
    {
        id: 29,
        link: 'Peraturan OJK Nomor 04/POJK.05/2015',
        deskripsi: 'Pendaftaran dan Pelaporan Efek Beragun Aset',
        pdfUrl: '/29-Converted-converted.pdf'
    },
    {
        id: 30,
        link: 'Peraturan OJK Nomor 05/POJK.05/2015',
        deskripsi: 'Penawaran Umum dan Persyaratan Pencatatan Efek Perusahaan',
        pdfUrl: '/30-Converted-converted.pdf'
    },
    {
        id: 31,
        link: 'Peraturan OJK Nomor 06/POJK.05/2015',
        deskripsi: 'Pembiayaan Sekunder atas Efek Bersifat Utang',
        pdfUrl: '/31-Converted-converted.pdf'
    },
    {
        id: 32,
        link: 'Peraturan OJK Nomor 07/POJK.05/2015',
        deskripsi: 'Pembatasan Transaksi Proprietary Trading',
        pdfUrl: '/32-Converted-converted.pdf'
    },
    {
        id: 33,
        link: 'Peraturan OJK Nomor 08/POJK.05/2015',
        deskripsi: 'Pemegang Saham Pengendali dan Pengurus Bank',
        pdfUrl: '/33-Converted-converted.pdf'
    },
    {
        id: 34,
        link: 'Peraturan OJK Nomor 09/POJK.05/2015',
        deskripsi: 'Pemberlakuan Standar Basel III bagi Bank Umum',
        pdfUrl: '/34-Converted-converted.pdf'
    },
    {
        id: 35,
        link: 'Peraturan OJK Nomor 10/POJK.05/2015',
        deskripsi: 'Tata Kelola Perusahaan yang Baik bagi Bank Umum',
        pdfUrl: '/34-Converted-converted.pdf'
    }
];

const LegalitasCard = ({ item, index, onOpenPdf }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: index * 0.06, duration: 0.45, ease: 'easeOut' }
        }
    };

    return (
        <motion.div
            className="group relative overflow-hidden rounded-2xl bg-white/5 p-6 shadow-lg hover:shadow-2xl"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            initial="hidden"
            animate="visible"
        >
            <div className="mb-3 text-sm font-medium text-sky-300">{item.link}</div>
            <h3 className="mb-2 text-lg font-semibold text-white">{item.deskripsi}</h3>
            <p className="mb-4 line-clamp-3 text-sm text-slate-300">{item.deskripsi}</p>

            <div className="mt-4 flex items-center gap-3">
                {item.pdfUrl && (
                    <button
                        onClick={() => onOpenPdf && onOpenPdf(item.pdfUrl)}
                        className="ml-auto rounded-md bg-slate-800/60 px-3 py-1 text-sm text-white hover:bg-slate-700"
                        aria-label={`Buka PDF ${item.id}`}
                    >
                        PDF
                    </button>
                )}
            </div>

            <div className="absolute right-0 bottom-0 left-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-sky-600 to-sky-400 transition-transform duration-300 group-hover:scale-x-100" />
        </motion.div>
    );
};

export default function Legalitas() {
    const [openPdf, setOpenPdf] = useState(false);
    const [activePdf, setActivePdf] = useState(null);

    function openPdfModal(pdfUrl) {
        setActivePdf(pdfUrl);
        setOpenPdf(true);
    }

    function closePdfModal() {
        setOpenPdf(false);
        setActivePdf(null);
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
        }
    };

    return (
        <Layout>
            <Head>
                <title>Legalitas - PT Dherva Investindo</title>
                <meta name="description" content="Daftar peraturan OJK dan POJK yang relevan — dokumentasi legal PT Dherva Investindo." />
                <meta name="keywords" content="legalitas, OJK, POJK, peraturan, Dherva Investindo" />
                <meta name="robots" content="index,follow" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    {/* Footer Stats */}
                    <motion.div
                        className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-3"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        <motion.div
                            className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white shadow-xl"
                            whileHover={{ scale: 1.05, translateY: -4 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mb-2 text-4xl font-bold">{legalitasData.length}</div>
                            <div className="text-blue-100">Total Regulasi</div>
                        </motion.div>
                        <motion.div
                            className="rounded-xl bg-gradient-to-br from-green-600 to-green-700 p-8 text-white shadow-xl"
                            whileHover={{ scale: 1.05, translateY: -4 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mb-2 text-4xl font-bold">{legalitasData.filter((d) => d.id <= 25).length}</div>
                            <div className="text-green-100">Peraturan POJK</div>
                        </motion.div>
                        <motion.div
                            className="rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 p-8 text-white shadow-xl"
                            whileHover={{ scale: 1.05, translateY: -4 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mb-2 text-4xl font-bold">{legalitasData.filter((d) => d.id > 25).length}</div>
                            <div className="text-purple-100">Peraturan OJK</div>
                        </motion.div>
                    </motion.div>
                    {/* Header */}
                    <motion.div className="mb-16 text-center" variants={titleVariants} initial="hidden" animate="visible">
                        <motion.h1
                            className="mb-4 text-5xl font-bold text-white sm:text-6xl"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                        >
                            LEGALITAS
                        </motion.h1>
                        <motion.p
                            className="mx-auto max-w-2xl text-xl text-gray-400"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            Peraturan dan Regulasi Otoritas Jasa Keuangan (OJK)
                        </motion.p>
                        <motion.div
                            className="mt-6 flex justify-center gap-2"
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-400" />
                            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-blue-400 to-transparent" />
                        </motion.div>
                    </motion.div>

                    {/* Cards Grid */}
                    <motion.div
                        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {legalitasData.map((item, index) => (
                            <LegalitasCard key={item.id} item={item} index={index} onOpenPdf={(pdf) => openPdfModal(pdf)} />
                        ))}
                    </motion.div>

                    {openPdf && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            <div className="absolute inset-0 bg-black/50" onClick={closePdfModal} />
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="z-50 h-[80vh] w-11/12 overflow-hidden rounded-lg bg-white shadow-lg md:w-3/4 lg:w-2/3"
                            >
                                <div className="flex items-center justify-between border-b p-3">
                                    <h3 className="text-lg font-semibold">Pratinjau PDF</h3>
                                    <div className="space-x-2">
                                        <a href={activePdf} target="_blank" rel="noreferrer" className="text-sm text-sky-600 hover:underline">
                                            Buka di tab baru
                                        </a>
                                        <button onClick={closePdfModal} className="text-sm text-slate-600 hover:text-slate-900">
                                            Tutup
                                        </button>
                                    </div>
                                </div>
                                <div className="h-full w-full">
                                    {activePdf ? (
                                        <iframe src={activePdf} title="PDF Preview" className="h-full w-full" />
                                    ) : (
                                        <div className="p-6">Tidak ada pdf tersedia.</div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
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
        </Layout>
    );
}
