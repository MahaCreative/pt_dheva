import { Head, router, useForm } from '@inertiajs/react';
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

export default function Pendaftaran() {
    const { data, setData, post, reset, errors, processing } = useForm({
        nama_member: '',
        nik: '',
        email: '',
        no_telp: '',
        jenis_kelamin: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        provinsi: '',
        kota: '',
        alamat_lengkap: '',
        kode_pos: '',
        pekerjaan: '',
        sumber_dana: '',
        nama_rekening: '',
        nomor_rekening: '',
        nama_bank: ''
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

        if (errors.nama_member || errors.nik || errors.email || errors.no_telp || errors.jenis_kelamin) setStep(1);
        else if (errors.provinsi || errors.kota || errors.alamat_lengkap || errors.kode_pos) setStep(2);
        else if (errors.pekerjaan || errors.sumber_dana) setStep(3);
        else if (errors.nama_rekening || errors.nomor_rekening || errors.nama_bank) setStep(4);
    }, [errors]);

    /* ================= SUBMIT ================= */
    const submitHandler = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Mengirim Data',
            text: 'Mohon tunggu...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => Swal.showLoading()
        });

        post('/pendaftaran-member', {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil 🎉',
                    text: 'Pendaftaran member berhasil. Silahkan menunggu konfirmasi dari admin untuk proses lebih lanjut',
                    confirmButtonColor: '#2563eb'
                });
                reset();
                setStep(1);

                router.get('/member-area');
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
                <meta property="og:image" content="/image/PT-DHERVA-INVESTINDO-14-1-20258.png" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Pendaftaran Member - PT Dherva Investindo" />
                <meta
                    name="twitter:description"
                    content="Daftar menjadi member PT Dherva Investindo. Isi formulir pendaftaran dan mulai investasi Anda."
                />
                <meta name="twitter:image" content="/image/PT-DHERVA-INVESTINDO-14-1-20258.png" />
            </Head>

            <div className="flex min-h-screen justify-center bg-gray-50 py-12">
                <div className="w-full max-w-4xl">
                    <Card title="Pendaftaran Member" subtitle="Isi data secara bertahap" icon={<MuiIcon name="assignment" />}>
                        {/* ================= STEPPER ================= */}
                        <div className="mb-10 flex justify-between">
                            {[1, 2, 3, 4, 5].map((s) => (
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
                                                errors={errors.nik}
                                                label="NIK"
                                                value={data.nik}
                                                onChange={(e) => setData('nik', e.target.value)}
                                            />
                                            <Input
                                                errors={errors.email}
                                                label="Email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                            <Input
                                                errors={errors.no_telp}
                                                label="No WhatsApp"
                                                value={data.no_telp}
                                                onChange={(e) => setData('no_telp', e.target.value)}
                                            />
                                            <Input
                                                errors={errors.tempat_lahir}
                                                label="Tempat Lahir"
                                                value={data.tempat_lahir}
                                                onChange={(e) => setData('tempat_lahir', e.target.value)}
                                            />
                                            <Input
                                                errors={errors.tanggal_lahir}
                                                label="Tanggal Lahir"
                                                type="date"
                                                value={data.tanggal_lahir}
                                                onChange={(e) => setData('tanggal_lahir', e.target.value)}
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
                                            errors={errors.alamat_lengkap}
                                            onChange={(e) => setData('alamat_lengkap', e.target.value)}
                                        />
                                        <Input
                                            errors={errors.kode_pos}
                                            label="Kode Pos"
                                            value={data.kode_pos}
                                            onChange={(e) => setData('kode_pos', e.target.value)}
                                        />
                                    </motion.section>
                                )}

                                {/* ================= STEP 3 ================= */}
                                {step === 3 && (
                                    <motion.section key="s3" {...stepAnim}>
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

                                        <div>
                                            <select
                                                className={`${selectStyle} mt-4`}
                                                value={data.sumber_dana}
                                                onChange={(e) => setData('sumber_dana', e.target.value)}
                                            >
                                                <option value="">-- Sumber Dana --</option>
                                                <option value="Gaji">Gaji</option>
                                                <option value="Usaha">Usaha</option>
                                                <option value="Investasi">Investasi</option>
                                                <option value="Warisan">Warisan</option>
                                            </select>
                                            {errors.sumber_dana && <p className="mt-1 text-xs text-red-500">{errors.sumber_dana}</p>}
                                        </div>
                                    </motion.section>
                                )}

                                {/* ================= STEP 4 ================= */}
                                {step === 4 && (
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
                                {step === 5 && (
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
