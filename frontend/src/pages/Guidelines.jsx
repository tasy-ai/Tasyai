import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Target, 
  Zap, 
  BarChart3, 
  Users, 
  CheckCircle2, 
  Layout, 
  ArrowRight,
  TrendingUp,
  Briefcase
} from 'lucide-react';
import SEO from '../components/SEO';

const Guidelines = () => {
    const components = [
        { title: "Title / Cover", desc: "Company name, 1‑line tagline, logo, founder names + titles, contact info." },
        { title: "One‑sentence Vision", desc: "Big-picture mission and what you’ll become (1–2 lines)." },
        { title: "Problem", desc: "Top 2–3 pain points with evidence (quotes, stats, anecdotes)." },
        { title: "Existing Alternatives", desc: "Short map of incumbent & indirect solutions and why they fail." },
        { title: "Solution / Product", desc: "Product overview, core value prop, 1–2 screenshots or visuals." },
        { title: "Why Now", desc: "Macro trends, adoption signals, technology enablers." },
        { title: "Market Size", desc: "TAM/SAM/SOM with credible top-down and bottom-up estimates." },
        { title: "Business Model", desc: "Pricing, margins, sales motions, key unit economics (LTV, CAC)." },
        { title: "Traction / Metrics", desc: "KPIs: growth rate, ARR/MRR, users, retention/conversion." },
        { title: "Go‑to‑Market", desc: "Channels, sales cycle, partnerships, key hires, CAC payback." },
        { title: "Competitive Advantage", desc: "Defensible edges: network effects, data, IP, distribution." },
        { title: "Team", desc: "Founders’ bios (relevant experience), key hires, advisors." },
        { title: "Financials", desc: "3-year plan: revenue forecast, burn, runway, next milestones." },
        { title: "Use of Funds", desc: "Allocation strategy: hiring, product, GTM splits, runway." },
        { title: "Closing / Ask", desc: "Restate the raise, type of round, target close timeline." }
    ];

    const bigThree = [
        {
            title: "Problem",
            icon: Target,
            content: "If you were the customer, would you pay for it? Is it the solution that people want? How many people are there who would use your product and be satisfied with it?"
        },
        {
            title: "Solution",
            icon: Zap,
            content: "Why are you better than other competitors? Does your team have all the necessary skills, expertise, and endurance to keep up with the vision?"
        },
        {
            title: "Traction & Market",
            icon: BarChart3,
            content: "How much time and money does it need to breakeven? How repetitive are your customers? What happens if you launch later versus today?"
        }
    ];

    return (
        <div className="min-h-screen bg-[#fcfbf9] font-sans pb-32">
            <SEO title="Guidelines | How to write a Pitch Deck" description="Master the art of presenting your startup to world-class investors." />
            
            {/* Hero Section */}
            <header className="pt-24 pb-20 px-6 border-b border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-[#ff5a00] text-[10px] font-black uppercase tracking-widest rounded-sm mb-6">
                        <FileText className="size-3" strokeWidth={3} /> Founder Resources
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[0.95] tracking-tight mb-8">
                        How to write a <br/><span className="text-[#ff5a00]">Pitch Deck.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl leading-relaxed">
                        A pitch deck is a presentation prepared to present your company to investors for raising funds. It holds the info that matters and the details investors want to know before making an investing decision.
                    </p>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-20">
                
                {/* The Big Three Section */}
                <section className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-[2px] w-12 bg-[#ff5a00]"></div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">The Big Three</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {bigThree.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div 
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="p-8 bg-white border border-gray-200 shadow-sm rounded-sm"
                                >
                                    <div className="size-12 bg-orange-50 text-[#ff5a00] rounded-sm flex items-center justify-center mb-6">
                                        <Icon className="size-6" strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 mb-4">{item.title}</h3>
                                    <p className="text-[14px] text-gray-600 font-medium leading-relaxed">
                                        {item.content}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>
                </section>

                {/* Core Components */}
                <section className="mb-32 grid lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-1">
                        <div className="sticky top-12">
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-6">Core Components</h2>
                            <p className="text-gray-500 font-medium leading-relaxed mb-8">
                                A simple pitch deck should follow this flow to ensure investors get all the essential info sequentially.
                            </p>
                            <div className="p-6 bg-[#1a1a1a] text-white rounded-sm">
                              <p className="text-sm font-bold opacity-60 uppercase tracking-widest mb-4">Golden Rule</p>
                              <p className="text-lg leading-relaxed italic">
                                "The best way to raise funds is through customers. Investors care about PMF and Traction above all else."
                              </p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 space-y-4">
                        {components.map((comp, i) => (
                            <div key={i} className="flex gap-6 p-6 bg-white border border-gray-100 hover:border-orange-200 transition-colors group">
                                <span className="text-2xl font-black text-gray-200 group-hover:text-orange-100 transition-colors shrink-0">
                                    {(i + 1).toString().padStart(2, '0')}
                                </span>
                                <div>
                                    <h4 className="text-[16px] font-black text-gray-900 mb-1">{comp.title}</h4>
                                    <p className="text-[14px] text-gray-500 font-medium">{comp.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Important Tips */}
                <section className="bg-orange-50 border border-orange-100 p-12 md:p-16 rounded-sm">
                    <h2 className="text-3xl font-black text-gray-900 mb-12 tracking-tight">Essential Tips</h2>
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="size-5 text-[#ff5a00] shrink-0 mt-0.5" strokeWidth={3} />
                                <span className="text-[15px] text-gray-700 font-bold leading-relaxed">Make it clear and concise. One-pagers are your friend.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="size-5 text-[#ff5a00] shrink-0 mt-0.5" strokeWidth={3} />
                                <span className="text-[15px] text-gray-700 font-bold leading-relaxed">Focus on Product-Market Fit (PMF) and Traction.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="size-5 text-[#ff5a00] shrink-0 mt-0.5" strokeWidth={3} />
                                <span className="text-[15px] text-gray-700 font-bold leading-relaxed">Use conclusions as titles. e.g., "4 Million want personal bikes".</span>
                            </li>
                        </div>
                        <div className="space-y-6">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="size-5 text-[#ff5a00] shrink-0 mt-0.5" strokeWidth={3} />
                                <span className="text-[15px] text-gray-700 font-bold leading-relaxed">Be human, not a robot. Balance passion with expertise.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="size-5 text-[#ff5a00] shrink-0 mt-0.5" strokeWidth={3} />
                                <span className="text-[15px] text-gray-700 font-bold leading-relaxed">Action speaks louder than words. Use data, stats, and graphs.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="size-5 text-[#ff5a00] shrink-0 mt-0.5" strokeWidth={3} />
                                <span className="text-[15px] text-gray-700 font-bold leading-relaxed">Design so your deck can be explained by someone else easily.</span>
                            </li>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Guidelines;
