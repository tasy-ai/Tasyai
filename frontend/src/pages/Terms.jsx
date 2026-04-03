import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, AlertTriangle, ShieldCheck, Zap, Handshake } from 'lucide-react';
import SEO from '../components/SEO';

const Terms = () => {
    const sections = [
        {
            title: "Acceptance of Terms",
            icon: Handshake,
            content: "By accessing or using Tasyai, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform."
        },
        {
            title: "User Conduct",
            icon: Zap,
            content: "Maintain the sanctity of the ecosystem. Integrity and transparency are prerequisite for entry into our world-class circles."
        },
        {
            title: "Intellectual Property",
            icon: ShieldCheck,
            content: "Founders maintain ownership of their startups. Tasyai provides the venue, but you provide the discretion and legal protections for your IP."
        }
    ];

    return (
        <div className="min-h-screen bg-[#FDFCFB] font-sans pb-32">
            <SEO title="Terms of Service | Tasyai" description="Professional guidelines and rules of engagement for the Tasyai ecosystem." />
            
            {/* Minimal Header */}
            <header className="pt-24 pb-16 px-6 border-b border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm mb-6">
                        <FileText className="size-3" strokeWidth={3} /> Service Rules
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight mb-8">
                        Terms of Service.
                    </h1>
                    <p className="text-lg text-gray-500 font-medium max-w-xl leading-relaxed">
                        Last updated: April 2026. Professional guidelines and engagement rules for builders on Tasyai.
                    </p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-20">
                
                {/* Core Principles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
                    {sections.map((sec, i) => {
                        const Icon = sec.icon;
                        return (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="size-10 bg-gray-50 text-gray-900 rounded-sm mb-6 flex items-center justify-center border border-gray-100">
                                    <Icon className="size-5" />
                                </div>
                                <h3 className="text-lg font-black text-gray-900 mb-4">{sec.title}</h3>
                                <p className="text-[14px] text-gray-500 font-medium leading-relaxed">
                                    {sec.content}
                                </p>
                            </motion.div>
                        )
                    })}
                </div>

                <div className="prose prose-sm prose-gray max-w-none space-y-12">
                    <section>
                        <h2 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">1. Registration & Security</h2>
                        <ul className="space-y-4">
                            <li className="flex gap-3 text-gray-600 font-medium">
                                <CheckCircle2 className="size-5 text-gray-300 mt-0.5 shrink-0" />
                                <span>You must provide accurate information when creating your profile.</span>
                            </li>
                            <li className="flex gap-3 text-gray-600 font-medium">
                                <CheckCircle2 className="size-5 text-gray-300 mt-0.5 shrink-0" />
                                <span>You are responsible for maintaining the confidentiality of your account credentials.</span>
                            </li>
                            <li className="flex gap-3 text-gray-600 font-medium">
                                <CheckCircle2 className="size-5 text-gray-300 mt-0.5 shrink-0" />
                                <span>Sharing account access with unauthorized third parties is strictly prohibited.</span>
                            </li>
                        </ul>
                    </section>

                    <section className="bg-orange-50 p-10 border border-orange-100 rounded-sm">
                        <div className="flex gap-4 items-start">
                            <AlertTriangle className="size-6 text-orange-400 mt-1" />
                            <div>
                                <h3 className="text-lg font-black text-gray-900 mb-2">Liability Disclaimer</h3>
                                <p className="text-[14px] text-gray-600 font-medium leading-relaxed">
                                    Tasyai is a venue for connection. We are not liable for any outcomes, financial losses, or intellectual property disputes arising from interactions facilitated on the platform. Discretion and due diligence are your responsibility.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">2. Termination of Access</h2>
                        <p className="text-gray-500 font-medium leading-relaxed mb-6">
                            Tasyai reserves the right to terminate or suspend access to any user who violates our Code of Conduct or acts in a way that harms the ecosystem’s signal-to-noise ratio.
                        </p>
                        <div className="p-1 px-4 bg-gray-900 text-white text-[13px] font-bold w-fit rounded-sm">
                            Last Revised: April 3, 2026
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Terms;
