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
  Loader2,
  Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import companyService from '../services/companyService';

const MyStartups = () => {
  const navigate = useNavigate();
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

  return (
    <>
      <SEO 
        title="My Startups"
        description="Manage your ventures and track progress on Startup Hub."
      />
      
      <div className="min-h-screen bg-[#F8F7F4] font-sans pb-20 w-full overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-gray-200 pb-8">
            <div>
              <h1 className="text-[32px] md:text-[40px] font-black text-gray-900 tracking-tight leading-none mb-3">My Startups</h1>
              <p className="text-[17px] text-gray-500 font-medium">Manage your ventures, build your team, and track progress.</p>
            </div>
            <button 
              onClick={() => navigate('/add-company')}
              className="w-full md:w-auto px-8 py-3.5 bg-[#ff5a00] hover:bg-[#e04e00] text-white font-bold text-[14px] rounded-sm transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Plus className="size-5" strokeWidth={3} />
              Launch New Venture
            </button>
          </div>

          {/* Startups Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin size-10 text-[#ff5a00]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {startups.map((startup, index) => {
                return (
                  <motion.div
                    key={startup._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="bg-white border border-gray-200 shadow-sm flex flex-col transition-all hover:shadow-md group overflow-hidden"
                  >
                    {/* Banner Header - approx 20% of card height */}
                    <div className="h-32 w-full relative bg-slate-50 flex items-center justify-center shrink-0 border-b border-gray-100">
                        <div className="absolute inset-0 opacity-10 bg-grain"></div>
                        
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4 px-2.5 py-1 bg-white border border-gray-200 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-sm z-10 shadow-sm">
                            {startup.fundingStage || 'EARLY STAGE'}
                        </div>

                        {/* Centered Logo */}
                        <div className="w-16 h-16 rounded-lg bg-white border border-gray-100 flex items-center justify-center z-10 overflow-hidden shadow-sm">
                            {startup.logo ? (
                                <img src={startup.logo} alt={startup.name} className="w-full h-full object-contain p-2" />
                            ) : (
                                <Building2 className="size-6 text-gray-400" strokeWidth={2} />
                            )}
                        </div>
                    </div>

                    <div className="p-8 flex flex-col flex-1">
                        {/* Title & Tagline */}
                        <div className="mb-4">
                            <h3 className="text-[22px] font-black text-gray-900 leading-tight mb-2 group-hover:text-[#ff5a00] transition-colors">{startup.name}</h3>
                            <p className="text-[14px] text-gray-500 font-medium italic line-clamp-1">"{startup.tagline || 'Building the future.'}"</p>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-[14px] leading-relaxed line-clamp-3 mb-8">
                           {startup.description}
                        </p>

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100 mb-8 mt-auto">
                            <div>
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Open Roles</div>
                                <div className="font-bold text-gray-900 text-[14px] flex items-center gap-1.5">
                                    <Briefcase className="size-4 text-[#ff5a00]" strokeWidth={2.5} />
                                    {startup.openings?.length || 0} active
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Industry</div>
                                <div className="font-bold text-gray-900 text-[14px] truncate">
                                    {startup.industry || 'Technology'}
                                </div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <button 
                            onClick={() => navigate(`/company-detail?id=${startup._id}`)}
                            className="w-full py-3 bg-[#ff5a00] hover:bg-[#e04e00] text-white font-bold text-[13px] rounded-sm transition-all shadow-sm flex items-center justify-center gap-2 group/btn uppercase tracking-wider h-11"
                        >
                            Manage Profile
                            <ArrowRight className="size-4 text-white/70 group-hover/btn:text-white transition-colors" strokeWidth={2.5} />
                        </button>
                    </div>
                  </motion.div>
                );
              })}

              {/* Empty State / Add New Card */}
              <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => navigate('/add-company')}
                  className="bg-transparent border-2 border-dashed border-gray-300 hover:border-[#ff5a00] hover:bg-orange-50/30 transition-all cursor-pointer flex flex-col items-center justify-center p-8 min-h-[420px] group"
              >
                  <div className="w-14 h-14 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-6 group-hover:border-[#ff5a00] group-hover:bg-[#ff5a00] transition-all">
                      <Plus className="size-6 text-gray-400 group-hover:text-white transition-colors" strokeWidth={3} />
                  </div>
                  <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-2 group-hover:text-[#ff5a00] transition-colors">Start New Venture</h3>
                  <p className="text-gray-500 font-medium text-center text-[14px] px-4 leading-relaxed">
                      Ready to build your team? Create a new company profile to start attracting top talent today.
                  </p>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyStartups;
