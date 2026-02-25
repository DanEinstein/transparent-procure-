import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await login({ userId, password });

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    const handleECitizenLogin = (e) => {
        e.preventDefault();
        // TODO: Implement e-Citizen integration
        alert('e-Citizen integration will be implemented by the backend team');
    };

    return (
        <div className="min-h-screen flex flex-col font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
            {/* Top Navigation Bar */}
            <header className="w-full border-b border-slate-200 dark:border-border-dark bg-white/5 dark:bg-background-dark/50 backdrop-blur-md z-10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="text-primary">
                            <span className="material-symbols-outlined text-3xl font-bold">shield_with_heart</span>
                        </div>
                        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            Transparent<span className="text-primary">Procure</span>
                        </h1>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Home</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#">About Oversight</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Legal Framework</a>
                        <button className="bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-primary hover:text-background-dark transition-all">
                            Support
                        </button>
                    </nav>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden geometric-bg">
                {/* Decorative subtle glow elements */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="w-full max-w-[440px] z-20">
                    {/* Login Card */}
                    <div className="bg-white dark:bg-surface-dark rounded-xl shadow-2xl border border-slate-200 dark:border-border-dark overflow-hidden">
                        <div className="p-8 pb-0 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                                <span className="material-symbols-outlined text-primary text-4xl">lock_open</span>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Secure Oversight Portal</h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Integrity in Kenyan Public Procurement</p>
                        </div>

                        <form className="p-8 space-y-5" onSubmit={handleSubmit}>
                            {/* User ID Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="user-id">Official User ID</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person</span>
                                    <input
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                        id="user-id"
                                        placeholder="Enter your ID"
                                        type="text"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="password">Secure Password</label>
                                    <a className="text-xs font-medium text-primary hover:underline" href="#">Forgot Password?</a>
                                </div>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                                    <input
                                        className="w-full pl-11 pr-11 py-3 bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                        id="password"
                                        placeholder="••••••••"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="text-red-500 text-sm font-medium p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                                    {error}
                                </div>
                            )}

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="block text-center w-full bg-primary hover:bg-yellow-400 text-background-dark font-bold py-3.5 rounded-lg shadow-lg shadow-primary/20 transform active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Logging in...
                                    </span>
                                ) : (
                                    'Login to Dashboard'
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative py-2">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200 dark:border-border-dark"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white dark:bg-surface-dark px-2 text-slate-500 dark:text-slate-400">Or integrate with</span>
                                </div>
                            </div>

                            {/* e-Citizen Button */}
                            <button
                                className="w-full flex items-center justify-center gap-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold py-3 rounded-lg border border-slate-200 dark:border-slate-700 transition-all"
                                type="button"
                                onClick={handleECitizenLogin}
                            >
                                <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm border border-slate-100">
                                    <img alt="e-Citizen Logo" className="w-4 h-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPC07qLFaJP_r5KVQdF_tsKls2hGeEgOIq4c-4ND_yCF4kKpBBRyspTD9F4DzkNMkuV3AuMXKvVeqUBOAK1_1DP3D6woCI12BNJ_LDx3uGJGbZTPD_UCiMrK56IwQnE2zhr9IeVi-eMJwQ1c-gXvP3-oi-ZSQ13nuPhnjtwitqJG2gvtBDU3PfASOPppSnVCtHIg73mcoNFBbc-4pgIxD51C_CaQZzMXDPFNEoKXwKK_8JjGUFPjsLsiWszH3KdG3mOqTHOERfeIY" />
                                </div>
                                Login with e-Citizen
                            </button>
                        </form>

                        <div className="px-8 pb-8 text-center">
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-relaxed">
                                Authorized access only. All activities are monitored by the Public Procurement Regulatory Authority.
                            </p>
                        </div>
                    </div>

                    {/* Portal Stats/Footer Info */}
                    <div className="mt-8 flex justify-center gap-8 text-slate-500 dark:text-slate-400 text-xs">
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm">verified_user</span>
                            <span>SSL Encrypted</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm">gavel</span>
                            <span>Compliant with PPADA 2015</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Page Footer */}
            <footer className="w-full py-6 border-t border-slate-200 dark:border-border-dark bg-white dark:bg-background-dark">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© 2024 TransparentProcure Kenya. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a className="hover:text-primary" href="#">Privacy Policy</a>
                        <a className="hover:text-primary" href="#">Terms of Service</a>
                        <a className="hover:text-primary" href="#">Help Center</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
