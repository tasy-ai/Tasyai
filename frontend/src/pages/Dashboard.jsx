import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  ChevronDown
} from 'lucide-react';
import { filters, companies } from '../data/dashboardData';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All Roles');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedCompanies, setSavedCompanies] = useState(['Nebula Systems']);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSave = (companyName) => {
    setSavedCompanies(prev => 
      prev.includes(companyName) 
        ? prev.filter(name => name !== companyName)
        : [...prev, companyName]
    );
  };

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/20 border-primary/30 text-primary',
      orange: 'bg-orange-500/20 border-orange-500/30 text-orange-400',
      emerald: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
      rose: 'bg-rose-500/20 border-rose-500/30 text-rose-400',
      cyan: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400',
      purple: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="bg-[#020617] text-white font-sans overflow-hidden h-screen">



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
                
                <div className="h-6 w-[1px] bg-white/10 mx-2"></div>
                
                <button className="text-slate-400 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors">
                  <Settings className="size-4" />
                  More Filters
                </button>
              </div>
            </div>

            {/* Company Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {companies.map((company, index) => {
                const isSaved = savedCompanies.includes(company.name);
                
                return (
                  <motion.div
                    key={company.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4, borderColor: 'rgba(100, 103, 242, 0.5)' }}
                    className="group p-6 rounded-2xl glass-effect flex flex-col transition-all cursor-pointer"
                  >
                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="size-14 rounded-xl overflow-hidden border border-white/10">
                        <img 
                          src={company.image} 
                          alt={company.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button 
                        onClick={() => toggleSave(company.name)}
                        className="p-2 rounded-lg text-slate-500 hover:text-[#6467f2] hover:bg-[#6467f2]/10 transition-all"
                      >
                        {isSaved ? (
                          <Bookmark className="size-5 fill-[#6467f2] text-[#6467f2]" />
                        ) : (
                          <BookmarkPlus className="size-5" />
                        )}
                      </button>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-2">{company.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">{company.description}</p>
                    
                    {/* Roles */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {company.roles.map((role) => (
                        <span 
                          key={role} 
                          className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-semibold text-slate-300"
                        >
                          {role}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex gap-3">
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-3 px-4 bg-[#6467f2] hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition-all"
                      >
                        Show Interest
                      </motion.button>
                      <Link 
                        to={`/company-detail?id=${company.id}`}
                        state={{ company }}
                        className="flex-1 py-3 px-4 glass-effect text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center hover:bg-white/10"
                      >
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Load More */}
            <div className="mt-16 flex justify-center">
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-white font-semibold transition-all flex items-center gap-2"
              >
                Load More Startups
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