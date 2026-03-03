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
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import notificationService from '../services/notificationService';
import authService from '../services/authService';

const SavedCompanies = () => {
  const navigate = useNavigate();
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
    <>
      <SEO 
        title="Saved Ecosystem"
        description="Track and manage the ventures that caught your eye on Tasyai."
      />
      <div className="p-5 md:p-10 pb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[#4245f0]/10 rounded-lg shrink-0">
                  <Bookmark className="size-6 text-[#4245f0] fill-[#4245f0]" />
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Saved Ecosystem</h1>
              </div>
              <p className="text-slate-400 text-sm md:text-base">Track and manage the ventures that caught your eye.</p>
            </div>
            <Link 
              to="/dashboard"
              className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold hover:bg-white/10 transition-all text-sm group"
            >
              Explore More
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-40">
              <Loader2 className="size-10 text-[#4245f0] animate-spin" />
            </div>
          ) : savedCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {savedCompanies.map((company, index) => (
                <motion.div
                  key={company._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-[#0a0f1d] border border-white/5 rounded-3xl overflow-hidden hover:border-[#4245f0]/30 transition-all duration-500 flex flex-col h-full"
                >
                  <div className={`relative h-40 bg-gradient-to-br ${getRandomGradient(company.name)} p-6 flex flex-col justify-end`}>
                    <div className="absolute top-4 right-4">
                      <button 
                        onClick={(e) => handleUnsave(company._id, e)}
                        className="p-2.5 rounded-xl bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-red-500 transition-all"
                      >
                        <Bookmark className="size-4 fill-current" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-6">
                       <h3 className="text-xl font-black text-white group-hover:scale-105 transition-transform origin-left">{company.name}</h3>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-slate-400 text-sm line-clamp-3 mb-8 leading-relaxed">
                      {company.tagline || company.description || "Building future-proof solutions for the modern world."}
                    </p>

                    <div className="flex items-center gap-6 mb-8 text-xs text-slate-500 font-bold uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4 text-[#4245f0]" />
                        {company.location || 'Remote'}
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="size-4 text-[#4245f0]" />
                        {company.industry || 'Tech'}
                      </div>
                    </div>

                    <div className="mt-auto flex gap-3 pt-6 border-t border-white/5">
                      <button 
                        onClick={() => navigate(`/company-detail?id=${company._id}`)}
                        className="flex-1 py-3 px-4 bg-[#4245f0] hover:bg-[#4245f0]/90 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#4245f0]/10"
                      >
                        Launch Overview
                        <ArrowRight className="size-3" />
                      </button>
                      <button 
                        onClick={() => company.website && window.open(company.website, '_blank')}
                        className="p-3 bg-white/5 border border-white/5 text-slate-400 hover:text-white rounded-xl transition-all"
                      >
                        <ExternalLink className="size-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-40 glass rounded-[2.5rem] border border-dashed border-white/10"
            >
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Rocket className="size-10 text-slate-700" />
              </div>
              <h3 className="text-2xl font-bold text-slate-300 mb-2">Startup Vault Empty</h3>
              <p className="text-slate-500 max-w-sm mx-auto mb-8">You haven't added any ventures to your ecosystem yet. Explore the network to find your next match.</p>
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-8 py-3 bg-white text-black font-black rounded-xl hover:bg-slate-200 transition-all uppercase text-xs tracking-widest"
              >
                Scan Ecosystem
              </button>
            </motion.div>
          )}
      </div>
    </>
  );
};

export default SavedCompanies;
