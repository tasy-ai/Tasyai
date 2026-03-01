import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import Sidebar from '../components/layout/Sidebar';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Check,
  ToggleLeft,
  ToggleRight,
  ChevronRight,
  Mail,
  Lock,
  Globe,
  MessageSquare,
  Send,
  Loader2,
  Plus,
  X,
  Linkedin,
  Github,
  Award,
  Zap,
  Clock,
  Briefcase
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import authService from '../services/authService';

const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Account');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Profile State
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    motto: '',
    role: '',
    country: '',
    achievements: '',
    time: '',
    profilePicture: '',
    skills: [],
    linkedin: '',
    github: '',
    portfolio: ''
  });

  const [newSkill, setNewSkill] = useState('');

  // Mock State for Toggles
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: false,
    security: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'Public',
    showEmail: false,
    onlineStatus: true
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getProfile();
        setProfile({
          name: data.name || '',
          email: data.email || '',
          motto: data.motto || '',
          role: data.role || '',
          country: data.country || '',
          achievements: data.achievements || '',
          time: data.time || '',
          profilePicture: data.profilePicture || '',
          skills: data.skills || [],
          linkedin: data.linkedin || '',
          github: data.github || '',
          portfolio: data.portfolio || ''
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        toast.error('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await authService.updateProfile(profile);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'Account', icon: User, label: 'Account' },
    { id: 'Notifications', icon: Bell, label: 'Notifications' },
    { id: 'Privacy', icon: Shield, label: 'Privacy & Security' },
    { id: 'Billing', icon: CreditCard, label: 'Billing' },
    { id: 'Feedback', icon: MessageSquare, label: 'Feedback' },
  ];

  // Feedback Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '',
    phoneNumber: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeedbackSubmit = async (e) => {
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
            _subject: "📩 New Settings Feedback Submission",
          }),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(
          "✅ Your feedback has been sent. Thank you!"
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
        toast.error("❌ Failed to send feedback. Please try again later.");
      }
    } catch (error) {
      toast.error("⚠️ Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        <Loader2 className="animate-spin size-10 text-[#4245f0]" />
      </div>
    );
  }

  return (
    <div className="bg-[#020617] text-slate-100 font-sans min-h-screen flex overflow-hidden">
      <SEO 
        title="Settings"
        description="Manage your account preferences and configurations on Tasyai."
      />
      <Toaster position="top-center" reverseOrder={false} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main 
        className={`flex-1 overflow-y-auto h-full bg-[#020617] ${isSidebarOpen ? 'md:ml-[280px]' : 'md:ml-20'}`}
      >
        <div className="max-w-5xl mx-auto px-4 md:px-10 py-8 md:py-12 pb-32">
          <div className="mb-8 md:mb-12 pt-12 md:pt-0">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">Settings</h1>
            <p className="text-slate-400 text-sm md:text-lg">Manage your account preferences and configurations.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Sidebar Navigation for Settings */}
            <div className="lg:w-64 flex-shrink-0">
               <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0 sticky top-4 z-30 bg-[#020617]/50 backdrop-blur-sm lg:bg-transparent lg:static">
                 {tabs.map((tab) => {
                   const Icon = tab.icon;
                   return (
                     <button
                       key={tab.id}
                       onClick={() => setActiveTab(tab.id)}
                       className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all text-xs md:text-sm font-bold whitespace-nowrap lg:w-full ${
                         activeTab === tab.id 
                           ? 'bg-[#4245f0] text-white shadow-lg shadow-[#4245f0]/20' 
                           : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5'
                       }`}
                     >
                       <Icon className="size-4 md:size-5" />
                       {tab.label}
                     </button>
                   )
                 })}
               </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
               <div
                 key={activeTab}
                 className="space-y-6"
               >
                 {activeTab === 'Account' && (
                   <div className="space-y-6">
                     {/* Section: Profile */}
                     <section className="glass rounded-[32px] p-6 md:p-8 border border-white/10">
                       <h2 className="text-lg md:text-xl font-bold text-white mb-8">Profile Information</h2>
                       
                       <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
                         {profile.profilePicture ? (
                           <div className="relative group shrink-0">
                             <img 
                              src={profile.profilePicture} 
                              alt="Avatar" 
                              className="size-24 md:size-28 rounded-3xl object-cover border-2 border-[#4245f0]/30 shadow-2xl shadow-indigo-500/20"
                             />
                             <div className="absolute inset-0 bg-black/40 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                               <label htmlFor="imageUpload" className="cursor-pointer p-3 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors">
                                 <Plus className="size-5 text-white" />
                               </label>
                             </div>
                           </div>
                         ) : (
                           <div className="size-24 md:size-28 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-2xl shadow-indigo-500/30 shrink-0">
                             {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                           </div>
                         )}
                         <div className="flex-1 space-y-5 w-full">
                           <div>
                             <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Profile Identity</label>
                             <div className="flex flex-col gap-3">
                               <input 
                                 type="text" 
                                 name="profilePicture"
                                 placeholder="Paste image URL..."
                                 value={profile.profilePicture}
                                 onChange={handleProfileChange}
                                 className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#4245f0] outline-none" 
                               />
                               <div className="flex items-center gap-3">
                                 <div className="h-px flex-1 bg-white/5"></div>
                                 <span className="text-[10px] text-slate-600 uppercase font-black">OR</span>
                                 <div className="h-px flex-1 bg-white/5"></div>
                               </div>
                               <input 
                                 type="file" 
                                 id="imageUpload"
                                 accept="image/*"
                                 className="hidden"
                                 onChange={async (e) => {
                                   const file = e.target.files[0];
                                   if (file) {
                                     if (file.size > 2 * 1024 * 1024) {
                                       toast.error("Image size must be less than 2MB");
                                       return;
                                     }
                                     const reader = new FileReader();
                                     reader.onloadend = () => {
                                       setProfile(prev => ({ ...prev, profilePicture: reader.result }));
                                       toast.success("Image selected from device");
                                     };
                                     reader.readAsDataURL(file);
                                   }
                                 }}
                               />
                               <button 
                                 type="button"
                                 onClick={() => document.getElementById('imageUpload').click()}
                                 className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                               >
                                 <Plus className="size-4" />
                                 Upload from Device
                               </button>
                             </div>
                           </div>
                           <p className="text-[10px] text-slate-500 font-medium">Supported: JPG, PNG, GIF. Max 2MB.</p>
                         </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                             Full Name
                           </label>
                           <input 
                             type="text" 
                             name="name"
                             value={profile.name}
                             onChange={handleProfileChange}
                             className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#4245f0] transition-all outline-none" 
                           />
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                             Professional Role
                           </label>
                           <input 
                             type="text" 
                             name="role"
                             placeholder="e.g. Fullstack Developer"
                             value={profile.role}
                             onChange={handleProfileChange}
                             className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#4245f0] transition-all outline-none" 
                           />
                         </div>
                         <div className="space-y-2 md:col-span-2">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                             Professional Headline
                           </label>
                           <input 
                             type="text" 
                             name="motto"
                             placeholder="Building the future of tech..."
                             value={profile.motto}
                             onChange={handleProfileChange}
                             className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#4245f0] transition-all outline-none" 
                           />
                         </div>
                         
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                             Primary Location
                           </label>
                           <input 
                             type="text" 
                             name="country"
                             placeholder="e.g. USA, Canada"
                             value={profile.country}
                             onChange={handleProfileChange}
                             className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#4245f0] transition-all outline-none" 
                           />
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                             Availability Status
                           </label>
                           <input 
                             type="text" 
                             name="time"
                             placeholder="e.g. Full-time, Freelance"
                             value={profile.time}
                             onChange={handleProfileChange}
                             className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#4245f0] transition-all outline-none" 
                           />
                         </div>

                         <div className="space-y-2 md:col-span-2">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                             Career Highlights
                           </label>
                           <textarea 
                             rows="3" 
                             name="achievements"
                             placeholder="Briefly describe your highlights..."
                             value={profile.achievements}
                             onChange={handleProfileChange}
                             className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#4245f0] transition-all outline-none resize-none" 
                           />
                         </div>

                         {/* Skills Section */}
                         <div className="space-y-4 md:col-span-2">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                             Expertise & Core Skills
                           </label>
                           <div className="flex gap-2">
                             <input 
                               type="text" 
                               value={newSkill}
                               onChange={(e) => setNewSkill(e.target.value)}
                               onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                               placeholder="Add expertise (e.g. AI Strategy)"
                               className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#4245f0] transition-all outline-none"
                             />
                             <button 
                               type="button"
                               onClick={handleAddSkill}
                               className="px-4 bg-[#4245f0]/10 hover:bg-[#4245f0] hover:text-white text-[#4245f0] rounded-xl transition-all"
                             >
                               <Plus className="size-5" />
                             </button>
                           </div>
                           <div className="flex flex-wrap gap-2">
                             {profile.skills.map((skill, index) => (
                               <span 
                                 key={index} 
                                 className="flex items-center gap-2 px-4 py-2 bg-[#4245f0]/5 border border-[#4245f0]/20 rounded-xl text-xs font-bold text-[#4245f0] uppercase tracking-tight"
                               >
                                 {skill}
                                 <button onClick={() => handleRemoveSkill(skill)} className="hover:scale-110 transition-transform">
                                   <X className="size-3.5" />
                                 </button>
                               </span>
                             ))}
                             {profile.skills.length === 0 && (
                               <p className="text-xs text-slate-600 italic px-1">No expertise listed yet.</p>
                             )}
                           </div>
                         </div>

                         {/* Social Links */}
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                             LinkedIn
                           </label>
                           <input 
                             type="text" 
                             name="linkedin"
                             placeholder="linkedin.com/in/username"
                             value={profile.linkedin}
                             onChange={handleProfileChange}
                             className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#4245f0] transition-all outline-none" 
                           />
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                             GitHub
                           </label>
                           <input 
                             type="text" 
                             name="github"
                             placeholder="github.com/username"
                             value={profile.github}
                             onChange={handleProfileChange}
                             className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#4245f0] transition-all outline-none" 
                           />
                         </div>
                         <div className="space-y-2 md:col-span-2">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                             Portfolio / Website
                           </label>
                           <input 
                             type="text" 
                             name="portfolio"
                             placeholder="yourportfolio.com"
                             value={profile.portfolio}
                             onChange={handleProfileChange}
                             className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#4245f0] transition-all outline-none" 
                           />
                         </div>
                       </div>
                       
                       <div className="mt-10 flex justify-end">
                         <button 
                           onClick={handleSaveProfile}
                           disabled={isSaving}
                           className="w-full md:w-auto px-10 py-4 bg-[#4245f0] hover:bg-[#4245f0]/90 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-[#4245f0]/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                         >
                           {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
                           {isSaving ? 'Synchronizing...' : 'Update Explorer Profile'}
                         </button>
                       </div>
                     </section>

                     {/* Section: Email */}
                     <section className="glass rounded-[32px] p-6 md:p-8 border border-white/10">
                        <h2 className="text-lg md:text-xl font-bold text-white mb-6">Security Baseline</h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-white/[0.03] rounded-2xl border border-white/5 gap-4">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/5 rounded-xl">
                              <Mail className="size-5 text-[#4245f0]" />
                            </div>
                            <div>
                              <p className="text-white font-bold text-sm">{profile.email}</p>
                              <p className="text-[10px] text-green-400 font-black uppercase tracking-widest flex items-center gap-1.5 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Verified Identity
                              </p>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg">Primary Address</span>
                        </div>
                     </section>
                   </div>
                 )}

                 {activeTab === 'Notifications' && (
                    <section className="glass rounded-[32px] p-6 md:p-8 border border-white/10">
                       <h2 className="text-lg md:text-xl font-bold text-white mb-8">Pulse Configurations</h2>
                       <div className="space-y-4">
                         {Object.entries(notifications).map(([key, value]) => (
                           <div key={key} className="flex items-center justify-between p-5 bg-white/[0.02] hover:bg-white/[0.04] rounded-2xl border border-white/5 transition-all">
                             <div>
                               <p className="text-white font-bold text-sm capitalize mb-0.5">{key} Notifications</p>
                               <p className="text-xs text-slate-500">Enable real-time updates for {key} events.</p>
                             </div>
                             <button 
                               onClick={() => handleNotificationToggle(key)}
                               className={`relative w-12 h-6 rounded-full transition-all duration-300 ${value ? 'bg-[#4245f0] shadow-lg shadow-[#4245f0]/30' : 'bg-slate-800'}`}
                             >
                               <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${value ? 'translate-x-6' : 'translate-x-0'}`} />
                             </button>
                           </div>
                         ))}
                       </div>
                    </section>
                 )}

                 {activeTab === 'Privacy' && (
                    <section className="glass rounded-[32px] p-6 md:p-8 border border-white/10">
                       <h2 className="text-lg md:text-xl font-bold text-white mb-8">Encryption & Access</h2>
                       <div className="space-y-4">
                         <button className="w-full flex items-center justify-between p-5 bg-white/[0.02] hover:bg-white/[0.06] rounded-2xl border border-white/5 transition-all group">
                           <div className="flex items-center gap-4">
                             <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#4245f0]/10 transition-colors">
                               <Lock className="size-5 text-[#4245f0]" />
                             </div>
                             <div className="text-left">
                               <p className="text-white font-bold text-sm">Update Password</p>
                               <p className="text-xs text-slate-500">Strengthen your security perimeter</p>
                             </div>
                           </div>
                           <ChevronRight className="size-5 text-slate-600 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                         </button>
                         
                         <button className="w-full flex items-center justify-between p-5 bg-white/[0.02] hover:bg-white/[0.06] rounded-2xl border border-white/5 transition-all group">
                           <div className="flex items-center gap-4">
                             <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#4245f0]/10 transition-colors">
                               <Globe className="size-5 text-emerald-400" />
                             </div>
                             <div className="text-left">
                               <p className="text-white font-bold text-sm">Active Command Centers</p>
                               <p className="text-xs text-slate-500">Audit your current login sessions</p>
                             </div>
                           </div>
                           <ChevronRight className="size-5 text-slate-600 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                         </button>
                       </div>
                    </section>
                 )}

                 {activeTab === 'Billing' && (
                    <section className="glass rounded-[32px] p-10 md:p-16 border border-white/10 text-center relative overflow-hidden">
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#4245f0] to-transparent"></div>
                       <div className="w-24 h-24 bg-white/[0.03] rounded-full flex items-center justify-center mx-auto mb-8 border border-white/5">
                         <CreditCard className="size-10 text-slate-600" />
                       </div>
                       <h2 className="text-xl md:text-2xl font-black text-white mb-3">Enterprise Access: Free</h2>
                       <p className="text-slate-500 text-sm md:text-base max-w-sm mx-auto mb-10 leading-relaxed font-medium">You are currently utilizing the public license. Escalate your limits with a premium workspace.</p>
                       <button className="w-full sm:w-auto px-12 py-4 bg-white text-[#020617] font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-[#4245f0] hover:text-white transition-all shadow-2xl">
                         Escalate Workspace
                       </button>
                    </section>
                 )}

                 {activeTab === 'Feedback' && (
                    <section className="glass rounded-[32px] p-6 md:p-10 border border-white/10 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-40 bg-[#4245f0]/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                       <h2 className="text-lg md:text-xl font-bold text-white mb-8 relative z-10">Neural Feedback Loop</h2>
                       
                       <form onSubmit={handleFeedbackSubmit} className="space-y-5 relative z-10">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">First Name</label>
                              <input 
                                required
                                type="text" 
                                value={formData.firstName}
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-5 py-3.5 text-sm text-white focus:ring-2 focus:ring-[#4245f0] outline-none transition-all placeholder:text-slate-700"
                                placeholder="Pioneer Name"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Last Name</label>
                              <input 
                                required
                                type="text" 
                                value={formData.lastName}
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-5 py-3.5 text-sm text-white focus:ring-2 focus:ring-[#4245f0] outline-none transition-all placeholder:text-slate-700"
                                placeholder="Surname"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Digital Signal (Email)</label>
                            <input 
                              required
                              type="email" 
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-5 py-3.5 text-sm text-white focus:ring-2 focus:ring-[#4245f0] outline-none transition-all placeholder:text-slate-700"
                              placeholder="signal@tasyai.dev"
                            />
                          </div>

                          <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-1 space-y-1.5">
                              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Code</label>
                              <input 
                                required
                                type="text" 
                                value={formData.phoneCode}
                                onChange={(e) => setFormData({...formData, phoneCode: e.target.value})}
                                className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3.5 text-sm text-white text-center focus:ring-2 focus:ring-[#4245f0] transition-all placeholder:text-slate-700"
                                placeholder="+1"
                              />
                            </div>
                            <div className="col-span-3 space-y-1.5">
                              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Comms Number</label>
                              <input 
                                required
                                type="tel" 
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                                className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-5 py-3.5 text-sm text-white focus:ring-2 focus:ring-[#4245f0] transition-all placeholder:text-slate-700"
                                placeholder="System ID"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Neural Message</label>
                            <textarea 
                              required
                              rows="5"
                              value={formData.message}
                              onChange={(e) => setFormData({...formData, message: e.target.value})}
                              className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-5 py-3.5 text-sm text-white focus:ring-2 focus:ring-[#4245f0] outline-none transition-all resize-none placeholder:text-slate-700"
                              placeholder="Transmit your observations..."
                            ></textarea>
                          </div>
                          
                          <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 rounded-2xl bg-[#4245f0] hover:bg-[#4245f0]/90 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-[#4245f0]/30 transition-all disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
                          >
                            {isSubmitting ? <Loader2 className="size-5 animate-spin" /> : <Send className="size-4" />}
                            {isSubmitting ? 'Transmitting...' : 'Initiate Transmission'}
                          </button>
                       </form>
                    </section>
                 )}
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
