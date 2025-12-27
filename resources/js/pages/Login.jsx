import { Head, useForm } from '@inertiajs/react';
import Layout from '../Layout';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <>
            <Head title="Login" />

            <div className="flex min-h-screen items-center justify-center text-white">
                <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
                    {/* Header */}
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl font-bold tracking-wide">Login</h1>
                        <p className="mt-2 text-sm text-gray-300">Masuk ke dashboard Anda</p>
                    </div>

                    {/* Error Global */}
                    {(errors.email || errors.password) && (
                        <div className="mb-4 rounded-lg bg-red-500/20 p-3 text-sm text-red-300">{errors.email || errors.password}</div>
                    )}

                    {/* Form */}
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm text-gray-300">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full rounded-lg bg-white/10 px-4 py-3 text-white ring-1 ring-white/20 outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="email@example.com"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm text-gray-300">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full rounded-lg bg-white/10 px-4 py-3 text-white ring-1 ring-white/20 outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-4 w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-xl disabled:opacity-50"
                        >
                            {processing ? 'Memproses...' : 'Masuk'}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center text-xs text-gray-400">© {new Date().getFullYear()} Your Company</div>
                </div>
            </div>
        </>
    );
}

Login.layout = (page) => <Layout children={page} />;
