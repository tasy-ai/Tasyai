import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2,
  Search,
  Bell,
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
  History,
  Mail,
  Send,
  Loader2
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

import { useLocation } from 'react-router-dom';

const Profile = () => {
  const location = useLocation();
  const profileData = location.state?.profileData;
  console.log('Profile loaded with data:', profileData);
  
  // Default User Data (Fallback)
  const defaultUser = {
    name: 'Alex Rivera',
    role: 'Founder',
    headline: 'Building decentralized futures | UX Engineer',
    location: 'San Francisco, CA',
    email: 'alex.rivera@tasyai.dev',
    about: [
      'A detailed personal introduction focusing on building decentralized systems and scaling startup teams. Dedicated to bridging the gap between high-level product strategy and technical execution in the Web3 space.',
      'Currently focused on developing open-source tooling for DAO governance and peer-to-peer collaboration protocols. Looking for passionate designers and frontend architects to join the core team for Project Nexus.'
    ],
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

  const user = profileData || defaultUser;
  const [activeTab, setActiveTab] = useState('My Ventures');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '',
    phoneNumber: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.phoneCode.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.message.trim()
    ) {
      toast.error("❌ Please fill out all fields before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/unisire.mainhub@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneCode: formData.phoneCode,
            phoneNumber: formData.phoneNumber,
            message: formData.message,
            _subject: "📩 New Contact Us Submission",
          }),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(
          "✅ Your message has been sent. Our team will reach out soon!"
        );
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneCode: "",
          phoneNumber: "",
          message: "",
        });
      } else {
        toast.error("❌ Failed to send message. Please try again later.");
      }
    } catch (error) {
      toast.error("⚠️ Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <Toaster position="top-center" reverseOrder={false} />
      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          background-color: #020617;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .avatar-glow {
          box-shadow: 0 0 25px 2px rgba(66, 69, 240, 0.4);
        }
      `}</style>

      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full px-6 lg:px-20 py-4 glass-card border-t-0 border-x-0 border-b border-white/10">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-8">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="text-[#4245f0]">
                  <Code2 className="size-8 text-[#4245f0]" />
                </div>
                <h1 className="text-xl font-bold tracking-tight">Tasyai</h1>
              </div>
              
              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                {['Explore', 'Network', 'Projects', 'Messages'].map((item) => (
                  <a key={item} href="#" className="hover:text-white transition-colors relative group">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4245f0] transition-all group-hover:w-full" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
                <input 
                  type="text"
                  className="h-10 w-64 rounded-xl border-none bg-white/5 pl-10 text-sm text-white focus:ring-2 focus:ring-[#4245f0]/50 transition-all outline-none placeholder:text-slate-500"
                  placeholder="Search talent..."
                />
              </div>
              
              <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <Bell className="size-5" />
                <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-[#4245f0] ring-2 ring-[#020617]"></span>
              </button>
              
              <div className="h-10 w-10 rounded-full border-2 border-[#4245f0]/30 bg-gradient-to-br from-primary/30 to-purple-500/30 flex items-center justify-center text-white font-bold text-sm">
                AR
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-12 lg:px-20">
          {/* Profile Header */}
          <section className="mb-12 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="avatar-glow h-32 w-32 rounded-full border-4 border-[#4245f0] p-1">
                <div className="h-full w-full rounded-full overflow-hidden border-4 border-[#020617]">
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-3xl font-bold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute bottom-0 right-1 h-6 w-6 rounded-full border-4 border-[#020617] bg-green-500"></div>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <h2 className="text-4xl font-bold text-white">{user.name}</h2>
                <span className="inline-flex items-center rounded-full bg-[#4245f0]/20 px-3 py-1 text-xs font-semibold text-[#4245f0] ring-1 ring-inset ring-[#4245f0]/30 uppercase tracking-wider">{user.badge || user.role}</span>
              </div>
              <p className="text-lg text-slate-400 max-w-xl">{user.headline || user.role}</p>
              <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                <MapPin className="size-4" />
                <span>{user.location}</span>
              </div>
            </div>
            
            <div className="mt-8 flex gap-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#4245f0] to-[#6366f1] px-8 py-3 text-sm font-bold text-white transition-all hover:opacity-90 shadow-lg shadow-[#4245f0]/20"
              >
                <Edit3 className="size-4" />
                <span>Edit Profile</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-xl border border-white/10 glass-card px-8 py-3 text-sm font-bold text-white transition-all hover:bg-white/10"
              >
                <Share2 className="size-4" />
                <span>Share</span>
              </motion.button>
            </div>
          </section>

          {/* Content Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Column */}
            <div className="space-y-8 lg:col-span-7">
              {/* About */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-xl p-8"
              >
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
                  <User className="size-5 text-[#4245f0]" />
                  About
                </h3>
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  {user.about && user.about.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>

              {/* Skills */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-xl p-8"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-xl font-bold">
                    <Zap className="size-5 text-[#4245f0]" />
                    Skills
                  </h3>
                  <span className="text-xs text-slate-500 italic">Opacity indicates proficiency</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {user.skills && user.skills.map((skill) => (
                    <span 
                      key={skill.name}
                      className={`rounded-lg px-4 py-2 text-sm font-medium border cursor-default transition-all ${getSkillClasses(skill.level)} ${getSkillOpacity(skill.level)} hover:opacity-100`}
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
                className="glass-card rounded-xl p-8"
              >
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
                  <Link2 className="size-5 text-[#4245f0]" />
                  Portfolio & Links
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.links && user.links.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <motion.a 
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-4 rounded-xl bg-white/5 p-4 transition-all hover:bg-white/10"
                      >
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${link.color || 'bg-slate-700'}`}>
                          {IconComponent && <IconComponent className="size-5 text-white" />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{link.name}</p>
                          <p className="text-xs text-slate-500 truncate max-w-[150px]">{link.url.replace(/^https?:\/\//, '')}</p>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="glass-card rounded-xl p-8 border border-[#4245f0]/30 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-32 bg-[#4245f0]/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold relative z-10">
                  <Mail className="size-5 text-[#4245f0]" />
                  Get in Touch
                </h3>
                
                <form onSubmit={handleContactSubmit} className="space-y-4 relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">First Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-[#4245f0] outline-none transition-all placeholder:text-slate-600"
                        placeholder="Jordan"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Last Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-[#4245f0] outline-none transition-all placeholder:text-slate-600"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Email</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-[#4245f0] outline-none transition-all placeholder:text-slate-600"
                      placeholder="jordan@example.com"
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Code</label>
                      <input 
                        required
                        type="text" 
                        value={formData.phoneCode}
                        onChange={(e) => setFormData({...formData, phoneCode: e.target.value})}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-[#4245f0] outline-none transition-all placeholder:text-slate-600"
                        placeholder="+1"
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-[#4245f0] outline-none transition-all placeholder:text-slate-600"
                        placeholder="555-0123"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Message</label>
                    <textarea 
                      required
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-[#4245f0] outline-none transition-all resize-none placeholder:text-slate-600"
                      placeholder="Hi, I'd like to discuss a project..."
                    ></textarea>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-[#4245f0] hover:bg-[#4245f0]/90 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#4245f0]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-8 lg:col-span-5">
              {/* Company Activity */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card rounded-xl p-8"
              >
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="flex items-center gap-2 text-xl font-bold">
                      <Building2 className="size-5 text-[#4245f0]" />
                      Company Activity
                    </h3>
                    <button className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                      <Plus className="size-4" />
                    </button>
                  </div>
                  
                  <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
                    <button 
                      onClick={() => setActiveTab('My Ventures')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'My Ventures' ? 'bg-[#4245f0] text-white shadow-lg shadow-[#4245f0]/20' : 'text-slate-400 hover:text-white'}`}
                    >
                      My Ventures
                    </button>
                    <button 
                      onClick={() => setActiveTab('Applied To')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'Applied To' ? 'bg-[#4245f0] text-white shadow-lg shadow-[#4245f0]/20' : 'text-slate-400 hover:text-white'}`}
                    >
                      Applied To
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {activeTab === 'My Ventures' ? (
                    user.ventures && user.ventures.length > 0 ? (
                      user.ventures.map((venture) => {
                        const IconComponent = venture.icon;
                        return (
                          <div key={venture.id} className="flex items-center justify-between gap-4 group">
                            <div className="flex items-center gap-4">
                              <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${venture.color || 'from-slate-700 to-slate-600'} p-3 flex items-center justify-center shrink-0`}>
                                {IconComponent ? <IconComponent className="size-7 text-white" /> : <Code2 className="size-7 text-white" />}
                              </div>
                              <div className="overflow-hidden">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <h4 className="font-bold truncate">{venture.name}</h4>
                                  <span className="inline-flex items-center rounded-full bg-[#4245f0]/10 px-2 py-0.5 text-[10px] font-bold text-[#4245f0] ring-1 ring-inset ring-[#4245f0]/30 uppercase tracking-tighter">{venture.role}</span>
                                </div>
                                <p className="text-xs text-slate-400">{venture.description}</p>
                              </div>
                            </div>
                            <button className="rounded-lg bg-white/5 px-4 py-2 text-xs font-bold transition-all hover:bg-white/10 hover:text-[#4245f0]">Manage</button>
                          </div>
                        );
                      })
                    ) : ( 
                      <div className="text-slate-500 text-center py-4">No public ventures listed.</div>
                    )
                  ) : (
                    <div className="text-slate-500 text-center py-4">No pending applications.</div>
                  )}

                  {activeTab === 'My Ventures' && (
                    <div className="pt-4 mt-6 border-t border-white/5">
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-slate-500"></span>
                        Preview: Applied Companies
                      </p>
                      <div 
                        onClick={() => setActiveTab('Applied To')}
                        className="flex items-center justify-between gap-4 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 rounded-xl bg-slate-800 p-3 flex items-center justify-center shrink-0">
                            <Rocket className="size-7 text-indigo-400" />
                          </div>
                          <div className="overflow-hidden">
                            <div className="flex items-center gap-2 mb-0.5">
                              <h4 className="font-bold truncate">Nova Protocol</h4>
                              <span className="inline-flex items-center rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold text-amber-400 ring-1 ring-inset ring-amber-400/30 uppercase tracking-tighter">Applied - Pending</span>
                            </div>
                            <p className="text-xs text-slate-400">Cross-chain Liquidity</p>
                          </div>
                        </div>
                        <button className="rounded-lg bg-white/5 px-4 py-2 text-xs font-bold transition-all hover:bg-white/10">View Info</button>
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
                className="glass-card rounded-xl p-8"
              >
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
                  <Clock className="size-5 text-[#4245f0]" />
                  Status
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between rounded-xl bg-white/5 p-4 border border-white/5">
                    <span className="text-sm font-medium text-slate-300">Availability</span>
                    <span className="flex items-center gap-2 text-sm font-bold text-green-400">
                      <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                      Open to Collaborate
                    </span>
                  </div>
                  <div className="space-y-2 px-1">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Interests</p>
                    <p className="text-sm text-slate-300 italic">"Always looking for Web3 infrastructure projects and AI-driven governance experiments."</p>
                  </div>
                </div>
              </motion.div>



              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="glass-card rounded-xl p-6 flex flex-col items-center text-center"
                >
                  <Users className="text-[#4245f0] size-8 mb-2" />
                  <span className="text-2xl font-bold">42</span>
                  <span className="text-xs text-slate-500 uppercase font-semibold">Collaborations</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="glass-card rounded-xl p-6 flex flex-col items-center text-center"
                >
                  <Eye className="text-[#4245f0] size-8 mb-2" />
                  <span className="text-2xl font-bold">1.2k</span>
                  <span className="text-xs text-slate-500 uppercase font-semibold">Profile Views</span>
                </motion.div>
              </div>

              {/* Experience */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="glass-card rounded-xl p-8"
              >
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
                  <History className="size-5 text-[#4245f0]" />
                  Experience Highlights
                </h3>
                <div className="space-y-6">
                  {user.experienceList && user.experienceList.map((exp, index) => (
                    <div key={index} className={`relative pl-6 ${exp.active ? 'before:absolute before:left-0 before:top-1.5 before:h-2 before:w-2 before:rounded-full before:bg-[#4245f0] before:ring-4 before:ring-[#4245f0]/20' : 'before:absolute before:left-0 before:top-1.5 before:h-2 before:w-2 before:rounded-full before:bg-slate-700'}`}>
                      <p className="text-xs text-slate-500">{exp.period}</p>
                      <h4 className="font-bold">{exp.title} • {exp.company}</h4>
                      <p className="text-sm text-slate-400 mt-1 leading-snug">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-white/10 bg-black/40 py-12 px-6 lg:px-20 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-3 opacity-60">
              <Code2 className="size-6 text-white" />
              <span className="text-sm font-bold tracking-tight text-white">Tasyai © 2024</span>
            </div>
            <div className="flex gap-8 text-sm text-slate-500">
              {['Privacy Policy', 'Terms of Service', 'Contact Support'].map((item) => (
                <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Profile;