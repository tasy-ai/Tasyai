import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  EyeOff, 
  UserPlus, 
  Zap, 
  CheckCircle2, 
  AlertTriangle,
  Fingerprint,
  Verified,
  Globe,
  RefreshCcw,
  Activity
} from 'lucide-react';
import SEO from '../components/SEO';

const Security = () => {
    const mainFeatures = [
        {
            title: "Idea Integrity",
            icon: EyeOff,
            content: "We emphasize execution and shared milestones. Private architectural details should remain protected until trusted partnerships are established via our verification system.",
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            borderColor: "border-blue-500/20"
        },
        {
            title: "Proof-of-Work Verification",
            icon: Fingerprint,
            content: "Authenticity is the currency of Tasyai. Every high-level collaborator is encouraged to verify their identity through GitHub, LinkedIn, and past portfolio commits.",
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            borderColor: "border-emerald-500/20"
        },
        {
            title: "High-Conviction Network",
            icon: Zap,
            content: "Our system actively monitors for low-signal or bot-like behavior. We maintain a high-frequency hub reserved for obsessed builders and visionaries only.",
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            borderColor: "border-orange-500/20"
        }
    ];

    const stats = [
        { label: "Uptime Network", value: "99.9%", icon: Activity },
        { label: "Verified Intent", value: "128-bit", icon: Lock },
        { label: "Human-First", value: "Zero-Bot", icon: UserPlus },
        { label: "Active Hubs", value: "Global", icon: Globe }
    ];

    return (
        <div className="min-h-screen bg-[#FDFCFB] font-sans pb-32">
            <SEO title="Security | Tasyai" description="Tasyai maintains a state-of-the-art security framework for world-class founders and talent." />
            
            {/* Advanced Hero Section */}
            <header className="bg-[#111111] py-24 md:py-32 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-500 via-transparent to-transparent"></div>
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                {/* Visual Grid Layer */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mb-10 relative inline-block"
                    >
                        <div className="absolute inset-0 bg-orange-500 blur-2xl opacity-20 animate-pulse rounded-full"></div>
                        <div className="size-20 bg-white shadow-2xl rounded-2xl flex items-center justify-center relative border border-white/20">
                            <Shield className="size-10 text-[#ff5a00]" strokeWidth={2.5} />
                        </div>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 leading-[0.95]"
                    >
                        Built for <br/><span className="text-[#ff5a00]">Absolute Trust.</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed"
                    >
                        We operate a high-conviction collaboration hub where world-class talent meets secure execution.
                    </motion.p>
                </div>
            </header>

            <main className="max-w-[1200px] mx-auto px-6 -mt-10 lg:-mt-16 relative z-20">
                
                {/* Platform Pulse Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                    {stats.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="bg-white border border-gray-200 p-6 rounded-sm shadow-sm flex items-center flex-col justify-center text-center group hover:border-[#ff5a00] transition-colors"
                            >
                                <Icon className="size-5 text-gray-400 mb-3 group-hover:text-[#ff5a00] transition-colors" strokeWidth={3} />
                                <div className="text-[20px] font-black text-gray-900 leading-none mb-1">{s.value}</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{s.label}</div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Core Security Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {mainFeatures.map((sec, i) => {
                        const Icon = sec.icon;
                        return (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + (i * 0.1) }}
                                className={`bg-white p-10 border ${sec.borderColor} shadow-xl relative group overflow-hidden h-full flex flex-col`}
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 bg-gray-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                                
                                <div className={`size-14 ${sec.bg} ${sec.color} rounded-sm flex items-center justify-center mb-10 relative z-10`}>
                                    <Icon className="size-7" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight relative z-10">{sec.title}</h3>
                                <p className="text-[16px] font-medium text-gray-500 leading-relaxed relative z-10 flex-1">
                                    {sec.content}
                                </p>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Our Commitment Section */}
                <div className="border-t border-gray-100 pt-32">
                    <div className="flex flex-col lg:flex-row gap-20">
                        <div className="lg:w-1/3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm mb-6">
                                <Verified className="size-3" strokeWidth={3} /> Quality Standard
                            </div>
                            <h2 className="text-4xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tighter">Our Core <br/>Commitment.</h2>
                            <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
                                Maintaining the sanctity of the ecosystem is our priority. Every action taken on Tasyai is recorded to ensure accountability.
                            </p>
                        </div>
                        
                        <div className="lg:w-2/3 grid sm:grid-cols-2 gap-x-12 gap-y-16">
                            <div className="space-y-4">
                                <div className="p-3 bg-gray-900 text-white rounded-sm w-fit shadow-lg shadow-gray-900/10">
                                    <Lock className="size-5" />
                                </div>
                                <h4 className="text-[18px] font-black text-gray-900">Encrypted Intent</h4>
                                <p className="text-[14px] text-gray-500 font-medium leading-relaxed">
                                    Your intent-matching data is processed through secure layers. We don't sell data; we match obsession with mission.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="p-3 bg-white border border-gray-200 text-gray-900 rounded-sm w-fit shadow-sm">
                                    <RefreshCcw className="size-5" />
                                </div>
                                <h4 className="text-[18px] font-black text-gray-900">Dynamic Monitoring</h4>
                                <p className="text-[14px] text-gray-500 font-medium leading-relaxed">
                                    Our platform continuously monitors for bad actors. Integrity is a prerequisite for entry into our world-class circles.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="p-3 bg-white border border-gray-200 text-gray-900 rounded-sm w-fit shadow-sm">
                                    <AlertTriangle className="size-5" />
                                </div>
                                <h4 className="text-[18px] font-black text-gray-900">Incident Response</h4>
                                <p className="text-[14px] text-gray-500 font-medium leading-relaxed">
                                    Reported breaches of conduct are handled with extreme priority. We protect our founders and talent first and foremost.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="p-3 bg-white border border-gray-200 text-gray-900 rounded-sm w-fit shadow-sm">
                                    <Fingerprint className="size-5" />
                                </div>
                                <h4 className="text-[18px] font-black text-gray-900">Persistent Identity</h4>
                                <p className="text-[14px] text-gray-500 font-medium leading-relaxed">
                                    A user's reputation is their passport. Misconduct results in a permanent loss of platform access across the ecosystem.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

         
            </main>
        </div>
    );
};

export default Security;
