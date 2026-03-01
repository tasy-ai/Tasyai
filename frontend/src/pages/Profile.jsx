import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { 
  Code2,
  MapPin,
  Edit3,
  Share2,
  User,
  Zap,
  Link2,
  Code,
  Globe,
  FileText,
  Building2,
  Plus,
  Rocket,
  Shield,
  Clock,
  Users,
  Eye,
  Mail,
  Send,
  Loader2,
  ArrowRight,
  Linkedin,
  Github
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import Sidebar from '../components/layout/Sidebar';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import companyService from '../services/companyService';
import Achievements from '../components/profile/Achievements';
import Moto from '../components/profile/Moto';
import Availability from '../components/profile/Availability';

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('My Ventures');
  
  // Default User Data (Fallback)
  const defaultUser = {
    name: 'Alex Rivera',
    role: 'Founder',
    headline: 'Building decentralized futures | UX Engineer',
    location: 'San Francisco, CA',
    email: 'alex.rivera@tasyai.dev',
    year: '2024',
    about: [
      'A detailed personal introduction focusing on building decentralized systems and scaling startup teams. Dedicated to bridging the gap between high-level product strategy and technical execution in the Web3 space.',
      'Currently focused on developing open-source tooling for DAO governance and peer-to-peer collaboration protocols. Looking for passionate designers and frontend architects to join the core team for Project Nexus.'
    ],
    achievements: "Built a layer-2 scaling solution for 50k+ daily users and led design for 5 Fortune 500 startups.",
    motto: "Building decentralized futures | UX Engineer",
    availability: "Available for full-time roles and strategic consulting",
    skills: [
      { name: 'React.js', level: 'high' },
      { name: 'Product Strategy', level: 'high' },
      { name: 'Solidity', level: 'high' },
      { name: 'UI/UX Design', level: 'medium' },
      { name: 'Rust', level: 'medium' },
      { name: 'AI/ML Implementation', level: 'medium' },
      { name: 'Project Management', level: 'low' },
      { name: 'Go Language', level: 'low' }
    ],
    ventures: [
      {
        id: 1,
        name: 'Project Nexus',
        role: 'Founder',
        description: 'Decentralized ERP Systems',
        icon: Code2,
        color: 'from-indigo-500 to-purple-600'
      },
      {
        id: 2,
        name: 'SafeGuard AI',
        role: 'Founder',
        description: 'Governance Security Tools',
        icon: Shield,
        color: 'from-orange-400 to-red-500'
      }
    ],
    experienceList: [
      {
        period: '2021 — Present',
        title: 'Principal Architect',
        company: 'BlockTech',
        description: 'Led the development of a layer-2 scaling solution used by 50k+ daily users.',
        active: true
      },
      {
        period: '2018 — 2021',
        title: 'Lead Designer',
        company: 'CreativeX',
        description: 'Designed enterprise design systems for Fortune 500 startups.',
        active: false
      }
    ],
    links: [
      { name: 'GitHub', url: 'github.com/arivera-dev', icon: Code, color: 'bg-slate-800' },
      { name: 'LinkedIn', url: 'linkedin.com/in/alexrivera', icon: User, color: 'bg-[#0077b5]' },
      { name: 'Personal Website', url: 'alexrivera.io', icon: Globe, color: 'bg-primary/40' },
      { name: 'Whitepapers', url: 'Medium / Substack', icon: FileText, color: 'bg-slate-800' }
    ]
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (!currentUser) {
            navigate('/login');
            return;
        }

        if (!currentUser.isOnboarded) {
            navigate('/OnboardingChatbot');
            return;
        }

        if (location.state?.profileData) {
             setUser(location.state.profileData);
             setLoading(false);
             return;
        }

        // Fetch from backend
        try {
            const [backendUser, myCompanies] = await Promise.all([
                authService.getProfile(),
                companyService.getMyCompanies()
            ]);

            // Map backendUser to frontend user format
            const mappedUser = {
                id: backendUser._id,
                name: backendUser.name || "User",
                role: backendUser.role || "Role not set",
                headline: backendUser.motto || "No headline yet",
                location: backendUser.country || "Location not set",
                email: backendUser.email || "",
                image: backendUser.profilePicture, 
                achievements: backendUser.achievements,
                motto: backendUser.motto,
                availability: backendUser.time,
                about: [], // Clear about since we use distinct components now
                skills: (backendUser.skills && backendUser.skills.length > 0) 
                    ? backendUser.skills.map(s => ({ name: s, level: 'high' })) 
                    : [],
                ventures: myCompanies.map(company => ({
                    id: company._id,
                    name: company.name,
                    role: 'Founder',
                    description: company.tagline,
                    icon: Building2,
                    color: 'from-slate-700 to-slate-600',
                    fullData: company
                })),
                experienceList: [], // Backend stores experience as a string range, not a list
                links: [
                    backendUser.linkedin ? { name: 'LinkedIn', url: backendUser.linkedin, icon: Linkedin, color: 'bg-[#0077b5]' } : null,
                    backendUser.github ? { name: 'GitHub', url: backendUser.github, icon: Github, color: 'bg-slate-800' } : null,
                    backendUser.portfolio ? { name: 'Portfolio', url: backendUser.portfolio, icon: Globe, color: 'bg-primary/40' } : null
                ].filter(Boolean)
            };
            setUser(mappedUser);
        } catch (err) {
            console.error("Failed to fetch profile", err);
            toast.error("Failed to load profile");
            setUser(defaultUser);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [navigate, location]);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/profile-expansion?id=${user.id}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${user.name} | Tasyai Profile`,
          text: `Check out ${user.name}'s professional profile on Tasyai!`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Profile link copied to clipboard!');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        toast.error('Could not share profile');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        <Loader2 className="animate-spin size-10 text-[#4245f0]" />
      </div>
    );
  }

  // Fallback if user is null for some reason (shouldn't happen due to defaultUser fallback on error, but good for safety)
  if (!user) return null;


  const getSkillClasses = (level) => {
    const classes = {
      high: 'bg-[#4245f0]/20 text-white border-[#4245f0]/30 hover:bg-[#4245f0]/30',
      medium: 'bg-white/10 text-slate-200 border-white/10 hover:opacity-100',
      low: 'bg-white/5 text-slate-400 border-white/5 hover:opacity-100'
    };
    return classes[level] || classes.medium;
  };

  const getSkillOpacity = (level) => {
    const opacities = {
      high: 'opacity-100',
      medium: 'opacity-80',
      low: 'opacity-60'
    };
    return opacities[level] || 'opacity-80';
  };

  return (
    <div className="bg-[#020617] text-white font-sans min-h-screen">
      <SEO 
        title={`${user?.name || 'User'} Profile`}
        description={user?.headline || "View professional profile on Tasyai."}
      />
      <Toaster position="top-center" reverseOrder={false} />
      {/* Global Styles */}


      <div className="flex bg-[#020617] min-h-screen overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'md:ml-[280px]' : 'md:ml-20'}`}>
          {/* Header */}
          <header className="sticky top-0 z-40 w-full px-4 md:px-10 py-4 glass-card border-t-0 border-x-0 border-b border-white/10 bg-[#020617]/80 backdrop-blur-md pt-12 md:pt-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-8">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="text-[#4245f0]">
                  <Code2 className="size-7 md:size-8 text-[#4245f0]" />
                </div>
                <h1 className="text-lg md:text-xl font-bold tracking-tight">Tasyai</h1>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">
              {user.image ? (
                <img src={user.image} className="h-8 w-8 md:h-10 md:w-10 rounded-full border-2 border-[#4245f0]/30 object-cover" alt="Avatar" />
              ) : (
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-full border-2 border-[#4245f0]/30 bg-gradient-to-br from-[#4245f0]/30 to-purple-500/30 flex items-center justify-center text-white font-bold text-xs md:text-sm">
                  {user.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?'}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 md:px-10 py-8 md:py-12">
          {/* Profile Header */}
          <section className="mb-10 md:mb-12 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="avatar-glow h-28 w-28 md:h-32 md:w-32 rounded-full border-4 border-[#4245f0] p-1">
                <div className="h-full w-full rounded-full overflow-hidden border-4 border-[#020617]">
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-2xl md:text-3xl font-bold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute bottom-0 right-1 h-5 w-5 md:h-6 md:w-6 rounded-full border-4 border-[#020617] bg-green-500"></div>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{user.name}</h2>
                <span className="inline-flex items-center rounded-full bg-[#4245f0]/20 px-3 py-1 text-[10px] font-bold text-[#4245f0] ring-1 ring-inset ring-[#4245f0]/30 uppercase tracking-widest">{user.badge || user.role}</span>
              </div>
              <p className="text-base md:text-lg text-slate-400 max-w-xl font-medium">{user.headline || user.role}</p>
              <div className="flex items-center gap-1.5 text-xs md:text-sm text-slate-500 mt-1 uppercase tracking-wider font-bold">
                <MapPin className="size-3.5 md:size-4 text-[#4245f0]" />
                <span>{user.location}</span>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/settings')}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#4245f0] to-[#6366f1] px-10 py-3.5 text-sm font-bold text-white transition-all hover:opacity-90 shadow-xl shadow-[#4245f0]/20"
              >
                <Edit3 className="size-4" />
                <span>Edit Profile</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 glass-card px-10 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10"
              >
                <Share2 className="size-4" />
                <span>Share Profile</span>
              </motion.button>
            </div>
          </section>

          {/* Content Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Column */}
            <div className="space-y-6 md:space-y-8 lg:col-span-7">
              {/* Insights & About */}
              <div className="space-y-6">
                {(user.achievements || user.motto || user.availability) && (
                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Achievements content={user.achievements} />
                      <Moto content={user.motto} />
                    </div>
                    <Availability content={user.availability} />
                  </div>
                )}
                
                {user.about && user.about.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-[32px] p-6 md:p-8 border border-white/5"
                  >
                    <h3 className="mb-6 flex items-center gap-3 text-lg md:text-xl font-bold">
                      <User className="size-5 text-[#4245f0]" />
                      About
                    </h3>
                    <div className="space-y-4 text-slate-400 leading-relaxed text-sm md:text-base">
                      {user.about.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Skills */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-[32px] p-6 md:p-8 border border-white/5"
              >
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="flex items-center gap-3 text-lg md:text-xl font-bold">
                    <Zap className="size-5 text-[#4245f0]" />
                    Expertise
                  </h3>
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest bg-white/5 px-2 py-1 rounded">Opacity indicates proficiency</span>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {user.skills && user.skills.map((skill) => (
                    <span 
                      key={skill.name}
                      className={`rounded-xl px-4 py-2 text-xs md:text-sm font-bold border cursor-default transition-all ${getSkillClasses(skill.level)} ${getSkillOpacity(skill.level)} hover:opacity-100 uppercase tracking-tight`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Portfolio Links */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-[32px] p-6 md:p-8 border border-white/5"
              >
                <h3 className="mb-6 flex items-center gap-3 text-lg md:text-xl font-bold">
                  <Link2 className="size-5 text-[#4245f0]" />
                  Digital Ecosystem
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.links && user.links.length > 0 ? (
                    user.links.map((link) => {
                      const IconComponent = link.icon;
                      return (
                        <motion.a 
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-4 rounded-2xl bg-white/[0.03] p-4 transition-all hover:bg-white/[0.08] border border-white/5"
                        >
                          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${link.color || 'bg-slate-700'} shadow-lg`}>
                            {IconComponent && <IconComponent className="size-5 text-white" />}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-white mb-0.5">{link.name}</p>
                            <p className="text-[10px] text-slate-400 truncate opacity-70 group-hover:opacity-100">{link.url.replace(/^https?:\/\//, '')}</p>
                          </div>
                        </motion.a>
                      );
                    })
                  ) : (
                    <p className="text-slate-500 text-sm col-span-2 text-center py-4 italic">No portfolio links added yet.</p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-6 md:space-y-8 lg:col-span-5">
              {/* Company Activity */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card rounded-[32px] p-6 md:p-8 border border-white/5"
              >
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="flex items-center gap-3 text-lg md:text-xl font-bold">
                      <Building2 className="size-5 text-[#4245f0]" />
                      Activity
                    </h3>
                    <motion.button 
                      whileHover={{ rotate: 90 }}
                      onClick={() => navigate('/add-company')}
                      className="h-9 w-9 rounded-xl bg-[#4245f0]/10 flex items-center justify-center hover:bg-[#4245f0] hover:text-white text-[#4245f0] transition-all"
                    >
                      <Plus className="size-5" />
                    </motion.button>
                  </div>
                  
                  <div className="flex p-1.5 bg-white/[0.03] rounded-2xl border border-white/10">
                    <button 
                      onClick={() => setActiveTab('My Ventures')}
                      className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'My Ventures' ? 'bg-[#4245f0] text-white shadow-lg shadow-[#4245f0]/20' : 'text-slate-500 hover:text-white'}`}
                    >
                      My Ventures
                    </button>
                    <button 
                      onClick={() => setActiveTab('Applied To')}
                      className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'Applied To' ? 'bg-[#4245f0] text-white shadow-lg shadow-[#4245f0]/20' : 'text-slate-500 hover:text-white'}`}
                    >
                      Applied To
                    </button>
                  </div>
                </div>

                <div className="space-y-5">
                  {activeTab === 'My Ventures' ? (
                    user.ventures && user.ventures.length > 0 ? (
                      user.ventures.map((venture) => {
                        const IconComponent = venture.icon;
                        return (
                          <div key={venture.id} className="flex items-center justify-between gap-4 group bg-white/[0.02] p-3 rounded-2xl border border-white/5 hover:bg-white/[0.05] transition-all cursor-pointer">
                            <div className="flex items-center gap-4 min-w-0">
                              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${venture.color || 'from-slate-700 to-slate-600'} flex items-center justify-center shrink-0 shadow-lg`}>
                                {IconComponent ? <IconComponent className="size-6 text-white" /> : <Code2 className="size-6 text-white" />}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <h4 className="font-bold text-sm truncate text-white">{venture.name}</h4>
                                  <span className="shrink-0 inline-flex items-center rounded-lg bg-[#4245f0]/10 px-1.5 py-0.5 text-[8px] font-black text-[#4245f0] ring-1 ring-inset ring-[#4245f0]/30 uppercase tracking-tighter">{venture.role}</span>
                                </div>
                                <p className="text-[10px] text-slate-500 truncate">{venture.description}</p>
                              </div>
                            </div>
                            <button className="shrink-0 rounded-xl bg-white/5 px-3 py-1.5 text-[10px] font-bold text-slate-300 transition-all hover:bg-[#4245f0] hover:text-white">Admin</button>
                          </div>
                        );
                      })
                    ) : ( 
                      <div className="text-slate-500 text-center py-8 text-sm italic glass rounded-2xl border border-dashed border-white/10">No public ventures listed.</div>
                    )
                  ) : (
                    <div className="text-slate-500 text-center py-8 text-sm italic glass rounded-2xl border border-dashed border-white/10">No pending applications.</div>
                  )}

                  {activeTab === 'My Ventures' && (
                    <div className="pt-6 mt-6 border-t border-white/5">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black mb-5 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4245f0]"></span>
                        Applied Companies
                      </p>
                      <div 
                        onClick={() => setActiveTab('Applied To')}
                        className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 opacity-70 hover:opacity-100 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="h-12 w-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                            <Rocket className="size-6 text-indigo-400" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <h4 className="font-bold text-sm truncate text-white">Nova Protocol</h4>
                              <span className="shrink-0 inline-flex items-center rounded-lg bg-amber-400/10 px-1.5 py-0.5 text-[8px] font-black text-amber-400 ring-1 ring-inset ring-amber-400/30 uppercase tracking-tighter">Pending</span>
                            </div>
                            <p className="text-[10px] text-slate-500 truncate">Infrastructure Layer</p>
                          </div>
                        </div>
                        <button className="shrink-0 rounded-xl bg-white/5 px-3 py-1.5 text-[10px] font-bold text-slate-300 transition-all group-hover:bg-white/10">Info</button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Status */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card rounded-[32px] p-6 md:p-8 border border-white/5"
              >
                <h3 className="mb-6 flex items-center gap-3 text-lg md:text-xl font-bold">
                  <Clock className="size-5 text-[#4245f0]" />
                  Discovery Match
                </h3>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-white/[0.03] p-4 border border-white/5">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Availability</span>
                    <span className="flex items-center gap-2 text-xs font-black text-green-400 uppercase tracking-widest bg-green-400/10 px-3 py-1.5 rounded-xl">
                      <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                      Open to Collab
                    </span>
                  </div>
                  <div className="space-y-5 px-1">
                    <div className="p-5 rounded-2xl bg-indigo-500/[0.03] border border-indigo-500/10 italic text-sm text-slate-400 leading-relaxed relative">
                        <div className="absolute -left-1 top-4 w-1 h-8 bg-[#4245f0] rounded-full"></div>
                        "Your profile matches with <span className="text-white font-bold">{user.role}</span> roles. 
                        We've identified opportunities that align with your <span className="text-[#4245f0] font-bold">{(user.skills && user.skills.length > 0) ? user.skills[0].name : 'expertise'}</span>."
                    </div>
                    <Link 
                      to="/my-interests"
                      className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#4245f0]/5 border border-[#4245f0]/20 text-[10px] font-black text-[#4245f0] uppercase tracking-[0.2em] hover:bg-[#4245f0] hover:text-white transition-all group shadow-inner"
                    >
                       Discovery Matches <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="glass-card rounded-3xl p-6 flex flex-col items-center text-center border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent"
                >
                  <div className="p-3 rounded-2xl bg-[#4245f0]/10 mb-3">
                    <Users className="text-[#4245f0] size-6" />
                  </div>
                  <span className="text-3xl font-black text-white mb-1">42</span>
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Collaborations</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="glass-card rounded-3xl p-6 flex flex-col items-center text-center border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent"
                >
                  <div className="p-3 rounded-2xl bg-indigo-500/10 mb-3">
                    <Eye className="text-indigo-400 size-6" />
                  </div>
                  <span className="text-3xl font-black text-white mb-1">1.2k</span>
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Profile Views</span>
                </motion.div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 md:mt-auto border-t border-white/5 bg-[#020617]/40 py-12 px-4 md:px-10 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-3 opacity-60">
              <Code2 className="size-6 text-white" />
              <span className="text-sm font-black tracking-tight text-white uppercase tracking-widest">Tasyai © 2024</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[11px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">
              {['Privacy', 'Terms', 'Support'].map((item) => (
                <a key={item} href="#" className="hover:text-[#4245f0] transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </footer>
        </div>
      </div>
    </div>
  );
};

export default Profile;