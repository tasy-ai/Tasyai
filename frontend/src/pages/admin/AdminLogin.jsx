import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowRight, Loader2, Key } from 'lucide-react';
import authService from '../../services/authService';
import SEO from '../../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const user = await authService.adminLogin(email, password);
            if (user && user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                setError('Unauthorized credentials.');
                authService.logout();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication sequence failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6 relative overflow-hidden font-sans text-gray-900">
            <SEO title="Admin Security Portal | Tasyai" description="Tasyai core systems access." />
            
            {/* Background elements aligned with main theme */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[420px] relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center size-16 bg-[#ff5a00]/10 border border-[#ff5a00]/20 rounded-full mb-6">
                        <Key className="size-8 text-[#ff5a00]" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-gray-900">Auth Portal</h1>
                    <p className="text-gray-500 font-medium text-sm mt-2">
                        Tasyai backend infrastructure access.
                    </p>
                </div>

                <div className="bg-white p-8 border border-gray-200 rounded-sm shadow-xl shadow-gray-200/50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#ff5a00]"></div>
                    
                    <AnimatePresence>
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 overflow-hidden"
                            >
                                <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-sm flex items-center gap-3">
                                    <ShieldAlert className="size-4 shrink-0" />
                                    {error}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-[11px] font-black tracking-widest uppercase text-gray-400 mb-2">
                                Operator ID
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white border border-gray-200 text-gray-900 px-4 py-3 rounded-sm focus:outline-none focus:border-[#ff5a00] focus:ring-1 focus:ring-[#ff5a00] transition-shadow shadow-sm font-medium"
                                placeholder="name@tasyai.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-black tracking-widest uppercase text-gray-400 mb-2">
                                Access Key
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white border border-gray-200 text-gray-900 px-4 py-3 rounded-sm focus:outline-none focus:border-[#ff5a00] focus:ring-1 focus:ring-[#ff5a00] transition-shadow shadow-sm font-mono tracking-widest"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-3 bg-[#ff5a00] hover:bg-[#e04e00] text-white px-6 py-4 rounded-sm font-black text-[12px] uppercase tracking-widest transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98] disabled:opacity-50 group"
                        >
                            {isLoading ? (
                                <Loader2 className="size-5 animate-spin" />
                            ) : (
                                <>
                                    Establish Link
                                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
