import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Globe, FileText, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

const Privacy = () => {
    const sections = [
        {
            title: "Information Collection",
            icon: Eye,
            content: "We collect identifiable information when you create an account, including name, email, professional portfolio links, and skills. This is used solely to facilitate collaboration between founders and talent."
        },
        {
            title: "Data Protection",
            icon: Lock,
            content: "Your data is stored securely using industry-standard encryption protocols. We use Clerk for authentication to ensure the highest levels of account security for our ecosystem."
        },
        {
            title: "Third-Party Sharing",
            icon: Globe,
            content: "Tasyai does not sell your personal data. We only share information with other platform users when you explicitly apply to a startup or initiate a connection request."
        }
    ];

    return (
        <div className="min-h-screen bg-[#FDFCFB] font-sans pb-32">
            <SEO title="Privacy Policy | Tasyai" description="Your privacy and data security are our top priorities at Tasyai." />
            
            {/* Minimal Header */}
            <header className="pt-24 pb-16 px-6 border-b border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm mb-6">
                        <Shield className="size-3" strokeWidth={3} /> Legal Status
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight mb-8">
                        Privacy Policy.
                    </h1>
                    <p className="text-lg text-gray-500 font-medium max-w-xl leading-relaxed">
                        Last updated: April 2026. We believe transparency is the foundation of trust. Here’s how we handle your digital footprint.
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
                        <h2 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">How we use your data</h2>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="size-5 text-gray-300 mt-0.5 shrink-0" />
                                <span className="text-gray-600 font-medium">To personalize your discovery feed based on your role and skills.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="size-5 text-gray-300 mt-0.5 shrink-0" />
                                <span className="text-gray-600 font-medium">To notify you of application status updates and messaging intents.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="size-5 text-gray-300 mt-0.5 shrink-0" />
                                <span className="text-gray-600 font-medium">To maintain a secure, high-conviction environment for builders.</span>
                            </li>
                        </ul>
                    </section>

                    <section className="bg-gray-50 p-10 border border-gray-100 rounded-sm">
                        <div className="flex gap-4 items-start">
                            <FileText className="size-6 text-gray-400 mt-1" />
                            <div>
                                <h3 className="text-lg font-black text-gray-900 mb-2">Cookie Policy</h3>
                                <p className="text-[14px] text-gray-500 font-medium leading-relaxed">
                                    We use session-based cookies to keep you logged in and functional cookies to remember your platform preferences. No third-party tracking or advertising cookies are deployed on Tasyai.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">Your Rights</h2>
                        <p className="text-gray-500 font-medium leading-relaxed mb-6">
                            You have the right to access, export, or delete your personal data at any time through your Profile Settings. For any specific queries regarding data handling, please contact our support desk.
                        </p>
                        <div className="p-1 px-4 bg-gray-900 text-white text-[13px] font-bold w-fit rounded-sm">
                            privacy@tasyai.com
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Privacy;
