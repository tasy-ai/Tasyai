import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Loader2
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import Sidebar from '../components/layout/Sidebar';
import { candidates } from '../data/foundTalentData';

const ProfileExpansion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const candidateId = queryParams.get('id');

  let candidate = location.state?.candidate;

  if (!candidate && candidateId) {
      candidate = candidates.find(c => c.id === parseInt(candidateId));
  }

  console.log('ProfileExpansion loaded. State:', location.state, 'ID:', candidateId, 'Found:', candidate);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
    <div className="bg-[#020617] text-slate-100 font-sans min-h-screen overflow-hidden h-screen flex">
      <Toaster position="top-center" reverseOrder={false} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <motion.main 
        layout
        className={`flex-1 overflow-y-auto h-full bg-[#020617] ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 py-8 space-y-8">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
            >
                <ChevronLeft className="size-5" />
                Back to Talent
            </button>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
                {/* Left Column: Core Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-[#4245f0]/20 to-purple-500/20"></div>
                        <div className="relative z-10 flex flex-col items-center text-center mt-12">
                            <div className="relative mb-4">
                                <img 
                                    src={candidate.image} 
                                    alt={candidate.name} 
                                    className="w-32 h-32 rounded-full object-cover border-4 border-[#0f172a]"
                                />
                                <div className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-4 border-[#0f172a] ${getStatusColor(candidate.status)}`}></div>
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-2">{candidate.name}</h1>
                            <p className="text-[#4245f0] font-semibold text-lg mb-1">{candidate.role}</p>
                             <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                                <MapPin className="size-4" />
                                {candidate.location}
                            </div>
                            
                            <div className="w-full grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                                    <div className="text-2xl font-bold text-white">{candidate.matchScore}%</div>
                                    <div className="text-xs text-slate-500 uppercase font-bold">Match</div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                                    <div className="text-2xl font-bold text-white">{candidate.experience.split(' ')[0]}</div>
                                    <div className="text-xs text-slate-500 uppercase font-bold">Years Exp</div>
                                </div>
                            </div>

                            <button className="w-full py-3 rounded-xl font-bold gradient-primary text-white shadow-lg shadow-[#4245f0]/20 hover:opacity-90 transition-all mb-3">
                                Connect Now
                            </button>
                            <button className="w-full py-3 rounded-xl font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all">
                                Download Resume
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Briefcase className="size-5 text-[#4245f0]" />
                            Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {candidate.skills.map((skill) => (
                                <span 
                                    key={skill.name} 
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${
                                        skill.level === 'high' 
                                        ? 'bg-[#4245f0]/10 text-[#4245f0] border-[#4245f0]/20' 
                                        : 'bg-white/5 text-slate-300 border-white/10'
                                    }`}
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Detailed Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-8">
                        <div className="mb-6 p-4 rounded-xl bg-[#4245f0]/10 border border-[#4245f0]/20 italic text-slate-200 text-lg">
                            "{candidate.quote}"
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-4">About</h3>
                        <div className="space-y-4 text-slate-400 leading-relaxed">
                            {candidate.about && candidate.about.map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Award className="size-5 text-[#4245f0]" />
                            Work History
                        </h3>
                        <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-20px)] before:w-0.5 before:bg-white/10">
                            {candidate.experienceList && candidate.experienceList.map((exp, idx) => (
                                <div key={idx} className="relative pl-12 group">
                                    <div className={`absolute left-0 top-1 w-10 h-10 rounded-full border-4 border-[#0f172a] flex items-center justify-center ${exp.active ? 'bg-[#4245f0]' : 'bg-slate-700'}`}>
                                        <Briefcase className="size-4 text-white" />
                                    </div>
                                    <div>
                                        <div className="flex items-baseline justify-between mb-1">
                                            <h4 className="text-lg font-bold text-white group-hover:text-[#4245f0] transition-colors">{exp.title}</h4>
                                            <span className="text-sm font-medium text-slate-500">{exp.period}</span>
                                        </div>
                                        <div className="text-[#4245f0] font-medium mb-2">{exp.company}</div>
                                        <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
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
                        className="bg-[#0f172a] border border-[#4245f0]/30 rounded-2xl p-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-32 bg-[#4245f0]/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        
                        <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-white relative z-10">
                            <Mail className="size-5 text-[#4245f0]" />
                            Contact {candidate.name.split(' ')[0]}
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
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Your Email</label>
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
                                    placeholder={`Hi ${candidate.name.split(' ')[0]}, I'd like to discuss a potential role...`}
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
            </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default ProfileExpansion;
