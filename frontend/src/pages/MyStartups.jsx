import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  MoreHorizontal, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Plus,
  ArrowRight,
  Globe,
  Clock,
  Building2,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import companyService from '../services/companyService';

const MyStartups = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyStartups = async () => {
      try {
        setLoading(true);
        const data = await companyService.getMyCompanies();
        setStartups(data);
      } catch (err) {
        console.error("Failed to fetch my companies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyStartups();
  }, []);

  const getRandomGradient = (index) => {
    const gradients = [
      'from-indigo-500 to-purple-600',
      'from-emerald-500 to-teal-600',
      'from-pink-500 to-rose-600',
      'from-amber-500 to-orange-600',
      'from-blue-500 to-cyan-600'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="bg-[#020617] text-slate-100 font-sans min-h-screen flex overflow-hidden">
      <SEO 
        title="My Startups"
        description="Manage your ventures and track progress on Tasyai."
      />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <motion.main 
        layout
        className={`flex-1 overflow-y-auto h-full bg-[#020617] ${isSidebarOpen ? 'md:ml-[280px]' : 'md:ml-20'}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 pb-32">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 md:mb-12 pt-12 md:pt-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">My Startups</h1>
              <p className="text-slate-400 text-base md:text-lg">Manage your ventures, track progress, and find talent.</p>
            </div>
            <motion.button 
              onClick={() => navigate('/add-company')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto px-6 py-3 bg-[#4245f0] hover:bg-[#4245f0]/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-[#4245f0]/20 flex items-center justify-center gap-2"
            >
              <Plus className="size-5" />
              Launch New Venture
            </motion.button>
          </div>

          {/* Startups Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin size-10 text-[#4245f0]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {startups.map((startup, index) => {
                const gradientClass = getRandomGradient(index);
                return (
                  <motion.div
                    key={startup._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => navigate(`/company-detail?id=${startup._id}`, { state: { company: startup } })}
                    className="glass rounded-[32px] overflow-hidden hover:bg-white/5 transition-all group relative border border-white/5 flex flex-col cursor-pointer"
                  >
                    {/* Card Header with Gradient Banner */}
                    <div className={`h-24 bg-gradient-to-r ${gradientClass} relative opacity-80 group-hover:opacity-100 transition-opacity`}>
                        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10 uppercase tracking-wider">
                            {startup.fundingStage}
                        </div>
                    </div>

                    <div className="p-6 relative flex flex-col flex-1">
                        {/* Logo */}
                        <div className={`w-16 h-16 rounded-2xl -mt-14 mb-4 border-4 border-[#020617] bg-slate-900 flex items-center justify-center shadow-xl overflow-hidden`}>
                            {startup.logo ? (
                                <img src={startup.logo} alt={startup.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
                                   <span className="text-xl font-bold text-white">
                                      {startup.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                                   </span>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#4245f0] transition-colors">{startup.name}</h3>
                                <p className="text-xs text-slate-400 line-clamp-1 italic">"{startup.tagline}"</p>
                            </div>
                            <button className="text-slate-500 hover:text-white transition-colors p-1">
                                <MoreHorizontal className="size-5" />
                            </button>
                        </div>

                        <p className="text-slate-500 text-xs mb-6 line-clamp-2 leading-relaxed h-8">
                           {startup.description}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5 mb-6">
                            <div className="text-center">
                                <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-wider">Hiring</div>
                                <div className="font-bold text-white text-xs flex items-center justify-center gap-1">
                                    <Users className="size-3 text-[#4245f0]" />
                                    {startup.openings?.length || 0} Roles
                                </div>
                            </div>
                            <div className="text-center border-l border-white/5">
                                <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-wider">Industry</div>
                                <div className="font-bold text-white text-[10px] flex items-center justify-center gap-1 uppercase truncate px-2">
                                    {startup.industry}
                                </div>
                            </div>
                        </div>

                        {/* Footer / Action */}
                        <div className="mt-auto flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-slate-500">
                                <Clock className="size-3.5" />
                                <span className="text-[10px] uppercase font-bold tracking-tight">Active Venture</span>
                            </div>
                            <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/company-detail?id=${startup._id}`, { state: { company: startup } });
                                }}
                                className="flex items-center gap-1.5 text-[#4245f0] font-bold hover:gap-2 transition-all text-xs"
                            >
                                Manage <ArrowRight className="size-4" />
                            </button>
                        </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Empty State / Add New Card */}
              <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate('/add-company')}
                  className="glass rounded-[32px] border-dashed border-2 border-white/10 hover:border-[#4245f0]/50 hover:bg-[#4245f0]/5 transition-all cursor-pointer flex flex-col items-center justify-center p-8 min-h-[350px] group"
              >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 group-hover:bg-[#4245f0]/20 flex items-center justify-center mb-6 transition-colors shadow-inner">
                      <Plus className="size-8 text-slate-500 group-hover:text-[#4245f0]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#4245f0] transition-colors">Start New Venture</h3>
                  <p className="text-slate-500 text-center text-sm px-4 leading-relaxed">Ready to disrupt the market? Create a new company profile today.</p>
              </motion.div>
            </div>
          )}
        </div>
      </motion.main>
    </div>
  );
};

export default MyStartups;
