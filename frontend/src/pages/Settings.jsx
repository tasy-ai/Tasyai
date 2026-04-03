import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Check,
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

  const handleNotificationToggle = (key) => setNotifications(prev => ({ ...prev, [key]: !prev[key] }));

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
    setProfile(prev => ({ ...prev, skills: prev.skills.filter(skill => skill !== skillToRemove) }));
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
    { id: 'Notifications', icon: Bell, label: 'Notification' },
    { id: 'Privacy', icon: Shield, label: 'Privacy and security' },
    { id: 'Billing', icon: CreditCard, label: 'Billing' },
    { id: 'Feedback', icon: MessageSquare, label: 'Feedback' },
  ];

  // Feedback Form State
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phoneCode: '', phoneNumber: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.phoneCode.trim() || !formData.phoneNumber.trim() || !formData.message.trim()) {
      return toast.error("Please fill out all fields before submitting.");
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/unisire.mainhub@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName, lastName: formData.lastName, email: formData.email,
          phoneCode: formData.phoneCode, phoneNumber: formData.phoneNumber, message: formData.message,
          _subject: "New Settings Feedback Submission"
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Your feedback has been sent. Thank you!");
        setFormData({ firstName: "", lastName: "", email: "", phoneCode: "", phoneNumber: "", message: "" });
      } else {
        toast.error("Failed to send feedback. Please try again later.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4]">
        <Loader2 className="animate-spin size-10 text-[#ff5a00]" />
      </div>
    );
  }

  return (
    <>
      <SEO title="Settings" description="Manage your account preferences." />
      <Toaster position="top-center" />
      <div className="min-h-screen bg-[#F8F7F4] font-sans pb-32 pt-8">
          <div className="max-w-6xl mx-auto px-6">
              
              <div className="mb-8">
                  <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-2">Settings</h1>
                  <p className="text-[15px] text-gray-500 font-medium">Manage your account preferences and configurations.</p>
              </div>

              {/* Top Navigation Navbar */}
              <div className="flex items-center gap-8 border-b border-gray-200 mb-10 overflow-x-auto no-scrollbar">
                  {tabs.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                          <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              className={`pb-4 flex items-center gap-2 text-[14px] font-bold whitespace-nowrap transition-all relative ${
                                  isActive ? 'text-[#ff5a00]' : 'text-gray-500 hover:text-gray-900'
                              }`}
                          >
                              <Icon className="size-4 shrink-0" strokeWidth={isActive ? 3 : 2} />
                              {tab.label}
                              {isActive && (
                                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff5a00]"></div>
                              )}
                          </button>
                      )
                  })}
              </div>

              {/* Content Area */}
              <div className="w-full">
                  {activeTab === 'Account' && (
                          <div className="space-y-6">
                              
                              {/* Profile Information */}
                              <section className="bg-white border border-gray-200 shadow-sm p-8 rounded-sm">
                                  <h2 className="text-[17px] font-black text-gray-900 mb-6 pb-4 border-b border-gray-100">Profile Information</h2>
                                  
                                  {/* Avatar Section */}
                                  <div className="flex items-start gap-6 mb-10">
                                      {profile.profilePicture ? (
                                          <div className="relative group shrink-0">
                                              <img src={profile.profilePicture} alt="Avatar" className="w-24 h-24 rounded-sm object-cover border border-gray-200 shadow-sm" />
                                              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-sm cursor-pointer" onClick={() => document.getElementById('imageUpload').click()}>
                                                  <Plus className="size-6 text-white" />
                                                  <span className="text-[10px] font-bold text-white uppercase tracking-wider mt-1">Change</span>
                                              </div>
                                          </div>
                                      ) : (
                                          <div className="w-24 h-24 rounded-sm bg-gray-100 border border-gray-200 flex flex-col items-center justify-center text-gray-400 shrink-0 shadow-sm cursor-pointer hover:border-[#ff5a00] transition-colors" onClick={() => document.getElementById('imageUpload').click()}>
                                              <Plus className="size-6 mb-1 text-gray-400" />
                                              <span className="text-[10px] font-bold uppercase tracking-wider">Upload</span>
                                          </div>
                                      )}
                                      <div className="flex-1 pt-2">
                                          <div className="flex flex-col sm:flex-row gap-3">
                                              <button 
                                                  onClick={() => document.getElementById('imageUpload').click()}
                                                  className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold text-[13px] rounded-sm transition-colors shadow-sm"
                                              >
                                                  Choose Local Image
                                              </button>
                                              <input 
                                                  type="file" id="imageUpload" accept="image/*" className="hidden"
                                                  onChange={async (e) => {
                                                      const file = e.target.files[0];
                                                      if (file) {
                                                          if (file.size > 2 * 1024 * 1024) return toast.error("Max size 2MB");
                                                          const reader = new FileReader();
                                                          reader.onloadend = () => setProfile(prev => ({ ...prev, profilePicture: reader.result }));
                                                          reader.readAsDataURL(file);
                                                      }
                                                  }}
                                              />
                                          </div>
                                          <p className="text-[11px] text-gray-500 font-medium mt-3 italic">* Selected image will be stored as your new profile avatar.</p>
                                      </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                      <div>
                                          <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2"><User className="size-3" strokeWidth={3}/> Full Name</label>
                                          <input type="text" name="name" value={profile.name} onChange={handleProfileChange} className="w-full bg-white border border-gray-200 rounded-sm px-4 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors" />
                                      </div>
                                      <div>
                                          <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2"><Briefcase className="size-3" strokeWidth={3}/> Professional Role</label>
                                          <input type="text" name="role" placeholder="e.g. Fullstack Developer" value={profile.role} onChange={handleProfileChange} className="w-full bg-white border border-gray-200 rounded-sm px-4 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors" />
                                      </div>
                                      <div className="md:col-span-2">
                                          <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2"><Zap className="size-3" strokeWidth={3}/> Headline / Motto</label>
                                          <input type="text" name="motto" placeholder="Building the future of tech..." value={profile.motto} onChange={handleProfileChange} className="w-full bg-white border border-gray-200 rounded-sm px-4 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors" />
                                      </div>
                                      
                                      <div>
                                          <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2"><Globe className="size-3" strokeWidth={3}/> Location</label>
                                          <input type="text" name="country" placeholder="e.g. USA, Canada" value={profile.country} onChange={handleProfileChange} className="w-full bg-white border border-gray-200 rounded-sm px-4 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors" />
                                      </div>
                                      <div>
                                          <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2"><Clock className="size-3" strokeWidth={3}/> Availability</label>
                                          <input type="text" name="time" placeholder="e.g. Full-time, Freelance" value={profile.time} onChange={handleProfileChange} className="w-full bg-white border border-gray-200 rounded-sm px-4 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors" />
                                      </div>

                                      <div className="md:col-span-2">
                                          <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2"><Award className="size-3" strokeWidth={3}/> Key Achievements / Bio</label>
                                          <textarea 
                                              rows="4" name="achievements" placeholder="Briefly describe your highlights and background..." value={profile.achievements} onChange={handleProfileChange} 
                                              className="w-full bg-white border border-gray-200 rounded-sm px-4 py-3 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors resize-none" 
                                          />
                                      </div>

                                      {/* Skills */}
                                      <div className="md:col-span-2">
                                          <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2"><Zap className="size-3" strokeWidth={3}/> Skills & Expertise</label>
                                          <div className="flex gap-2">
                                              <input 
                                                  type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                                                  placeholder="Add a skill (e.g. React)" className="flex-1 bg-white border border-gray-200 rounded-sm px-4 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors"
                                              />
                                              <button type="button" onClick={handleAddSkill} className="px-4 bg-[#ff5a00] hover:bg-[#e04e00] rounded-sm transition-colors flex items-center justify-center">
                                                  <Plus className="size-5 text-white" strokeWidth={3} />
                                              </button>
                                          </div>
                                          <div className="flex flex-wrap gap-2 mt-4">
                                              {profile.skills.map((skill, index) => (
                                                  <span key={index} className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 border border-orange-100 rounded-sm text-[12px] font-bold text-[#ff5a00]">
                                                      {skill}
                                                      <button onClick={() => handleRemoveSkill(skill)}><X className="size-3 hover:text-orange-800" strokeWidth={3} /></button>
                                                  </span>
                                              ))}
                                          </div>
                                      </div>

                                      {/* Socials */}
                                      <div className="md:col-span-2 border-t border-gray-100 pt-6 mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                          <div>
                                              <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2"><Linkedin className="size-3" strokeWidth={3}/> LinkedIn URL</label>
                                              <input type="text" name="linkedin" placeholder="linkedin.com/in/username" value={profile.linkedin} onChange={handleProfileChange} className="w-full bg-white border border-gray-200 rounded-sm px-4 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors" />
                                          </div>
                                          <div>
                                              <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2"><Github className="size-3" strokeWidth={3}/> GitHub URL</label>
                                              <input type="text" name="github" placeholder="github.com/username" value={profile.github} onChange={handleProfileChange} className="w-full bg-white border border-gray-200 rounded-sm px-4 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors" />
                                          </div>
                                          <div className="md:col-span-2">
                                              <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2"><Globe className="size-3" strokeWidth={3}/> Portfolio URL</label>
                                              <input type="text" name="portfolio" placeholder="yourportfolio.com" value={profile.portfolio} onChange={handleProfileChange} className="w-full bg-white border border-gray-200 rounded-sm px-4 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors" />
                                          </div>
                                      </div>
                                  </div>
                                  
                                  <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                                      <button onClick={handleSaveProfile} disabled={isSaving} className="px-8 py-3 bg-[#ff5a00] hover:bg-[#e04e00] text-white text-[13px] font-bold rounded-sm shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50 uppercase tracking-widest">
                                          {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" strokeWidth={3} />}
                                          {isSaving ? 'Saving...' : 'Save Profile'}
                                      </button>
                                  </div>
                              </section>

                              {/* Email Address */}
                              <section className="bg-white border border-gray-200 shadow-sm p-8 rounded-sm flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                      <div className="p-3 bg-gray-100 rounded-sm border border-gray-200">
                                          <Mail className="size-5 text-gray-600" />
                                      </div>
                                      <div>
                                          <p className="text-gray-900 font-bold mb-1">{profile.email || 'Email missing'}</p>
                                          <p className="text-[11px] font-black uppercase text-emerald-600 tracking-widest flex items-center gap-1">
                                              <Check className="size-3" strokeWidth={3} /> Verified
                                          </p>
                                      </div>
                                  </div>
                                  <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">Primary</span>
                              </section>
                          </div>
                      )}

                      {activeTab === 'Notifications' && (
                          <section className="bg-white border border-gray-200 shadow-sm p-8 rounded-sm">
                              <h2 className="text-[17px] font-black text-gray-900 mb-6 pb-4 border-b border-gray-100">Notification Preferences</h2>
                              <div className="space-y-6">
                                  {Object.entries(notifications).map(([key, value]) => (
                                      <div key={key} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0 last:pb-0">
                                          <div>
                                              <p className="text-gray-900 font-bold capitalize text-[14px]">{key} Notifications</p>
                                              <p className="text-[13px] text-gray-500 font-medium mt-1">Receive updates about {key} events to stay informed.</p>
                                          </div>
                                          <button onClick={() => handleNotificationToggle(key)} className={`relative w-12 h-6 rounded-full transition-colors border ${value ? 'bg-[#ff5a00] border-[#ff5a00]' : 'bg-gray-200 border-gray-300'}`}>
                                              <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${value ? 'translate-x-6' : 'translate-x-0'}`} />
                                          </button>
                                      </div>
                                  ))}
                              </div>
                          </section>
                      )}

                      {activeTab === 'Privacy' && (
                          <section className="bg-white border border-gray-200 shadow-sm p-8 rounded-sm">
                              <h2 className="text-[17px] font-black text-gray-900 mb-6 pb-4 border-b border-gray-100">Privacy & Security</h2>
                              <div className="space-y-4">
                             
                                  
                                  <div className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-sm hover:border-[#ff5a00] cursor-pointer transition-colors group">
                                      <div className="flex items-center gap-4">
                                          <div className="p-3 bg-gray-100 rounded-sm"><Globe className="size-5 text-gray-600" /></div>
                                          <div>
                                              <p className="text-gray-900 font-bold text-[14px]">Active Sessions</p>
                                              <p className="text-[13px] text-gray-500 font-medium">Manage your logged-in interactions</p>
                                          </div>
                                      </div>
                                      <ChevronRight className="size-5 text-gray-400 group-hover:text-[#ff5a00] transition-colors" strokeWidth={2.5}/>
                                  </div>
                              </div>
                          </section>
                      )}

                      {activeTab === 'Billing' && (
                          <section className="bg-white border border-gray-200 shadow-sm p-12 rounded-sm text-center">
                              <div className="w-20 h-20 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                  <CreditCard className="size-8 text-gray-400" />
                              </div>
                              <h2 className="text-[20px] font-black text-gray-900 mb-3">No Active Subscription</h2>
                              <p className="text-[14px] text-gray-500 font-medium max-w-sm mx-auto mb-8 leading-relaxed">You are currently on the free plan. Upgrade to unlock premium features and higher visibility.</p>
                              <button className="px-8 py-3 bg-[#ff5a00] hover:bg-[#e04e00] text-white font-bold text-[13px] uppercase tracking-widest rounded-sm shadow-sm transition-colors">
                                  View Plans
                              </button>
                          </section>
                      )}

                      {activeTab === 'Feedback' && (
                          <section className="bg-white border border-gray-200 shadow-sm p-8 rounded-sm">
                              <h2 className="text-[17px] font-black text-gray-900 mb-6 pb-4 border-b border-gray-100">Send us your feedback</h2>
                              
                              <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <div>
                                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                                          <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full bg-white border border-gray-200 rounded-sm px-4 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors" placeholder="Jordan" />
                                      </div>
                                      <div>
                                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                                          <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full bg-white border border-gray-200 rounded-sm px-4 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors" placeholder="Smith" />
                                      </div>
                                  </div>
                                  
                                  <div>
                                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Email</label>
                                      <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white border border-gray-200 rounded-sm px-4 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors" placeholder="hello@company.com" />
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                                      <div className="sm:col-span-1">
                                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Code</label>
                                          <input required type="text" value={formData.phoneCode} onChange={e => setFormData({...formData, phoneCode: e.target.value})} className="w-full bg-white border border-gray-200 rounded-sm px-4 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors" placeholder="+1" />
                                      </div>
                                      <div className="sm:col-span-3">
                                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Phone Number</label>
                                          <input required type="tel" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} className="w-full bg-white border border-gray-200 rounded-sm px-4 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors" placeholder="(555) 000-0000" />
                                      </div>
                                  </div>

                                  <div>
                                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Message</label>
                                      <textarea required rows="4" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-white border border-gray-200 rounded-sm px-4 py-3 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors resize-none" placeholder="How can we improve?"></textarea>
                                  </div>
                                  
                                  <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-[#ff5a00] hover:bg-[#e04e00] text-white text-[13px] font-bold rounded-sm shadow-sm transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
                                      {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" strokeWidth={3} />}
                                      {isSubmitting ? 'Sending...' : 'Send Feedback'}
                                  </button>
                              </form>
                          </section>
                      )}
                  </div>
              </div>
          </div>
    </>
  );
};

export default Settings;
