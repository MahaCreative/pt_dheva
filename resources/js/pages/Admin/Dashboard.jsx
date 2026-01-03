import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import MuiIcon from '../../components/MuiIcon';
import { formatRupiah } from '../FormatRupiah';
import LayoutAdmin from '../LayoutAdmin';

export default function Dashboard({ member, memberCount }) {
    const [search, setSearch] = useState('');
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [memberSelect, setMemberSelect] = useState(null);
    const [edit, setEdit] = useState(false);

    const { data, setData, post, reset, errors } = useForm({
        member_id: '',
        kategori_paket: '',
        profit_id: '',
        profit_percentase: '',
        modal_trading: '',
        modal_trading_masuk_jam: '',
        profit_tahap_pertama: 'On Proses',
        profit_tahap_kedua: 'On Proses',
        profit_akhir: 'On Proses',
        total_profit: '',
        jam_tahap_pertama: '',
        jam_tahap_kedua: '',
        jam_akhir: '',
        status_profit: ''
    });

    const showModal = (value) => {
        setShowTransactionModal(true);
        setMemberSelect(value);

        setData({
            ...data,
            member_id: value.id,
            profit_id: value.profit?.[value.profit?.length - 1]?.id || '',
            kategori_paket: value.profit?.[value.profit?.length - 1]?.kategori_paket || '',
            profit_percentase: value.profit?.[value.profit?.length - 1]?.profit_percentase || '',
            modal_trading: value.profit?.[value.profit?.length - 1]?.modal_trading || '',
            modal_trading_masuk_jam: value.profit?.[value.profit?.length - 1]?.modal_trading_masuk_jam || '',
            profit_tahap_pertama: value.profit?.[value.profit?.length - 1]?.profit_tahap_pertama || '',
            profit_tahap_kedua: value.profit?.[value.profit?.length - 1]?.profit_tahap_kedua || '',
            profit_akhir: value.profit?.[value.profit?.length - 1]?.profit_akhir || '',
            total_profit: value.profit?.[value.profit?.length - 1]?.total_profit || '',
            jam_tahap_pertama: value.profit?.[value.profit?.length - 1]?.jam_tahap_pertama || '',
            jam_tahap_kedua: value.profit?.[value.profit?.length - 1]?.jam_tahap_kedua || '',
            jam_akhir: value.profit?.[value.profit?.length - 1]?.jam_akhir || '',
            status_profit: value.profit?.[value.profit?.length - 1]?.status_profit || ''
        });
    };

    const closeModal = () => {
        setMemberSelect(null);
        setShowTransactionModal(false);
        reset();
    };

    const submitHandler = (e) => {
        e.preventDefault();
        post('proses-deposit', {
            onSuccess: closeModal
        });
    };

    const filteredMembers = member.filter(
        (item) => item.nama_member?.toLowerCase().includes(search.toLowerCase()) || item.id_member?.toString().includes(search)
    );

    const doneHandler = (e) => {
        if (data.modal_trading === '' || data.modal_trading_masuk_jam === '' || data.profit_percentase === '') {
            Swal.fire({
                title: 'Error',
                text: 'Mohon lengkapi data modal trading dan paket terlebih dahulu sebelum menyelesaikan transaksi.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } else {
            router.post(
                'done-deposit',
                { ...data },
                {
                    onSuccess: closeModal,
                    onError: (err) => console.log(err)
                }
            );
        }
    };
    const deleteItem = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Data yang dihapus tidak dapat dikembalikan!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/member/${id}`, {
                    onSuccess: () => {
                        Swal.fire('Terhapus!', 'Data member telah dihapus.', 'success');
                    }
                });
            }
        });
    };
    const deleteTransaksi = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Data transaksi yang dihapus tidak dapat dikembalikan!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/profit/${id}`, {
                    onSuccess: () => {
                        Swal.fire('Terhapus!', 'Data transaksi telah dihapus.', 'success');
                    },
                    onError: (err) => {
                        Swal.fire('Gagal!', `${err?.error}`, 'error');
                        console.log(err);
                    }
                });
            }
        });
    };
    console.log(memberSelect);

    return (
        <div className="space-y-6">
            {/* Members Table Card */}
            <Card title="Daftar Member" subtitle={`Total ${filteredMembers.length} member`} icon={<MuiIcon name="people" />}>
                {/* Search Bar */}
                <div className="mb-6">
                    <Input
                        placeholder="Cari berdasarkan nama atau ID member..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full"
                    />
                </div>

                {/* Table */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm">
                        <thead>
                            <tr className="border-b-2 border-gray-200 bg-gray-50">
                                <th className="px-2 py-3 text-left font-oswald font-semibold text-gray-700 sm:px-4">ID Member</th>
                                <th className="hidden px-2 py-3 text-left font-oswald font-semibold text-gray-700 sm:table-cell sm:px-4">
                                    Nama Member
                                </th>
                                <th className="px-2 py-3 text-left font-oswald font-semibold text-gray-700 sm:px-4">Kontak</th>
                                <th className="hidden px-2 py-3 text-left font-oswald font-semibold text-gray-700 sm:px-4 lg:table-cell">
                                    Tedongnya
                                </th>
                                <th className="hidden px-2 py-3 text-left font-oswald font-semibold text-gray-700 sm:px-4 md:table-cell">Lokasi</th>
                                <th className="hidden px-2 py-3 text-left font-oswald font-semibold text-gray-700 sm:px-4 lg:table-cell">
                                    Pekerjaan
                                </th>
                                <th className="px-2 py-3 text-center font-oswald font-semibold text-gray-700 sm:px-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMembers.map((item, key) => (
                                <tr key={key} className="border-b border-gray-100 transition-colors duration-200 hover:bg-blue-50">
                                    <td className="px-2 py-3 font-domine text-xs font-medium text-blue-600 sm:px-4 sm:text-sm">{item.id_member}</td>
                                    <td className="hidden px-2 py-3 font-domine text-xs capitalize sm:table-cell sm:px-4 sm:text-sm">
                                        {item.nama_member}
                                    </td>
                                    <td className="px-2 py-3 font-domine text-xs break-all text-gray-600 sm:px-4 sm:text-sm">{item.no_telp}</td>
                                    <td className="hidden px-2 py-3 font-domine text-xs text-gray-600 sm:px-4 sm:text-sm lg:table-cell">
                                        {item.user.name}
                                    </td>
                                    <td className="hidden px-2 py-3 font-domine text-xs text-gray-600 sm:px-4 sm:text-sm md:table-cell">
                                        {item.provinsi}/{item.kota}
                                    </td>
                                    <td className="hidden px-2 py-3 font-domine text-xs text-gray-600 capitalize sm:px-4 sm:text-sm lg:table-cell">
                                        {item.pekerjaan}
                                    </td>
                                    <td className="sm:px- flex flex-col items-center gap-2 px-2 py-3 text-center sm:justify-center">
                                        <Button
                                            variant="primary"
                                            size="xs"
                                            onClick={() => showModal(item)}
                                            className="inline-block text-xs whitespace-nowrap"
                                        >
                                            {/* <MuiIcon name="chart" className="mr-1 inline-block" /> */}
                                            <span className="hidden sm:inline">Lihat</span>
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="xs"
                                            onClick={() => deleteItem(item.id)}
                                            className="inline-block text-xs whitespace-nowrap"
                                        >
                                            {/* <MuiIcon name="trash" className="mr-1 inline-block" /> */}
                                            <span className="hidden sm:inline">Delete</span>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredMembers.length === 0 && (
                    <div className="py-8 text-center">
                        <p className="font-domine text-gray-500">Tidak ada member yang sesuai dengan pencarian.</p>
                    </div>
                )}
            </Card>

            {/* Transaction Modal */}
            <Modal isOpen={showTransactionModal} onClose={closeModal} title="Buat Transaksi Member" size="full">
                {memberSelect && (
                    <div className="space-y-4 sm:space-y-6">
                        {/* Member Info */}
                        <div className="grid grid-cols-1 gap-3 rounded-lg bg-blue-50 p-3 sm:gap-4 sm:p-4 md:grid-cols-3">
                            <div>
                                <p className="font-domine text-xs text-gray-600 capitalize">Nama Member</p>
                                <p className="truncate font-oswald text-base font-semibold text-blue-600 sm:text-lg">{memberSelect.nama_member}</p>
                            </div>
                            <div>
                                <p className="font-domine text-xs text-gray-600">ID Member</p>
                                <p className="font-oswald text-base font-semibold text-blue-600 sm:text-lg">{memberSelect.id_member}</p>
                            </div>
                            <div>
                                <p className="font-domine text-xs text-gray-600">No WhatsApp</p>
                                <p className="font-oswald text-base text-sm font-semibold break-all text-blue-600 sm:text-lg">
                                    {memberSelect.no_telp}
                                </p>
                            </div>
                        </div>

                        {/* Transaction Form */}
                        <form onSubmit={submitHandler} className="space-y-4 sm:space-y-6">
                            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                                <button
                                    type="button"
                                    onClick={doneHandler}
                                    className={`${data.status_profit == 'selesai' ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'} my-0 inline rounded-md px-3 py-2 text-xs text-white capitalize hover:cursor-pointer sm:my-2`}
                                >
                                    Selesaikan Transaksi
                                </button>
                                <div className="dropshadow-sm rounded-md bg-gray-300 px-3 py-2">
                                    <p className="text-xs tracking-tighter text-red-500 sm:text-sm">
                                        *Note Tekan Tombol selesai diatas jika Pengisian Sudah Sampai Tahap Pencairan Akhir.
                                    </p>
                                    <p className="text-xs tracking-tighter text-red-500 sm:text-sm">
                                        {' '}
                                        Tombol diatas berguna untuk membuat Deposit Baru
                                    </p>
                                </div>
                            </div>
                            {/* Modal Trading Section */}
                            <div className="rounded-lg border-2 border-gray-200 px-3 py-2 sm:px-4 sm:py-3">
                                <h3 className="mb-2 font-oswald text-base font-semibold text-gray-800 sm:mb-3 sm:text-lg">💰 Data Modal Trading</h3>
                                <div className="grid w-full grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                                    <Input
                                        label="Jam Masuk Deposit"
                                        type="time"
                                        value={data.modal_trading_masuk_jam}
                                        onChange={(e) => setData('modal_trading_masuk_jam', e.target.value)}
                                        error={errors.modal_trading_masuk_jam}
                                    />
                                    <Input
                                        label="Modal Trading (Rp)"
                                        type="text"
                                        value={data.modal_trading}
                                        onChange={(e) => setData('modal_trading', e.target.value)}
                                        error={errors.modal_trading}
                                    />
                                </div>
                            </div>

                            {/* Package Section */}
                            <div className="rounded-lg border-2 border-gray-200 px-3 py-2 sm:px-4 sm:py-3">
                                <h3 className="mb-2 font-oswald text-base font-semibold text-gray-800 sm:mb-3 sm:text-lg">
                                    <MuiIcon name="package" className="mr-2 inline-block" /> Paket / Profit
                                </h3>
                                <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                                    <Input
                                        label="Kategori Paket"
                                        type="text"
                                        value={data.kategori_paket}
                                        onChange={(e) => setData('kategori_paket', e.target.value)}
                                        error={errors.kategori_paket}
                                    />
                                    <Input
                                        label="Persentase Profit (%)"
                                        type="number"
                                        value={data.profit_percentase}
                                        onChange={(e) => setData('profit_percentase', e.target.value)}
                                        error={errors.profit_percentase}
                                    />
                                </div>
                            </div>

                            {/* Profit Stages */}
                            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                                {/* Stage 1 */}
                                <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-3 sm:p-4">
                                    <h4
                                        className="mb-2 text-sm font-semibold text-blue-800 sm:mb-3 sm:text-base"
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                    >
                                        <MuiIcon name="check" className="mr-2 inline-block" /> Tahap Pertama ({data.profit_percentase}%)
                                    </h4>
                                    <div className="w-full">
                                        <Input
                                            label="Profit Tahap 1 (Rp)"
                                            type="text"
                                            value={data.profit_tahap_pertama}
                                            onChange={(e) => setData('profit_tahap_pertama', e.target.value)}
                                            error={errors.profit_tahap_pertama}
                                        />
                                    </div>
                                </div>
                                {/* Stage 2 */}
                                <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-3 sm:p-4">
                                    <h4
                                        className="mb-2 text-sm font-semibold text-orange-800 sm:mb-3 sm:text-base"
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                    >
                                        <MuiIcon name="bolt" className="mr-2 inline-block" /> Tahap Kedua (20%)
                                    </h4>
                                    <div className="w-full">
                                        <Input
                                            label="Profit Tahap 2 (Rp)"
                                            type="text"
                                            value={data.profit_tahap_kedua}
                                            onChange={(e) => setData('profit_tahap_kedua', e.target.value)}
                                            error={errors.profit_tahap_kedua}
                                        />
                                    </div>
                                </div>
                                {/* Final Stage */}
                                <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-3 sm:p-4">
                                    <h4 className="font-oswall mb-2 text-sm font-semibold text-blue-800 sm:mb-3 sm:text-base">
                                        <MuiIcon name="flag" className="mr-2 inline-block" /> Pencairan Akhir
                                    </h4>
                                    <div className="w-full">
                                        <Input
                                            label="Profit Akhir (Rp)"
                                            type="text"
                                            value={data.profit_akhir}
                                            onChange={(e) => setData('profit_akhir', e.target.value)}
                                            error={errors.profit_akhir}
                                        />
                                    </div>
                                </div>
                                {/* Total Profit */}
                                <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-3 sm:p-4">
                                    <Input
                                        label="Total Profit (Rp)"
                                        type="text"
                                        value={data.total_profit}
                                        onChange={(e) => setData('total_profit', e.target.value)}
                                        error={errors.total_profit}
                                    />
                                    <div className="dropshadow-sm mt-2 rounded-md bg-gray-300 px-3 py-2">
                                        <p className="text-xs tracking-tighter text-red-500 sm:text-sm">
                                            *Jika sudah mengisi tahap ini Tekan Simpan Transaksi Dibawah Terlebih Dahulu Kemudian Tekan Tombol
                                            Selesaikan Transaksi Diatas
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-2 border-t border-gray-200 pt-4 sm:flex-row sm:gap-3 sm:pt-6">
                                <Button type="submit" variant="primary" size="md" className="flex-1 text-sm sm:text-base">
                                    <MuiIcon name="save" className="mr-2 inline-block" /> Simpan Transaksi
                                </Button>
                                <Button type="button" variant="danger" size="md" className="flex-1 text-sm sm:text-base" onClick={closeModal}>
                                    Batal
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
                <div className="py-4">
                    {memberSelect && (
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
                                    <th className="border-b-2 border-blue-800 px-4 py-4 text-center text-xs font-semibold tracking-wide">
                                        TOTAL PROFIT
                                    </th>
                                    <th className="border-b-2 border-blue-800 px-4 py-4 text-center text-xs font-semibold tracking-wide">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {memberSelect.profit && memberSelect.profit.length > 0 ? (
                                    memberSelect.profit.map((item, i) => (
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
                                            <td className={`px-4 py-4 text-center text-sm text-gray-700`}>
                                                <Button
                                                    variant="danger"
                                                    size="xs"
                                                    onClick={() => deleteTransaksi(item.id)}
                                                    className="inline-block text-xs whitespace-nowrap"
                                                >
                                                    {/* <MuiIcon name="trash" className="mr-1 inline-block" /> */}
                                                    <span className="hidden sm:inline">Delete</span>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </Modal>
        </div>
    );
}

Dashboard.layout = (page) => <LayoutAdmin>{page}</LayoutAdmin>;
