import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Home, 
  Compass, 
  Zap, 
  ShieldCheck, 
  Search,
  LayoutDashboard
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-[#FDFCFB] font-sans flex flex-col items-center justify-center relative overflow-hidden px-6 antialiased">
            <SEO 
                title="404 - Path Not Found | Tasyai" 
                description="The route you are looking for has shifted. Return to the core mission." 
            />
            
            {/* Background Aesthetics */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(255,90,0,0.03),transparent_70%)]"></div>
                {/* Minimal Grid Layer */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:60px_60px]"></div>
                
                {/* Rotating Elements */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-32 -right-32 size-96 border border-gray-100 rounded-full opacity-40 md:opacity-100"
                ></motion.div>
                <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-48 -left-48 size-[500px] border border-gray-100 rounded-full opacity-40 md:opacity-100"
                ></motion.div>
            </div>

            {/* Main Content */}
            <main className="relative z-10 text-center flex flex-col items-center">
                
                {/* 404 Hero Typography */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative mb-12"
                >
                    <h1 className="text-[120px] md:text-[220px] font-black text-gray-900 leading-none tracking-tighter mix-blend-darken select-none opacity-5">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                         <div className="size-24 md:size-32 bg-white shadow-2xl rounded-3xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-500 group border border-gray-100">
                             <Search className="size-10 md:size-14 text-[#ff5a00] group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                         </div>
                    </div>
                </motion.div>

                {/* Text Content */}
                <div className="max-w-xl mx-auto space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                         <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-[#ff5a00] text-[10px] font-black uppercase tracking-[0.2em] rounded-sm mb-6">
                            <Zap className="size-3" strokeWidth={3} fill="currentColor" /> Route Displaced
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-tight mb-6">
                            Lost your way, <br/><span className="text-gray-400">founder?</span>
                        </h2>
                        <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-sm mx-auto italic">
                            "The path you are looking for has shifted. Talent must hold its place accordingly."
                        </p>
                    </motion.div>

                    {/* Actions */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10"
                    >
                        <Link 
                            to="/dashboard"
                            className="w-full sm:w-auto px-10 py-5 bg-[#ff5a00] hover:bg-[#e04e00] text-white font-black text-[13px] uppercase tracking-[0.2em] rounded-sm transition-all shadow-xl shadow-orange-500/20 transform active:scale-95 flex items-center justify-center gap-3"
                        >
                            <LayoutDashboard className="size-4" strokeWidth={3} />
                            Return to Ship
                        </Link>
                        
                        <Link 
                            to="/"
                            className="w-full sm:w-auto px-10 py-5 bg-white border border-gray-200 hover:border-gray-300 text-gray-900 font-bold text-[13px] uppercase tracking-[0.2em] rounded-sm transition-all shadow-sm flex items-center justify-center gap-3"
                        >
                            <Home className="size-4 text-gray-400" strokeWidth={3} />
                            Go Home
                        </Link>
                    </motion.div>
                </div>

                {/* Footer Quote */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 0.6 }}
                    className="mt-24 pt-12 border-t border-gray-100/50 w-full flex flex-col items-center"
                >
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">Tasyai Ecosystem v1.2</p>
                    <div className="flex gap-4 mt-6 opacity-30">
                        <Link to="/faq" className="text-[10px] uppercase font-bold hover:text-[#ff5a00] transition-colors">FAQ</Link>
                        <Link to="/guidelines" className="text-[10px] uppercase font-bold hover:text-[#ff5a00] transition-colors">Guidelines</Link>
                        <Link to="/security" className="text-[10px] uppercase font-bold hover:text-[#ff5a00] transition-colors">Security</Link>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default NotFound;