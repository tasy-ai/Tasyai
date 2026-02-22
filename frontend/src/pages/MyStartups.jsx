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
        className={`flex-1 overflow-y-auto h-full bg-[#020617] ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'}`}
      >
        <div className="max-w-7xl mx-auto px-8 py-8 pb-32">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">My Startups</h1>
              <p className="text-slate-400 text-lg">Manage your ventures, track progress, and find talent.</p>
            </div>
            <motion.button 
              onClick={() => navigate('/add-company')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-[#4245f0] hover:bg-[#4245f0]/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-[#4245f0]/20 flex items-center gap-2"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {startups.map((startup, index) => {
                const gradientClass = getRandomGradient(index);
                return (
                  <motion.div
                    key={startup._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-2xl overflow-hidden hover:bg-white/5 transition-colors group relative border-white/10 flex flex-col"
                  >
                    {/* Card Header with Gradient Banner */}
                    <div className={`h-24 bg-gradient-to-r ${gradientClass} relative`}>
                        <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                            {startup.fundingStage}
                        </div>
                    </div>

                    <div className="p-6 relative flex flex-col flex-1">
                        {/* Logo */}
                        <div className={`w-16 h-16 rounded-xl -mt-14 mb-4 border-4 border-[#020617] bg-slate-900 flex items-center justify-center shadow-lg overflow-hidden`}>
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
                                <p className="text-sm text-slate-400 line-clamp-1 italic">"{startup.tagline}"</p>
                            </div>
                            <button className="text-slate-500 hover:text-white transition-colors">
                                <MoreHorizontal className="size-5" />
                            </button>
                        </div>

                        <p className="text-slate-500 text-xs mb-6 line-clamp-2 leading-relaxed">
                           {startup.description}
                        </p>

                        {/* Stats - Using placeholder numbers as they are not in schema yet */}
                        <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5 mb-4">
                            <div className="text-center">
                                <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-wider">Hiring</div>
                                <div className="font-bold text-white flex items-center justify-center gap-1">
                                    <Users className="size-3 text-[#4245f0]" />
                                    {startup.openings?.length || 0} Roles
                                </div>
                            </div>
                            <div className="text-center border-l border-white/5">
                                <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-wider">Industry</div>
                                <div className="font-bold text-white text-xs flex items-center justify-center gap-1">
                                    {startup.industry}
                                </div>
                            </div>
                        </div>

                        {/* Footer / Action */}
                        <div className="mt-auto flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Clock className="size-4" />
                                <span className="text-[10px] uppercase font-bold tracking-tight">Active Venture</span>
                            </div>
                            <button 
                                onClick={() => navigate(`/company-detail?id=${startup._id}`, { state: { company: startup } })}
                                className="flex items-center gap-1 text-[#4245f0] font-bold hover:gap-2 transition-all text-xs"
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => navigate('/add-company')}
                  className="glass rounded-2xl border-dashed border-2 border-white/10 hover:border-[#4245f0]/50 hover:bg-[#4245f0]/5 transition-all cursor-pointer flex flex-col items-center justify-center p-8 min-h-[350px] group"
              >
                  <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-[#4245f0]/20 flex items-center justify-center mb-6 transition-colors">
                      <Plus className="size-8 text-slate-500 group-hover:text-[#4245f0]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#4245f0] transition-colors">Start New Venture</h3>
                  <p className="text-slate-400 text-center text-sm px-8">Ready to disrupt the market? Create a new company profile today.</p>
              </motion.div>
            </div>
          )}
        </div>
      </motion.main>
    </div>
  );
};

export default MyStartups;
