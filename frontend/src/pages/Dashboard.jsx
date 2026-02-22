import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Sidebar from '../components/layout/Sidebar';
import { 
  Rocket,
  Compass,
  Star,
  User,
  Book,
  Settings,
  Search,
  PlusCircle,
  Bookmark,
  BookmarkPlus,
  ChevronDown,
  Building2,
  MapPin
} from 'lucide-react';
import { filters } from '../data/dashboardData'; // Still using filters for UI

import { useUser } from "@clerk/clerk-react";
import authService from '../services/authService';
import companyService from '../services/companyService';
import notificationService from '../services/notificationService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All Roles');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedCompanyIds, setSavedCompanyIds] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user: clerkUser, isLoaded: clerkLoaded, isSignedIn: clerkSignedIn } = useUser();
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);

  // Fetch saved companies status
  useEffect(() => {
    const fetchSavedStatus = async () => {
      try {
        const saved = await authService.getSavedCompanies();
        setSavedCompanyIds(saved.map(c => c._id));
      } catch (err) {
        console.error("Error fetching saved status:", err);
      }
    };
    if (clerkSignedIn) fetchSavedStatus();
  }, [clerkSignedIn]);

  // Auth sync logic
  useEffect(() => {
    const handleAuth = async () => {
      const localUser = authService.getCurrentUser();
      if (!clerkLoaded) return;
      if (clerkSignedIn) {
        if (!localUser || !localUser.isOnboarded) {
          setIsSyncing(true);
          try {
            const userData = {
              email: clerkUser.primaryEmailAddress?.emailAddress,
              name: clerkUser.fullName,
              profilePicture: clerkUser.imageUrl,
            };
            const syncedUser = await authService.googleLogin(userData);
            if (!syncedUser.isOnboarded) {
              navigate('/OnboardingChatbot');
            }
          } catch (error) {
            console.error('Failed to sync Clerk user:', error);
            if (!localUser || !localUser.onboarded) navigate('/login');
          } finally {
            setIsSyncing(false);
          }
        }
      } else if (!localUser) {
        navigate('/login');
      }
    };
    handleAuth();
  }, [navigate, clerkLoaded, clerkSignedIn, clerkUser]);

  // Fetch companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoadingCompanies(true);
        const data = await companyService.getCompanies();
        setCompanies(data);
      } catch (err) {
        console.error("Failed to fetch companies:", err);
      } finally {
        setLoadingCompanies(false);
      }
    };
    fetchCompanies();
  }, []);

  if (isSyncing || !clerkLoaded) {
    return (
      <div className="bg-[#020617] text-white flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#6467f2] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium">Syncing your account...</p>
        </div>
      </div>
    );
  }

  const filteredCompanies = companies.filter(company => {
    // 1. Search Logic
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      company.name?.toLowerCase().includes(searchLower) ||
      company.industry?.toLowerCase().includes(searchLower) ||
      company.tagline?.toLowerCase().includes(searchLower) ||
      company.description?.toLowerCase().includes(searchLower) ||
      company.openings?.some(op => 
        op.role?.toLowerCase().includes(searchLower) || 
        op.techStack?.some(tech => tech.toLowerCase().includes(searchLower))
      );

    if (!matchesSearch) return false;

    // 2. Filter Logic
    if (activeFilter === 'All Roles') return true;

    if (activeFilter === 'Remote') {
      return company.location?.toLowerCase().includes('remote') || 
             company.openings?.some(op => op.workModel === 'Remote');
    }

    if (activeFilter === 'Equity') {
      return company.benefits?.some(b => b.toLowerCase().includes('equity')) ||
             company.description?.toLowerCase().includes('equity');
    }

    if (activeFilter === 'Full-time') {
      // Assuming full-time if not specified otherwise in typical startup context
      // Or check if 'Full-time' appears in description
      return company.description?.toLowerCase().includes('full-time') || 
             company.description?.toLowerCase().includes('fulltime') ||
             true; // Defaulting to true for startups usually implies commitment
    }

    if (activeFilter === 'AI/ML') {
      const aiKeywords = ['ai', 'ml', 'machine learning', 'artificial intelligence', 'nlp', 'vision'];
      return company.industry?.toLowerCase().includes('ai') ||
             company.industry?.toLowerCase().includes('machine learning') ||
             company.tagline?.toLowerCase().includes('ai') ||
             company.description?.toLowerCase().includes('intelligence') ||
             company.openings?.some(op => 
                op.techStack?.some(tech => aiKeywords.includes(tech.toLowerCase()))
             );
    }

    if (activeFilter === 'Sustainability') {
      const greenKeywords = ['sustainability', 'green', 'clean', 'energy', 'climate', 'eco'];
      return company.industry?.toLowerCase().includes('sustain') ||
             company.industry?.toLowerCase().includes('energy') ||
             greenKeywords.some(kd => company.description?.toLowerCase().includes(kd));
    }

    return true;
  });

  const toggleSave = async (companyId) => {
    try {
      const res = await authService.toggleSaveCompany(companyId);
      const company = companies.find(c => c._id === companyId);
      
      if (res.isSaved) {
        setSavedCompanyIds(prev => [...prev, companyId]);
        notificationService.addNotification({
            title: 'Company Saved',
            message: `${company?.name || 'Company'} has been added to your interests.`,
            type: 'company',
            iconName: 'BookmarkPlus',
            color: 'bg-[#6467f2]/10 border-[#6467f2]/20'
        });
      } else {
        setSavedCompanyIds(prev => prev.filter(id => id !== companyId));
        notificationService.addNotification({
            title: 'Company Removed',
            message: `${company?.name || 'Company'} has been removed from your saved list.`,
            type: 'info',
            iconName: 'Bookmark',
            color: 'bg-slate-500/10 border-slate-500/20'
        });
      }
    } catch (err) {
      console.error("Save toggle failed:", err);
    }
  };

  return (
    <div className="bg-[#020617] text-white font-sans min-h-screen">
      <SEO 
        title="Dashboard"
        description="Discover high-growth startups and collaborative opportunities on Tasyai."
      />
      <div className="flex h-screen w-full relative">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />


        <motion.main 
          layout
          className={`flex-1 overflow-y-auto h-full bg-[#020617] ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'}`}
        >
          <div className="max-w-7xl mx-auto p-10 pb-20">

            <header className="mb-10 flex items-start justify-between gap-6">
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-4xl font-extrabold text-white tracking-tight mb-2">Discover Companies</h2>
                  <p className="text-slate-400 text-lg">Collaborate with high-growth startups looking for world-class talent.</p>
                </div>
              </div>
              <motion.button 
                onClick={() => navigate('/add-company')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="shrink-0 py-3 px-6 bg-gradient-to-r from-[#6467f2] to-indigo-500 hover:from-indigo-500 hover:to-[#6467f2] text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all indigo-glow"
              >
                <PlusCircle className="size-4" />
                <span>Add Company</span>
              </motion.button>
            </header>

            {/* Search and Filters */}
            <div className="mb-12 space-y-6">
              {/* Search Bar */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <Search className="size-5 text-slate-400 group-focus-within:text-[#6467f2] transition-colors" />
                </div>
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-16 pl-14 pr-6 rounded-2xl glass-effect text-white placeholder-slate-500 focus:ring-2 focus:ring-[#6467f2] focus:border-transparent transition-all outline-none text-lg"
                  placeholder="Search by startup name, role, or technology stack..."
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {filters.map((filter) => {
                  const Icon = filter.icon;
                  const isActive = activeFilter === filter.name;
                  
                  return (
                    <motion.button
                      key={filter.name}
                      onClick={() => setActiveFilter(filter.name)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                        isActive 
                          ? 'bg-[#6467f2] text-white' 
                          : 'glass-effect text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {Icon && <Icon className="size-4" />}
                      {filter.name}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Company Cards Grid */}
            {loadingCompanies ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-80 rounded-2xl glass-effect animate-pulse bg-white/5"></div>
                ))}
              </div>
            ) : filteredCompanies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCompanies.map((company, index) => {
                  const isSaved = savedCompanyIds.includes(company._id);
                  
                  return (
                    <motion.div
                      key={company._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -4, borderColor: 'rgba(100, 103, 242, 0.5)' }}
                      className="group rounded-3xl glass-effect flex flex-col transition-all cursor-pointer border border-white/5 overflow-hidden"
                    >
                      {/* Company Header Image (20% of card) */}
                      <div className="h-32 w-full relative bg-slate-900/40">
                        {company.logo ? (
                          <img 
                            src={company.logo} 
                            alt={company.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/10 to-transparent">
                            <Building2 className="text-slate-700 size-12" />
                          </div>
                        )}
                        
                        {/* Save Button relocated to top right of header image */}
                        <div className="absolute top-4 right-4 z-20">
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleSave(company._id);
                            }}
                            className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white hover:text-[#6467f2] transition-all"
                          >
                            {isSaved ? (
                              <Bookmark className="size-4 fill-[#6467f2] text-[#6467f2]" />
                            ) : (
                              <BookmarkPlus className="size-4" />
                            )}
                          </button>
                        </div>
                        
                        {/* Subtle Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
                      </div>

                      <div className="p-6 flex flex-col flex-1">

                      {/* Content */}
                      <h3 className="text-xl font-bold text-white mb-2">{company.name}</h3>
                      <p className="text-slate-400 text-sm italic mb-3">"{company.tagline}"</p>
                      <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-2">{company.description}</p>
                      
                      <div className="flex items-center gap-4 mb-6 text-xs text-slate-400">
                         <div className="flex items-center gap-1">
                            <Compass className="size-3 text-[#6467f2]" />
                            <span>{company.industry}</span>
                         </div>
                         {company.location && (
                           <div className="flex items-center gap-1">
                              <MapPin className="size-3 text-[#6467f2]" />
                              <span>{company.location}</span>
                           </div>
                         )}
                      </div>

                      {/* Roles */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {company.openings?.slice(0, 2).map((op, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300 uppercase tracking-tight"
                          >
                            {op.role}
                          </span>
                        ))}
                        {company.openings?.length > 2 && (
                           <span className="text-[10px] text-slate-500 font-bold self-center">+{company.openings.length - 2} more</span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="mt-auto flex gap-3">
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-3 px-4 bg-[#6467f2] hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all"
                        >
                          Show Interest
                        </motion.button>
                        <Link 
                          to={`/company-detail?id=${company._id}`}
                          state={{ company }}
                          className="flex-1 py-3 px-4 glass-effect text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center hover:bg-white/10"
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
              <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                 <Building2 className="size-16 text-slate-700 mx-auto mb-4" />
                 <h3 className="text-xl font-bold text-slate-300">No companies found</h3>
                 <p className="text-slate-500">Try adjusting your search or filters.</p>
              </div>
            )}

            {/* Load More */}
            <div className="mt-16 flex justify-center">
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-white font-semibold transition-all flex items-center gap-2"
              >
                Explore More Ecosystems
                <ChevronDown className="size-5" />
              </motion.button>
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default Dashboard;
