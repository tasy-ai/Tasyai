import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { 
  Rocket, 
  ArrowRight, 
  CheckCircle2,
  TrendingUp,
  Zap
} from 'lucide-react';
import authService from '../services/authService';

const Navbar = () => {
  return (
    <header className="w-full py-6 px-6 md:px-12 flex items-center justify-between bg-[#fcfbf9] z-50">
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="size-6 bg-[#e75c13] rounded-sm flex items-center justify-center"></div>
        <span className="text-xl font-black tracking-tight text-[#1a1a1a]">Tasyai</span>
      </div>
      
      <nav className="hidden md:flex items-center gap-8">
        {['FOUNDERS', 'TALENT', 'SHOWCASE', 'PRICING'].map((item) => (
          <a key={item} href="#" className="text-xs font-bold tracking-widest text-[#e75c13] hover:text-[#c44e10] transition-colors">
            {item}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-5">
        {authService.getCurrentUser() ? (
          <Link to="/dashboard" className="px-5 py-2.5 bg-[#d85511] text-white text-sm font-bold rounded-lg hover:bg-[#b5460e] transition-colors">
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link to="/login" className="hidden sm:block text-sm font-semibold text-gray-500 hover:text-[#1a1a1a] transition-colors">
              Sign in
            </Link>
            <Link to="/register" className="px-5 py-2.5 bg-[#d85511] text-white text-sm font-bold rounded-lg hover:bg-[#b5460e] transition-colors">
              Get Started
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="pt-16 pb-20 px-6 text-center max-w-5xl mx-auto flex flex-col items-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 uppercase tracking-widest text-[10px] font-bold text-gray-500 mb-8 border border-gray-200">
        <span className="text-[#e75c13]">🚀</span> REDEFINING THE STARTUP HUB
      </div>
      
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-[#1a1a1a] leading-[0.95] tracking-tighter mb-6 relative">
        Don’t Apply for Jobs.<br />
        <span className="text-[#e75c13]">Build Something</span><br />
        That Matters.
      </h1>

      <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
        A high-intensity collaboration hub for world-class founders and talent. We don't match resumes; we spark revolutions.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-[#b5460e] text-white font-bold tracking-wide rounded-md text-sm hover:bg-[#91380b] transition-colors text-center">
          LAUNCH A PROJECT
        </Link>
        <Link to="/showcase" className="w-full sm:w-auto px-8 py-4 bg-[#e5e5e5] text-[#1a1a1a] font-bold tracking-wide rounded-md text-sm hover:bg-[#d4d4d4] transition-colors flex items-center justify-center gap-2">
          EXPLORE SHOWCASE <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
};

const PulseSection = () => {
  const activities = [
    {
      initials: "JD",
      name: "Julian D.",
      action: "created a vision for",
      project: "NexusLinter",
      desc: `"Building the first smart code linter for low-latency systems... High conviction!"`,
      tags: ["Core Engineer Needed", "2% Founders Equity"],
      time: "2m ago",
      bgColor: "bg-red-100",
      textColor: "text-red-700"
    },
    {
      initials: "SK",
      name: "Sarah K.",
      action: "joined",
      project: "Aura.ai",
      role: "as Lead Designer",
      desc: `Sarah matched with Aura.ai via intent-matching. Focus: Prototyping and UX strategy.`,
      tags: ["UX/UI Refactor Phase"],
      time: "14m ago",
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-700",
      icon: <CheckCircle2 className="size-5 text-[#1a1a1a]" />
    },
    {
      initials: "TM",
      name: "Team Mercury",
      action: "reached",
      project: "MVP Milestone",
      desc: `Project is now live in early alpha. Built by 3 Collaborate.YC founders.`,
      tags: [],
      time: "1h ago",
      bgColor: "bg-gray-200",
      textColor: "text-gray-700",
      icon: <TrendingUp className="size-5 text-[#1a1a1a]" />
    }
  ];

  return (
    <section className="py-10 px-6 max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg text-[#1a1a1a]">Live Collaboration Pulse</h3>
            <p className="text-sm text-gray-400">Real-time ecosystem activity across the network</p>
          </div>
          <div className="flex gap-1">
            <span className="size-2 bg-[#e75c13] rounded-full animate-pulse"></span>
            <span className="size-2 bg-gray-300 rounded-full"></span>
          </div>
        </div>

        <div className="space-y-4">
          {activities.map((act, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex gap-4">
              <div className={`size-10 rounded-md flex items-center justify-center font-bold text-sm ${act.bgColor} ${act.textColor} shrink-0`}>
                {act.initials}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm text-[#1a1a1a] pr-4">
                    <span className="font-bold">{act.name}</span> {act.action} <span className="font-bold text-[#e75c13]">{act.project}</span> {act.role}
                  </p>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{act.time}</span>
                </div>
                <p className="text-sm text-gray-500 mb-3 italic">
                  {act.desc}
                </p>
                {act.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {act.tags.map((tag, j) => (
                      <span key={j} className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded bg-orange-50 text-[#e75c13]">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {act.icon && (
                <div className="shrink-0 flex items-center">
                  {act.icon}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1c1c1c] rounded-2xl p-8 text-white shadow-xl lg:mt-8 relative overflow-hidden">
        {/* Glow effect behind stats */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#e75c13] opacity-20 blur-[50px] rounded-full"></div>
        <div className="relative z-10">
          <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-6">Network Strength</p>
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="text-6xl font-black tracking-tighter">42.8k</h2>
            <TrendingUp className="text-[#e75c13] size-8" />
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-8">
            World-class builders dividing tasks, breaking barriers, and building real alternatives.
          </p>
          
          <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 mb-8">
            <div className="flex -space-x-2">
              <div className="size-8 rounded-full bg-orange-500 border-2 border-[#1c1c1c]"></div>
              <div className="size-8 rounded-full bg-blue-500 border-2 border-[#1c1c1c]"></div>
              <div className="size-8 rounded-full bg-emerald-500 border-2 border-[#1c1c1c]"></div>
            </div>
            <p className="text-[11px] font-bold tracking-wide">Active builders right now</p>
          </div>

          <button className="w-full py-3 border border-gray-600 rounded-md text-xs font-bold tracking-widest hover:bg-white/5 transition-colors">
            VIEW NETWORK STATS
          </button>
        </div>
      </div>
    </section>
  );
};

const VisionMission = () => {
  return (
    <section className="max-w-[1400px] w-full mx-auto border-t border-b border-gray-200 mt-20 grid md:grid-cols-2">
      {/* Vision Card */}
      <div className="p-12 lg:p-24 bg-white flex flex-col justify-center">
        <Rocket className="size-8 text-[#e75c13] mb-8" />
        <h2 className="text-3xl md:text-5xl font-black text-[#1a1a1a] leading-tight mb-6">
          I have the Vision, but I need the Hands.
        </h2>
        <p className="text-gray-500 font-medium mb-10 leading-relaxed max-w-md text-lg">
          Stop scrolling LinkedIn for "candidates." Find obsessed builders who don't want a salary—they want a legacy.
        </p>
        <ul className="space-y-4 mb-12">
          {['Access TO verified talent', 'Automated equity framework setup', 'Proof-of-Work verified profiles'].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-[#1a1a1a] font-bold text-sm">
              <CheckCircle2 className="size-5 text-[#e75c13] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <Link to="/register" className="inline-flex items-center gap-2 text-xs font-bold text-[#e75c13] tracking-widest uppercase hover:text-[#b5460e] transition-colors">
          Start Recruiting Obsession <ArrowRight className="size-4" />
        </Link>
      </div>

      {/* Mission Card */}
      <div className="p-12 lg:p-24 bg-[#1c1c1c] flex flex-col justify-center">
        <Zap className="size-8 text-[#e75c13] mb-8" />
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
          I have the Hands, but I need the Mission.
        </h2>
        <p className="text-gray-400 font-medium mb-10 leading-relaxed max-w-md text-lg">
          Resumes are for corporate cogs. Show your GitHub, your side projects, and your drive. Join the next decacorn at Day 1.
        </p>
        <ul className="space-y-4 mb-12">
          {['Direct access to Founding Teams', 'Equity-heavy roles for top builders', 'Escrew-based co-founding API'].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-white font-bold text-sm">
              <CheckCircle2 className="size-5 text-[#e75c13] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <Link to="/register" className="inline-flex items-center gap-2 text-xs font-bold text-[#e75c13] tracking-widest uppercase hover:text-[#c44e10] transition-colors">
          Find Your Life's Work <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
};

const EntryPoints = () => {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-black text-center text-[#1a1a1a] mb-12 tracking-tight">Choose Your Entry Point</h2>
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
        {/* Founder Mode */}
        <div className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-gradient-to-br from-[#2a2a2a] to-[#111111] group cursor-pointer flex items-end p-8 md:p-12 hover:-translate-y-2 transition-transform duration-300">
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
             <div className="absolute top-10 left-10 w-64 h-64 bg-orange-600 rounded-full blur-[100px]"></div>
             <div className="absolute bottom-10 right-10 w-64 h-64 bg-red-800 rounded-full blur-[100px]"></div>
          </div>
          
          <div className="relative z-10 w-full">
            <span className="inline-block px-3 py-1 bg-[#e75c13] text-white text-[10px] font-bold uppercase tracking-widest rounded mb-4">MODE: ALPHA</span>
            <h3 className="text-4xl font-black text-white mb-4">Founder Mode</h3>
            <p className="text-white/70 font-medium max-w-[200px] mb-8 text-sm leading-relaxed">
              Build the core team that scales your vision from zero to one.
            </p>
            <div className="size-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <ArrowRight className="text-[#1a1a1a] size-6" />
            </div>
          </div>
        </div>

        {/* Talent Mode */}
        <div className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-gradient-to-br from-[#404040] to-[#222222] group cursor-pointer flex items-end p-8 md:p-12 hover:-translate-y-2 transition-transform duration-300">
           <div className="absolute inset-0 opacity-20">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 w-full">
            <span className="inline-block px-3 py-1 bg-[#e75c13] text-white text-[10px] font-bold uppercase tracking-widest rounded mb-4">MODE: BETA</span>
            <h3 className="text-4xl font-black text-white mb-4">Talent Mode</h3>
            <p className="text-white/70 font-medium max-w-[200px] mb-8 text-sm leading-relaxed">
              Apply your skills where they are truly needed. No corporate fluff.
            </p>
            <div className="size-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="text-[#e75c13] size-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto flex flex-col items-center">
      <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">Our Philosophy</span>
      <h2 className="text-4xl font-black text-[#1a1a1a] mb-20 tracking-tight">Ship or Die.</h2>

      <div className="grid sm:grid-cols-2 gap-12 w-full">
        <div className="border-l-[3px] border-[#a03006] pl-6 md:pl-8">
          <h3 className="text-3xl font-black text-[#1a1a1a] mb-4">Build &gt; Resume</h3>
          <p className="text-gray-500 font-medium leading-relaxed">
            We don't care where you went to school. We care what you've shipped. Your portfolio is your password to the elite circle.
          </p>
        </div>
        <div className="border-l-[3px] border-[#e75c13] pl-6 md:pl-8">
          <h3 className="text-3xl font-black text-[#1a1a1a] mb-4">Intent &gt; Experience</h3>
          <p className="text-gray-500 font-medium leading-relaxed">
            Obsession beats 10 years of "experience" every time. We help founders find the people who will stay up all night to solve the "unsolvable."
          </p>
        </div>
      </div>
    </section>
  );
};

const BottomCTA = () => {
  return (
    <section className="pb-24 px-6 max-w-6xl mx-auto mt-12">
      <div className="bg-gradient-to-br from-[#d34e15] to-[#8f2f05] rounded-[2.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
        {/* Abstract rings */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[30rem] h-[30rem] border-[60px] border-white/5 rounded-full pointer-events-none"></div>
        <div className="absolute top-10 right-10 -mr-32 -mt-32 w-[30rem] h-[30rem] border-[60px] border-white/5 rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[40rem] h-[40rem] bg-white/5 rounded-full pointer-events-none blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1] mb-6">
            Ready to disrupt the<br />status quo?
          </h2>
          <p className="text-white/90 font-medium text-lg md:text-xl mb-12 max-w-xl">
            Join Tasyai and start building the future today.
          </p>
          <Link to="/register" className="inline-block px-10 py-5 bg-white text-[#b5460e] font-black tracking-widest text-sm rounded-xl hover:bg-gray-100 transition-transform hover:scale-105 active:scale-95 uppercase shadow-xl">
            Apply to Join the Network
          </Link>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-[#fcfbf9] pt-20 pb-12 px-6 max-w-6xl mx-auto border-t border-gray-200">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-black tracking-tight text-[#e75c13]">Tasyai</span>
          </div>
          <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-xs">
            © 2024 Spatial Canvas. A YC-inspired Platform<br/>for world class builders.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-[10px] tracking-widest uppercase text-gray-400 mb-6">Network</h4>
          <ul className="space-y-4">
            <li><Link to="/founders" className="text-sm font-bold text-gray-700 hover:text-[#e75c13] transition-colors">Founders</Link></li>
            <li><Link to="/talent" className="text-sm font-bold text-gray-700 hover:text-[#e75c13] transition-colors">Talent</Link></li>
            <li><Link to="/showcase" className="text-sm font-bold text-gray-700 hover:text-[#e75c13] transition-colors">Showcase</Link></li>
          </ul>
        </div>

        <div>
           <div className="flex gap-x-16 gap-y-12 flex-wrap">
              <div>
                <h4 className="font-bold text-[10px] tracking-widest uppercase text-gray-400 mb-6">Legal</h4>
                <ul className="space-y-4">
                  <li><Link to="/privacy" className="text-sm font-bold text-gray-700 hover:text-[#e75c13] transition-colors">Privacy</Link></li>
                  <li><Link to="/terms" className="text-sm font-bold text-gray-700 hover:text-[#e75c13] transition-colors">Terms</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[10px] tracking-widest uppercase text-gray-400 mb-6">Social</h4>
                <ul className="space-y-4">
                  <li><a href="#" className="text-sm font-bold text-gray-700 hover:text-[#e75c13] transition-colors">Twitter</a></li>
                  <li><a href="#" className="text-sm font-bold text-gray-700 hover:text-[#e75c13] transition-colors">LinkedIn</a></li>
                </ul>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#fcfbf9] font-sans selection:bg-[#e75c13] selection:text-white">
      <SEO 
        title="Tasyai - Redefining the Startup Hub"
        description="Don't apply for jobs. Build something that matters."
        keywords="tasyai, startup hub, build something, collaborate"
      />
      <Navbar />
      <main>
        <Hero />
        <PulseSection />
        <VisionMission />
        <EntryPoints />
        <Philosophy />
        <BottomCTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;