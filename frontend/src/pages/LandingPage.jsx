import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Sparkles
} from 'lucide-react';

// --- Sub-Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 border-b border-white/5 ${
        scrolled ? 'bg-[#020617]/90 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="size-8 bg-indigo-600 rounded flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Code2 className="text-white size-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">Tasyai</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {['Manifesto', 'Pulse', 'Journey'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-sm font-medium text-white/60 hover:text-indigo-400 transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden sm:block px-5 py-2 text-sm font-bold text-white/80 hover:text-white transition-all">
            Sign In
          </Link>
          <Link to="/register" className="px-5 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:brightness-110 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]">
            Join the Build
          </Link>
        </div>
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Nebula Background */}
      <div className="absolute inset-0 z-0 bg-[#020617]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight mb-8">
            Don’t Apply for Jobs.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-400 italic">
              Build Something
            </span> That Matters.
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          A startup collaboration platform emphasizing community and building over traditional hiring. No corporate clutter. Pure human connection.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/register" className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white font-bold rounded-xl text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2 group">
            I’m a Founder
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/register" className="w-full sm:w-auto px-10 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-bold rounded-xl text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            I’m Talent
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const Ticker = () => {
  const items = [
    { text: "Ankit matched with AI founder", icon: "pulse", color: "bg-green-500" },
    { text: "New role: UX Intern (Equity)", icon: "token", color: "text-indigo-400" },
    { text: "Sarah joined FinTech project", icon: "dot", color: "bg-blue-400" },
    { text: "Founder: Need Next.js expert", icon: "terminal", color: "text-violet-400" },
    { text: "Project 'Solaris' reached MVP", icon: "dot", color: "bg-orange-400" },
  ];

  return (
    <div className="py-8 border-y border-white/5 bg-[#020617]/50 backdrop-blur-sm relative z-20 overflow-hidden">
      <div className="ticker-container flex whitespace-nowrap">
        <div className="animate-scroll flex gap-6 px-6 hover:[animation-play-state:paused]">
          {[...items, ...items, ...items].map((item, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 px-6 py-2 rounded-full flex items-center gap-3 hover:bg-white/10 transition-colors cursor-default">
              {item.icon === 'pulse' ? (
                <span className={`size-2 rounded-full ${item.color} animate-pulse`} />
              ) : item.icon === 'dot' ? (
                <span className={`size-2 rounded-full ${item.color}`} />
              ) : (
                <Terminal className={`size-4 ${item.color}`} />
              )}
              <span className="text-sm font-medium text-white/80">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BridgeSection = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-bold mb-4 text-white">The Bridge</h2>
        <p className="text-white/40">Connect over problems, not job descriptions.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-0 items-center relative">
        {/* Vertical Divider */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent" />
        
        {/* Left: Founder */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:pr-20 flex flex-col items-end text-right gap-6"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl border-r-4 border-indigo-500/40 max-w-md hover:bg-white/10 transition-all">
            <p className="text-indigo-400 text-xs font-black uppercase tracking-widest mb-2">Founder Persona</p>
            <p className="text-xl font-medium text-white leading-relaxed">
              "I have the users, but I need to fix onboarding drop-offs before we scale."
            </p>
          </div>
          <div className="flex items-center gap-3 text-white/40">
            <span className="text-sm italic">Searching for specific impact</span>
            <Sparkles className="size-4" />
          </div>
        </motion.div>

        {/* Mobile Connector */}
        <div className="md:hidden flex justify-center py-4">
          <div className="h-12 w-px bg-indigo-500 shadow-[0_0_10px_#6366f1]" />
        </div>

        {/* Right: Talent */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:pl-20 flex flex-col items-start gap-6"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl border-l-4 border-violet-400/40 max-w-md hover:bg-white/10 transition-all">
            <p className="text-violet-400 text-xs font-black uppercase tracking-widest mb-2">Talent Persona</p>
            <p className="text-xl font-medium text-white leading-relaxed">
              "I can redesign your UX and setup the analytics to prove where users leave."
            </p>
          </div>
          <div className="flex items-center gap-3 text-white/40">
            <Rocket className="size-4" />
            <span className="text-sm italic">Ready to solve real bottlenecks</span>
          </div>
        </motion.div>

        {/* Central Node */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 bg-indigo-500 rounded-full shadow-[0_0_30px_#6366f1] animate-pulse" />
      </div>
    </section>
  );
};

const Timeline = () => {
  const steps = [
    {
      num: "01",
      title: "Express Interest",
      desc: "Browse active challenges from vetted founders. No resumes required, just show your intent to help.",
      active: true
    },
    {
      num: "02",
      title: "Accept",
      desc: "If there's a match in values and vision, you're in. This isn't a 5-stage interview; it's a conversation.",
      active: false
    },
    {
      num: "03",
      title: "Unlock Chat",
      desc: "Access private workspace and direct messaging. Start aligning on the immediate milestones.",
      active: false
    },
    {
      num: "04",
      title: "Build",
      desc: "Collaborate on the project, earn equity or project fees, and grow your reputation as a builder.",
      active: false
    }
  ];

  return (
    <section id="journey" className="py-24 bg-surface/30 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-16 text-center text-white">How it works</h2>
        <div className="space-y-0">
          {steps.map((step, idx) => (
            <div key={idx} className="relative pl-12 pb-16 border-l border-white/10 last:pb-0 last:border-0 group">
              <div className={`absolute -left-[9px] top-0 size-4 rounded-full transition-all duration-500 ${
                step.active 
                  ? 'bg-indigo-600 ring-4 ring-indigo-500/20 shadow-[0_0_15px_#6366f1]' 
                  : 'bg-white/20 group-hover:bg-indigo-500'
              }`} />
              
              <div className="flex flex-col gap-2">
                <span className={`font-bold text-sm tracking-widest uppercase ${
                  step.active ? 'text-indigo-400' : 'text-white/40 group-hover:text-white/60'
                }`}>
                  {step.num}. {step.title}
                </span>
                <h3 className={`text-2xl font-bold ${step.active ? 'text-white' : 'text-white/80'}`}>
                  {step.title}
                </h3>
                <p className="text-white/50 max-w-lg leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Values = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl border-t-2 border-indigo-500 hover:bg-white/10 transition-all"
        >
          <Rocket className="text-indigo-500 size-10 mb-6" />
          <h3 className="text-4xl font-black mb-4 tracking-tighter italic text-white">Build &gt; Resume</h3>
          <p className="text-lg text-white/50 leading-relaxed">
            A list of past employers doesn't tell us what you're capable of doing today. We prioritize your current output and problem-solving velocity over your LinkedIn history.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl border-t-2 border-violet-400 hover:bg-white/10 transition-all"
        >
          <Zap className="text-violet-400 size-10 mb-6" />
          <h3 className="text-4xl font-black mb-4 tracking-tighter italic text-white">Intent &gt; Experience</h3>
          <p className="text-lg text-white/50 leading-relaxed">
            Ten years of doing the same thing is not experience. Ten days of intense building with high intent is. We find the hungry, not the settled.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-32 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-indigo-500/10 rounded-full blur-[150px]" />
      </div>
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-white">
          Your next opportunity won’t come from applying. It comes from collaborating.
        </h2>
        <p className="text-white/40 text-lg mb-12">
          Stop waiting for the perfect job post. Start finding the perfect problem.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register" className="w-full sm:w-auto px-12 py-5 bg-indigo-600 text-white font-bold rounded-2xl text-xl hover:shadow-[0_0_30px_#6366f1] transition-all hover:scale-105">
            Start Building
          </Link>
          <button className="w-full sm:w-auto px-12 py-5 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-bold rounded-2xl text-xl hover:bg-white/10 transition-all">
            Read Manifesto
          </button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5 text-center bg-[#020617]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Code2 className="text-indigo-500 size-6" />
          <span className="font-bold tracking-tight text-white">Tasyai v1.0</span>
        </div>
        <p className="text-white/20 text-sm">
          © 2024 Experimental Startup Collaboration Platform. Made for the builders.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-white/40 hover:text-indigo-400 transition-colors"><Globe size={20} /></a>
          <a href="#" className="text-white/40 hover:text-indigo-400 transition-colors"><Github size={20} /></a>
          <a href="#" className="text-white/40 hover:text-indigo-400 transition-colors"><Rss size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

// --- Main Component ---

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-indigo-500/30">

      
      <Navbar />
      <main>
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