import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Layout from '../../Layout';

export default function Member() {
    const [data, setData] = useState(null);
    const [idmember, setIdMember] = useState('');
    const searchMember = async () => {
        Swal.fire({
            title: 'Melakukan Pencocokan ID Member',
            text: 'Mohon tunggu...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => Swal.showLoading()
        });

        try {
            const response = await axios.post('/get-member-area', {
                search: idmember
            });

            const data = response.data;

            // ===== onSuccess =====
            if (Object.keys(data).length > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Member ditemukan',
                    text: `Ingin Lanjut Kehalaman Transaksi Member?`,
                    showCancelButton: true,
                    confirmButtonText: 'Ya, Lanjut',
                    cancelButtonText: 'Batal'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = `/member-area/${data.id_member}`;
                    }
                });
            }
            // ===== onError (data kosong) =====
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Member tidak ditemukan',
                    text: 'ID Member tidak terdaftar'
                });
            }
        } catch (error) {
            // ===== onError (server / validation) =====
            Swal.fire({
                icon: 'error',
                title: 'Terjadi kesalahan',
                text: error.response?.data?.message || 'Server error'
            });
        } finally {
            // ===== onFinish =====
            console.log('Request selesai');
        }
    };

    return (
        <>
            <Head>
                <title>Member Area - PT Dherva Investindo</title>
                <meta
                    name="description"
                    content="Masuk ke area member PT Dherva Investindo. Masukkan ID member untuk melihat data transaksi dan pencairan."
                />
                <meta name="keywords" content="member area, id member, dherva investindo" />
                <meta name="robots" content="noindex,nofollow" />
                <meta property="og:title" content="Member Area - PT Dherva Investindo" />
                <meta property="og:description" content="Akses data transaksi dan pencairan member PT Dherva Investindo." />
                <meta property="og:image" content="/image/PT-DHERVA-INVESTINDO-14-1-20258.png" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Member Area - PT Dherva Investindo" />
                <meta name="twitter:description" content="Akses data transaksi dan pencairan member PT Dherva Investindo." />
                <meta name="twitter:image" content="/image/PT-DHERVA-INVESTINDO-14-1-20258.png" />
            </Head>

            <div className="flex flex-col items-center justify-center gap-y-6 bg-white px-4 py-3 text-2xl">
                <div className="flex flex-col items-center justify-center gap-2 leading-3">
                    <h1 className="font-oswald">MEMBER AREA</h1>
                    <h1 className="font-domine text-lg font-light">DATA TRANSAKSI PENCARIAN TRADING</h1>
                    <p className="text-xs font-extralight">MASUKKAN ID MEMBER ANDA DIBAWAH INI</p>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        value={idmember}
                        onChange={(e) => setIdMember(e.target.value)}
                        className="rounded-md border border-b-2 border-blue-200 px-3 py-2 text-xs text-gray-600 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                        placeholder="ID MEMBER ANDA"
                    />
                    <button
                        onClick={() => searchMember()}
                        className="rounded-md border-b border-orange-600 bg-orange-600 px-3 py-2 text-sm text-white shadow-md hover:cursor-pointer hover:shadow-lg"
                    >
                        Login...
                    </button>
                </div>
                <div className="flex w-full flex-col items-center justify-center rounded-md border border-blue-700 bg-blue-50 px-4 py-3">
                    <h1 className="text-sm font-semibold text-orange-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        PERHATIAN....!!!
                    </h1>
                    <p className="text-light w-[80%] text-center font-domine text-xs">
                        Untuk Member yang belum menerima pencairan komisi/profit segera melakukan konfirmasi di bagian ADMIN PT. DHERVA INVESTINDO.
                        agar di follow up secepatnya.
                    </p>
                </div>
            </div>
        </>
    );
}

Member.layout = (page) => <Layout>{page}</Layout>;
