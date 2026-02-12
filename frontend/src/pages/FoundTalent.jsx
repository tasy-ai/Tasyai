import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';
import { 
  Filter,
  ArrowUpDown,
  Bookmark,
  UserPlus
} from 'lucide-react';
import { candidates, roles, stats } from '../data/foundTalentData';


import { useNavigate, Link } from 'react-router-dom';
const FoundTalent = () => {
  const navigate = useNavigate();

  const [activeRole, setActiveRole] = useState('All Roles');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  


  const getStatusColor = (status) => {
    const colors = {
      online: 'bg-emerald-500',
      offline: 'bg-slate-500',
      away: 'bg-amber-500'
    };
    return colors[status] || 'bg-slate-500';
  };

  const getBadgeColor = (color) => {
    const colors = {
      emerald: 'bg-emerald-500/10 text-emerald-500',
      blue: 'bg-blue-500/10 text-blue-500',
      primary: 'bg-[#4245f0]/10 text-[#4245f0]',
      amber: 'bg-amber-500/10 text-amber-500',
      purple: 'bg-purple-500/10 text-purple-500'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="bg-[#020617] text-slate-100 font-sans min-h-screen overflow-hidden h-screen">
      {/* Global Styles */}


      <div className="flex h-screen w-full relative">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <motion.main 
          layout
          className={`flex-1 overflow-y-auto h-full bg-[#020617] ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'}`}
        >


      <div className="max-w-[1600px] mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <header className="mb-10 flex items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-4xl font-extrabold text-white tracking-tight mb-2">Found Talent</h2>
              <p className="text-slate-400 text-lg">Connect with top-tier professionals ready to join your team.</p>
            </div>
          </div>
          <motion.button 
            onClick={() => navigate('/add-company')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="shrink-0 py-3 px-6 bg-gradient-to-r from-[#6467f2] to-indigo-500 hover:from-indigo-500 hover:to-[#6467f2] text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all indigo-glow"
          >
            <UserPlus className="size-4" />
            <span>Add New Role</span>
          </motion.button>
        </header>
        {/* Roles Navigation */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
          {roles.map((role) => {
            const isActive = activeRole === role.name;
            return (
              <motion.button
                key={role.name}
                onClick={() => setActiveRole(role.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-6 py-3 rounded-full whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-[#4245f0] text-white font-semibold' 
                    : 'glass hover:bg-white/10'
                }`}
              >
                <span className="font-medium">{role.name}</span>
                {!isActive && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#4245f0]/20 text-[#4245f0] group-hover:bg-[#4245f0] group-hover:text-white transition-colors">
                    {role.count}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Main Talent List Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold">
              Interested Talent <span className="text-[#4245f0] font-normal text-lg ml-2">(128)</span>
            </h2>
            <div className="flex items-center gap-3">
              <button className="glass p-2 rounded-lg flex items-center justify-center hover:bg-white/10">
                <Filter className="size-5" />
              </button>
              <button className="glass p-2 rounded-lg flex items-center justify-center hover:bg-white/10">
                <ArrowUpDown className="size-5" />
              </button>
            </div>
          </div>

          {/* Candidate Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {candidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-xl space-y-6 glass-hover group relative"
              >
                {/* Card Header */}
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="relative">
                      <img 
                        alt={candidate.name} 
                        className="w-16 h-16 rounded-xl object-cover border border-white/10"
                        src={candidate.image}
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-[#020617] ${getStatusColor(candidate.status)}`}></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-[#4245f0] transition-colors">{candidate.name}</h3>
                      <p className="text-slate-400 text-sm">{candidate.experience} • {candidate.location}</p>
                      <div className={`mt-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getBadgeColor(candidate.badgeColor)}`}>
                        {candidate.badge}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-[#4245f0]">{candidate.matchScore}%</div>
                    <div className="text-[10px] uppercase font-bold text-slate-500">Match Score</div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <p className="text-sm text-slate-300 line-clamp-2 italic leading-relaxed">
                    "{candidate.quote}"
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill) => (
                      <span key={skill.name} className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Link 
                    to={`/profile-expansion?id=${candidate.id}`}

                    onClick={(e) => console.log("View Profile Link Clicked for", candidate.name)}
                    style={{ zIndex: 100, position: 'relative' }}
                    className="flex-1 py-2.5 text-xs font-bold rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-center flex items-center justify-center text-white pointer-events-auto cursor-pointer"
                  >
                    View Profile
                  </Link>
              
              
                </div>
              </motion.div>
            ))}

            {/* Empty State Card */}
            <div className="glass p-6 rounded-xl flex flex-col items-center justify-center opacity-50 border-dashed border-2 border-white/10 min-h-[320px]">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <UserPlus className="size-8" />
              </div>
              <div className="text-center space-y-1">
                <h3 className="font-bold">Discover more talent</h3>
                <p className="text-xs text-slate-400">Boost your role listing to reach more candidates.</p>
              </div>
              <button className="mt-4 px-6 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all">
                Promote Listing
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-12 pb-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© 2024 Tasyai Talent Dashboard. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#4245f0] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#4245f0] transition-colors">Help Center</a>
            <a href="#" className="hover:text-[#4245f0] transition-colors">System Status</a>
          </div>
        </footer>
      </div>
    </motion.main>
  </div>
</div>
  );
};

export default FoundTalent;