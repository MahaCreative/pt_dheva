import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import LayoutAdmin from '../LayoutAdmin';

export default function Users() {
    const { users, auth } = usePage().props;
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        whatsapp: '',
        password: '',
        password_confirmation: ''
    });

    const {
        data: editData,
        setData: setEditData,
        put,
        errors: editErrors,
        processing: editProcessing,
        reset: resetEdit
    } = useForm({
        name: '',
        email: '',
        whatsapp: '',
        password: '',
        password_confirmation: ''
    });

    const openEdit = (user) => {
        setEditingUser(user);
        setEditData('name', user.name);
        setEditData('email', user.email);
        setEditData('whatsapp', user.whatsapp?.whatsapp || '');
        setShowEdit(true);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        post('/users', {
            onSuccess: () => {
                setShowAdd(false);
                reset();
            }
        });
    };

    const handleEdit = (e) => {
        e.preventDefault();
        if (!editingUser) return;
        put(`/users/${editingUser.id}`, {
            onSuccess: () => {
                setShowEdit(false);
                setEditingUser(null);
                resetEdit();
            }
        });
    };

    const handleDelete = (id) => {
        if (!confirm('Hapus user ini?')) return;
        router.delete(`/users/${id}`);
    };

    return (
        <>
            <Head>
                <title>Manajemen Users - Admin</title>
            </Head>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="font-oswald text-2xl">Daftar Users</h1>
                    <Button onClick={() => setShowAdd(true)}>➕ Tambah User</Button>
                </div>

                <div className="rounded-lg bg-white p-4">
                    <table className="w-full table-auto text-left">
                        <thead>
                            <tr className="text-sm text-gray-600">
                                <th className="py-2">#</th>
                                <th className="py-2">Nama</th>
                                <th className="py-2">Email</th>
                                <th className="py-2">WhatsApp</th>
                                <th className="py-2">Link</th>
                                <th className="py-2">Role</th>
                                <th className="py-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((u, idx) => (
                                <tr key={u.id} className="border-t">
                                    <td className="py-2 align-top">{idx + 1}</td>
                                    <td className="py-2 align-top">{u.name}</td>
                                    <td className="py-2 align-top">{u.email}</td>
                                    <td className="py-2 align-top">{u.whatsapp.whatsapp}</td>
                                    <td className="py-2 align-top">
                                        <a className="text-xs text-blue-500" href={`/${u.referal_code}`} target="_blank" rel="noopener noreferrer">
                                            https://www.dhervainvestindo.site/{u.referal_code}
                                        </a>
                                    </td>
                                    <td className="py-2 align-top">{u.role || '-'}</td>
                                    <td className="space-x-2 py-2 align-top">
                                        <Button size="sm" variant="outline" onClick={() => openEdit(u)}>
                                            Edit
                                        </Button>
                                        <Button size="sm" variant="danger" onClick={() => handleDelete(u.id)}>
                                            Hapus
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Tambah User" size="md">
                <form onSubmit={handleAdd} className="space-y-4">
                    <Input label="Nama" value={data.name} onChange={(e) => setData('name', e.target.value)} error={errors.name} required />
                    <Input
                        label="Email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        error={errors.email}
                        required
                    />
                    <Input
                        label="WhatsApp"
                        type="tel"
                        value={data.whatsapp}
                        onChange={(e) => setData('whatsapp', e.target.value)}
                        error={errors.whatsapp}
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        error={errors.password}
                        required
                    />

                    <div className="flex gap-3 pt-4">
                        <Button type="submit" variant="primary" className="flex-1" disabled={processing}>
                            Simpan
                        </Button>
                        <Button type="button" variant="secondary" className="flex-1" onClick={() => setShowAdd(false)}>
                            Batal
                        </Button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={showEdit} onClose={() => setShowEdit(false)} title="Edit User" size="md">
                <form onSubmit={handleEdit} className="space-y-4">
                    <Input
                        label="Nama"
                        value={editData.name}
                        onChange={(e) => setEditData('name', e.target.value)}
                        error={editErrors.name}
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData('email', e.target.value)}
                        error={editErrors.email}
                        required
                    />
                    <Input
                        label="Password (kosongkan jika tidak diubah)"
                        type="password"
                        value={editData.password}
                        onChange={(e) => setEditData('password', e.target.value)}
                        error={editErrors.password}
                    />
                    <Input
                        label="Konfirmasi Password"
                        type="password"
                        value={editData.password_confirmation}
                        onChange={(e) => setEditData('password_confirmation', e.target.value)}
                        error={editErrors.password_confirmation}
                    />
                    <Input
                        label="WhatsApp"
                        type="tel"
                        value={editData.whatsapp}
                        onChange={(e) => setEditData('whatsapp', e.target.value)}
                        error={editErrors.whatsapp}
                    />

                    <div className="flex gap-3 pt-4">
                        <Button type="submit" variant="primary" className="flex-1" disabled={editProcessing}>
                            Simpan
                        </Button>
                        <Button type="button" variant="secondary" className="flex-1" onClick={() => setShowEdit(false)}>
                            Batal
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

Users.layout = (page) => <LayoutAdmin>{page}</LayoutAdmin>;
