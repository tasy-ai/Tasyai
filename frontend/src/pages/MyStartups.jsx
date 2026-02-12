import React, { useState } from 'react';
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
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';

const MyStartups = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Mock Data for User's Startups
  const startups = [
    {
      id: 1,
      name: 'Nexa Dynamics',
      tagline: 'Decentralized compute infrastructure',
      logo: 'ND',
      color: 'from-indigo-500 to-purple-600',
      role: 'Founder',
      status: 'Active',
      stats: {
        views: '1.2k',
        applicants: 45,
        valuation: '$2.5M'
      },
      nextMilestone: 'Seed Round closing in 15 days'
    },
    {
      id: 2,
      name: 'EcoTrack',
      tagline: 'Carbon footprint monitoring SaaS',
      logo: 'ET',
      color: 'from-emerald-500 to-teal-600',
      role: 'Co-Founder',
      status: 'Hiring',
      stats: {
        views: '850',
        applicants: 12,
        valuation: '$800k'
      },
      nextMilestone: 'Beta Launch - Q3 2024'
    },
    {
      id: 3,
      name: 'PixelArt AI',
      tagline: 'Generative assets for game devs',
      logo: 'PA',
      color: 'from-pink-500 to-rose-600',
      role: 'Advisor',
      status: 'Stealth',
      stats: {
        views: 'N/A',
        applicants: 0,
        valuation: 'Undisclosed'
      },
      nextMilestone: 'Prototype Phase'
    }
  ];

  return (
    <div className="bg-[#020617] text-slate-100 font-sans min-h-screen flex overflow-hidden">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {startups.map((startup, index) => (
              <motion.div
                key={startup.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl overflow-hidden hover:bg-white/5 transition-colors group relative border-white/10"
              >
                {/* Card Header with Gradient Banner */}
                <div className={`h-24 bg-gradient-to-r ${startup.color} relative`}>
                    <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                        {startup.status}
                    </div>
                </div>

                <div className="p-6 relative">
                    {/* Logo */}
                    <div className={`w-16 h-16 rounded-xl -mt-14 mb-4 border-4 border-[#020617] bg-gradient-to-br ${startup.color} flex items-center justify-center shadow-lg`}>
                        <span className="text-xl font-bold text-white">{startup.logo}</span>
                    </div>

                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#4245f0] transition-colors">{startup.name}</h3>
                            <p className="text-sm text-slate-400 line-clamp-1">{startup.tagline}</p>
                        </div>
                        <button className="text-slate-500 hover:text-white transition-colors">
                            <MoreHorizontal className="size-5" />
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/5 mb-4">
                        <div className="text-center">
                            <div className="text-xs text-slate-500 uppercase font-bold mb-1">Views</div>
                            <div className="font-bold text-white flex items-center justify-center gap-1">
                                <TrendingUp className="size-3 text-emerald-500" />
                                {startup.stats.views}
                            </div>
                        </div>
                        <div className="text-center border-l border-white/5">
                            <div className="text-xs text-slate-500 uppercase font-bold mb-1">Talent</div>
                            <div className="font-bold text-white flex items-center justify-center gap-1">
                                <Users className="size-3 text-blue-500" />
                                {startup.stats.applicants}
                            </div>
                        </div>
                        <div className="text-center border-l border-white/5">
                            <div className="text-xs text-slate-500 uppercase font-bold mb-1">Value</div>
                            <div className="font-bold text-white flex items-center justify-center gap-1">
                                <DollarSign className="size-3 text-amber-500" />
                                {startup.stats.valuation}
                            </div>
                        </div>
                    </div>

                    {/* Footer / Action */}
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Clock className="size-4" />
                            <span className="text-xs">{startup.nextMilestone}</span>
                        </div>
                        <button className="flex items-center gap-1 text-[#4245f0] font-bold hover:gap-2 transition-all">
                            Manage <ArrowRight className="size-4" />
                        </button>
                    </div>
                </div>
              </motion.div>
            ))}

            {/* Empty State / Add New Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => navigate('/add-company')}
                className="glass rounded-2xl border-dashed border-2 border-white/10 hover:border-[#4245f0]/50 hover:bg-[#4245f0]/5 transition-all cursor-pointer flex flex-col items-center justify-center p-8 min-h-[300px] group"
            >
                <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-[#4245f0]/20 flex items-center justify-center mb-6 transition-colors">
                    <Plus className="size-8 text-slate-500 group-hover:text-[#4245f0]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#4245f0] transition-colors">Start New Venture</h3>
                <p className="text-slate-400 text-center text-sm px-8">Ready to disrupt the market? Create a new company profile today.</p>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default MyStartups;
