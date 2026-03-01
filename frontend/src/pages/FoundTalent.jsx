import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import Sidebar from '../components/layout/Sidebar';
import authService from '../services/authService';
import { 
  Filter,
  ArrowUpDown,
  Bookmark,
  UserPlus,
  Loader2,
  Sparkles,
  MapPin,
  ArrowRight,
  Code2,
  Github,
  Globe,
  Rss
} from 'lucide-react';
import { roles, stats } from '../data/foundTalentData';

import { useNavigate, Link } from 'react-router-dom';
const FoundTalent = () => {
  const navigate = useNavigate();

  const [activeRole, setActiveRole] = useState('All Roles');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await authService.getUsers();
        // Map backend user to candidate format if needed, or use directly
        // Backend user: name, role, skills, country, experience, profilePicture
        const mappedUsers = data.map(u => ({
            id: u._id,
            name: u.name,
            role: u.role || 'Member',
            experience: u.experience || 'N/A',
            location: u.country || 'Remote',
            image: u.profilePicture || `https://ui-avatars.com/api/?name=${u.name}&background=random`,
            status: 'offline',
            matchScore: Math.floor(Math.random() * 20) + 80,
            badge: u.role || 'Member',
            badgeColor: 'primary',
            quote: u.motto || 'No bio available',
            skills: u.skills ? u.skills.map(s => ({ name: s, level: 'high' })) : [],
            about: [u.achievements || "No detailed about section available.", u.motto || ""],
            partnership: u.partnership || 'N/A',
            experienceList: [
                {
                    title: u.role || 'Professional',
                    company: u.partnership || 'Independent',
                    period: `${u.experience || 'N/A'} Experience`,
                    description: u.achievements || 'Detailed background not provided.',
                    active: true
                }
            ],
            linkedin: u.linkedin,
            github: u.github,
            portfolio: u.portfolio
        }));
        setUsers(mappedUsers);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  
  const filteredUsers = users.filter(user => {
    if (activeRole === 'All Roles') return true;
    return user.role?.toLowerCase() === activeRole.toLowerCase();
  });


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
    <div className="bg-[#020617] text-slate-100 font-sans min-h-screen flex selection:bg-indigo-500/30">
      <SEO 
        title="Found Talent | Tasyai"
        description="Connect with top-tier professionals ready to join your startup team."
      />
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
                <Sparkles size={12} className="animate-pulse" />
                Operational Intelligence
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                Found Talent.
              </h1>
              <p className="text-slate-400 text-sm md:text-base font-medium max-w-lg leading-relaxed">
                Aggregated build protocols for elite technicians and visionaries ready for mission deployment.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
              <motion.button 
                onClick={() => navigate('/add-company')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto py-4 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-3 active:scale-95 group"
              >
                <UserPlus className="size-4 group-hover:rotate-12 transition-transform" />
                <span>Deploy New Role</span>
              </motion.button>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all flex items-center justify-center">
                  <Filter size={18} />
                </button>
                <button className="flex-1 sm:flex-none p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all flex items-center justify-center">
                  <ArrowUpDown size={18} />
                </button>
              </div>
            </div>
          </header>

          {/* Roles Quick Access */}
          <div className="relative group">
            <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-3 overflow-x-auto pb-6 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
              {roles.map((role) => {
                const isActive = activeRole === role.name;
                return (
                  <motion.button
                    key={role.name}
                    onClick={() => setActiveRole(role.name)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl whitespace-nowrap transition-all text-xs font-black uppercase tracking-widest border ${
                      isActive 
                        ? 'bg-white text-[#020617] border-white shadow-2xl shadow-white/5' 
                        : 'bg-white/[0.03] border-white/10 text-slate-500 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span>{role.name}</span>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${isActive ? 'bg-[#020617]/10 text-[#020617]' : 'bg-white/5 text-slate-600'}`}>
                      {role.count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Main Talent Feed */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-px bg-white/5 flex-1" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
                ACTIVE UPLINKS ({filteredUsers.length})
              </h2>
              <div className="h-px bg-white/5 flex-1" />
            </div>

            {loading ? (
               <div className="flex flex-col justify-center items-center py-32 gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse"></div>
                    <Loader2 className="animate-spin size-12 text-indigo-500 relative z-10" />
                  </div>
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Synchronizing Protocol...</p>
               </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredUsers.map((candidate, index) => (
                    <motion.div
                      key={candidate.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      onClick={() => navigate(`/profile-expansion?id=${candidate.id}`, { state: { candidate } })}
                      className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[40px] space-y-8 hover:bg-white/[0.04] hover:border-white/20 transition-all cursor-pointer group relative shadow-2xl"
                    >
                      {/* Fidelity Score Float */}
                      <div className="absolute top-8 right-8 text-right">
                        <div className="text-2xl font-black text-indigo-500 tracking-tighter leading-none">{candidate.matchScore}%</div>
                        <div className="text-[8px] uppercase font-black text-slate-600 tracking-widest mt-1">Fidelity</div>
                      </div>

                      {/* Profile Cluster */}
                      <div className="flex items-start gap-5 pt-4">
                        <div className="relative shrink-0">
                          <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                          <img 
                            alt={candidate.name} 
                            className="relative w-20 h-20 rounded-[28px] object-cover border-2 border-white/10 shadow-xl"
                            src={candidate.image}
                          />
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-[#020617] shadow-lg ${getStatusColor(candidate.status)}`}></div>
                        </div>
                        <div className="space-y-1 pr-12">
                          <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors tracking-tight leading-none uppercase truncate">{candidate.name}</h3>
                          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest pt-1">
                            <MapPin size={10} className="text-indigo-500/50" />
                            {candidate.location}
                          </div>
                          <div className="pt-2">
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black text-indigo-400 uppercase tracking-widest">
                              {candidate.badge}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Intelligence Quote */}
                      <div className="relative">
                        <div className="absolute -left-3 top-0 bottom-0 w-1 bg-indigo-500/20 group-hover:bg-indigo-400/50 transition-colors"></div>
                        <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed italic line-clamp-2 px-1">
                          "{candidate.quote}"
                        </p>
                      </div>

                      {/* Capabilities */}
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.slice(0, 3).map((skill) => (
                          <span key={skill.name} className="px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-xl bg-white/[0.03] border border-white/5 text-slate-500 group-hover:border-white/10 transition-all leading-none">
                            {skill.name}
                          </span>
                        ))}
                        {candidate.skills.length > 3 && (
                          <span className="text-[9px] font-black text-slate-700 self-center tracking-widest">+{candidate.skills.length - 3}</span>
                        )}
                      </div>

                      {/* Action Module */}
                      <div className="pt-2">
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-[20px] bg-white/[0.03] border border-white/10 text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all flex items-center justify-center gap-3 group/btn shadow-lg"
                        >
                          View Protocol
                          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Network Expansion Placeholder */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  onClick={() => navigate('/add-company')} 
                  className="bg-[#0f172a]/20 backdrop-blur-xl p-10 rounded-[40px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer min-h-[400px] group overflow-hidden relative shadow-xl"
                >
                  <div className="absolute inset-0 bg-indigo-500/5 rotate-12 -translate-y-1/2 -translate-x-1/2 group-hover:rotate-45 transition-transform duration-700"></div>
                  <div className="w-20 h-20 rounded-[32px] bg-white/[0.03] border border-white/5 flex items-center justify-center mb-8 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all relative z-10">
                    <UserPlus className="size-8 text-slate-700 group-hover:text-indigo-500 group-hover:scale-110 transition-all" />
                  </div>
                  <div className="text-center space-y-3 relative z-10 px-4">
                    <h3 className="font-black text-white text-xl uppercase tracking-tighter leading-none">Expand Node</h3>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest leading-loose">Initialize new talent acquisition protocols to saturate your pipeline.</p>
                  </div>
                  <button className="mt-10 px-10 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 hover:bg-white text-white hover:text-[#020617] hover:border-white transition-all relative z-10 active:scale-95 shadow-xl">
                    Saturate Output
                  </button>
                </motion.div>
              </div>
            )}
          </section>

          {/* System Footer */}
          <footer className="pt-16 pb-16 border-t border-white/5 flex flex-col xl:flex-row justify-between items-center gap-8 md:gap-10">
            <div className="flex flex-col items-center xl:items-start gap-4 order-2 xl:order-1">
              <div className="flex items-center gap-3">
                <Code2 className="text-indigo-500 size-5" />
                <span className="font-black text-white uppercase tracking-tighter text-base">Tasyai Node Terminal</span>
              </div>
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest text-center xl:text-left leading-relaxed">
                © 2024 Distributed Collaborative Network. Protocol v1.4.2
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 order-1 xl:order-2">
              <a href="#" className="text-[10px] font-black text-slate-600 hover:text-indigo-500 uppercase tracking-widest transition-all">Privacy Guard</a>
              <a href="#" className="text-[10px] font-black text-slate-600 hover:text-indigo-500 uppercase tracking-widest transition-all">Support Desk</a>
              <a href="#" className="text-[10px] font-black text-slate-600 hover:text-indigo-500 uppercase tracking-widest transition-all">Node Status</a>
              <div className="flex gap-4 border-l border-white/5 pl-8 md:pl-12">
                {[Github, Globe, Rss].map((Icon, i) => (
                  <a key={i} href="#" className="text-slate-700 hover:text-white transition-colors">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </motion.main>
    </div>
  );
};

export default FoundTalent;