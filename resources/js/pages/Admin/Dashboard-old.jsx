import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import LayoutAdmin from '../LayoutAdmin';

export default function Dashboard({ member, memberCount }) {
    const [search, setSearch] = useState('');
    const [modal, setModal] = useState(false);
    const [memberSelect, setMemberSelect] = useState(null);
    const modalRef = useRef(null);
    const [model, setModel] = useState(null);
    const { data, setData, post, reset, errors } = useForm({
        member_id: '',
        kategori_paket: '',
        profit_id: '',
        profit_percentase: '',
        modal_trading: '',
        modal_trading_masuk_jam: '',
        profit_tahap_pertama: '',
        profit_tahap_kedua: '',
        profit_akhir: '',
        total_profit: '',
        jam_tahap_pertama: '',
        jam_tahap_kedua: '',
        jam_akhir: '',
    });
    const [edit, setEdit] = useState(false);
    const showModal = (value) => {
        setModal(true);
        setMemberSelect(value);
        console.log(value);

        setData({
            ...data,
            member_id: value.id,
            profit_id: value.profit[value.profit.length - 1].id,
            kategori_paket: value.profit[value.profit.length - 1].kategori_paket,
            profit_percentase: value.profit[value.profit.length - 1].profit_percentase,
            modal_trading: value.profit[value.profit.length - 1].modal_trading,
            modal_trading_masuk_jam: value.profit[value.profit.length - 1].modal_trading_masuk_jam,
            profit_tahap_pertama: value.profit[value.profit.length - 1].profit_tahap_pertama,
            profit_tahap_kedua: value.profit[value.profit.length - 1].profit_tahap_kedua,
            profit_akhir: value.profit[value.profit.length - 1].profit_akhir,
            total_profit: value.profit[value.profit.length - 1].total_profit,
            jam_tahap_pertama: value.profit[value.profit.length - 1].jam_tahap_pertama,
            jam_tahap_kedua: value.profit[value.profit.length - 1].jam_tahap_kedua,
            jam_akhir: value.profit[value.profit.length - 1].jam_akhir,
        });
    };
    const closeModal = () => {
        setMemberSelect(false);
        setModal(false);
        setData({
            ...data,
            member_id: '',
            kategori_paket: '',
            profit_percentase: '',
            modal_trading: '',
            modal_trading_masuk_jam: '',
            profit_tahap_pertama: '',
            profit_tahap_kedua: '',
            profit_akhir: '',
            total_profit: '',
            jam_tahap_pertama: '',
            jam_tahap_kedua: '',
            jam_akhir: '',
        });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post('proses-deposit');
    };

    return (
        <div className="">
            <div
                className={`${modal ? '' : 'hidden'} absolute left-0 top-0 flex h-full w-full flex-row items-center justify-center gap-3 bg-black/50 backdrop-blur`}
            >
                <div className="md:w-[80% w-[90%] rounded-md bg-white px-3 py-3">
                    <div className="flex items-center justify-between border-b border-blue-500 py-3">
                        <p className="font-oswald text-base text-blue-500">Lihat Transaksi User</p>
                        <button
                            type="button"
                            onClick={() => closeModal()}
                            className="rounded-md border border-gray-500 px-3 py-3 text-xs font-bold leading-3 text-gray-500 hover:cursor-pointer hover:bg-red-500 hover:text-white"
                        >
                            X
                        </button>
                    </div>
                    {/* content MODAL */}
                    <div className="dropshadow-sm relative my-3 w-[80%] rounded-md border border-gray-500 bg-white px-4 py-3 md:w-1/2">
                        <p className="font-domine text-sm">Nama Member: {memberSelect?.nama_member}</p>
                        <p className="font-domine text-sm">ID Member: {memberSelect?.nama_member}</p>
                        <p className="font-domine text-sm">No WhatsApp: {memberSelect?.no_hp}</p>
                    </div>
                    <div className="dropshadow-sm relative my-3 w-full rounded-md border border-gray-500 bg-white px-4 py-3">
                        <h1 className="font-oswald text-base text-blue-500">Buat Transaksi</h1>

                        <form onSubmit={submitHandler} className="my-3">
                            <table>
                                <thead className="font-domine bg-blue-600 text-[0.5rem] font-normal tracking-tighter md:text-sm">
                                    <tr className="text-white">
                                        <th className="px-1.5 py-2">JUMLAH MODAL TRADDING</th>
                                        <th className="px-1.5 py-2">PAKET / PROFIT</th>
                                        <th className="px-1.5 py-2">PROFIT 20% TAHAP PERTAMA DICAIRKAN JAM</th>
                                        <th className="px-1.5 py-2">PROFIT 20% TAHAP KEDUA DICAIRKAN JAM</th>
                                        <th className="px-1.5 py-2">PENCAIRAN AKHIR KONTRAK</th>
                                        <th className="px-1.5 py-2">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-xs text-blue-500">
                                        <td className="px-1.5 py-2">
                                            {' '}
                                            <div className="w-full">
                                                <label htmlFor="">Jam Masuk Deposit</label>
                                                <input
                                                    value={data.modal_trading_masuk_jam}
                                                    name="modal_trading_masuk_jam"
                                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                    type="time"
                                                    placeholder="Modal Trading"
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs shadow shadow-gray-500/50"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="">Modal Trading</label>
                                                <input
                                                    value={data.modal_trading}
                                                    name="modal_trading"
                                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                    type="text"
                                                    placeholder="Modal Trading"
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs shadow shadow-gray-500/50"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-1.5 py-2">
                                            <label htmlFor="">Kategori Paket</label>
                                            <div className="w-full">
                                                <input
                                                    value={data.kategori_paket}
                                                    name="kategori_paket"
                                                    placeholder="kategori_paket"
                                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                    type="text"
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs shadow shadow-gray-500/50"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="">Profit</label>
                                                <input
                                                    value={data.profit_percentase}
                                                    name="profit_percentase"
                                                    placeholder="Percentase Profit"
                                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                    type="number"
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs shadow shadow-gray-500/50"
                                                />
                                            </div>
                                        </td>

                                        <td className="px-1.5 py-2">
                                            <div className="w-full">
                                                <label htmlFor="">Jam Masuk 1</label>
                                                <input
                                                    value={data.jam_tahap_pertama}
                                                    name="jam_tahap_pertama"
                                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                    type="time"
                                                    placeholder="Jam Masuk"
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs shadow shadow-gray-500/50"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="">Profit 1</label>
                                                <input
                                                    value={data.profit_tahap_pertama}
                                                    name="profit_tahap_pertama"
                                                    placeholder="Profit 1"
                                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                    type="text"
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs shadow shadow-gray-500/50"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-1.5 py-2">
                                            <div className="w-full">
                                                <label htmlFor="">Jam Masuk 2</label>
                                                <input
                                                    value={data.jam_tahap_kedua}
                                                    name="jam_tahap_kedua"
                                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                    type="time"
                                                    placeholder="Jam Masuk"
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs shadow shadow-gray-500/50"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="">Profit 2</label>
                                                <input
                                                    value={data.profit_tahap_kedua}
                                                    name="profit_tahap_kedua"
                                                    placeholder="Profit 2"
                                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                    type="text"
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs shadow shadow-gray-500/50"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-1.5 py-2">
                                            <div className="w-full">
                                                <label htmlFor="">Jam Masuk 3</label>
                                                <input
                                                    value={data.jam_akhir}
                                                    name="jam_akhir"
                                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                    type="time"
                                                    placeholder="Jam Masuk"
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs shadow shadow-gray-500/50"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="">Profit 3</label>
                                                <input
                                                    value={data.profit_akhir}
                                                    name="profit_akhir"
                                                    placeholder="Profit Akhir"
                                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                    type="text"
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs shadow shadow-gray-500/50"
                                                />
                                            </div>
                                        </td>

                                        <td className="px-1.5 py-2">
                                            <button className="rounded-md bg-orange-500 px-2 py-1 text-xs text-white">Simpan</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
            <div
                className={`${modal ? '' : 'hidden'} absolute left-0 top-0 flex h-full w-full flex-row items-center justify-center gap-3 bg-black/50 backdrop-blur`}
            >
                <div className="md:w-[80% w-[90%] rounded-md bg-white px-3 py-3">
                    <div className="flex items-center justify-between border-b border-blue-500 py-3">
                        <p className="font-oswald text-base text-blue-500">Lihat Transaksi User</p>
                        <button
                            type="button"
                            onClick={() => closeModal()}
                            className="rounded-md border border-gray-500 px-3 py-3 text-xs font-bold leading-3 text-gray-500 hover:cursor-pointer hover:bg-red-500 hover:text-white"
                        >
                            X
                        </button>
                    </div>
                    {/* content MODAL */}
                    <div className="dropshadow-sm relative my-3 w-[80%] rounded-md border border-gray-500 bg-white px-4 py-3 md:w-1/2">
                        <p className="font-domine text-sm">Nama Member: {memberSelect?.nama_member}</p>
                        <p className="font-domine text-sm">ID Member: {memberSelect?.nama_member}</p>
                        <p className="font-domine text-sm">No WhatsApp: {memberSelect?.no_hp}</p>
                    </div>
                    <div className="dropshadow-sm relative my-3 w-full rounded-md border border-gray-500 bg-white px-4 py-3">
                        <h1 className="font-oswald text-base text-blue-500">Buat Transaksi</h1>

                        <form onSubmit={submitHandler} className="my-3">
                            <table>
                                <thead className="font-domine bg-blue-600 text-[0.5rem] font-normal tracking-tighter md:text-sm">
                                    <tr className="text-white">
                                        <th className="px-1.5 py-2">JUMLAH MODAL TRADDING</th>
                                        <th className="px-1.5 py-2">PAKET / PROFIT</th>
                                        <th className="px-1.5 py-2">PROFIT 20% TAHAP PERTAMA DICAIRKAN JAM</th>
                                        <th className="px-1.5 py-2">PROFIT 20% TAHAP KEDUA DICAIRKAN JAM</th>
                                        <th className="px-1.5 py-2">PENCAIRAN AKHIR KONTRAK</th>
                                        <th className="px-1.5 py-2">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-xs text-blue-500">
                                        <td className="px-1.5 py-2">
                                            {' '}
                                            <div className="w-full">
                                                <label htmlFor="">Jam Masuk Deposit</label>
                                                <input
                                                    value={data.modal_trading_masuk_jam}
                                                    name="modal_trading_masuk_jam"
                                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                    type="time"
                                                    placeholder="Modal Trading"
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs shadow shadow-gray-500/50"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="">Modal Trading</label>
                                                <input
                                                    value={data.modal_trading}
                                                    name="modal_trading"
                                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                    type="text"
                                                    placeholder="Modal Trading"
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs shadow shadow-gray-500/50"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-1.5 py-2">
                                            <label htmlFor="">Kategori Paket</label>
                                            <div className="w-full">
                                                <input
                                                    value={data.kategori_paket}
                                                    name="kategori_paket"
                                                    placeholder="kategori_paket"
                                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                    type="text"
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs shadow shadow-gray-500/50"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="">Profit</label>
                                                <input
                                                    value={data.profit_percentase}
                                                    name="profit_percentase"
                                                    placeholder="Percentase Profit"
                                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                    type="number"
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs shadow shadow-gray-500/50"
                                                />
                                            </div>
                                        </td>

                                        <td className="px-1.5 py-2">
                                            <div className="w-full">
                                                <label htmlFor="">Jam Masuk 1</label>
                                                <input
                                                    value={data.jam_tahap_pertama}
                                                    name="jam_tahap_pertama"
                                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                    type="time"
                                                    placeholder="Jam Masuk"
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs shadow shadow-gray-500/50"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="">Profit 1</label>
                                                <input
                                                    value={data.profit_tahap_pertama}
                                                    name="profit_tahap_pertama"
                                                    placeholder="Profit 1"
                                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                    type="text"
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs shadow shadow-gray-500/50"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-1.5 py-2">
                                            <div className="w-full">
                                                <label htmlFor="">Jam Masuk 2</label>
                                                <input
                                                    value={data.jam_tahap_kedua}
                                                    name="jam_tahap_kedua"
                                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                    type="time"
                                                    placeholder="Jam Masuk"
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs shadow shadow-gray-500/50"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="">Profit 2</label>
                                                <input
                                                    value={data.profit_tahap_kedua}
                                                    name="profit_tahap_kedua"
                                                    placeholder="Profit 2"
                                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                    type="text"
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs shadow shadow-gray-500/50"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-1.5 py-2">
                                            <div className="w-full">
                                                <label htmlFor="">Jam Masuk 3</label>
                                                <input
                                                    value={data.jam_akhir}
                                                    name="jam_akhir"
                                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                    type="time"
                                                    placeholder="Jam Masuk"
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs shadow shadow-gray-500/50"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="">Profit 3</label>
                                                <input
                                                    value={data.profit_akhir}
                                                    name="profit_akhir"
                                                    placeholder="Profit Akhir"
                                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                                    type="text"
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs shadow shadow-gray-500/50"
                                                />
                                            </div>
                                        </td>

                                        <td className="px-1.5 py-2">
                                            <button className="rounded-md bg-orange-500 px-2 py-1 text-xs text-white">Simpan</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
            <div className="w-[250px] rounded-md bg-blue-500 px-4 py-3">
                <div className="flex flex-row items-center justify-between text-white">
                    <p>a</p>

                    <p className="text-6xl font-bold">{memberCount}</p>
                </div>
                <p className="border-t border-white py-2 text-xs text-white">Total Member Terdaftar</p>
            </div>
            <div className="my-6 rounded-md border border-gray-500/50 bg-white px-4 py-3">
                <div className="flex items-center justify-between">
                    <h3 className="font-oswald text-blue-600">Daftar Member</h3>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Nama Member / Id Member"
                        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs shadow shadow-gray-500/50"
                    />
                </div>
                <table className="font-domine my-3 table w-full table-auto text-xs">
                    <thead>
                        <tr className="bg-blue-500 px-3 py-2 text-white">
                            <th>ID Member</th>
                            <th>Nama Member</th>
                            <th>Jenis Kelamin</th>
                            <th>Telephone Member</th>
                            <th>Pekerjaan Member</th>
                            <th>Provinsi/Kota</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {member.map((item, key) => (
                            <tr className="event:border-blue-700 border-b odd:border-gray-500 odd:bg-blue-300">
                                <td className="px-3 py-1.5 capitalize">{item.id_member}</td>
                                <td className="px-3 py-1.5 capitalize">{item.nama_member}</td>
                                <td className="px-3 py-1.5 capitalize">{item.jenis_kelamin}</td>
                                <td className="px-3 py-1.5 capitalize">{item.no_hp}</td>
                                <td className="px-3 py-1.5 capitalize">{item.pekerjaan}</td>
                                <td className="px-3 py-1.5 capitalize">{item.provinsi + '/' + item.kota}</td>
                                <td className="flex items-center justify-center px-3 py-1.5">
                                    <button
                                        onClick={() => showModal(item)}
                                        className="block w-[100px] rounded-md bg-blue-600 px-1 py-1 text-[0.6rem] text-white hover:cursor-pointer"
                                    >
                                        Lihat Transaksi
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <LayoutAdmin children={page} />;
