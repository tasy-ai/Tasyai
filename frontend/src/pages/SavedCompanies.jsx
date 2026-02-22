import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { 
  Building2,
  MapPin,
  Globe,
  TrendingUp,
  Bookmark,
  Loader2,
  Rocket,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { toast } from 'react-hot-toast';
import notificationService from '../services/notificationService';
import authService from '../services/authService';

const SavedCompanies = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [savedCompanies, setSavedCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedCompanies = async () => {
      try {
        setLoading(true);
        const data = await authService.getSavedCompanies();
        setSavedCompanies(data);
      } catch (err) {
        console.error("Failed to fetch saved companies:", err);
        toast.error("Failed to load saved companies");
      } finally {
        setLoading(false);
      }
    };
    fetchSavedCompanies();
  }, []);

  const handleUnsave = async (id, e) => {
    e.stopPropagation();
    try {
      const company = savedCompanies.find(c => c._id === id);
      await authService.toggleSaveCompany(id);
      setSavedCompanies(savedCompanies.filter(c => c._id !== id));
      toast.success("Startup removed from vault");
      
      notificationService.addNotification({
          title: 'Company Removed',
          message: `${company?.name || 'Company'} was removed from your saved list.`,
          type: 'info',
          iconName: 'Bookmark',
          color: 'bg-slate-500/10 border-slate-500/20'
      });
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const getRandomGradient = (name) => {
    const gradients = [
      'from-indigo-500 to-purple-500',
      'from-blue-500 to-cyan-500',
      'from-emerald-500 to-teal-500',
      'from-rose-500 to-pink-500',
      'from-amber-500 to-orange-500',
      'from-slate-700 to-slate-900',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return gradients[Math.abs(hash) % gradients.length];
  };

  return (
    <div className="bg-[#020617] text-slate-100 font-sans min-h-screen flex overflow-hidden">
      <SEO 
        title="Saved Ecosystem"
        description="Track and manage the ventures that caught your eye on Tasyai."
      />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <motion.main 
        layout
        className={`flex-1 overflow-y-auto h-full bg-[#020617] ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'}`}
      >
        <div className="max-w-7xl mx-auto px-8 py-10 pb-32">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[#4245f0]/10 rounded-lg">
                  <Bookmark className="size-6 text-[#4245f0] fill-[#4245f0]" />
                </div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">Saved Ecosystem</h1>
              </div>
              <p className="text-slate-400">Track and manage the ventures that caught your eye.</p>
            </div>
            
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all font-semibold"
            >
              Explore More
              <ArrowRight className="size-4" />
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="size-12 text-[#4245f0] animate-spin mb-4" />
              <p className="text-slate-500 font-medium">Scanning your vault...</p>
            </div>
          ) : savedCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedCompanies.map((company) => (
                <motion.div
                  key={company._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  onClick={() => navigate(`/company-detail?id=${company._id}`)}
                  className="group relative bg-[#0f172a] border border-white/5 rounded-3xl overflow-hidden hover:border-[#4245f0]/30 transition-all cursor-pointer"
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
                      <div className={`w-full h-full bg-gradient-to-br ${getRandomGradient(company.name)} opacity-30 flex items-center justify-center`}>
                        <Building2 className="size-12 text-slate-400" />
                      </div>
                    )}
                    
                    {/* Unsave Button */}
                    <div className="absolute top-4 right-4 z-20">
                      <button 
                        onClick={(e) => handleUnsave(company._id, e)}
                        className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white hover:text-rose-500 transition-all"
                        title="Remove from saved"
                      >
                        <Bookmark className="size-4 fill-current" />
                      </button>
                    </div>
                    
                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60"></div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#4245f0] transition-colors">
                      {company.name}
                    </h3>
                    <p className="text-sm text-slate-400 mb-4 line-clamp-2 min-h-[40px]">
                      {company.tagline}
                    </p>

                    <div className="pt-4 border-t border-white/5 flex flex-wrap gap-3">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">
                        <TrendingUp className="size-3 text-[#4245f0]" />
                        {company.industry}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">
                        <div className="size-2 rounded-full bg-emerald-500"></div>
                        {company.fundingStage}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass p-20 rounded-[40px] border border-dashed border-white/10 text-center flex flex-col items-center max-w-2xl mx-auto"
            >
              <div className="w-20 h-20 bg-slate-800/50 rounded-3xl flex items-center justify-center mb-6">
                <Bookmark className="size-10 text-slate-600" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Your Vault is Empty</h2>
              <p className="text-slate-400 mb-8 leading-relaxed text-lg">
                Start exploring the discovery engine to find revolutionary ventures and save them here for quick access.
              </p>
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-10 py-4 bg-[#4245f0] hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-[#4245f0]/20 flex items-center gap-3"
              >
                Launch Discovery Engine
                <Rocket className="size-5" />
              </button>
            </motion.div>
          )}
        </div>
      </motion.main>
    </div>
  );
};

export default SavedCompanies;
