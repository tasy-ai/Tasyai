import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';
import { 
  Star,
  Search,
  Bookmark,
  BookmarkPlus,
  Compass,
  Building2,
  MapPin,
  Rocket,
  ArrowRight,
  Loader2
} from 'lucide-react';
import authService from '../services/authService';
import companyService from '../services/companyService';
import notificationService from '../services/notificationService';
import { useUser } from "@clerk/clerk-react";

const MyInterests = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [matchedCompanies, setMatchedCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedCompanyIds, setSavedCompanyIds] = useState([]);
  const { isSignedIn, isLoaded: userLoaded } = useUser();

  useEffect(() => {
    const fetchMatches = async () => {
      const user = authService.getCurrentUser();
      if (!user) {
        navigate('/login');
        return;
      }
      
      try {
        setLoading(true);
        // Fetch profile, all companies, and saved status in parallel
        const [fullProfile, allCompanies, saved] = await Promise.all([
          authService.getProfile(),
          companyService.getCompanies(),
          authService.getSavedCompanies()
        ]);

        setSavedCompanyIds(saved.map(c => c._id));

        const matches = [];
        const seenCompanies = new Set();

        allCompanies.forEach(company => {
          let isMatch = false;
          const userRoleLower = (fullProfile.role || '').toLowerCase();
          
          company.openings?.forEach(opening => {
            if (isMatch) return; // Already matched this company

            const roleLower = opening.role.toLowerCase();
            
            // 1. Role Category Match
            if (userRoleLower && userRoleLower !== 'talent' && roleLower.includes(userRoleLower)) {
                isMatch = true;
            }

            // 2. Skill-based match
            if (!isMatch && fullProfile.skills && fullProfile.skills.length > 0) {
                const hasSkillMatch = fullProfile.skills.some(skill => 
                    roleLower.includes(skill.toLowerCase()) || 
                    opening.techStack?.some(tech => tech.toLowerCase() === skill.toLowerCase())
                );
                if (hasSkillMatch) isMatch = true;
            }

            // 3. Talent fallback
            if (!isMatch && userRoleLower === 'talent') {
                const technicalKeywords = ['developer', 'engineer', 'designer', 'architect', 'analyst', 'manager', 'lead'];
                if (technicalKeywords.some(kd => roleLower.includes(kd))) {
                    isMatch = true;
                }
            }
          });

          if (isMatch && !seenCompanies.has(company._id)) {
            matches.push(company);
            seenCompanies.add(company._id);
          }
        });

        setMatchedCompanies(matches);
      } catch (err) {
        console.error("MyInterests: Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };

    if (userLoaded) fetchMatches();
  }, [userLoaded, navigate]);

  const toggleSave = async (companyId) => {
    try {
      const res = await authService.toggleSaveCompany(companyId);
      const company = matchedCompanies.find(c => c._id === companyId);
      
      if (res.isSaved) {
        setSavedCompanyIds(prev => [...prev, companyId]);
        notificationService.addNotification({
            title: 'Company Saved',
            message: `${company?.name || 'Company'} added to your top interests.`,
            type: 'company',
            iconName: 'BookmarkPlus',
            color: 'bg-amber-500/10 border-amber-500/20'
        });
      } else {
        setSavedCompanyIds(prev => prev.filter(id => id !== companyId));
        notificationService.addNotification({
            title: 'Interest Removed',
            message: `${company?.name || 'Company'} removed from saved.`,
            type: 'info',
            iconName: 'Bookmark',
            color: 'bg-slate-500/10 border-slate-500/20'
        });
      }
    } catch (err) {
      console.error("Save toggle failed:", err);
    }
  };

  const filteredMatches = matchedCompanies.filter(company => {
    const searchLower = searchQuery.toLowerCase();
    return (
      company.name?.toLowerCase().includes(searchLower) ||
      company.industry?.toLowerCase().includes(searchLower) ||
      company.tagline?.toLowerCase().includes(searchLower) ||
      company.description?.toLowerCase().includes(searchLower) ||
      company.openings?.some(op => 
        op.role?.toLowerCase().includes(searchLower) || 
        op.techStack?.some(tech => tech.toLowerCase().includes(searchLower))
      )
    );
  });

  return (
    <div className="bg-[#020617] text-slate-100 font-sans min-h-screen flex selection:bg-indigo-500/30">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <motion.main 
        layout
        className={`flex-1 overflow-y-auto min-h-screen bg-[#020617] ${isSidebarOpen ? 'md:ml-[280px]' : 'md:ml-20'}`}
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-10 py-6 md:py-10 space-y-10 pt-20 md:pt-10">
          {/* Header Section */}
          <header className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-[0.3em]">
                <Star size={12} className="animate-pulse fill-amber-500/30" />
                Intelligence Resonance
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                My Interest.
              </h1>
              <p className="text-slate-400 text-sm md:text-base font-medium max-w-lg leading-relaxed">
                Strategic alignments detected between your neural signature and elite startup protocols.
              </p>
            </div>
            
            <div className="relative group w-full xl:w-96">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className="size-4 text-slate-600 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-14 pr-6 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-xs font-black uppercase tracking-widest"
                placeholder="Filter Alignment Matrix..."
              />
            </div>
          </header>

          <div className="h-px bg-white/5 w-full" />

          {loading ? (
             <div className="flex flex-col justify-center items-center py-32 gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse"></div>
                  <Loader2 className="animate-spin size-12 text-indigo-500 relative z-10" />
                </div>
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Synchronizing Intelligence...</p>
             </div>
          ) : filteredMatches.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredMatches.map((company, index) => {
                  const isSaved = savedCompanyIds.includes(company._id);
                  return (
                    <motion.div
                      key={company._id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      onClick={() => navigate(`/company-detail?id=${company._id}`, { state: { company } })}
                      className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/10 rounded-[40px] overflow-hidden group hover:bg-white/[0.04] hover:border-white/20 transition-all cursor-pointer relative flex flex-col h-full shadow-2xl"
                    >
                      {/* Banner Section */}
                      <div className="h-32 w-full relative bg-slate-900/40 overflow-hidden">
                        {company.logo ? (
                          <img 
                            src={company.logo} 
                            alt={company.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 grayscale hover:grayscale-0" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/10 to-transparent">
                            <Building2 className="text-slate-800 size-12" />
                          </div>
                        )}
                        
                        <div className="absolute top-4 right-4 z-20">
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleSave(company._id);
                            }}
                            className="p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white hover:text-amber-500 transition-all"
                          >
                            {isSaved ? (
                              <Bookmark className="size-4 fill-amber-500 text-amber-500" />
                            ) : (
                              <BookmarkPlus className="size-4" />
                            )}
                          </button>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80"></div>
                      </div>

                      <div className="p-8 flex flex-col flex-1 gap-6">
                        <div>
                          <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors tracking-tight uppercase leading-none">{company.name}</h3>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-3 line-clamp-1 italic">"{company.tagline}"</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                           <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-[9px] font-black uppercase tracking-widest text-indigo-400">
                              <Compass className="size-3" />
                              {company.industry}
                           </div>
                           {company.location && (
                             <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-[9px] font-black uppercase tracking-widest text-slate-500">
                                <MapPin className="size-3" />
                                {company.location}
                             </div>
                           )}
                        </div>

                        <div className="space-y-3 flex-1">
                          <h4 className="text-[8px] font-black text-slate-700 uppercase tracking-[0.4em]">Detected Resonance</h4>
                          {company.openings?.slice(0, 1).map((op, i) => (
                             <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 group/match hover:border-indigo-500/20 transition-all">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-white uppercase tracking-tight">{op.role}</span>
                                    <span className="text-[8px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-md font-black uppercase tracking-widest">Active</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {op.techStack?.slice(0, 4).map((tech, j) => (
                                        <span key={j} className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{tech}</span>
                                    ))}
                                </div>
                             </div>
                          ))}
                        </div>

                        <div className="flex gap-3 pt-2">
                           <Link 
                            to={`/company-detail?id=${company._id}`}
                            className="flex-1 py-4 bg-white/[0.03] hover:bg-white/[0.06] text-white text-[9px] font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2 border border-white/5"
                           >
                             Archive
                           </Link>
                           <button className="flex-1 py-4 bg-white text-[#020617] hover:bg-indigo-600 hover:text-white text-[9px] font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl active:scale-95">
                             Uplink
                           </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-40 bg-[#0f172a]/20 backdrop-blur-xl rounded-[48px] border-2 border-dashed border-white/5"
            >
               <Star className="size-20 text-slate-800 mx-auto mb-8 animate-pulse" />
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter">No Resonance Found</h3>
               <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] max-w-sm mx-auto mt-4 leading-loose">Initialize your capability profile with more technical metadata to trigger alignment protocols.</p>
               <button 
                  onClick={() => navigate('/settings')}
                  className="mt-10 px-10 py-4 bg-white text-[#020617] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-2xl active:scale-95"
               >
                 Modify Signature
               </button>
            </motion.div>
          )}

          {/* System Footer */}
          <footer className="pt-16 pb-16 border-t border-white/5 flex flex-col xl:flex-row justify-between items-center gap-8 text-[10px] font-black text-slate-600 uppercase tracking-widest">
            <p>© 2024 Intelligence Match Engine. Operational.</p>
            <div className="flex items-center gap-8">
              <a href="#" className="hover:text-amber-500 transition-all">Support Nexus</a>
              <a href="#" className="hover:text-amber-500 transition-all">Protocol Documentation</a>
            </div>
          </footer>
        </div>
      </motion.main>
    </div>
  );
};

export default MyInterests;
