import { Head, router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import Layout from '../../Layout';
import { formatRupiah } from '../FormatRupiah';
export default function Show({ member }) {
    console.log(member);
    const penarikanSaldo = () => {
        if (member.profit[member.profit.length - 1]?.total_profit > 0) {
            router.post(`/penarikan-saldo/${member.id_member}`);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Anda belum memiliki saldo untuk ditarik',
                confirmButtonColor: '#2563eb'
            });
        }
    };
    return (
        <>
            <Head>
                <title>Detail Member - PT Dherva Investindo</title>
                <meta name="description" content={`Data transaksi dan jadwal pencairan untuk member ${member.nama_member || ''}`} />
                <meta name="keywords" content="member, detail member, pencairan profit, dherva investindo" />
                <meta name="robots" content="noindex,nofollow" />
                <meta property="og:title" content={`Detail Member - ${member.nama_member || ''} - PT Dherva Investindo`} />
                <meta property="og:description" content={`Lihat jadwal pencairan dan riwayat transaksi untuk member ${member.nama_member || ''}.`} />
                <meta property="og:image" content="/image/PT-DHERVA-INVESTINDO-14-1-20258.png" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`Detail Member - ${member.nama_member || ''} - PT Dherva Investindo`} />
                <meta name="twitter:description" content={`Lihat jadwal pencairan dan riwayat transaksi untuk member ${member.nama_member || ''}.`} />
                <meta name="twitter:image" content="/image/PT-DHERVA-INVESTINDO-14-1-20258.png" />
            </Head>

            <div className="flex w-full flex-col items-center justify-center rounded-md bg-white px-4 py-3">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th colSpan={2} className="w-full border-b bg-orange-500 text-center">
                                PAKET A PROFIT
                            </th>
                        </tr>
                        <tr>
                            <th colSpan={2} className="text-domine border px-3 py-2 font-domine text-[0.8rem] font-light tracking-tighter">
                                PROSES TRANSAKSI PENCAIRAN PROFIT/KOMISI SECARA BERTAHAP MASA KONTRAK MAKSIMAL 6 JAM DAPAT DIPERPANJANG SETELAH
                                KONTRAK BERAKHIR
                            </th>
                        </tr>
                        <tr className="border border-black">
                            <th className="border bg-orange-600 py-2 font-oswald font-semibold text-white capitalize">
                                Nomor Id Member : {member.id_member}
                            </th>
                            <th className="bg-orange-600 py-2 font-oswald font-semibold text-white capitalize">Nama Member: {member.nama_member}</th>
                        </tr>
                        <tr>
                            <th className="border text-center font-oswald">
                                <p className="px-4 font-domine text-[0.6rem] tracking-tighter md:text-xs">
                                    PENCAIRAN MODAL TRADING PAKET B SYARAT & KETENTUAN BERLAKU
                                </p>
                                <p className="mt-4 h-[70px] px-4 text-lg font-medium text-blue-600 md:text-xl lg:text-2xl">
                                    MODAL TRADING IDR {formatRupiah(member.profit[0]?.modal_trading)}
                                </p>
                                <p className="px-4 font-domine tracking-tighter">
                                    Status : <span className="font-bold text-orange-600">Open</span>
                                </p>
                                <p className="h-[40px] py-1 font-oswald text-xs font-bold tracking-tighter text-white md:text-xl"></p>
                            </th>
                            <th className="border text-center font-oswald">
                                <p className="px-4 font-domine text-[0.6rem] tracking-tighter md:text-xs">
                                    PENCAIRAN MODAL TRADING PAKET B SYARAT & KETENTUAN BERLAKU
                                </p>
                                <p className="mt-4 h-[70px] px-4 text-lg font-medium text-blue-600 md:text-xl lg:text-2xl">
                                    PROFIT {member.profit[0]?.profit_percentase}% PER 2JAM
                                </p>
                                <p className="px-4 font-domine tracking-tighter">
                                    Status : <span className="font-bold text-blue-500">On Proses</span>
                                </p>
                                <p className="flex h-[40px] items-center justify-center bg-black py-1 font-oswald text-base font-bold tracking-tighter text-white md:text-xl">
                                    Saldo : Rp.{' '}
                                </p>
                            </th>
                        </tr>
                        <tr className="">
                            <th className="w-1/2 border px-4 py-6 text-center font-domine">
                                <p className="mb-6 font-domine text-lg tracking-tighter text-orange-600 underline">PERHATIAN</p>
                                <p className="h-[130px] text-[0.8rem] font-normal md:text-base">
                                    Pencairan paket <span className="font-bold">B</span> & <span className="font-bold">C</span> sesuai jadwal
                                </p>
                            </th>
                            <th className="w-1/2 border px-4 py-6 text-center font-domine">
                                <p className="mb-6 font-domine tracking-tighter text-orange-600 underline lg:text-lg">PERHATIAN</p>
                                <p className="h-[130px] text-[0.8rem] font-normal md:text-base">
                                    Saldo profit dan modal akhir kontrak akan termonitor secara otomatis sesuai jadwal, Setelah saldo sudah termonitor
                                    segera lakukan penarikan untuk menghindari error sistem,
                                </p>
                            </th>
                        </tr>
                        <tr className="">
                            <th className="w-1/2 border px-4 py-6 text-center font-domine">
                                <p className="mb-6 font-domine text-lg tracking-tighter underline">Keterangan Transaksi</p>
                            </th>
                            <th className="flex w-1/2 w-full flex-col items-center justify-center border px-4 py-6 text-center font-domine">
                                <p className="mb-6 inline bg-orange-200 font-domine text-sm tracking-tighter underline lg:text-lg">PENARIKAN SALDO</p>
                                <button className="hover:cursor-pointer" onClick={() => penarikanSaldo()}>
                                    <img
                                        className="h-[59px]"
                                        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhuBrRDj9TiMmR602fsRO2cWVFm3qhbAoS2xpgsoKV5_GhgHy5yn9sofpqlmxVEMO05vsue-2S0xrZ7LmCXmAueIm7HSiwqzD6Mkp5PkSIbG-eCSuNMjsk61W3-W6GqQtVwqSDOME8LWZ23e0DXTaMJabW9n8yUBRTDz3JItKMHsfGGbo9RjC4A84k1RMbc/s1600/Indo-Design-Center-Tombol-Klik-Disini.gif"
                                        alt=""
                                    />
                                </button>
                            </th>
                        </tr>
                    </thead>
                </table>

                <h1 className="py-3 pt-6 font-oswald text-xl font-bold text-gray-800">JADWAL PENCAIRAN PROFIT DAN MODAL PAKET B</h1>
                <div className="w-full overflow-x-auto rounded-lg shadow-md">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                                <th className="border-b-2 border-blue-800 px-4 py-4 text-left text-xs font-semibold tracking-wide">
                                    JUMLAH MODAL TRADING
                                </th>
                                <th className="border-b-2 border-blue-800 px-4 py-4 text-center text-xs font-semibold tracking-wide">
                                    MODAL MASUK JAM
                                </th>
                                <th className="border-b-2 border-blue-800 px-4 py-4 text-center text-xs font-semibold tracking-wide">
                                    PROFIT 20% TAHAP I
                                </th>
                                <th className="border-b-2 border-blue-800 px-4 py-4 text-center text-xs font-semibold tracking-wide">
                                    PROFIT 20% TAHAP II
                                </th>
                                <th className="border-b-2 border-blue-800 px-4 py-4 text-center text-xs font-semibold tracking-wide">
                                    PENCAIRAN AKHIR
                                </th>
                                <th className="border-b-2 border-blue-800 px-4 py-4 text-center text-xs font-semibold tracking-wide">TOTAL PROFIT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(() => {
                                const MAX_ROWS = 10;
                                const profitCount = member.profit.length;
                                const totalRows = [];

                                // Add all profit data rows
                                for (let i = 0; i < profitCount; i++) {
                                    const item = member.profit[i];
                                    const pairIndex = Math.floor(i / 1);
                                    const isEvenPair = Math.floor(pairIndex / 2) % 2 === 0;

                                    totalRows.push(
                                        <tr
                                            key={`profit-data-${i}`}
                                            className="border border-gray-300 bg-blue-100 transition-colors hover:bg-blue-200"
                                        >
                                            <td className={`border-r border-gray-300 px-4 py-4 text-sm font-semibold text-gray-800`}>
                                                {item.modal_trading ? formatRupiah(item.modal_trading) : 'Rp. 0'}
                                            </td>
                                            <td className={`border-r border-gray-300 px-4 py-4 text-center text-sm text-gray-700`}>
                                                {item.modal_trading_masuk_jam ? item.modal_trading_masuk_jam + ' WIB' : '-'}
                                            </td>
                                            <td className={`border-r border-gray-300 px-4 py-4 text-center text-sm text-gray-700`}>
                                                {item.jam_tahap_pertama ? item.jam_tahap_pertama + ' WIB' : '-'}
                                            </td>
                                            <td className={`border-r border-gray-300 px-4 py-4 text-center text-sm text-gray-700`}>
                                                {item.jam_tahap_kedua ? item.jam_tahap_kedua + ' WIB' : '-'}
                                            </td>
                                            <td className={`border-r border-gray-300 px-4 py-4 text-center text-sm text-gray-700`}>
                                                {item.jam_akhir ? item.jam_akhir + ' WIB' : '-'}
                                            </td>
                                            <td className={`px-4 py-4 text-center text-sm text-gray-700`}>
                                                {item.profit_percentase ? item.profit_percentase + '%' : '-'}
                                            </td>
                                        </tr>
                                    );
                                    totalRows.push(
                                        <tr
                                            key={`profit-desc-${i}`}
                                            className="border border-gray-300 bg-blue-200 transition-colors hover:bg-blue-200"
                                        >
                                            <td className={`border-r border-gray-300 px-4 py-3 text-xs font-medium text-gray-700`}>Keterangan</td>
                                            <td className={`border-r border-gray-300 px-4 py-3 text-center text-xs text-gray-600`}>
                                                {formatRupiah(item.modal_trading)}
                                            </td>
                                            <td className={`border-r border-gray-300 px-4 py-3 text-center text-xs text-gray-600`}>
                                                {item.profit_tahap_pertama !== null
                                                    ? item.profit_tahap_pertama != 'On Proses'
                                                        ? formatRupiah(item.profit_tahap_pertama)
                                                        : 'On Proses'
                                                    : '-'}
                                            </td>
                                            <td className={`border-r border-gray-300 px-4 py-3 text-center text-xs text-gray-600`}>
                                                {item.profit_tahap_kedua !== null
                                                    ? item.profit_tahap_kedua != 'On Proses'
                                                        ? formatRupiah(item.profit_tahap_kedua)
                                                        : 'On Proses'
                                                    : '-'}
                                            </td>
                                            <td className={`border-r border-gray-300 px-4 py-3 text-center text-xs text-gray-600`}>
                                                {item.profit_akhir != null
                                                    ? item.profit_akhir !== 'On Proses'
                                                        ? formatRupiah(item.profit_akhir)
                                                        : 'On Proses'
                                                    : '-'}
                                            </td>
                                            <td className={`px-4 py-3 text-center text-xs font-semibold text-green-600`}>
                                                {item.total_profit ? formatRupiah(item.total_profit) : '-'}
                                            </td>
                                        </tr>
                                    );
                                }

                                // Add empty rows to reach exactly MAX_ROWS
                                const remainingRows = MAX_ROWS - totalRows.length;
                                for (let i = 0; i < remainingRows; i++) {
                                    const startIndex = profitCount * 2 + i;
                                    const pairIndex = Math.floor(startIndex / 2);
                                    const isEvenPair = Math.floor(pairIndex / 2) % 2 === 0;

                                    if (i % 2 === 0) {
                                        totalRows.push(
                                            <tr key={`empty-${i}`} className={`border border-gray-300 transition-colors hover:bg-blue-200`}>
                                                <td className="border-r border-gray-300 px-4 py-4"></td>
                                                <td className="border-r border-gray-300 px-4 py-4"></td>
                                                <td className="border-r border-gray-300 px-4 py-4"></td>
                                                <td className="border-r border-gray-300 px-4 py-4"></td>
                                                <td className="border-r border-gray-300 px-4 py-4"></td>
                                                <td className="px-4 py-4"></td>
                                            </tr>
                                        );
                                    } else {
                                        totalRows.push(
                                            <tr
                                                key={`empty-${i}`}
                                                className={`border border-gray-300 bg-blue-200 transition-colors hover:bg-blue-300`}
                                            >
                                                <td className="border-r border-gray-300 px-4 py-3"></td>
                                                <td className="border-r border-gray-300 px-4 py-3"></td>
                                                <td className="border-r border-gray-300 px-4 py-3"></td>
                                                <td className="border-r border-gray-300 px-4 py-3"></td>
                                                <td className="border-r border-gray-300 px-4 py-3"></td>
                                                <td className="px-4 py-3"></td>
                                            </tr>
                                        );
                                    }
                                }

                                return totalRows;
                            })()}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

Show.layout = (page) => <Layout children={page} />;
