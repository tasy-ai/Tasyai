import React, { useState, useEffect } from 'react';
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
  CheckCircle2,
  Loader2,
  ChevronRight
} from 'lucide-react';
import { companies as mockCompanies } from '../data/dashboardData';
import companyService from '../services/companyService';

const CompanyDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState(location.state?.company || null);

  const queryParams = new URLSearchParams(location.search);
  const companyId = queryParams.get('id');

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!company && companyId) {
        try {
          setLoading(true);
          // Try fetching from backend first
          const data = await companyService.getCompanyById(companyId);
          setCompany(data);
        } catch (err) {
          console.error("Backend fetch failed, trying mock data:", err);
          // Fallback to mock data
          const mock = mockCompanies.find(c => c.id === parseInt(companyId));
          if (mock) {
            setCompany({
              ...mock,
              location: mock.location || 'San Francisco, CA',
              website: mock.website || 'www.example.com',
              founded: '2022',
              teamSize: '10-50',
              funding: 'Series A',
              techStack: ['React', 'Node.js', 'Python', 'AWS'],
              about: `At ${mock.name}, we are driven by a mission to revolutionize the industry. Our team of passionate engineers and designers are building the future of technology.`,
              openings: [] 
            });
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [companyId]);

  if (loading) {
    return (
      <div className="flex bg-[#020617] min-h-screen">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className={`flex-1 flex items-center justify-center transition-all duration-300 ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'}`}>
          <Loader2 className="size-10 text-[#4245f0] animate-spin" />
        </div>
      </div>
    );
  }

  if (!company) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#020617] text-white">
            <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Startup Not Found</h3>
                <p className="text-slate-400 mb-8">The company you are looking for doesn't exist or has been removed.</p>
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="px-8 py-3 bg-[#4245f0] rounded-xl font-bold hover:bg-[#4245f0]/90 transition-all"
                >
                    Return to Ecosystem
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
                <div className={`w-32 h-32 rounded-3xl flex items-center justify-center border-4 border-[#020617] bg-[#0f172a] shadow-2xl overflow-hidden ${company.logo ? '' : getColorClasses(company.color || 'primary')}`}>
                    {company.logo ? (
                      <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                    ) : (
                      <Building2 className="size-16" />
                    )}
                </div>
                <div className="flex-1 pt-4">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-extrabold text-white mb-2">{company.name}</h1>
                            <p className="text-xl text-slate-400 mb-4 font-light italic">"{company.tagline}"</p>
                            
                            <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-300">
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                    <MapPin className="size-4 text-[#4245f0]" />
                                    {company.location || 'Distributed'}
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                    <Globe className="size-4 text-emerald-400" />
                                    {company.website || 'Global'}
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                    <TrendingUp className="size-4 text-amber-400" />
                                    {company.industry}
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
                            <button className="py-3 px-8 rounded-xl bg-[#4245f0] hover:bg-indigo-500 font-bold transition-all shadow-lg shadow-[#4245f0]/20">
                                Join Team
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
                            <Rocket className="size-5 text-[#4245f0]" />
                            Mission & Culture
                        </h3>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            {company.description}
                        </p>
                    </section>

                    {/* Open Roles */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Briefcase className="size-5 text-amber-400" />
                            Open Positions
                        </h3>
                        {company.openings && company.openings.length > 0 ? (
                          company.openings.map((opening, idx) => (
                              <div key={idx} className="glass p-6 rounded-2xl border border-white/10 hover:border-[#4245f0]/30 transition-all group cursor-pointer">
                                  <div className="flex justify-between items-center">
                                      <div className="flex-1">
                                          <div className="flex items-center gap-3 mb-2">
                                            <h4 className="text-lg font-bold text-white group-hover:text-[#4245f0] transition-colors">{opening.role}</h4>
                                            <span className="px-2 py-1 rounded bg-[#4245f0]/10 text-[#4245f0] text-[10px] font-bold uppercase">{opening.workModel}</span>
                                          </div>
                                          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400 mt-1">
                                              <div className="flex items-center gap-1">
                                                <TrendingUp className="size-3" />
                                                <span>Exp: {opening.experience}</span>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <span className="text-slate-600">|</span>
                                                <div className="flex gap-2">
                                                  {opening.techStack?.slice(0, 3).map(t => (
                                                    <span key={t} className="text-slate-500">#{t}</span>
                                                  ))}
                                                </div>
                                              </div>
                                          </div>
                                      </div>
                                      <ChevronRight className="text-slate-600 group-hover:text-[#4245f0] group-hover:translate-x-1 transition-all" />
                                  </div>
                              </div>
                          ))
                        ) : (
                          <div className="glass p-12 rounded-2xl border border-dashed border-white/10 text-center">
                              <p className="text-slate-500">No active job openings at the moment.</p>
                          </div>
                        )}
                    </section>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    <div className="glass rounded-3xl p-6 border border-white/10 space-y-6">
                        <h3 className="font-bold text-white border-b border-white/5 pb-4">Startup Matrix</h3>
                        
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Industry</span>
                                <span className="font-medium text-white">{company.industry}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Growth Stage</span>
                                <span className="w-fit px-2 py-0.5 rounded text-xs font-bold bg-[#4245f0]/20 text-[#4245f0]">{company.fundingStage}</span>
                            </div>
                            {company.location && (
                              <div className="flex flex-col gap-1">
                                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Location</span>
                                  <span className="font-medium text-white">{company.location}</span>
                              </div>
                            )}
                            {company.website && (
                              <div className="flex flex-col gap-1">
                                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Digital Presence</span>
                                  <a href={company.website} target="_blank" rel="noreferrer" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                                    {company.website.replace(/^https?:\/\//, '')}
                                    <ExternalLink className="size-3" />
                                  </a>
                              </div>
                            )}
                        </div>
                    </div>

                    {company.benefits && company.benefits.length > 0 && (
                      <div className="glass rounded-3xl p-6 border border-white/10">
                          <h3 className="font-bold text-white mb-4">Ecosystem Benefits</h3>
                          <div className="space-y-3">
                              {company.benefits.map((benefit, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm text-slate-400 leading-snug">
                                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{benefit}</span>
                                </div>
                              ))}
                          </div>
                      </div>
                    )}
                </div>
            </div>
        </div>
      </motion.main>
    </div>
  );
};

export default CompanyDetail;
