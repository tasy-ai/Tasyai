import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { 
  Rocket, 
  Zap, 
  Code2, 
  Terminal, 
  Globe, 
  Github, 
  Rss, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  X
} from 'lucide-react';

// --- Sub-Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 px-4 md:px-8 transition-all duration-500 border-b ${
        scrolled ? 'bg-[#020617]/80 backdrop-blur-xl py-3 border-white/10' : 'bg-transparent py-5 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="size-9 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-all shadow-lg shadow-indigo-500/20">
            <Code2 className="text-white size-5" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white group-hover:text-indigo-400 transition-colors uppercase">Tasyai.</span>
        </div>
        
        <nav className="hidden lg:flex items-center gap-10">
          {['Manifesto', 'Pulse', 'Journey'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden sm:block px-6 py-2 text-xs font-black uppercase tracking-widest text-white/60 hover:text-white transition-all border border-transparent hover:border-white/10 rounded-xl">
            Login
          </Link>
          <Link to="/register" className="px-6 py-2.5 bg-white text-[#020617] text-xs font-extrabold uppercase tracking-widest rounded-xl hover:bg-indigo-500 hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95">
            Join Platform
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/60 hover:text-white transition-all"
          >
            {mobileMenuOpen ? <X size={24} /> : <Rocket size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#020617] border-b border-white/10 p-6 flex flex-col gap-4 lg:hidden"
          >
            {['Manifesto', 'Pulse', 'Journey'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 py-2 border-b border-white/5"
              >
                {item}
              </a>
            ))}
            <Link to="/login" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 py-2">Account Login</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-32 md:pt-20 px-4 overflow-hidden">
      {/* Nebula Background */}
      <div className="absolute inset-0 z-0 bg-[#020617]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-2xl backdrop-blur-md">
            <Sparkles className="size-3 animate-bounce" />
            Protocol v1.0 Operational
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.95] tracking-tighter mb-10 uppercase">
            Abandon the <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-indigo-400 to-violet-500 italic font-medium leading-none">
              9-to-5 Static.
            </span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm md:text-lg text-white/40 max-w-2xl mx-auto mb-16 font-medium leading-relaxed tracking-wide"
        >
          Tasyai is a high-fidelity collaboration nexus where visionaries and engineers converge to build sovereign tech. No resumes. No gatekeepers. Only execution.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link to="/register" className="w-full sm:w-auto px-12 py-5 bg-[#4245f0] text-white font-black rounded-[20px] text-xs uppercase tracking-[0.2em] transform hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_-10px_rgba(66,69,240,0.3)] flex items-center justify-center gap-3 group">
            Founder Access
            <Rocket className="size-4 group-hover:translate-y-[-2px] transition-transform" />
          </Link>
          <Link to="/register" className="w-full sm:w-auto px-12 py-5 bg-white/[0.03] backdrop-blur-xl border border-white/10 text-white font-black rounded-[20px] text-xs uppercase tracking-[0.2em] hover:bg-white/[0.06] transition-all flex items-center justify-center gap-3 active:scale-95">
            Talent Uplink
          </Link>
        </motion.div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </section>
  );
};

const Ticker = () => {
  const items = [
    { text: "ANONYMOUS COMMENCED NEURAL DEV", icon: "pulse", color: "bg-emerald-500" },
    { text: "NEW OPENING: CRYPTO-ARCHITECT (0.5% EQUITY)", icon: "token", color: "text-indigo-400" },
    { text: "HOUSTON STARTUP REACHES ALPHA STAGE", icon: "dot", color: "bg-blue-400" },
    { text: "FOUNDER: SEEKING NEXT.JS OPTIMIZER", icon: "terminal", color: "text-violet-400" },
    { text: "LIQUIDITY POOL SYNCED FOR 'AETHER'", icon: "dot", color: "bg-orange-400" },
  ];

  return (
    <div className="py-10 md:py-14 border-y border-white/5 bg-[#020617] relative z-20 overflow-hidden">
      <div className="ticker-container flex whitespace-nowrap">
        <div className="animate-scroll flex gap-8 px-8 hover:[animation-play-state:paused]">
          {[...items, ...items, ...items].map((item, idx) => (
            <div key={idx} className="bg-white/[0.02] border border-white/5 px-8 py-3 rounded-2xl flex items-center gap-4 hover:border-white/10 transition-all cursor-default shadow-lg">
              {item.icon === 'pulse' ? (
                <span className={`size-2.5 rounded-full ${item.color} animate-pulse shadow-[0_0_10px_#10b981]`} />
              ) : item.icon === 'dot' ? (
                <span className={`size-2.5 rounded-full ${item.color}`} />
              ) : (
                <Terminal className={`size-4 ${item.color}`} />
              )}
              <span className="text-[10px] font-black text-white/40 tracking-[0.2em] uppercase">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BridgeSection = () => {
  return (
    <section className="py-32 md:py-48 px-4 max-w-7xl mx-auto relative">
      <div className="text-center mb-24 md:mb-32">
        <div className="inline-block px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl mb-6">
          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em]">The Architecture</p>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6 leading-none">The Bridge Concept.</h2>
        <p className="text-white/20 text-sm md:text-base font-medium max-w-md mx-auto tracking-widest uppercase">Decentralized matchmaking for high-fidelity goals.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 items-stretch relative">
        {/* Vertical Divider line for desktop */}
        <div className="hidden lg:block absolute top-[10%] bottom-[10%] left-1/2 -translate-x-1/2 w-px bg-white/10" />
        
        {/* Left: Founder */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:pr-24 flex flex-col lg:items-end lg:text-right gap-8"
        >
          <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/5 p-8 md:p-12 rounded-[40px] border-r-4 border-indigo-600/40 relative group hover:bg-white/[0.04] transition-all duration-500 shadow-2xl">
            <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Origin Node (Founder)</p>
            <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
              "We've achieved product-market fit, but our throughput is lagging. We need architectural mastery to scale."
            </p>
            <div className="absolute -top-3 -right-3 p-3 bg-indigo-600 rounded-2xl shadow-xl group-hover:scale-110 transition-transform">
              <Zap size={20} className="text-white" />
            </div>
          </div>
          <div className="flex items-center gap-4 text-white/20 font-black text-[10px] uppercase tracking-widest pl-4">
            <span className="italic">Broadcasting tactical bottleneck</span>
            <Sparkles className="size-4" />
          </div>
        </motion.div>

        {/* Vertical/Horizontal Spacer for mobile */}
        <div className="lg:hidden flex justify-center py-6">
          <div className="h-20 w-px bg-gradient-to-b from-indigo-500 to-violet-500" />
        </div>

        {/* Right: Talent */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:pl-24 flex flex-col lg:items-start gap-8"
        >
          <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/5 p-8 md:p-12 rounded-[40px] border-l-4 border-violet-500/40 relative group hover:bg-white/[0.04] transition-all duration-500 shadow-2xl">
            <p className="text-violet-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Receiver Node (Talent)</p>
            <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
              "I specialize in high-availability systems. I can refactor your core pipeline and stabilize for the next phase."
            </p>
            <div className="absolute -top-3 -left-3 p-3 bg-violet-500 rounded-2xl shadow-xl group-hover:scale-110 transition-transform">
              <Code2 size={20} className="text-white" />
            </div>
          </div>
          <div className="flex items-center gap-4 text-white/20 font-black text-[10px] uppercase tracking-widest pr-4">
            <Rocket className="size-4" />
            <span className="italic">Uplink ready for deployment</span>
          </div>
        </motion.div>

        {/* Central Pulse Node */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 bg-white rounded-full shadow-[0_0_40px_rgba(255,255,255,0.8)] animate-pulse" />
      </div>
    </section>
  );
};

const Timeline = () => {
  const steps = [
    {
      num: "01",
      title: "Tactical Interest",
      desc: "Scan the sector for building challenges that align with your core capabilities. No bureaucracy.",
      active: true
    },
    {
      num: "02",
      title: "Direct Sync",
      desc: "If vision alignments hold, you commence a direct peer-to-peer dialogue with the founder.",
      active: false
    },
    {
      num: "03",
      title: "Nexus Access",
      desc: "Gain entry to the private orbital workspace. Immediate mission objectives are assigned.",
      active: false
    },
    {
      num: "04",
      title: "Deployment",
      desc: "Execute and earn sovereign equity. Your reputation as a builder is your only currency.",
      active: false
    }
  ];

  return (
    <section id="journey" className="py-32 md:py-48 bg-white/[0.01] px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">Operational Loop.</h2>
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">From zero to production</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20 relative">
          {/* Vertical line connector for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/5" />
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`flex flex-col gap-6 relative p-8 md:p-12 bg-white/[0.02] border border-white/5 rounded-[32px] hover:bg-white/[0.03] transition-all group ${idx % 2 === 0 ? 'md:text-right md:items-end' : 'md:text-left md:items-start'}`}
            >
              <div className={`p-4 rounded-2xl transition-all duration-500 ${step.active ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'bg-white/5 text-slate-500 group-hover:text-white group-hover:bg-white/10'}`}>
                <span className="text-lg font-black">{step.num}</span>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-white/30 font-medium leading-relaxed tracking-wide">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Values = () => {
  return (
    <section className="py-32 md:py-48 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <motion.div 
          whileHover={{ y: -10 }}
          className="bg-white/[0.02] backdrop-blur-xl border border-white/5 p-10 md:p-16 rounded-[48px] border-t-4 border-indigo-600 hover:bg-white/[0.04] transition-all duration-500 group"
        >
          <div className="size-16 bg-indigo-600/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <Rocket className="text-indigo-500 size-8" />
          </div>
          <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter italic text-white leading-none uppercase">Execution &gt; <br /> Credentials</h3>
          <p className="text-base md:text-lg text-white/30 font-medium leading-relaxed tracking-wide">
            The era of the legacy resume is over. We verify capability through live project performance. Your speed of learning is the ultimate metric.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -10 }}
          className="bg-white/[0.02] backdrop-blur-xl border border-white/5 p-10 md:p-16 rounded-[48px] border-t-4 border-violet-500 hover:bg-white/[0.04] transition-all duration-500 group"
        >
          <div className="size-16 bg-violet-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <Zap className="text-violet-400 size-8" />
          </div>
          <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter italic text-white leading-none uppercase">Intent &gt; <br /> Seniority</h3>
          <p className="text-base md:text-lg text-white/30 font-medium leading-relaxed tracking-wide">
            Linear career paths are obsolete. High-intent builders outpace tenured specialists. We find the hungry who are ready to own the outcome.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-48 md:py-64 px-4 text-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-indigo-600/10 rounded-full blur-[200px]" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-10 leading-[0.95] tracking-tighter text-white uppercase">
          Signal is high. <br />
          Commence <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500 italic">the build.</span>
        </h2>
        <p className="text-white/30 text-base md:text-lg mb-16 font-medium tracking-[0.2em] uppercase max-w-2xl mx-auto">
          Terminate the search. Initialize the mission.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/register" className="w-full sm:w-auto px-16 py-6 bg-white text-[#020617] font-black rounded-2xl text-xs uppercase tracking-[0.3em] hover:bg-indigo-600 hover:text-white transition-all shadow-[0_30px_60px_-15px_rgba(255,255,255,0.2)] active:scale-95">
            Synchronize Now
          </Link>
          <button className="w-full sm:w-auto px-16 py-6 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-black rounded-2xl text-xs uppercase tracking-[0.3em] hover:bg-white/10 transition-all active:scale-95">
            Manifesto
          </button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-16 px-4 border-t border-white/5 text-center bg-[#020617]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <Code2 className="text-indigo-500 size-6" />
            <span className="font-black tracking-tighter text-white uppercase text-lg">Tasyai.v1</span>
          </div>
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Built for the sovereign engineer.</p>
        </div>
        <p className="text-white/10 text-[10px] font-medium tracking-widest max-w-xs uppercase leading-relaxed">
          Experimental Protocol 2024. All rights reserved. The future belongs to the builders.
        </p>
        <div className="flex gap-4">
          {[Globe, Github, Rss].map((Icon, i) => (
            <a key={i} href="#" className="p-3 bg-white/5 rounded-xl text-white/40 hover:text-indigo-500 hover:bg-indigo-500/10 transition-all border border-transparent hover:border-indigo-500/20">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};


// --- Main Component ---

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-indigo-500/30 selection:text-white antialiased">
      <SEO 
        title="Tasyai | Sovereign Tech Collaboration Nexus"
        description="High-fidelity platform for founders and elite talent. Commencing the build of tomorrow."
      />
      
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Ticker />
        <BridgeSection />
        <Timeline />
        <Values />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;