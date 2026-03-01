import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import authService from '../services/authService';
import { 
  Rocket,
  Compass,
  Star,
  User,
  Book,
  Settings,
  Menu,
  ChevronLeft,
  MapPin,
  Mail,
  Linkedin,
  Github,
  Award,
  Briefcase,
  Send,
  Loader2,
  Globe,
  Link2,
  ArrowRight
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import Sidebar from '../components/layout/Sidebar';
import { candidates } from '../data/foundTalentData';

const ProfileExpansion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const candidateId = queryParams.get('id');

  const [candidate, setCandidate] = useState(location.state?.candidate || null);
  const [loading, setLoading] = useState(!location.state?.candidate && !!candidateId);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchCandidate = async () => {
        if (!candidateId || candidate) return;
        
        try {
            setLoading(true);
            const user = await authService.getUserById(candidateId);
            if (user) {
                // Map backend user to candidate schema
                const mappedCandidate = {
                    id: user._id,
                    name: user.name,
                    role: user.role || 'Member',
                    experience: user.experience || 'N/A',
                    location: user.country || 'Remote',
                    image: user.profilePicture || `https://ui-avatars.com/api/?name=${user.name}&background=random`,
                    status: 'offline',
                    matchScore: 85,
                    badge: user.role || 'Member',
                    badgeColor: 'primary',
                    quote: user.motto || 'No bio available',
                    skills: user.skills ? user.skills.map(s => ({ name: s, level: 'high' })) : [],
                    about: [user.achievements || "No detailed about section available.", user.motto || ""],
                    partnership: user.partnership || 'N/A',
                    experienceList: [
                        {
                            title: user.role || 'Professional',
                            company: user.partnership || 'Independent',
                            period: `${user.experience || 'N/A'} Experience`,
                            description: user.achievements || 'Detailed background not provided.',
                            active: true
                        }
                    ],
                    links: [
                        user.linkedin ? { name: 'LinkedIn', url: user.linkedin, icon: Linkedin, color: 'bg-[#0077b5]' } : null,
                        user.github ? { name: 'GitHub', url: user.github, icon: Github, color: 'bg-slate-800' } : null,
                        user.portfolio ? { name: 'Portfolio', url: user.portfolio, icon: Globe, color: 'bg-primary/40' } : null
                    ].filter(Boolean)
                };
                setCandidate(mappedCandidate);
            }
        } catch (error) {
            console.error("Error fetching candidate:", error);
            toast.error("Failed to load profile.");
        } finally {
            setLoading(false);
        }
    };

    fetchCandidate();
  }, [candidateId, candidate]);

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#020617] text-white">
            <Loader2 className="animate-spin size-10 text-[#4245f0]" />
        </div>
    );
  }

  if (!candidate) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#020617] text-white">
            <div className="text-center">
                <h2 className="text-xl font-bold mb-2">No candidate data found</h2>
                <p className="text-slate-400 mb-4">Please select a candidate from the main list.</p>
                <button 
                    onClick={() => navigate('/found-talent')}
                    className="px-4 py-2 bg-[#4245f0] rounded-lg hover:bg-[#4245f0]/90 transition-colors"
                >
                    Back to Talent
                </button>
            </div>
        </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {

      online: 'bg-emerald-500',
      offline: 'bg-slate-500',
      away: 'bg-amber-500'
    };
    return colors[status] || 'bg-slate-500';
  };

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
            _subject: `📩 Contact for candidate: ${candidate.name}`,
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

  return (
    <div className="bg-[#020617] text-slate-100 font-sans min-h-screen flex">
      <SEO 
        title={`${candidate?.name || 'Talent'} | Tasyai`}
        description={candidate?.quote || "View professional profile on Tasyai."}
      />
      <Toaster position="top-center" reverseOrder={false} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <motion.main 
        layout
        className={`flex-1 overflow-y-auto h-full bg-[#020617] ${isSidebarOpen ? 'md:ml-[280px]' : 'md:ml-20'}`}
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-10 py-6 md:py-10 space-y-8 pt-16 md:pt-10">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 hover:text-white transition-all mb-2 group"
            >
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-indigo-500/20 transition-all">
                  <ChevronLeft className="size-4" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest">Return to Nexus</span>
            </button>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 xl:grid-cols-3 gap-8 md:gap-10"
            >
                {/* Left Column: Core Info */}
                <div className="xl:col-span-1 space-y-8">
                    <div className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 md:p-10 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-br from-[#4245f0]/10 via-[#4245f0]/5 to-transparent"></div>
                        <div className="relative z-10 flex flex-col items-center text-center mt-6">
                            <div className="relative mb-8 group">
                                <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                <img 
                                    src={candidate.image} 
                                    alt={candidate.name} 
                                    className="relative w-36 h-36 md:w-44 md:h-44 rounded-[40px] object-cover border-4 border-[#0f172a] shadow-2xl"
                                />
                                <div className={`absolute bottom-2 right-2 w-8 h-8 rounded-full border-4 border-[#0f172a] shadow-lg ${getStatusColor(candidate.status)}`}></div>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tighter">{candidate.name}</h1>
                            <p className="text-indigo-400 font-black text-xs uppercase tracking-[0.2em] mb-3">{candidate.role}</p>
                             <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-8">
                                <MapPin className="size-3" />
                                {candidate.location}
                            </div>
                            
                            <div className="w-full grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-white/[0.03] rounded-3xl p-5 text-center border border-white/5">
                                    <div className="text-2xl font-black text-white">{candidate.matchScore}%</div>
                                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Fidelity</div>
                                </div>
                                <div className="bg-white/[0.03] rounded-3xl p-5 text-center border border-white/5">
                                    <div className="text-2xl font-black text-white">{candidate.experience.split(' ')[0]}</div>
                                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Years</div>
                                </div>
                            </div>

                            <div className="w-full space-y-3">
                              <button className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/20 transition-all active:scale-95">
                                  Initiate Link
                              </button>
                              <button className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-white transition-all active:scale-95">
                                  Profile Archive
                              </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-white/5 rounded-2xl text-indigo-500 border border-white/10">
                            <Briefcase className="size-5" />
                          </div>
                           <h3 className="font-black text-white text-xs uppercase tracking-[0.2em]">Capability Grid</h3>
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                            {candidate.skills.map((skill) => (
                                <span 
                                    key={skill.name} 
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                        skill.level === 'high' 
                                        ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500/20' 
                                        : 'bg-white/5 text-slate-500 border-white/10 hover:border-white/20'
                                    }`}
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {candidate.links && candidate.links.length > 0 && (
                        <div className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 space-y-6">
                            <div className="flex items-center gap-4">
                              <div className="p-3 bg-white/5 rounded-2xl text-indigo-500 border border-white/10">
                                <Link2 className="size-5" />
                              </div>
                               <h3 className="font-black text-white text-xs uppercase tracking-[0.2em]">Sector Links</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                {candidate.links.map((link) => {
                                    const IconComponent = link.icon;
                                    return (
                                        <a 
                                            key={link.name}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] group transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                              <div className={`w-10 h-10 rounded-xl ${link.color} flex items-center justify-center shrink-0 shadow-lg`}>
                                                  <IconComponent className="size-5 text-white" />
                                              </div>
                                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-all">{link.name}</span>
                                            </div>
                                            <ArrowRight size={14} className="text-slate-700 group-hover:text-indigo-500 transition-all group-hover:translate-x-1" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Detailed Info */}
                <div className="xl:col-span-2 space-y-8">
                    <div className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-indigo-600/5 rounded-full blur-[80px] pointer-events-none"></div>
                        
                        <div className="mb-10 p-8 rounded-3xl bg-indigo-600/5 border border-indigo-500/20 relative">
                            <div className="absolute -top-3 left-6 px-3 bg-[#0f172a] text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">Neural Signature</div>
                            <p className="italic text-white text-xl md:text-2xl font-medium leading-relaxed leading-tight tracking-tight">
                                "{candidate.quote}"
                            </p>
                        </div>
                        
                        <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tight">Mission Objective (About)</h3>
                        <div className="space-y-6 text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                            {candidate.about && candidate.about.map((paragraph, idx) => (paragraph && 
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#0f172a]/40 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 md:p-12">
                        <div className="flex items-center gap-4 mb-10">
                          <div className="p-3 bg-white/5 rounded-2xl text-indigo-500 border border-white/10">
                            <Award className="size-6" />
                          </div>
                          <h3 className="text-xl font-black text-white uppercase tracking-tight">Exp Deployment Log</h3>
                        </div>
                        
                        <div className="space-y-12 relative before:absolute before:left-[23px] before:top-4 before:h-[calc(100%-8px)] before:w-px before:bg-white/5">
                            {candidate.experienceList && candidate.experienceList.map((exp, idx) => (
                                <div key={idx} className="relative pl-16 group">
                                    <div className={`absolute left-0 top-1 w-12 h-12 rounded-2xl border-4 border-[#0f172a] shadow-xl flex items-center justify-center transition-all ${exp.active ? 'bg-indigo-600 rotate-12 group-hover:rotate-0' : 'bg-slate-800'}`}>
                                        <Rocket className="size-5 text-white" />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white opacity-40">Phase Archive {idx + 1}</h4>
                                            <span className="text-[10px] font-black text-indigo-500/80 uppercase tracking-widest px-3 py-1 bg-indigo-500/5 rounded-lg border border-indigo-500/10 self-start">{exp.period}</span>
                                        </div>
                                        <div>
                                          <h5 className="text-xl font-black text-white tracking-tight">{exp.title}</h5>
                                          <p className="text-sm font-black text-indigo-400 mt-1 uppercase tracking-widest opacity-80">{exp.company}</p>
                                        </div>
                                        <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">{exp.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="bg-gradient-to-br from-[#0f172a] to-[#020617] border border-indigo-500/30 rounded-[48px] p-8 md:p-12 relative overflow-hidden shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 p-48 bg-indigo-600/10 rounded-full blur-[100px] -mr-24 -mt-24 pointer-events-none"></div>
                        
                        <div className="flex items-center gap-4 mb-10 relative z-10">
                          <div className="p-4 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-600/20">
                            <Mail className="size-6" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">Initialize Linkage</h3>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Uplink to {candidate.name.split(' ')[0]}</p>
                          </div>
                        </div>
                        
                        <form onSubmit={handleContactSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Origin Identifier</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                        className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-5 py-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-800 font-medium"
                                        placeholder="Full Name / Alias"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Affiliation / Org</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                        className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-5 py-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-800 font-medium"
                                        placeholder="Company / Startup"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Comms Channel (Email)</label>
                                <input 
                                    required
                                    type="email" 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-5 py-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-800 font-medium"
                                    placeholder="your@protocol.io"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Zone</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={formData.phoneCode}
                                        onChange={(e) => setFormData({...formData, phoneCode: e.target.value})}
                                        className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-5 py-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-800 font-medium text-center"
                                        placeholder="+1"
                                    />
                                </div>
                                <div className="sm:col-span-2 space-y-2">
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Frequency (Phone)</label>
                                    <input 
                                        required
                                        type="tel" 
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                                        className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-5 py-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-800 font-medium"
                                        placeholder="000-000-0000"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Encoded Message</label>
                                <textarea 
                                    required
                                    rows="5"
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    className="w-full rounded-3xl bg-white/[0.03] border border-white/10 px-6 py-5 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none placeholder:text-slate-800 font-medium leading-relaxed"
                                    placeholder={`Broadcasting to ${candidate.name.split(' ')[0]}... Details on mission objective.`}
                                ></textarea>
                            </div>
                            
                            <motion.button 
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 shadow-2xl shadow-indigo-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4 group-hover:translate-x-1 group-hover:translate-y-[-1px] transition-transform" />}
                                {isSubmitting ? 'Transmitting...' : 'Initiate Uplink'}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default ProfileExpansion;
