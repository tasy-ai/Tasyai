import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">
                <Bookmark size={12} className="animate-pulse fill-indigo-500/30" />
                Sovereign Vault
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                Saved Ecosystem.
              </h1>
              <p className="text-slate-400 text-sm md:text-base font-medium max-w-lg leading-relaxed">
                Persistent storage for high-potential ventures and strategic deployments under observation.
              </p>
            </div>
            
            <motion.button 
              onClick={() => navigate('/dashboard')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto py-4 px-10 bg-white text-[#020617] hover:bg-slate-200 font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95 group"
            >
              Explore Node
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </header>

          <div className="h-px bg-white/5 w-full" />

          {loading ? (
             <div className="flex flex-col justify-center items-center py-32 gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse"></div>
                  <Loader2 className="animate-spin size-12 text-indigo-500 relative z-10" />
                </div>
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Scanning Vault...</p>
             </div>
          ) : savedCompanies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {savedCompanies.map((company, index) => (
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
                    <div className="h-40 w-full relative bg-slate-900/40 overflow-hidden">
                      {company.logo ? (
                        <img 
                          src={company.logo} 
                          alt={company.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 grayscale hover:grayscale-0" 
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${getRandomGradient(company.name)} opacity-10 flex items-center justify-center`}>
                          <Building2 className="text-slate-800 size-12" />
                        </div>
                      )}
                      
                      <div className="absolute top-4 right-4 z-20">
                        <button 
                          onClick={(e) => handleUnsave(company._id, e)}
                          className="p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white hover:text-rose-500 transition-all"
                        >
                          <Bookmark className="size-4 fill-current" />
                        </button>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90"></div>
                    </div>

                    <div className="p-8 flex flex-col flex-1 gap-6 pt-2">
                      <div>
                        <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors tracking-tight uppercase leading-none">{company.name}</h3>
                        <div className="flex items-center gap-3 mt-4">
                           <span className="text-[9px] font-black text-indigo-500/80 uppercase tracking-widest px-3 py-1 bg-indigo-500/5 rounded-lg border border-indigo-500/10">
                              {company.fundingStage}
                           </span>
                           <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-600 uppercase tracking-widest">
                              <TrendingUp className="size-3" />
                              {company.industry}
                           </div>
                        </div>
                      </div>
                      
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-loose line-clamp-2 italic">
                        "{company.tagline}"
                      </p>

                      <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between group/btn">
                         <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">Access Protocol</span>
                         <ArrowRight size={14} className="text-slate-700 group-hover:text-indigo-500 transition-all group-hover:translate-x-1" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-40 bg-[#0f172a]/20 backdrop-blur-xl rounded-[48px] border-2 border-dashed border-white/5 max-w-2xl mx-auto"
            >
               <div className="w-24 h-24 bg-white/[0.03] border border-white/5 rounded-[32px] flex items-center justify-center mb-8 mx-auto">
                 <Bookmark className="size-10 text-slate-800" />
               </div>
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Vault Empty</h3>
               <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mt-6 leading-loose px-10">Your sovereign vault is currently offline. Synchronize with the discovery engine to archive revolutionary tech.</p>
               <button 
                  onClick={() => navigate('/dashboard')}
                  className="mt-12 px-12 py-5 bg-white text-[#020617] rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl active:scale-95 group flex items-center gap-4 mx-auto"
               >
                 Initialize Discovery
                 <Rocket className="size-5 group-hover:-translate-y-1 transition-transform" />
               </button>
            </motion.div>
          )}

          {/* System Footer */}
          <footer className="pt-20 pb-20 border-t border-white/5 text-[10px] font-black text-slate-700 uppercase tracking-widest text-center">
            Vault Encryption Active. Protocol 0xAF32.
          </footer>
        </div>
      </motion.main>
    </div>
  );
};

export default SavedCompanies;
