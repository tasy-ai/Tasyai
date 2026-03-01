import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
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
import authService from '../services/authService';
import { toast } from 'react-hot-toast';
import notificationService from '../services/notificationService';

const CompanyDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState(location.state?.company || null);
  const [isSaved, setIsSaved] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const companyId = queryParams.get('id');

  useEffect(() => {
    const checkSaveStatus = async () => {
        const user = authService.getCurrentUser();
        if (user && companyId) {
            try {
                const savedCompanies = await authService.getSavedCompanies();
                setIsSaved(savedCompanies.some(c => c._id === companyId));
            } catch (err) {
                console.error("Error checking save status:", err);
            }
        }
    };

    const fetchCompanyData = async () => {
      if (!company && companyId) {
        try {
          setLoading(true);
          const data = await companyService.getCompanyById(companyId);
          setCompany(data);
        } catch (err) {
          console.error("Backend fetch failed, trying mock data:", err);
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
    checkSaveStatus();
  }, [companyId]);

  const handleToggleSave = async () => {
      try {
          const res = await authService.toggleSaveCompany(company._id || companyId);
          setIsSaved(res.isSaved);
          if (res.isSaved) {
              toast.success("Added to Vault");
              notificationService.addNotification({
                  title: 'Company Saved',
                  message: `${company.name} has been added to your interests.`,
                  type: 'company',
                  iconName: 'BookmarkPlus',
                  color: 'bg-[#4245f0]/10 border-[#4245f0]/20'
              });
          } else {
              toast.success("Removed from Vault");
              notificationService.addNotification({
                  title: 'Company Removed',
                  message: `${company.name} was removed from your interests.`,
                  type: 'info',
                  iconName: 'Bookmark',
                  color: 'bg-slate-500/10 border-slate-500/20'
              });
          }
      } catch (err) {
          toast.error("Failed to update Vault");
      }
  };

  if (loading) {
    return (
      <div className="flex bg-[#020617] min-h-screen">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className={`flex-1 flex items-center justify-center transition-all duration-300 ${isSidebarOpen ? 'md:ml-[280px]' : 'md:ml-20'}`}>
          <Loader2 className="size-10 text-[#4245f0] animate-spin" />
        </div>
      </div>
    );
  }

  if (!company) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#020617] text-white p-6">
            <div className="text-center">
                <Rocket className="size-16 text-[#4245f0] mx-auto mb-6 opacity-20" />
                <h3 className="text-2xl font-bold mb-4">Startup Not Found</h3>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">The company you are looking for doesn't exist or has been removed from our discovery engine.</p>
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="w-full md:w-auto px-8 py-3.5 bg-[#4245f0] rounded-2xl font-bold hover:bg-[#4245f0]/90 transition-all shadow-xl shadow-[#4245f0]/20"
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
      <SEO 
        title={company?.name || "Startup Detail"}
        description={company?.tagline || "Learn more about this startup on Tasyai."}
      />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <motion.main 
        layout
        className={`flex-1 overflow-y-auto h-full bg-[#020617] ${isSidebarOpen ? 'md:ml-[280px]' : 'md:ml-20'}`}
      >
        {/* Banner */}
        <div className="h-48 md:h-64 sticky top-0 z-0 bg-gradient-to-r from-slate-900 to-[#020617] relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2301&ixlib=rb-4.0.3')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent"></div>
            <button 
                onClick={() => navigate(-1)}
                className="absolute top-6 left-6 md:top-8 md:left-8 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors z-10"
            >
                <ChevronLeft className="size-5 text-white" />
            </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 -mt-16 md:-mt-24 pb-32">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-10 md:mb-12">
                <div className={`w-28 h-28 md:w-32 md:h-32 rounded-[32px] flex items-center justify-center border-4 border-[#020617] bg-[#0f172a] shadow-2xl overflow-hidden shrink-0 ${company.logo ? '' : getColorClasses(company.color || 'primary')}`}>
                    {company.logo ? (
                      <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                    ) : (
                      <Building2 className="size-16" />
                    )}
                </div>
                <div className="flex-1 pt-0 md:pt-4 w-full">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        <div className="w-full">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">{company.name}</h1>
                            <p className="text-lg md:text-xl text-slate-400 mb-6 font-light italic">"{company.tagline}"</p>
                            
                            <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm font-medium text-slate-300">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 whitespace-nowrap">
                                    <MapPin className="size-3.5 md:size-4 text-[#4245f0]" />
                                    {company.location || 'Remote'}
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 whitespace-nowrap">
                                    <Globe className="size-3.5 md:size-4 text-emerald-400" />
                                    {company.website ? company.website.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'Web'}
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 whitespace-nowrap">
                                    <TrendingUp className="size-3.5 md:size-4 text-[#4245f0]" />
                                    {company.industry}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <button className="flex-1 md:flex-none p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center">
                                <Share2 className="size-5 text-slate-400" />
                            </button>
                            <button 
                                onClick={handleToggleSave}
                                className={`flex-1 md:flex-none p-3.5 rounded-2xl border transition-all flex items-center justify-center ${
                                    isSaved 
                                    ? 'bg-[#4245f0]/20 border-[#4245f0]/50 text-[#4245f0] shadow-lg shadow-[#4245f0]/10' 
                                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <Bookmark className={`size-5 ${isSaved ? 'fill-current' : ''}`} />
                            </button>
                            <button className="flex-[3] md:flex-none py-3.5 px-8 rounded-2xl bg-[#4245f0] hover:bg-indigo-500 font-bold transition-all shadow-xl shadow-[#4245f0]/30 min-w-[120px]">
                                Join Team
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Content */}
                <div className="lg:col-span-2 space-y-6 md:space-y-8">
                    {/* About */}
                    <section className="glass rounded-[32px] p-6 md:p-8 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Rocket className="size-5 text-[#4245f0]" />
                            Mission & Culture
                        </h3>
                        <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                            {company.description}
                        </p>
                    </section>

                    {/* Open Roles */}
                    <section className="space-y-5">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Briefcase className="size-5 text-[#4245f0]" />
                            Open Positions
                        </h3>
                        {company.openings && company.openings.length > 0 ? (
                          company.openings.map((opening, idx) => (
                              <div key={idx} className="glass p-5 md:p-6 rounded-2xl md:rounded-3xl border border-white/5 hover:border-[#4245f0]/30 transition-all group cursor-pointer bg-white/[0.02]">
                                  <div className="flex justify-between items-center">
                                      <div className="flex-1">
                                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3 mb-3 md:mb-2">
                                            <h4 className="text-base md:text-lg font-bold text-white group-hover:text-[#4245f0] transition-colors">{opening.role}</h4>
                                            <span className="w-fit px-2 py-0.5 rounded-lg bg-[#4245f0]/10 text-[#4245f0] text-[10px] font-bold uppercase tracking-wider">{opening.workModel}</span>
                                          </div>
                                          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[11px] text-slate-500 mt-1">
                                              <div className="flex items-center gap-1.5 bg-white/5 px-2 px-1 rounded-md">
                                                <TrendingUp className="size-3 text-[#4245f0]" />
                                                <span>{opening.experience} Exp</span>
                                              </div>
                                              <div className="flex gap-2">
                                                {opening.techStack?.slice(0, 3).map(t => (
                                                  <span key={t} className="text-[#6467f2] font-semibold opacity-80 group-hover:opacity-100 transition-opacity">#{t}</span>
                                                ))}
                                              </div>
                                          </div>
                                      </div>
                                      <ChevronRight className="size-5 text-slate-700 group-hover:text-[#4245f0] group-hover:translate-x-1 transition-all" />
                                  </div>
                              </div>
                          ))
                        ) : (
                          <div className="glass p-12 rounded-[32px] border border-dashed border-white/10 text-center bg-white/[0.01]">
                              <Briefcase className="size-12 text-slate-800 mx-auto mb-4 opacity-30" />
                              <p className="text-slate-500 text-sm">No active job openings at the moment. Check back soon!</p>
                          </div>
                        )}
                    </section>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6 md:sticky md:top-32 h-fit">
                    <div className="glass rounded-[32px] p-6 md:p-8 border border-white/10 space-y-6">
                        <h3 className="font-bold text-white border-b border-white/5 pb-4 text-lg">Startup Matrix</h3>
                        
                        <div className="space-y-5">
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Industry</span>
                                <span className="font-semibold text-white text-sm">{company.industry}</span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Growth Stage</span>
                                <span className="w-fit px-2.5 py-1 rounded-xl text-[10px] font-black bg-[#4245f0]/10 text-[#4245f0] uppercase">{company.fundingStage || 'Early Stage'}</span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Founding Year</span>
                                <span className="font-semibold text-white text-sm">{company.founded || '2023'}</span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Team Size</span>
                                <span className="font-semibold text-white text-sm">{company.teamSize || '10-50 Experts'}</span>
                            </div>
                        </div>
                        
                        {company.website && (
                          <div className="pt-2">
                              <a 
                                href={company.website} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="w-full py-3.5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#4245f0]/30 font-bold text-slate-300 hover:text-[#4245f0] transition-all flex items-center justify-center gap-2 text-xs"
                              >
                                {company.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                                <ExternalLink className="size-3.5" />
                              </a>
                          </div>
                        )}
                    </div>

                    {company.benefits && company.benefits.length > 0 && (
                      <div className="glass rounded-[32px] p-6 md:p-8 border border-white/10 bg-gradient-to-br from-indigo-500/5 to-transparent">
                          <h3 className="font-bold text-white mb-6 text-lg">Ecosystem Benefits</h3>
                          <div className="space-y-4">
                              {company.benefits.map((benefit, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm text-slate-400 leading-normal">
                                  <div className="p-0.5 rounded bg-emerald-500/10 shrink-0 mt-0.5">
                                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                                  </div>
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
