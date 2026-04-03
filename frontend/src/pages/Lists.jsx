import React from 'react';
import { motion } from 'framer-motion';
import { 
  List, 
  Map, 
  Search, 
  Zap, 
  TrendingUp, 
  Star, 
  Users, 
  ExternalLink,
  Briefcase,
  FileText
} from 'lucide-react';
import SEO from '../components/SEO';

const Lists = () => {
    const categories = [
        {
            title: "Top Talent Sectors",
            icon: Users,
            items: ["Full-Stack Developers", "Product Designers", "Growth Strategists", "AI/ML Engineers"],
            color: "text-blue-500",
            bg: "bg-blue-50"
        },
        {
            title: "Startup Resources",
            icon: FileText,
            items: ["Pitch Deck Templates", "Equity Frameworks", "Legal Document Basics", "Fundraising Guides"],
            color: "text-emerald-500",
            bg: "bg-emerald-50"
        },
        {
            title: "Trending Markets",
            icon: TrendingUp,
            items: ["CleanTech", "MedTech", "SaaS Automation", "DeFi Infrastructure"],
            color: "text-orange-500",
            bg: "bg-orange-50"
        }
    ];

    return (
        <div className="min-h-screen bg-[#F8F7F4] font-sans pb-32">
            <SEO title="Lists & Directories | Tasyai" description="Curated lists of the best talent, resources, and startups in the Tasyai ecosystem." />
            
            {/* Header */}
            <div className="bg-white border-b border-gray-200 py-20 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="size-10 bg-gray-900 rounded-sm flex items-center justify-center text-white">
                                <List className="size-5" />
                            </div>
                            <span className="text-[11px] font-black tracking-widest uppercase text-gray-500">Resource Directories</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Curated Lists.</h1>
                        <p className="text-gray-500 font-medium max-w-xl text-lg leading-relaxed">
                            Discover high-signal talent segments and the most essential resources for your building journey.
                        </p>
                    </div>
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search lists..." 
                            className="w-full bg-gray-50 border border-gray-200 rounded-sm px-12 py-3.5 text-sm font-medium focus:outline-none focus:border-[#ff5a00] transition-colors"
                        />
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {categories.map((cat, i) => {
                        const Icon = cat.icon;
                        return (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-8 border border-gray-200 shadow-sm"
                            >
                                <div className={`size-12 ${cat.bg} ${cat.color} rounded-sm flex items-center justify-center mb-8`}>
                                    <Icon className="size-6" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 mb-8 tracking-tight">{cat.title}</h3>
                                <ul className="space-y-4">
                                    {cat.items.map((item, j) => (
                                        <li key={j} className="flex items-center justify-between group cursor-pointer">
                                            <span className="text-[14px] font-bold text-gray-700 hover:text-[#ff5a00] transition-colors">{item}</span>
                                            <ExternalLink className="size-3 text-gray-300 group-hover:text-orange-400 transition-colors" />
                                        </li>
                                    ))}
                                </ul>
                                <button className="mt-12 w-full py-2.5 bg-gray-50 text-gray-600 font-bold text-[11px] rounded-sm uppercase tracking-widest hover:bg-gray-100 transition-colors">
                                    Explore all
                                </button>
                            </motion.div>
                        )
                    })}
                </div>

                <div className="mt-32">
                    <h2 className="text-2xl font-black text-gray-900 mb-12 tracking-tight">Essential Documents</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-8 bg-white border border-gray-200 flex gap-6 hover:shadow-md transition-shadow cursor-pointer">
                             <div className="size-16 bg-[#1a1a1a] rounded-sm flex flex-col items-center justify-center text-white shrink-0">
                                <span className="text-[10px] uppercase font-black tracking-tight leading-none mb-1">PDF</span>
                                <FileText className="size-6" />
                             </div>
                             <div>
                                <h4 className="text-[17px] font-bold text-gray-900 mb-2">Standard Founders Agreement</h4>
                                <p className="text-[13px] text-gray-500 font-medium leading-relaxed">A standard YC-style template to get your co-founding journey started with clear expectations.</p>
                             </div>
                        </div>
                        <div className="p-8 bg-white border border-gray-200 flex gap-6 hover:shadow-md transition-shadow cursor-pointer">
                             <div className="size-16 bg-[#ff5a00] rounded-sm flex flex-col items-center justify-center text-white shrink-0">
                                <span className="text-[10px] uppercase font-black tracking-tight leading-none mb-1">DOC</span>
                                <Briefcase className="size-6" />
                             </div>
                             <div>
                                <h4 className="text-[17px] font-bold text-gray-900 mb-2">Technical Hiring Framework</h4>
                                <p className="text-[13px] text-gray-500 font-medium leading-relaxed">Systematic approach to evaluating talent based on obsession and ability to ship.</p>
                             </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Lists;
