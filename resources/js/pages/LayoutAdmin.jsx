import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import Input from '../components/Input';
import Modal from '../components/Modal';

export default function LayoutAdmin({ children }) {
    const { get_wa } = usePage().props;
    const [showModalSetting, setShowModalSetting] = useState(false);
    const { data, setData, post, errors } = useForm({ whatsapp: get_wa?.whatsapp || '' });
    const [isOpen, setIsOpen] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/update-whatsapp');
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            {/* <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} /> */}

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden md:ml-64">
                {/* Header */}

                <Header onSettingsClick={() => setShowModalSetting(true)} />
                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="px-6 py-8">{children}</div>
                </main>
                {/* Footer */}
                <footer className="border-t border-gray-200 bg-white px-6 py-4">
                    <p className="font-domine text-xs text-gray-600">© 2025 PT. Dherva Investindo. All rights reserved.</p>
                </footer>
            </div>

            {/* Settings Modal */}
            <Modal isOpen={showModalSetting} onClose={() => setShowModalSetting(false)} title="⚙️ Pengaturan WhatsApp" size="md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="rounded-lg bg-blue-50 p-4">
                        <p className="font-domine text-sm text-gray-700">Perbarui nomor WhatsApp yang digunakan untuk komunikasi dengan member.</p>
                    </div>

                    <Input
                        label="Nomor WhatsApp"
                        type="tel"
                        placeholder="62812345678"
                        value={data.whatsapp}
                        onChange={(e) => setData('whatsapp', e.target.value)}
                        error={errors.whatsapp}
                        required
                    />

                    <div className="flex gap-3 pt-4">
                        <Button type="submit" variant="primary" size="md" className="flex-1">
                            💾 Simpan Perubahan
                        </Button>
                        <Button type="button" variant="secondary" size="md" className="flex-1" onClick={() => setShowModalSetting(false)}>
                            Batal
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
