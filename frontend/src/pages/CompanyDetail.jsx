import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { 
  Building2, 
  MapPin, 
  Globe, 
  Users, 
  Rocket, 
  TrendingUp, 
  Briefcase,
  ChevronLeft,
  Share2,
  Bookmark,
  ExternalLink,
  Code2,
  CheckCircle2
} from 'lucide-react';
import { companies } from '../data/dashboardData';

const CompanyDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const companyId = queryParams.get('id');

  let company = location.state?.company;

  if (!company && companyId) {
      company = companies.find(c => c.id === parseInt(companyId));
      // Enhance mock data if missing fields
      if (company && !company.location) {
          company = {
              ...company,
              location: 'San Francisco, CA',
              website: 'www.example.com',
              founded: '2022',
              teamSize: '10-50',
              funding: 'Series A',
              techStack: ['React', 'Node.js', 'Python', 'AWS'],
              about: `At ${company.name}, we are driven by a mission to revolutionize the industry. Our team of passionate engineers and designers are building the future of technology.`
          }
      }
  }

  if (!company) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#020617] text-white">
            <div className="text-center">
                <h2 className="text-xl font-bold mb-2">Company not found</h2>
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="px-4 py-2 bg-[#4245f0] rounded-lg hover:bg-[#4245f0]/90 transition-colors mt-4"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
  }

  const getColorClasses = (color) => {
    const colors = {
      primary: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
      emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    };
    return colors[color] || colors.primary;
  };

  const IconComponent = company.icon || Building2;

  return (
    <div className="bg-[#020617] text-slate-100 font-sans min-h-screen flex overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <motion.main 
        layout
        className={`flex-1 overflow-y-auto h-full bg-[#020617] ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'}`}
      >
        {/* Banner */}
        <div className="h-64 sticky top-0 z-0 bg-gradient-to-r from-slate-900 to-[#020617] relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2301&ixlib=rb-4.0.3')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent"></div>
            <button 
                onClick={() => navigate(-1)}
                className="absolute top-8 left-8 p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors z-10"
            >
                <ChevronLeft className="size-5 text-white" />
            </button>
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10 -mt-24 pb-32">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
                <div className={`w-32 h-32 rounded-3xl flex items-center justify-center border-4 border-[#020617] bg-[#0f172a] shadow-2xl ${getColorClasses(company.color)}`}>
                    <IconComponent className="size-16" />
                </div>
                <div className="flex-1 pt-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-4xl font-extrabold text-white mb-2">{company.name}</h1>
                            <p className="text-xl text-slate-400 mb-4 font-light">{company.description}</p>
                            
                            <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-300">
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                    <MapPin className="size-4 text-[#4245f0]" />
                                    {company.location || 'San Francisco, CA'}
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                    <Globe className="size-4 text-emerald-400" />
                                    {company.website || 'Website'}
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                    <Users className="size-4 text-amber-400" />
                                    {company.teamSize || '10-50'} Employees
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <Share2 className="size-5 text-slate-400" />
                            </button>
                            <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <Bookmark className="size-5 text-slate-400" />
                            </button>
                            <button className="py-3 px-6 rounded-xl bg-[#4245f0] hover:bg-[#4245f0]/90 font-bold transition-all shadow-lg shadow-[#4245f0]/20">
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* About */}
                    <section className="glass rounded-3xl p-8 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Building2 className="size-5 text-[#4245f0]" />
                            About Company
                        </h3>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            {company.about || "We are a mission-driven team working on solving complex problems. Join us to build the future."}
                        </p>
                    </section>

                    {/* Tech Stack */}
                    <section className="glass rounded-3xl p-8 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Code2 className="size-5 text-emerald-400" />
                            Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {(company.techStack || ['React', 'Node.js', 'Typescript', 'AWS']).map((tech) => (
                                <div key={tech} className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-slate-300 font-medium hover:border-white/20 transition-colors">
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Open Roles */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Briefcase className="size-5 text-amber-400" />
                            Open Positions
                        </h3>
                        {company.roles.map((role) => (
                            <div key={role} className="glass p-6 rounded-2xl border border-white/10 hover:border-[#4245f0]/30 transition-all group cursor-pointer">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="text-lg font-bold text-white group-hover:text-[#4245f0] transition-colors">{role}</h4>
                                        <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                                            <span>Full-time</span>
                                            <span>•</span>
                                            <span>Remote / Hybrid</span>
                                            <span>•</span>
                                            <span>$120k - $160k</span>
                                        </div>
                                    </div>
                                    <ChevronLeft className="rotate-180 text-slate-600 group-hover:text-[#4245f0] transition-colors" />
                                </div>
                            </div>
                        ))}
                    </section>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    <div className="glass rounded-3xl p-6 border border-white/10 space-y-6">
                        <h3 className="font-bold text-white">Company Details</h3>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between py-3 border-b border-white/5">
                                <span className="text-slate-500">Founded</span>
                                <span className="font-medium text-white">{company.founded || '2021'}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-white/5">
                                <span className="text-slate-500">Stage</span>
                                <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#4245f0]/20 text-[#4245f0]">{company.funding || 'Seed'}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-white/5">
                                <span className="text-slate-500">Team Size</span>
                                <span className="font-medium text-white">{company.teamSize || '10-50'}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-white/5">
                                <span className="text-slate-500">Headquarters</span>
                                <span className="font-medium text-white text-right">{company.location || 'San Francisco'}</span>
                            </div>
                        </div>

                        <div className="pt-2">
                            <h4 className="text-sm font-bold text-slate-400 uppercase mb-3">Founders</h4>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="size-10 rounded-full bg-slate-700"></div>
                                <div>
                                    <p className="font-bold text-white text-sm">Sarah Connor</p>
                                    <p className="text-xs text-slate-500">CEO & Co-founder</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="glass rounded-3xl p-6 border border-white/10 bg-gradient-to-br from-[#4245f0]/10 to-transparent">
                        <Rocket className="size-8 text-[#4245f0] mb-4" />
                        <h3 className="text-lg font-bold text-white mb-2">Join the mission</h3>
                        <p className="text-sm text-slate-400 mb-4">View all 12 open positions and find your perfect role at {company.name}.</p>
                        <button className="w-full py-3 rounded-xl bg-white text-[#0f172a] font-bold hover:bg-slate-200 transition-colors">
                            View All Jobs
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </motion.main>
    </div>
  );
};

export default CompanyDetail;
