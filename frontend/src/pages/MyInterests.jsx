import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
        const [fullProfile, allCompanies, saved] = await Promise.all([
          authService.getProfile(),
          companyService.getCompanies(),
          authService.getSavedCompanies()
        ]);

        setSavedCompanyIds(saved.map(c => c._id));

        const matches = [];
        const seenCompanies = new Set();
        const userRoleLower = (fullProfile.role || '').toLowerCase();

        allCompanies.forEach(company => {
          let isMatch = false;
          company.openings?.forEach(opening => {
            if (isMatch) return;
            const roleLower = opening.role.toLowerCase();
            
            if (userRoleLower && userRoleLower !== 'talent' && roleLower.includes(userRoleLower)) {
                isMatch = true;
            }

            if (!isMatch && fullProfile.skills && fullProfile.skills.length > 0) {
                const hasSkillMatch = fullProfile.skills.some(skill => 
                    roleLower.includes(skill.toLowerCase()) || 
                    opening.techStack?.some(tech => tech.toLowerCase() === skill.toLowerCase())
                );
                if (hasSkillMatch) isMatch = true;
            }

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

  const toggleSave = async (id) => {
    try {
      const isSaved = savedCompanyIds.includes(id);
      await authService.toggleSaveCompany(id);
      
      if (isSaved) {
        setSavedCompanyIds(savedCompanyIds.filter(cid => cid !== id));
        toast.success("Startup removed from vault");
      } else {
        setSavedCompanyIds([...savedCompanyIds, id]);
        toast.success("Startup secured in vault");
      }
    } catch (err) {
      toast.error("Failed to update status");
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
    <>
      <div className="p-5 md:p-10 pb-20">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">My Interests</h1>
              <p className="text-slate-400 text-lg">Opportunities hand-picked for your profile and expertise.</p>
            </div>
            
            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none group-focus-within:text-[#4245f0] text-slate-500 transition-colors">
                <Search className="size-5" />
              </div>
              <input 
                type="text"
                placeholder="Search your matches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-[#4245f0] outline-none transition-all placeholder:text-slate-600"
              />
            </div>
          </div>
        </header>

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
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-[#0a0f1d] border border-white/5 rounded-3xl overflow-hidden hover:border-[#4245f0]/30 transition-all duration-500 flex flex-col h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={company.logo || '/default-company.png'} 
                      alt={company.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-transparent to-transparent opacity-80"></div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#4245f0] transition-colors">{company.name}</h3>
                      <button 
                        onClick={(e) => {
                            e.preventDefault();
                            toggleSave(company._id);
                        }}
                        className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-all"
                      >
                        {isSaved ? <Bookmark className="size-4 fill-[#4245f0] text-[#4245f0]" /> : <BookmarkPlus className="size-4" />}
                      </button>
                    </div>

                    <p className="text-sm text-slate-400 line-clamp-2 mb-6 italic">"{company.tagline}"</p>

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
                      {company.openings?.slice(0, 3).map((op, i) => (
                         <div key={i} className="flex flex-col gap-1 p-2 rounded-lg bg-white/5 border border-white/5 w-full">
                            <div className="flex justify-between items-center">
                                <span className="text-[11px] font-bold text-white tracking-tight">{op.role}</span>
                                <span className="text-[9px] bg-[#4245f0]/20 text-[#6366f1] px-1.5 py-0.5 rounded">Match Found</span>
                            </div>
                         </div>
                      ))}
                    </div>

                    <div className="flex gap-2 mt-auto">
                       <Link 
                        to={`/company-detail?id=${company._id}`}
                        className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 border border-white/5"
                       >
                         View Details
                       </Link>
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
    </>
  );
};

export default MyInterests;
