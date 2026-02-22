import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <div className="bg-[#020617] text-white font-sans overflow-hidden h-screen">
      <div className="flex h-screen w-full relative">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <motion.main 
          layout
          className={`flex-1 overflow-y-auto h-full bg-[#020617] ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'}`}
        >
          <div className="max-w-7xl mx-auto p-10 pb-20">
            <header className="mb-10">
              <div className="flex items-center gap-4 mb-2">
                <div className="size-10 bg-[#4245f0]/10 rounded-xl flex items-center justify-center">
                    <Star className="size-6 text-[#4245f0] fill-[#4245f0]/30" />
                </div>
                <h2 className="text-4xl font-extrabold text-white tracking-tight">My Interests</h2>
              </div>
              <p className="text-slate-400 text-lg">Personalized opportunities curated based on your unique profile and skills.</p>
            </header>

            {/* Search */}
            <div className="mb-12">
              <div className="relative group max-w-2xl">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <Search className="size-5 text-slate-400 group-focus-within:text-[#6467f2] transition-colors" />
                </div>
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 pl-14 pr-6 rounded-2xl glass-effect text-white placeholder-slate-500 focus:ring-2 focus:ring-[#6467f2] outline-none transition-all"
                  placeholder="Filter your matches..."
                />
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-80 rounded-2xl glass-effect animate-pulse bg-white/5"></div>
                ))}
              </div>
            ) : filteredMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMatches.map((company, index) => {
                  const isSaved = savedCompanyIds.includes(company._id);
                  return (
                    <motion.div
                      key={company._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -4, borderColor: 'rgba(66, 69, 240, 0.5)' }}
                      className="group p-6 rounded-2xl glass-effect flex flex-col transition-all cursor-pointer border border-white/5 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-12 bg-[#4245f0]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                      
                      {/* Card Header */}
                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="size-14 rounded-xl overflow-hidden border border-white/10 bg-slate-900 flex items-center justify-center">
                          {company.logo ? (
                            <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                          ) : (
                            <Building2 className="text-slate-600 size-8" />
                          )}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleSave(company._id);
                          }}
                          className="p-2 rounded-lg text-slate-500 hover:text-[#4245f0] hover:bg-[#4245f0]/10 transition-all"
                        >
                          {isSaved ? (
                            <Bookmark className="size-5 fill-[#4245f0] text-[#4245f0]" />
                          ) : (
                            <BookmarkPlus className="size-5" />
                          )}
                        </button>
                      </div>

                      {/* Content wrapper with flex-grow to push buttons down */}
                      <div className="relative z-10 flex flex-col flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#4245f0] transition-colors">{company.name}</h3>
                        <p className="text-slate-400 text-sm italic mb-3 line-clamp-1">"{company.tagline}"</p>
                        
                        <div className="flex items-center gap-4 mb-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                           <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5">
                              <Compass className="size-3 text-[#4245f0]" />
                              <span>{company.industry}</span>
                           </div>
                           {company.location && (
                             <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5">
                                <MapPin className="size-3 text-[#4245f0]" />
                                <span>{company.location}</span>
                             </div>
                           )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6 min-h-[50px]">
                          {company.openings?.map((op, i) => (
                             <div key={i} className="flex flex-col gap-1 p-2 rounded-lg bg-white/5 border border-white/5 w-full">
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] font-bold text-white tracking-tight">{op.role}</span>
                                    <span className="text-[9px] bg-[#4245f0]/20 text-[#6366f1] px-1.5 py-0.5 rounded">Match Found</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {op.techStack?.slice(0, 3).map((tech, j) => (
                                        <span key={j} className="text-[8px] text-slate-500">{tech}</span>
                                    ))}
                                </div>
                             </div>
                          ))}
                        </div>

                        {/* Buttons pushed to bottom with mt-auto */}
                        <div className="flex gap-2 mt-auto">
                           <Link 
                            to={`/company-detail?id=${company._id}`}
                            className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 border border-white/5"
                           >
                             View Details
                           </Link>
                           <button className="flex-1 py-3 bg-[#4245f0] hover:bg-[#6366f1] text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-[#4245f0]/20">
                             Apply Now
                           </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-32 bg-white/5 rounded-3xl border border-dashed border-white/10">
                 <Star className="size-16 text-slate-700 mx-auto mb-4" />
                 <h3 className="text-xl font-bold text-slate-300">No interest matches yet</h3>
                 <p className="text-slate-500 max-w-md mx-auto mt-2">Update your profile with more skills or experience to help our matching engine find the perfect startups for you.</p>
              </div>
            )}
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default MyInterests;
