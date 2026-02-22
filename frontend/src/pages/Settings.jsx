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
        className={`flex-1 overflow-y-auto h-full bg-[#020617] transition-all duration-300 ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'}`}
      >
        <div className="max-w-5xl mx-auto px-8 py-12 pb-32">
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Settings</h1>
            <p className="text-slate-400 text-lg">Manage your account preferences and configurations.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation for Settings */}
            <div className="lg:w-64 flex-shrink-0">
               <nav className="space-y-2 sticky top-8">
                 {tabs.map((tab) => {
                   const Icon = tab.icon;
                   return (
                     <button
                       key={tab.id}
                       onClick={() => setActiveTab(tab.id)}
                       className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                         activeTab === tab.id 
                           ? 'bg-[#4245f0] text-white shadow-lg shadow-[#4245f0]/20' 
                           : 'text-slate-400 hover:text-white hover:bg-white/5'
                       }`}
                     >
                       <Icon className="size-5" />
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
                     <section className="glass rounded-2xl p-8 border border-white/10">
                       <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
                       
                       <div className="flex items-center gap-6 mb-8">
                         {profile.profilePicture ? (
                           <div className="relative group">
                             <img 
                              src={profile.profilePicture} 
                              alt="Avatar" 
                              className="size-24 rounded-full object-cover border-2 border-[#4245f0]/30 shadow-xl shadow-indigo-500/10"
                             />
                             <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                               <label htmlFor="imageUpload" className="cursor-pointer p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                                 <Plus className="size-5 text-white" />
                               </label>
                             </div>
                           </div>
                         ) : (
                           <div className="size-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-indigo-500/20">
                             {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                           </div>
                         )}
                         <div className="flex-1 space-y-4">
                           <div>
                             <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Profile Picture</label>
                             <div className="flex flex-col sm:flex-row gap-3">
                               <input 
                                 type="text" 
                                 name="profilePicture"
                                 placeholder="Paste image URL..."
                                 value={profile.profilePicture}
                                 onChange={handleProfileChange}
                                 className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:ring-2 focus:ring-[#4245f0] outline-none" 
                               />
                               <div className="flex items-center">
                                 <span className="text-xs text-slate-600 px-2 uppercase font-bold">OR</span>
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
                                   className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
                                 >
                                   <Plus className="size-4" />
                                   Upload Local Image
                                 </button>
                               </div>
                             </div>
                           </div>
                           <p className="text-xs text-slate-500">Supported formats: JPG, PNG, GIF. Max size 2MB.</p>
                         </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                             <User className="size-3" /> Full Name
                           </label>
                           <input 
                             type="text" 
                             name="name"
                             value={profile.name}
                             onChange={handleProfileChange}
                             className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-[#4245f0] outline-none" 
                           />
                         </div>
                         <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                             <Briefcase className="size-3" /> Professional Role
                           </label>
                           <input 
                             type="text" 
                             name="role"
                             placeholder="e.g. Fullstack Developer"
                             value={profile.role}
                             onChange={handleProfileChange}
                             className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-[#4245f0] outline-none" 
                           />
                         </div>
                         <div className="space-y-2 md:col-span-2">
                           <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                             <Zap className="size-3" /> Headline / Motto
                           </label>
                           <input 
                             type="text" 
                             name="motto"
                             placeholder="Building the future of tech..."
                             value={profile.motto}
                             onChange={handleProfileChange}
                             className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-[#4245f0] outline-none" 
                           />
                         </div>
                         
                         <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                             <Globe className="size-3" /> Location
                           </label>
                           <input 
                             type="text" 
                             name="country"
                             placeholder="e.g. USA, Canada"
                             value={profile.country}
                             onChange={handleProfileChange}
                             className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-[#4245f0] outline-none" 
                           />
                         </div>
                         <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                             <Clock className="size-3" /> Availability
                           </label>
                           <input 
                             type="text" 
                             name="time"
                             placeholder="e.g. Full-time, Freelance"
                             value={profile.time}
                             onChange={handleProfileChange}
                             className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-[#4245f0] outline-none" 
                           />
                         </div>

                         <div className="space-y-2 md:col-span-2">
                           <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                             <Award className="size-3" /> Key Achievements
                           </label>
                           <textarea 
                             rows="3" 
                             name="achievements"
                             placeholder="Briefly describe your highlights..."
                             value={profile.achievements}
                             onChange={handleProfileChange}
                             className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-[#4245f0] outline-none resize-none" 
                           />
                         </div>

                         {/* Skills Section */}
                         <div className="space-y-4 md:col-span-2">
                           <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                             <Zap className="size-3" /> Skills & Expertise
                           </label>
                           <div className="flex gap-2">
                             <input 
                               type="text" 
                               value={newSkill}
                               onChange={(e) => setNewSkill(e.target.value)}
                               onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                               placeholder="Add a skill (e.g. React)"
                               className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-[#4245f0] outline-none"
                             />
                             <button 
                               type="button"
                               onClick={handleAddSkill}
                               className="p-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                             >
                               <Plus className="size-5" />
                             </button>
                           </div>
                           <div className="flex flex-wrap gap-2">
                             {profile.skills.map((skill, index) => (
                               <span 
                                 key={index} 
                                 className="flex items-center gap-2 px-3 py-1.5 bg-[#4245f0]/10 border border-[#4245f0]/20 rounded-lg text-sm font-medium text-[#4245f0]"
                               >
                                 {skill}
                                 <button onClick={() => handleRemoveSkill(skill)}>
                                   <X className="size-3 hover:text-white" />
                                 </button>
                               </span>
                             ))}
                             {profile.skills.length === 0 && (
                               <p className="text-xs text-slate-600 italic">No skills added yet.</p>
                             )}
                           </div>
                         </div>

                         {/* Social Links */}
                         <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                             <Linkedin className="size-3" /> LinkedIn URL
                           </label>
                           <input 
                             type="text" 
                             name="linkedin"
                             placeholder="linkedin.com/in/username"
                             value={profile.linkedin}
                             onChange={handleProfileChange}
                             className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-[#4245f0] outline-none" 
                           />
                         </div>
                         <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                             <Github className="size-3" /> GitHub URL
                           </label>
                           <input 
                             type="text" 
                             name="github"
                             placeholder="github.com/username"
                             value={profile.github}
                             onChange={handleProfileChange}
                             className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-[#4245f0] outline-none" 
                           />
                         </div>
                         <div className="space-y-2 md:col-span-2">
                           <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                             <Globe className="size-3" /> Portfolio URL
                           </label>
                           <input 
                             type="text" 
                             name="portfolio"
                             placeholder="yourportfolio.com"
                             value={profile.portfolio}
                             onChange={handleProfileChange}
                             className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-[#4245f0] outline-none" 
                           />
                         </div>
                       </div>
                       
                       <div className="mt-8 flex justify-end">
                         <button 
                           onClick={handleSaveProfile}
                           disabled={isSaving}
                           className="px-8 py-3 bg-[#4245f0] hover:bg-[#4245f0]/90 text-white font-bold rounded-xl shadow-lg shadow-[#4245f0]/20 transition-all flex items-center gap-2 disabled:opacity-50"
                         >
                           {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
                           {isSaving ? 'Saving...' : 'Save Profile Changes'}
                         </button>
                       </div>
                     </section>

                     {/* Section: Email */}
                     <section className="glass rounded-2xl p-8 border border-white/10">
                        <h2 className="text-xl font-bold text-white mb-6">Email Address</h2>
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/5 rounded-lg">
                              <Mail className="size-5 text-slate-300" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{profile.email}</p>
                              <p className="text-xs text-green-400 flex items-center gap-1 mt-0.5">
                                <Check className="size-3" /> Verified Account
                              </p>
                            </div>
                          </div>
                          <span className="text-xs text-slate-500 italic">Primary Contact</span>
                        </div>
                     </section>
                   </div>
                 )}

                 {activeTab === 'Notifications' && (
                    <section className="glass rounded-2xl p-8 border border-white/10">
                       <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>
                       <div className="space-y-6">
                         {Object.entries(notifications).map(([key, value]) => (
                           <div key={key} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                             <div>
                               <p className="text-white font-medium capitalize">{key} Notifications</p>
                               <p className="text-sm text-slate-400">Receive updates about {key} events.</p>
                             </div>
                             <button 
                               onClick={() => handleNotificationToggle(key)}
                               className={`relative w-12 h-6 rounded-full transition-colors ${value ? 'bg-[#4245f0]' : 'bg-slate-700'}`}
                             >
                               <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-0'}`} />
                             </button>
                           </div>
                         ))}
                       </div>
                    </section>
                 )}

                 {activeTab === 'Privacy' && (
                    <section className="glass rounded-2xl p-8 border border-white/10">
                       <h2 className="text-xl font-bold text-white mb-6">Privacy & Security</h2>
                       <div className="space-y-6">
                         <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-colors group">
                           <div className="flex items-center gap-4">
                             <div className="p-3 bg-white/5 rounded-lg">
                               <Lock className="size-5 text-slate-300" />
                             </div>
                             <div className="text-left">
                               <p className="text-white font-medium">Change Password</p>
                               <p className="text-xs text-slate-400">Update your security credentials</p>
                             </div>
                           </div>
                           <ChevronRight className="size-5 text-slate-500 group-hover:text-white transition-colors" />
                         </button>
                         
                         <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-colors group">
                           <div className="flex items-center gap-4">
                             <div className="p-3 bg-white/5 rounded-lg">
                               <Globe className="size-5 text-slate-300" />
                             </div>
                             <div className="text-left">
                               <p className="text-white font-medium">Active Sessions</p>
                               <p className="text-xs text-slate-400">Manage your logged-in interactions</p>
                             </div>
                           </div>
                           <ChevronRight className="size-5 text-slate-500 group-hover:text-white transition-colors" />
                         </button>
                       </div>
                    </section>
                 )}

                 {activeTab === 'Billing' && (
                    <section className="glass rounded-2xl p-8 border border-white/10 text-center py-20">
                       <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                         <CreditCard className="size-10 text-slate-500" />
                       </div>
                       <h2 className="text-xl font-bold text-white mb-2">No Active Subscription</h2>
                       <p className="text-slate-400 max-w-md mx-auto mb-8">You are currently on the free plan. Upgrade to unlock premium features and higher limits.</p>
                       <button className="px-8 py-3 bg-[#4245f0] hover:bg-[#4245f0]/90 text-white font-bold rounded-xl shadow-lg shadow-[#4245f0]/20 transition-all">
                         View Plans
                       </button>
                    </section>
                 )}

                 {activeTab === 'Feedback' && (
                    <section className="glass rounded-2xl p-8 border border-white/10 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-32 bg-[#4245f0]/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                       <h2 className="text-xl font-bold text-white mb-6 relative z-10">Share Your Feedback</h2>
                       
                       <form onSubmit={handleFeedbackSubmit} className="space-y-4 relative z-10 max-w-2xl">
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
                              placeholder="Tell us what you think..."
                            ></textarea>
                          </div>
                          
                          <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 rounded-xl bg-[#4245f0] hover:bg-[#4245f0]/90 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#4245f0]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                          >
                            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                            {isSubmitting ? 'Sending...' : 'Send Feedback'}
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
