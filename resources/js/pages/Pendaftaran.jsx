import { Head, router, useForm, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Layout from '../Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import MuiIcon from '../components/MuiIcon';

/* ================= STYLE ================= */
const selectStyle =
    'w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-200';

const stepAnim = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 }
};

/* ================= HELPER ================= */
const onlyNumbers = (value) => value.replace(/[^0-9]/g, '');

export default function Pendaftaran({ whatsApp }) {
    const { referal_code } = usePage().props;
    const { data, setData, post, reset, errors, processing } = useForm({
        nama_member: '',

        email: '',
        no_telp: '',
        jenis_kelamin: '',

        provinsi: '',
        kota: '',
        alamat_lengkap: '',
        kode_pos: '',
        pekerjaan: '',

        nama_rekening: '',
        nomor_rekening: '',
        nama_bank: '',
        modal_investasi: ''
    });

    /* ================= STATE ================= */
    const [step, setStep] = useState(1);
    const totalStep = 5;

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [loadingCity, setLoadingCity] = useState(false);
    const [jobSearch, setJobSearch] = useState('');

    /* ================= DATA ================= */
    const pekerjaanList = [
        'Pelajar / Mahasiswa',
        'Karyawan Swasta',
        'PNS',
        'BUMN',
        'Wiraswasta',
        'Pedagang',
        'Petani',
        'Nelayan',
        'Guru',
        'Dosen',
        'Dokter',
        'Perawat',
        'Freelancer',
        'Content Creator',
        'Trader',
        'Investor',
        'Ibu Rumah Tangga',
        'Pensiunan',
        'Lainnya'
    ];

    const bankList = [
        'Bank BRI',
        'Bank BNI',
        'Bank Mandiri',
        'Bank BTN',
        'Bank BCA',
        'Bank CIMB Niaga',
        'Bank Danamon',
        'Bank Permata',
        'Bank Panin',
        'Bank OCBC NISP',
        'Bank Mega',
        'Bank Sinarmas',
        'Bank Mayapada',
        'Bank Artha Graha',
        'Bank Bukopin',
        'Bank BTPN',
        'Bank Syariah Indonesia (BSI)',
        'Bank Muamalat',
        'Bank Mega Syariah',
        'Bank Panin Dubai Syariah',
        'Jenius (BTPN)',
        'Blu by BCA',
        'SeaBank',
        'Bank Jago',
        'Bank Neo Commerce',
        'BPD / Bank Daerah',
        'Bank Lainnya'
    ];

    const filteredJobs = pekerjaanList.filter((job) => job.toLowerCase().includes(jobSearch.toLowerCase()));

    /* ================= API PROVINSI ================= */
    useEffect(() => {
        fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
            .then((res) => res.json())
            .then(setProvinces);
    }, []);

    /* ================= API KOTA ================= */
    useEffect(() => {
        if (!data.provinsi) return;

        setLoadingCity(true);
        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${data.provinsi}.json`)
            .then((res) => res.json())
            .then((res) => {
                setCities(res);
                setLoadingCity(false);
            });
    }, [data.provinsi]);

    /* ================= AUTO STEP ERROR ================= */
    useEffect(() => {
        if (!Object.keys(errors).length) return;

        if (errors.nama_member || errors.email || errors.no_telp || errors.jenis_kelamin || errors.modal_investasi) setStep(1);
        else if (errors.provinsi || errors.kota || errors.alamat_lengkap || errors.pekerjaan) setStep(2);
        else if (errors.nama_rekening || errors.nomor_rekening || errors.nama_bank) setStep(3);
    }, [errors]);

    /* ================= SUBMIT ================= */
    const submitHandler = (e) => {
        e.preventDefault();

        // Buat pesan WhatsApp
        const whatsappMessage = `Halo, saya ingin mendaftar sebagai member PT Dherva Investindo dengan data lengkap berikut:

*DATA PRIBADI*
Nama: ${data.nama_member}
Email: ${data.email}
No WhatsApp: ${data.no_telp}
Jenis Kelamin: ${data.jenis_kelamin}
Modal Investasi: Rp.${onlyNumbers(data.modal_investasi)}

*ALAMAT*
Provinsi: ${data.provinsi}
Kota: ${data.kota}
Alamat Lengkap: ${data.alamat_lengkap}


*PEKERJAAN & DANA*
Pekerjaan: ${data.pekerjaan}

*REKENING BANK*
Nama Pemilik: ${data.nama_rekening}
Nomor Rekening: ${data.nomor_rekening}
Nama Bank: ${data.nama_bank}\
`;

        // Nomor WhatsApp Admin (ubah sesuai nomor yang benar)
        let adminPhone = whatsApp.whatsapp || '';
        // Jika nomor dimulai dengan 0 (contoh: 085...), ganti leading 0 menjadi +62
        if (adminPhone.startsWith('0')) {
            adminPhone = '+62' + adminPhone.slice(1);
        }
        // Untuk membuka wa.me gunakan nomor tanpa plus
        const adminPhoneForUrl = adminPhone.replace(/^\+/, '');

        // Kirim data ke server
        post(`/${referal_code}/store-pendaftaran-member`, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil 🎉',
                    text: 'Pendaftaran member berhasil. Pesan telah dikirim ke WhatsApp admin. Silahkan menunggu konfirmasi dari admin untuk proses lebih lanjut',
                    confirmButtonColor: '#2563eb'
                });
                const whatsappUrl = `https://wa.me/${adminPhoneForUrl}?text=${encodeURIComponent(whatsappMessage)}`;
                window.open(whatsappUrl, '_blank');
                reset();
                setStep(1);

                router.get(`/${referal_code}/member-area`);
            },
            onError: (err) => {
                console.log(err.response);

                Swal.fire({
                    icon: 'error',
                    title: 'Gagal ❌',
                    text: 'Periksa kembali data Anda.',
                    confirmButtonColor: '#f97316'
                });
            }
        });
        // Kirim ke WhatsApp

        // Tampilkan loading
        Swal.fire({
            title: 'Mengirim Data',
            text: 'Mohon tunggu...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => Swal.showLoading()
        });
    };

    return (
        <>
            <Head>
                <title>Pendaftaran Member - PT Dherva Investindo</title>
                <meta
                    name="description"
                    content="Form pendaftaran member PT Dherva Investindo. Isi data pribadi dan rekening untuk bergabung sebagai investor."
                />
                <meta name="keywords" content="pendaftaran member, pendaftaran investasi, dherva investindo" />
                <meta name="robots" content="index,follow" />
                <meta property="og:title" content="Pendaftaran Member - PT Dherva Investindo" />
                <meta
                    property="og:description"
                    content="Daftar menjadi member PT Dherva Investindo. Isi formulir pendaftaran dan mulai investasi Anda."
                />
                <meta property="og:image" content="/image/LOGO PNG.png" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Pendaftaran Member - PT Dherva Investindo" />
                <meta
                    name="twitter:description"
                    content="Daftar menjadi member PT Dherva Investindo. Isi formulir pendaftaran dan mulai investasi Anda."
                />
                <meta name="twitter:image" content="/image/LOGO PNG.png" />
            </Head>

            <div className="flex min-h-screen justify-center bg-gray-50 py-12">
                <div className="w-full max-w-4xl">
                    <Card title="Pendaftaran Member" subtitle="Isi data secara bertahap" icon={<MuiIcon name="assignment" />}>
                        {/* ================= STEPPER ================= */}
                        <div className="mb-10 flex justify-between">
                            {[1, 2, 3, 4].map((s) => (
                                <div
                                    key={s}
                                    className={`flex h-11 w-11 items-center justify-center rounded-full border-2 font-bold transition-all ${
                                        step >= s ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white text-gray-400'
                                    }`}
                                >
                                    {s}
                                </div>
                            ))}
                        </div>

                        <form onSubmit={submitHandler}>
                            <AnimatePresence mode="wait">
                                {/* ================= STEP 1 ================= */}
                                {step === 1 && (
                                    <motion.section key="s1" {...stepAnim}>
                                        <h3 className="mb-4 flex items-center gap-2 border-b-2 border-blue-600 pb-2 text-lg font-semibold">
                                            <MuiIcon name="person" /> Identitas
                                        </h3>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <Input
                                                error={errors.nama_member}
                                                label="Nama Lengkap"
                                                value={data.nama_member}
                                                onChange={(e) => setData('nama_member', e.target.value)}
                                            />

                                            <Input
                                                error={errors.email}
                                                label="Email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                            <Input
                                                type="number"
                                                min="10000000000"
                                                error={errors.no_telp}
                                                label="No WhatsApp"
                                                value={data.no_telp}
                                                onChange={(e) => setData('no_telp', e.target.value)}
                                            />
                                            <Input
                                                type="number"
                                                error={errors.modal_investasi}
                                                label="Modal Investasi"
                                                value={data.modal_investasi}
                                                onChange={(e) => setData('modal_investasi', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <select
                                                className={`w-full rounded-lg border-2 px-4 py-2.5 text-sm transition-all ${
                                                    errors.jenis_kelamin
                                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                                        : 'border-gray-200 focus:border-blue-600 focus:ring-blue-200'
                                                }`}
                                                value={data.jenis_kelamin}
                                                onChange={(e) => setData('jenis_kelamin', e.target.value)}
                                            >
                                                <option value="">-- Jenis Kelamin --</option>
                                                <option value="Laki-laki">Laki-laki</option>
                                                <option value="Perempuan">Perempuan</option>
                                            </select>
                                            {errors.jenis_kelamin && <p className="mt-1 text-xs text-red-500">{errors.jenis_kelamin}</p>}
                                        </div>
                                    </motion.section>
                                )}

                                {/* ================= STEP 2 ================= */}
                                {step === 2 && (
                                    <motion.section key="s2" {...stepAnim}>
                                        <h3 className="mb-4 flex items-center gap-2 border-b-2 border-blue-600 pb-2 text-lg font-semibold">
                                            <MuiIcon name="location_on" /> Alamat
                                        </h3>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <select
                                                    className={`w-full rounded-lg border-2 px-4 py-2.5 text-sm transition-all ${
                                                        errors.provinsi
                                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                                            : 'border-gray-200 focus:border-blue-600 focus:ring-blue-200'
                                                    }`}
                                                    value={data.provinsi}
                                                    onChange={(e) => {
                                                        setData('provinsi', e.target.value);
                                                        setData('kota', '');
                                                    }}
                                                >
                                                    <option value="">-- Provinsi --</option>
                                                    {provinces.map((p) => (
                                                        <option key={p.id} value={p.id}>
                                                            {p.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.provinsi && <p className="mt-1 text-xs text-red-500">{errors.provinsi}</p>}
                                            </div>
                                            <div>
                                                {data.provinsi && (
                                                    <select
                                                        className={`w-full rounded-lg border-2 px-4 py-2.5 text-sm transition-all ${
                                                            errors.kota
                                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                                                : 'border-gray-200 focus:border-blue-600 focus:ring-blue-200'
                                                        }`}
                                                        value={data.kota}
                                                        onChange={(e) => setData('kota', e.target.value)}
                                                    >
                                                        <option value="">{loadingCity ? 'Memuat...' : '-- Kota --'}</option>
                                                        {cities.map((c) => (
                                                            <option key={c.id} value={c.name}>
                                                                {c.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                )}
                                                {errors.kota && <p className="mt-1 text-xs text-red-500">{errors.kota}</p>}
                                            </div>
                                        </div>

                                        <Input
                                            label="Alamat Lengkap"
                                            value={data.alamat_lengkap}
                                            error={errors.alamat_lengkap}
                                            onChange={(e) => setData('alamat_lengkap', e.target.value)}
                                        />
                                        <h3 className="mb-4 flex items-center gap-2 border-b-2 border-blue-600 pb-2 text-lg font-semibold">
                                            <MuiIcon name="work" /> Pekerjaan
                                        </h3>

                                        <input
                                            className={`${selectStyle} mb-2`}
                                            placeholder="Cari pekerjaan..."
                                            value={jobSearch}
                                            onChange={(e) => setJobSearch(e.target.value)}
                                        />

                                        <div>
                                            <select
                                                className={selectStyle}
                                                value={data.pekerjaan}
                                                onChange={(e) => setData('pekerjaan', e.target.value)}
                                            >
                                                <option value="">-- Pekerjaan --</option>
                                                {filteredJobs.map((job, i) => (
                                                    <option key={i} value={job}>
                                                        {job}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.pekerjaan && <p className="mt-1 text-xs text-red-500">{errors.pekerjaan}</p>}
                                        </div>
                                    </motion.section>
                                )}

                                {/* ================= STEP 3 ================= */}

                                {/* ================= STEP 4 ================= */}
                                {step === 3 && (
                                    <motion.section key="s4" {...stepAnim}>
                                        <h3 className="mb-4 flex items-center gap-2 border-b-2 border-orange-500 pb-2 text-lg font-semibold">
                                            <MuiIcon name="account_balance" /> Rekening
                                        </h3>

                                        <Input
                                            label="Nama Pemilik Rekening"
                                            error={errors.nama_rekening}
                                            value={data.nama_rekening}
                                            onChange={(e) => setData('nama_rekening', e.target.value)}
                                        />
                                        <Input
                                            type="number"
                                            min="100000"
                                            error={errors.nomor_rekening}
                                            label="Nomor Rekening"
                                            value={data.nomor_rekening}
                                            onChange={(e) => setData('nomor_rekening', e.target.value)}
                                        />

                                        <div>
                                            <select
                                                className={selectStyle}
                                                value={data.nama_bank}
                                                onChange={(e) => setData('nama_bank', e.target.value)}
                                            >
                                                <option value="">-- Nama Bank --</option>
                                                {bankList.map((b, i) => (
                                                    <option key={i} value={b}>
                                                        {b}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.nama_bank && <p className="mt-1 text-xs text-red-500">{errors.nama_bank}</p>}
                                        </div>
                                    </motion.section>
                                )}

                                {/* ================= STEP 5 ================= */}
                                {step === 4 && (
                                    <motion.div key="s5" {...stepAnim} className="rounded-lg border-l-4 border-orange-500 bg-orange-50 p-6">
                                        <h3 className="flex items-center gap-2 text-lg font-bold text-orange-700">
                                            <MuiIcon name="check_circle" /> Konfirmasi
                                        </h3>
                                        <p className="text-sm text-orange-600">Pastikan seluruh data sudah benar sebelum dikirim.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* ================= NAV ================= */}
                            <div className="mt-8 flex justify-between border-t pt-6">
                                {step > 1 && (
                                    <Button type="button" variant="secondary" onClick={() => setStep(step - 1)}>
                                        ⬅ Kembali
                                    </Button>
                                )}

                                {step < totalStep ? (
                                    <Button type="button" variant="primary" onClick={() => setStep(step + 1)}>
                                        Lanjut
                                    </Button>
                                ) : (
                                    <Button type="submit" variant="primary" disabled={processing}>
                                        {processing ? 'Memproses...' : 'Daftar Sekarang'}
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </>
    );
}

Pendaftaran.layout = (page) => <Layout>{page}</Layout>;
