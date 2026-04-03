import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle, Shield, TrendingUp, Users, Info } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const questions = [
        {
            question: "Why was Tasyai developed in the first place?",
            answer: "It aims to bridge scattered talents for something meaningful. If you are an exceptionally capable person, failure to pursue a good quest is not neutral—it constitutes a loss for humanity.",
            icon: HelpCircle
        },
        {
            question: "Can I find investors here?",
            answer: "Yes, you can find investors in the pitch deck section.",
            icon: TrendingUp
        },
        {
            question: "How much time does it take to find and match for a co-founder?",
            answer: "Co-founder matching takes an average of 6 weeks, and as early as a week to start collaborating, depending upon the stage.",
            icon: Users
        },
        {
            question: "Do I have to start a project to join?",
            answer: "No, you can join other's projects and vice versa. Collaboration is the core of Tasyai.",
            icon: Info
        },
        {
            question: "What happens if my idea is stolen?",
            answer: "Don't share your private ideas here until you have established trust and appropriate legal protections. We focus on collaboration and execution rather than just raw ideas.",
            icon: Shield
        },
        {
            question: "How fast can I find team-mates or collaborators?",
            answer: "You can expect to find matches within 36 hours, depending on the niche and the level of talent you are looking for.",
            icon: MessageCircle
        },
        {
            question: "Is there a difference between co-founder and collaborators/team-mates?",
            answer: "Yes. Co-founders are the individuals founding the company alongside you. Team-mates and collaborators are individuals working with you as part of the broader team.",
            icon: Users
        },
        {
            question: "Do I need prior experience?",
            answer: "No, you don't need prior experience. We value obsession and the ability to ship over historical accolades.",
            icon: HelpCircle
        }
    ];

    return (
        <div className="min-h-screen bg-[#F8F7F4] font-sans pb-32">
            <SEO title="FAQ | Tasyai" description="Commonly asked questions about building and collaborating on Tasyai." />
            
            {/* Header Section */}
            <div className="bg-[#1a1a1a] text-white py-24 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] uppercase font-black tracking-[0.2em] text-orange-500 mb-6 block"
                    >
                        Foundation & Vision
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black tracking-tight mb-8"
                    >
                        Commonly Asked <br/>Questions.
                    </motion.h1>
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-6 py-4 bg-white/5 border border-white/10 rounded-sm backdrop-blur-sm"
                    >
                        <p className="text-lg md:text-xl font-medium text-gray-400 italic">
                            "No capable person should settle for less. Talent must hold its place accordingly."
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 -mt-12">
                <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
                    {questions.map((q, i) => {
                        const Icon = q.icon;
                        const isOpen = activeIndex === i;
                        return (
                            <div key={i} className={`border-b border-gray-100 last:border-0 transition-colors ${isOpen ? 'bg-orange-50/30' : ''}`}>
                                <button 
                                    onClick={() => setActiveIndex(isOpen ? null : i)}
                                    className="w-full text-left px-8 py-6 flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`p-2 rounded-sm border transition-colors ${isOpen ? 'bg-orange-500 border-orange-500 text-white' : 'bg-gray-50 border-gray-100 text-gray-400 group-hover:border-orange-200 group-hover:text-orange-500'}`}>
                                            <Icon className="size-5" strokeWidth={2.5} />
                                        </div>
                                        <span className={`text-[16px] font-bold tracking-tight transition-colors ${isOpen ? 'text-gray-900' : 'text-gray-700'}`}>
                                            {q.question}
                                        </span>
                                    </div>
                                    <ChevronDown className={`size-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange-500' : ''}`} strokeWidth={3} />
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-8 pb-8 pl-[76px]">
                                                <p className="text-[15px] font-medium text-gray-600 leading-relaxed max-w-2xl">
                                                    {q.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-500 font-medium mb-6">Didn't find what you were looking for?</p>
                    <Link 
                        to="/settings?tab=Feedback" 
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 hover:bg-black text-white font-bold text-[13px] uppercase tracking-[0.1em] rounded-sm transition-all"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
