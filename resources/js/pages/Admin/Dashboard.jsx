import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import MuiIcon from '../../components/MuiIcon';
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
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th className="px-4 py-3 text-left font-oswald font-semibold text-gray-700">ID Member</th>
                                <th className="px-4 py-3 text-left font-oswald font-semibold text-gray-700">Nama Member</th>
                                <th className="px-4 py-3 text-left font-oswald font-semibold text-gray-700">Kontak</th>
                                <th className="px-4 py-3 text-left font-oswald font-semibold text-gray-700">Lokasi</th>
                                <th className="px-4 py-3 text-left font-oswald font-semibold text-gray-700">Pekerjaan</th>
                                <th className="px-4 py-3 text-center font-oswald font-semibold text-gray-700">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMembers.map((item, key) => (
                                <tr key={key} className="border-b border-gray-100 transition-colors duration-200 hover:bg-blue-50">
                                    <td className="px-4 py-3 font-domine font-medium text-blue-600">{item.id_member}</td>
                                    <td className="px-4 py-3 font-domine capitalize">{item.nama_member}</td>
                                    <td className="px-4 py-3 font-domine text-sm text-gray-600">{item.no_telp}</td>
                                    <td className="px-4 py-3 font-domine text-sm text-gray-600">
                                        {item.provinsi}/{item.kota}
                                    </td>
                                    <td className="px-4 py-3 font-domine text-gray-600 capitalize">{item.pekerjaan}</td>
                                    <td className="px-4 py-3 text-center">
                                        <Button variant="primary" size="xs" onClick={() => showModal(item)} className="inline-block">
                                            <MuiIcon name="chart" className="mr-2 inline-block" />
                                            Lihat Transaksi
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
                    <div className="space-y-6">
                        {/* Member Info */}
                        <div className="grid grid-cols-1 gap-1 rounded-lg bg-blue-50 p-4 md:grid-cols-3">
                            <div>
                                <p className="font-domine text-xs text-gray-600 capitalize">Nama Member</p>
                                <p className="font-oswald text-lg font-semibold text-blue-600">{memberSelect.nama_member}</p>
                            </div>
                            <div>
                                <p className="font-domine text-xs text-gray-600">ID Member</p>
                                <p className="font-oswald text-lg font-semibold text-blue-600">{memberSelect.id_member}</p>
                            </div>
                            <div>
                                <p className="font-domine text-xs text-gray-600">No WhatsApp</p>
                                <p className="font-oswald text-lg font-semibold text-blue-600">{memberSelect.no_telp}</p>
                            </div>
                        </div>

                        {/* Transaction Form */}
                        <form onSubmit={submitHandler} className="space-y-6">
                            <div className="flex flex-row items-center gap-3">
                                <button
                                    type="button"
                                    onClick={doneHandler}
                                    className={`${data.status_profit == 'selesai' ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'} my-2 inline rounded-md px-3 py-2 text-xs text-white capitalize hover:cursor-pointer`}
                                >
                                    Selesaikan Transaksi
                                </button>
                                <div className="dropshadow-sm rounded-md bg-gray-300 px-3 py-1">
                                    <p className="text-sm tracking-tighter text-red-500">
                                        *Note Tekan Tombol selesai diatas jika Pengisian Sudah Sampai Tahap Pencairan Akhir.
                                    </p>
                                    <p className="text-sm tracking-tighter text-red-500"> Tombol diatas berguna untuk membuat Deposit Baru</p>
                                </div>
                            </div>
                            {/* Modal Trading Section */}
                            <div className="rounded-lg border-2 border-gray-200 px-4 py-2">
                                <h3 className="mb-2 font-oswald text-lg font-semibold text-gray-800">💰 Data Modal Trading</h3>
                                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                                    <Input
                                        label="Jam Masuk Deposit"
                                        type="time"
                                        value={data.modal_trading_masuk_jam}
                                        onChange={(e) => setData('modal_trading_masuk_jam', e.target.value)}
                                        error={errors.modal_trading_masuk_jam}
                                    />
                                    <Input
                                        label="Modal Trading (Rp)"
                                        type="number"
                                        value={data.modal_trading}
                                        onChange={(e) => setData('modal_trading', e.target.value)}
                                        error={errors.modal_trading}
                                    />
                                </div>
                            </div>

                            {/* Package Section */}
                            <div className="rounded-lg border-2 border-gray-200 px-4 py-2">
                                <h3 className="mb-2 font-oswald text-lg font-semibold text-gray-800">
                                    <MuiIcon name="package" className="mr-2 inline-block" /> Paket / Profit
                                </h3>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                            <div className="grid grid-cols-1 gap-6 space-y-4 md:grid-cols-2">
                                {/* Stage 1 */}
                                <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                                    <h4 className="mb-2 font-semibold text-blue-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
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
                                <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-4">
                                    <h4 className="mb-2 font-semibold text-orange-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
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
                                <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                                    <h4 className="font-oswall mb-2 font-semibold text-blue-800">
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
                                <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                                    <Input
                                        disabled
                                        label="Total Profit (Rp)"
                                        type="text"
                                        value={data.total_profit}
                                        onChange={(e) => setData('total_profit', e.target.value)}
                                        error={errors.total_profit}
                                    />
                                    <div className="dropshadow-sm rounded-md bg-gray-300 px-3 py-1">
                                        <p className="text-sm tracking-tighter text-red-500">
                                            *Jika sudah mengisi tahap ini Tekan Simpan Transaksi Dibawah Terlebih Dahulu Kemudian Tekan Tombol
                                            Selesaikan Transaksi Diatas
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 border-t border-gray-200 pt-6">
                                <Button type="submit" variant="primary" size="md" className="flex-1">
                                    <MuiIcon name="save" className="mr-2 inline-block" /> Simpan Transaksi
                                </Button>
                                <Button type="button" variant="danger" size="md" className="flex-1" onClick={closeModal}>
                                    Batal
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
            </Modal>
        </div>
    );
}

Dashboard.layout = (page) => <LayoutAdmin>{page}</LayoutAdmin>;
