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
  Cloud,
  Sun,
  Shield,
  Activity,
  Bot,
  ChevronDown
} from 'lucide-react';
import authService from '../services/authService';
import companyService from '../services/companyService';
import notificationService from '../services/notificationService';
import { useUser } from "@clerk/clerk-react";
import { toast } from 'react-hot-toast';

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

  // Helper icons logic for random card icons just like the dashboard image
  const getIconData = (index) => {
    const iconStyles = [
        { bg: 'bg-indigo-50', icon: <Bot className="size-5 text-indigo-500" /> },
        { bg: 'bg-orange-50', icon: <Sun className="size-5 text-orange-500" /> },
        { bg: 'bg-emerald-50', icon: <Cloud className="size-5 text-emerald-500" /> },
        { bg: 'bg-pink-50', icon: <Activity className="size-5 text-pink-500" /> },
        { bg: 'bg-cyan-50', icon: <Bot className="size-5 text-cyan-500" /> },
        { bg: 'bg-purple-50', icon: <Shield className="size-5 text-purple-500" /> },
    ];
    return iconStyles[index % iconStyles.length];
  };

  return (
    <div className="min-h-screen font-sans flex flex-col w-full overflow-y-auto">
      <div className="flex-1 w-full max-w-[1200px] mx-auto p-6 md:p-10 mb-10">
        
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-[28px] font-black text-gray-900 mb-2.5 tracking-tight">My Interests</h1>
          <p className="text-gray-500 text-[15px] max-w-2xl font-medium">Opportunities hand-picked for your profile and expertise.</p>
        </header>

        {/* Search */}
        <div className="bg-white border border-gray-200 rounded-sm flex items-center px-4 py-3.5 shadow-sm mb-10 transition-shadow focus-within:ring-2 focus-within:ring-[#ff5a00]/20 focus-within:border-[#ff5a00]">
           <input 
             type="text"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full bg-transparent outline-none text-[15px] font-medium text-gray-900 placeholder:text-gray-400 placeholder:font-normal"
             placeholder="Search by name, role, or technology stack..."
           />
        </div>

        {/* Grid View */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-72 rounded-sm border border-gray-100 bg-white shadow-sm animate-pulse p-6">
                  <div className="w-10 h-10 bg-gray-100/50 rounded-sm mb-6"></div>
                  <div className="w-3/4 h-5 bg-gray-100/50 mb-3 rounded-sm"></div>
                  <div className="w-full h-4 bg-gray-100/50 mb-2 rounded-sm"></div>
                  <div className="w-1/2 h-4 bg-gray-100/50 mb-6 rounded-sm"></div>
                  <div className="mt-auto flex gap-3 h-10">
                      <div className="flex-1 bg-gray-100/50 rounded-sm"></div>
                      <div className="flex-1 bg-gray-100/50 rounded-sm"></div>
                  </div>
              </div>
            ))}
          </div>
        ) : filteredMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((company, index) => {
              const isSaved = savedCompanyIds.includes(company._id);
              const iconData = getIconData(index);
              
              return (
                <div
                  key={company._id}
                  className="bg-white border border-gray-200 rounded-sm flex flex-col shadow-sm transition-all hover:shadow-md hover:border-gray-300 group overflow-hidden h-full"
                >
                  {/* Banner Header - approx 20% of card height */}
                  <div className={`h-28 w-full relative ${iconData.bg} flex items-center justify-center shrink-0`}>
                     <div className="absolute inset-0 opacity-10 bg-grain"></div>
                     <div className="absolute top-4 right-4 z-10">
                        <button onClick={(e) => { e.preventDefault(); toggleSave(company._id); }}>
                          <Bookmark className={`size-4 transition-colors ${isSaved ? 'fill-[#ff5a00] text-[#ff5a00]' : 'text-gray-400 group-hover:text-[#ff5a00]'}`} strokeWidth={2.5} />
                        </button>
                     </div>
                     
                     {/* Centered Logo or Icon */}
                     <div className="w-14 h-14 bg-white rounded-sm shadow-md flex items-center justify-center z-10 overflow-hidden border border-gray-50">
                        {company.logo ? (
                            <img src={company.logo} alt="logo" className="w-full h-full object-contain p-2" />
                        ) : (
                            React.cloneElement(iconData.icon, { className: "size-6" })
                        )}
                     </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-900 text-[17px] mb-2">{company.name}</h3>
                    <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-2 mb-5 min-h-[40px] font-medium">{company.description || company.tagline || 'No description provided.'}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                      {company.openings?.slice(0, 2).map((op, i) => (
                        <span 
                          key={i} 
                          className="px-2.5 py-1 bg-[#ff5a00]/10 border border-[#ff5a00]/20 text-[#ff5a00] text-[11px] font-bold rounded-sm whitespace-nowrap"
                        >
                          {op.role} - Match
                        </span>
                      ))}
                      {(!company.openings || company.openings.length === 0) && (
                          <span className="px-2.5 py-1 bg-gray-50 border border-gray-100 text-gray-400 text-[11px] font-bold rounded-sm">Match Found</span>
                      )}
                    </div>
                    
                    <div className="mt-4 flex gap-3">
                      <button className="flex-1 bg-[#ff5a00] hover:bg-[#e04e00] text-white text-[13px] font-bold py-2.5 rounded-sm transition-colors shadow-sm">
                        Apply Now
                      </button>
                      <Link 
                        to={`/company-detail?id=${company._id}`} 
                        state={{ company }}
                        className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-[13px] font-bold py-2.5 rounded-sm transition-colors text-center shadow-sm flex items-center justify-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-gray-200 border-dashed rounded-sm">
             <Building2 className="size-16 text-gray-300 mx-auto mb-4" />
             <h3 className="text-[17px] font-bold text-gray-900 mb-1">No matches found</h3>
             <p className="text-gray-500 text-[13px] font-medium">Try adjusting your filters or complete your profile skills.</p>
          </div>
        )}

        {/* Load More */}
        {filteredMatches.length > 0 && (
          <div className="mt-12 flex justify-center">
            <button className="px-5 py-2.5 bg-gray-50 rounded-sm border border-gray-200 hover:bg-gray-100 hover:border-gray-300 text-gray-900 font-bold text-[13px] transition-all flex items-center gap-2 shadow-sm">
              Load More Startups
              <ChevronDown className="size-4 text-gray-500" />
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full mt-auto border-t border-gray-200 px-6 py-8 bg-[#F8F7F4]">
         <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="flex items-center gap-4 text-gray-500 text-[13px] font-medium">
                 <a href="#" className="hover:text-gray-900 transition-colors">Guidelines</a>
                 <span className="text-gray-300">|</span>
                 <a href="#" className="hover:text-gray-900 transition-colors">FAQ</a>
                 <span className="text-gray-300">|</span>
                 <a href="#" className="hover:text-gray-900 transition-colors">Lists</a>
                 <span className="text-gray-300">|</span>
                 <a href="#" className="hover:text-gray-900 transition-colors">API</a>
                 <span className="text-gray-300">|</span>
                 <a href="#" className="hover:text-gray-900 transition-colors">Security</a>
             </div>
             <div>
                 <p className="text-gray-500 text-[13px] italic font-medium">“Working on something people want.”</p>
             </div>
         </div>
      </footer>
    </div>
  );
};

export default MyInterests;
