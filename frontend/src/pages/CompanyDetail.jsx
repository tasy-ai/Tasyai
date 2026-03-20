import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Users, 
  Bookmark,
  ExternalLink,
  CheckCircle2,
  Loader2,
  X,
  Cloud,
  ChevronLeft,
  Link as LinkIcon,
  PieChart,
  BookOpen,
  Clock,
  Laptop,
  Share2,
  Globe
} from 'lucide-react';
import { companies as mockCompanies } from '../data/dashboardData';
import companyService from '../services/companyService';
import authService from '../services/authService';
import { toast, Toaster } from 'react-hot-toast';
import notificationService from '../services/notificationService';

const CompanyDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState(location.state?.company || null);
  const [isSaved, setIsSaved] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinStep, setJoinStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [joinAnswers, setJoinAnswers] = useState({
    experience: '',
    benefitsAcceptance: '',
    duration: ''
  });

  const queryParams = new URLSearchParams(location.search);
  const companyId = queryParams.get('id');

  useEffect(() => {
    const checkSaveStatus = async () => {
        const user = authService.getCurrentUser();
        const targetId = company?._id || companyId;
        if (user && targetId) {
            try {
                const savedCompanies = await authService.getSavedCompanies();
                setIsSaved(savedCompanies.some(c => c._id === targetId));
            } catch (err) {
                console.error("Error checking save status:", err);
            }
        }
    };

    const fetchCompanyData = async () => {
      if (!company && companyId) {
        try {
          setLoading(true);
          const data = await companyService.getCompanyById(companyId);
          setCompany(data);
        } catch (err) {
          console.error("Backend fetch failed, trying mock data:", err);
          const mock = mockCompanies.find(c => c.id === parseInt(companyId));
          if (mock) {
            setCompany({
              ...mock,
              _id: companyId,
              location: mock.location || 'San Francisco, CA / Remote',
              website: mock.website || 'nexuscloud.tech',
              founded: 'Jan 2023',
              teamSize: '10-50 Employees',
              fundingStage: 'Seed ($4.2M)',
              industry: 'Cloud / Web3',
              techStack: ['React', 'Rust', 'AWS', 'Docker'],
              description: `Nexus Cloud is a frontier technology lab focused on rewriting the rules of cloud infrastructure. Founded in early 2023, our mission is to eliminate the barriers between traditional web services and decentralized protocols.\n\nWe are currently in our Seed stage, having recently secured funding from top-tier venture partners. Our goal for the next 12 months is to scale our core validator network and launch our developer SDK to the public. We believe in high autonomy, radical transparency, and building things that actually matter.`,
              openings: [
                 { role: 'Full-Stack Engineer', workModel: 'Remote', compensation: '$120k - $180k', techStack: ['React', 'Node.js', 'PostgreSQL'], type: 'Full-time' },
                 { role: 'Lead Product Designer', workModel: 'Remote', compensation: '$80 - $120 / hr', techStack: ['Figma', 'Web3 UI'], type: 'Contract' },
                 { role: 'Growth & Partnerships', workModel: 'USA Only', compensation: '$90k - $140k', techStack: ['Ecosystem Development'], type: 'Full-time' }
              ],
              benefits: ['Equity Sharing', 'Learning Stipend', 'Flexible Hours', 'Tech Stack']
            });
          }
        } finally {
          setLoading(false);
        }
      } else if (company) {
          // Normalize existing data for the new UI format if missing
          setCompany(prev => ({
              ...prev,
              founded: prev.founded || 'Jan 2023',
              teamSize: prev.teamSize || '10-50 Employees',
              fundingStage: prev.fundingStage || 'Seed ($4.2M)',
              techStack: prev.techStack || ['React', 'Rust', 'AWS', 'Docker'],
              description: prev.description || `Nexus Cloud is a frontier technology lab focused on rewriting the rules of cloud infrastructure. Founded in early 2023, our mission is to eliminate the barriers between traditional web services and decentralized protocols.\n\nWe are currently in our Seed stage, having recently secured funding from top-tier venture partners. Our goal for the next 12 months is to scale our core validator network and launch our developer SDK to the public. We believe in high autonomy, radical transparency, and building things that actually matter.`,
              openings: prev.openings?.length > 0 ? prev.openings : [
                 { role: 'Full-Stack Engineer', workModel: 'Remote', compensation: '$120k - $180k', techStack: ['React', 'Node.js', 'PostgreSQL'], type: 'Full-time' },
                 { role: 'Lead Product Designer', workModel: 'Remote', compensation: '$80 - $120 / hr', techStack: ['Figma', 'Web3 UI'], type: 'Contract' },
              ],
              benefits: prev.benefits?.length > 0 ? prev.benefits : ['Equity Sharing', 'Learning Stipend', 'Flexible Hours', 'Tech Stack']
          }));
          setLoading(false);
      }
    };

    fetchCompanyData();
    checkSaveStatus();
  }, [companyId, company?._id]);

  const handleToggleSave = async () => {
    try {
      const targetId = company?._id || companyId;
      if (!targetId) return;
      const res = await authService.toggleSaveCompany(targetId);
      setIsSaved(res.isSaved);
      if (res.isSaved) {
        toast.success("Added to Vault");
        notificationService.addNotification({
          title: 'Company Saved',
          message: `${company.name} has been added to your interests.`,
          type: 'company',
          iconName: 'BookmarkPlus',
          color: 'bg-[#4245f0]/10 border-[#4245f0]/20'
        });
      } else {
        toast.success("Removed from Vault");
        notificationService.addNotification({
          title: 'Company Removed',
          message: `${company.name} was removed from your interests.`,
          type: 'info',
          iconName: 'Bookmark',
          color: 'bg-slate-500/10 border-slate-500/20'
        });
      }
    } catch (err) {
      toast.error("Failed to update Vault");
    }
  };

  const handleJoinSubmit = async () => {
    const user = authService.getCurrentUser();
    if (!user) {
      toast.error("Please login to join the team");
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
            userName: user.name,
            userEmail: user.email,
            companyName: company.name,
            experience: joinAnswers.experience,
            benefitsAcceptance: joinAnswers.benefitsAcceptance,
            durationMonths: joinAnswers.duration,
            _subject: `🚀 New Team Member Interest: ${user.name} for ${company.name}`,
          }),
        }
      );

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Interest submitted! The team will contact you soon.");
        setShowJoinModal(false);
        setJoinStep(1);
        setJoinAnswers({ experience: '', benefitsAcceptance: '', duration: '' });
      } else {
        toast.error("Failed to submit interest. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getBenefitIcon = (name) => {
      const lower = name.toLowerCase();
      if (lower.includes('equity')) return <PieChart className="size-5 text-[#ff5a00]" strokeWidth={2.5} />;
      if (lower.includes('learning') || lower.includes('stipend')) return <BookOpen className="size-5 text-[#ff5a00]" strokeWidth={2.5} />;
      if (lower.includes('hour') || lower.includes('flex')) return <Clock className="size-5 text-[#ff5a00]" strokeWidth={2.5} />;
      if (lower.includes('tech') || lower.includes('hardware')) return <Laptop className="size-5 text-[#ff5a00]" strokeWidth={2.5} />;
      return <CheckCircle2 className="size-5 text-[#ff5a00]" strokeWidth={2.5} />;
  }
  
  const getBenefitDesc = (name) => {
      const lower = name.toLowerCase();
      if (lower.includes('equity')) return "Generous stock options for all team members.";
      if (lower.includes('learning')) return "$2,000 yearly for courses and conferences.";
      if (lower.includes('hour')) return "Asynchronous culture that respects your time.";
      if (lower.includes('tech')) return "Top-of-the-line hardware and ergonomic setup.";
      return "Competitive industry standard perk.";
  }


  if (loading) {
    return (
      <div className="flex bg-white min-h-screen items-center justify-center">
          <Loader2 className="size-10 text-[#ff5a00] animate-spin" />
      </div>
    );
  }

  if (!company) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F8F7F4] text-black w-full">
            <div className="text-center">
                <h3 className="text-2xl font-black mb-4">Startup Not Found</h3>
                <p className="text-gray-500 mb-8 font-medium">The company you are looking for doesn't exist or has been removed.</p>
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="px-8 py-3 bg-[#ff5a00] text-white rounded-sm font-bold shadow-sm transition-all"
                >
                    Return to Directory
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans w-full pb-20">
      <SEO 
        title={company?.name || "Company Profile"}
        description={company?.tagline || "Learn more about this startup."}
      />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-10">
          
          <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-[13px] font-bold text-gray-400 hover:text-gray-900 mb-8 transition-colors"
          >
              <ChevronLeft className="size-4" strokeWidth={3} /> Back to Directory
          </button>

          {/* Hero Header Layout exactly matching Startup Hub image */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-12">
              <div className="flex flex-col md:flex-row items-start gap-8">
                  {/* Logo Square */}
                  <div className="w-28 h-28 rounded-xl bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.06)] flex items-center justify-center shrink-0">
                      {company.logo ? (
                         <img src={company.logo} alt={company.name} className="w-full h-full object-cover rounded-xl" />
                      ) : (
                         <Cloud className="size-10 text-gray-600 fill-gray-600" />
                      )}
                  </div>
                  
                  {/* Title & Metadata */}
                  <div className="pt-2">
                     <div className="flex items-center gap-4 mb-2">
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">{company.name}</h1>
                        <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[9px] font-black uppercase tracking-widest rounded-sm border border-green-200/50">
                            HIRING
                        </span>
                     </div>
                     <p className="text-[17px] text-gray-500 font-medium max-w-2xl leading-relaxed mb-5">
                         {company.tagline || company.description?.split('.')[0] + '.' || 'Building the next generation of infrastructure.'}
                     </p>
                     
                     <div className="flex flex-wrap items-center gap-6 text-[13px] font-bold text-gray-500">
                         <a href={company.website && company.website.startsWith('http') ? company.website : `https://${company.website || 'nexuscloud.tech'}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 transition-colors">
                            <LinkIcon className="size-3.5" strokeWidth={3} />
                            {company.website?.replace(/^https?:\/\//, '') || 'nexuscloud.tech'}
                         </a>
                         <div className="flex items-center gap-1.5">
                            <MapPin className="size-4" />
                            {company.location || 'San Francisco, CA / Remote'}
                         </div>
                         <div className="flex items-center gap-1.5">
                            <Users className="size-4" />
                            {company.teamSize || '10-50 Employees'}
                         </div>
                     </div>
                  </div>
              </div>

              {/* Action Buttons Right Side */}
              <div className="flex flex-col w-full lg:w-40 gap-3 shrink-0">
                  <button 
                     onClick={() => setShowJoinModal(true)}
                     className="w-full py-2.5 bg-[#ff5a00] hover:bg-[#e04e00] text-white font-bold text-[14px] rounded-sm transition-colors shadow-sm"
                  >
                      Show Interest
                  </button>
                  <button 
                     onClick={handleToggleSave}
                     className="w-full py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-bold text-[14px] rounded-sm transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                      <Bookmark className={`size-4 ${isSaved ? 'fill-gray-900' : ''}`} strokeWidth={2.5} />
                      {isSaved ? 'Saved' : 'Save'}
                  </button>
              </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16 md:gap-24">
              
              {/* Left Column (Main Content) */}
              <div className="flex flex-col gap-14">
                  
                  {/* About the Company */}
                  <section>
                      <h2 className="text-[20px] font-bold text-gray-900 mb-6">About the Company</h2>
                      <div className="space-y-4 text-[15px] leading-relaxed text-gray-600">
                         {company.description?.split('\n\n').map((para, i) => (
                             <p key={i}>{para}</p>
                         ))}
                      </div>
                  </section>

                  {/* Open Roles & Collaboration */}
                  <section>
                      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                           <h2 className="text-[20px] font-bold text-gray-900">Open Roles & Collaboration</h2>
                           <span className="text-[13px] font-bold text-blue-600">{company.openings?.length || 0} total</span>
                      </div>
                      
                      <div className="space-y-6">
                          {company.openings?.map((role, idx) => (
                              <div key={idx} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                                     <div>
                                         <h3 className="text-[17px] font-bold text-gray-900 mb-1.5">{role.role}</h3>
                                         <p className="text-[13px] font-medium text-gray-500">
                                            {role.type || 'Full-time'} • {role.compensation || '$120k - $180k'} • {role.workModel || role.location || 'Remote'}
                                         </p>
                                     </div>
                                     <button 
                                        onClick={() => setShowJoinModal(true)}
                                        className="text-[14px] font-black tracking-wide text-[#ff5a00] hover:text-[#e04e00] transition-colors self-start md:self-center uppercase"
                                     >
                                        Apply
                                     </button>
                                 </div>
                                 <div className="flex flex-wrap gap-2">
                                     {typeof role.techStack === 'string' 
                                        ? role.techStack.split(',').map(t => <span key={t} className="px-2.5 py-1 bg-[#F8F7F4] text-gray-500 font-bold text-[10px] rounded-sm">{t.trim()}</span>)
                                        : role.techStack?.map(t => <span key={t} className="px-2.5 py-1 bg-[#F8F7F4] text-gray-500 font-bold text-[10px] rounded-sm">{t.trim()}</span>)
                                     }
                                 </div>
                              </div>
                          ))}
                      </div>
                  </section>

                  {/* Benefits & Perks */}
                  {company.benefits && company.benefits.length > 0 && (
                      <section>
                          <h2 className="text-[20px] font-bold text-gray-900 mb-8">Benefits & Perks</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                              {company.benefits.map((benefit, idx) => (
                                  <div key={idx} className="flex gap-4">
                                      <div className="shrink-0 mt-0.5">
                                          {getBenefitIcon(benefit)}
                                      </div>
                                      <div>
                                          <h4 className="text-[14px] font-black text-gray-900 mb-1.5">{benefit}</h4>
                                          <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                                              {getBenefitDesc(benefit)}
                                          </p>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </section>
                  )}
              </div>

              {/* Right Column (Stats Box) */}
              <div className="flex flex-col gap-10">
                  
                  {/* Quick Stats */}
                  <section>
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-6">Quick Stats</h3>
                      <div className="space-y-4 text-[13px]">
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                              <span className="text-gray-500 font-medium">Founded</span>
                              <span className="font-bold text-gray-900">{company.founded || 'Jan 2023'}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                              <span className="text-gray-500 font-medium">Stage</span>
                              <span className="font-bold text-gray-900">{company.fundingStage || 'Seed ($4.2M)'}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                              <span className="text-gray-500 font-medium">Industry</span>
                              <span className="font-bold text-gray-900">{company.industry || 'Cloud / Web3'}</span>
                          </div>
                      </div>
                  </section>

                  {/* Founders */}
                  <section>
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-6">Founders</h3>
                      <div className="flex items-center gap-3">
                          <div className="flex -space-x-3">
                              <img src="https://i.pravatar.cc/100?img=33" alt="Founder 1" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                              <img src="https://i.pravatar.cc/100?img=11" alt="Founder 2" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                          </div>
                          <span className="text-[12px] font-bold text-gray-600">Ariel & David + 1</span>
                      </div>
                  </section>

                  {/* Tech Stack */}
                  <section>
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-6">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                          {company.techStack?.map((t, i) => (
                              <span key={i} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 font-bold text-[11px] rounded-[4px]">
                                 {t}
                              </span>
                          ))}
                      </div>
                  </section>

                  {/* Startup Score Highlight Box */}
                  <section className="bg-[#F8F7F4] p-6 rounded-lg border border-gray-100/60 mt-4">
                      <div className="flex justify-between items-end mb-4">
                          <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-500">Startup Score</h3>
                          <span className="text-[16px] font-black text-[#ff5a00]">94<span className="text-gray-400 font-bold text-[13px] ml-0.5">/100</span></span>
                      </div>
                      
                      {/* Progress Line */}
                      <div className="w-full h-1 bg-gray-200 rounded-full mb-5 overflow-hidden">
                          <div className="h-full bg-[#ff5a00] w-[94%]"></div>
                      </div>

                      <p className="text-[12px] text-gray-500 italic font-medium leading-relaxed">
                          Top 5% of early-stage startups in infrastructure based on proprietary traction metrics.
                      </p>
                  </section>
                  
              </div>
          </div>
      </div>
          
      {/* Footer minimal style from image */}
      <footer className="w-full mt-20 border-t border-gray-100 py-8 text-[11px] font-bold text-gray-400">
         <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
                <span>© 2024 Startup Hub</span>
                <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
                <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
                <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
            </div>
            <div className="flex items-center gap-4">
                <Share2 className="size-4 hover:text-gray-900 cursor-pointer" />
                <Globe className="size-4 hover:text-gray-900 cursor-pointer" />
            </div>
         </div>
      </footer>

      {/* Join Modal reused logic, modernized styling */}
      <AnimatePresence>
        {showJoinModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setShowJoinModal(false)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-white rounded-lg overflow-hidden shadow-xl border border-gray-100"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">Join {company.name}</h3>
                    <p className="text-gray-500 text-sm font-medium mt-1">Step {joinStep} of 3</p>
                  </div>
                  <button 
                    onClick={() => !isSubmitting && setShowJoinModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="size-5 text-gray-500" strokeWidth={3} />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-gray-100 rounded-full mb-8 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(joinStep / 3) * 100}%` }}
                    className="h-full bg-[#ff5a00]"
                  />
                </div>

                <AnimatePresence mode="wait">
                   {/* Step 1 */}
                  {joinStep === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <label className="block text-[14px] font-bold text-gray-900">Tell us about your relevant experience</label>
                      <textarea 
                        autoFocus
                        value={joinAnswers.experience}
                        onChange={(e) => setJoinAnswers({...joinAnswers, experience: e.target.value})}
                        className="w-full h-32 bg-gray-50 border border-gray-200 rounded-sm p-4 text-gray-900 focus:ring-1 focus:ring-[#ff5a00] focus:border-[#ff5a00] outline-none transition-all resize-none placeholder:text-gray-400 font-medium text-[14px]"
                        placeholder="Project leads, specific tech expertise..."
                      />
                      <button 
                        disabled={!joinAnswers.experience.trim()}
                        onClick={() => setJoinStep(2)}
                        className="w-full py-3.5 bg-[#ff5a00] hover:bg-[#e04e00] text-white font-bold text-[14px] rounded-sm transition-all disabled:opacity-50"
                      >
                        Next Question
                      </button>
                    </motion.div>
                  )}

                  {/* Step 2 */}
                  {joinStep === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <label className="block text-[14px] font-bold text-gray-900 mb-2">Do you accept the offered benefits and equity structure?</label>
                      <div className="flex flex-col gap-2">
                        {["Yes, fully accept", "Interested, need discussion"].map(opt => (
                          <button
                            key={opt}
                            onClick={() => setJoinAnswers({...joinAnswers, benefitsAcceptance: opt})}
                            className={`w-full p-4 rounded-sm border text-[14px] font-bold transition-all text-left ${
                              joinAnswers.benefitsAcceptance === opt 
                              ? 'bg-orange-50 border-orange-200 text-[#ff5a00]' 
                              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button 
                          onClick={() => setJoinStep(1)}
                          className="flex-1 py-3.5 bg-white text-gray-600 font-bold rounded-sm hover:bg-gray-50 transition-all border border-gray-200 text-[14px]"
                        >
                          Back
                        </button>
                        <button 
                          disabled={!joinAnswers.benefitsAcceptance}
                          onClick={() => setJoinStep(3)}
                          className="flex-[2] py-3.5 bg-[#ff5a00] hover:bg-[#e04e00] text-white font-bold rounded-sm transition-all disabled:opacity-50 text-[14px]"
                        >
                          Next Question
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3 */}
                  {joinStep === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <label className="block text-[14px] font-bold text-gray-900">How many months can you commit to this venture?</label>
                      <input 
                        type="number"
                        min="1"
                        autoFocus
                        value={joinAnswers.duration}
                        onChange={(e) => setJoinAnswers({...joinAnswers, duration: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 rounded-sm p-4 text-gray-900 focus:ring-1 focus:ring-[#ff5a00] focus:border-[#ff5a00] outline-none transition-all placeholder:text-gray-400 font-medium text-[14px]"
                        placeholder="e.g. 6"
                      />
                      <p className="text-[11px] text-gray-500 italic font-medium">This helps founders align on milestones and roadmap planning.</p>
                      
                      <div className="flex gap-3 pt-4">
                        <button 
                          onClick={() => setJoinStep(2)}
                          className="flex-1 py-3.5 bg-white text-gray-600 font-bold rounded-sm hover:bg-gray-50 transition-all border border-gray-200 text-[14px]"
                        >
                          Back
                        </button>
                        <button 
                          disabled={!joinAnswers.duration || isSubmitting}
                          onClick={handleJoinSubmit}
                          className="flex-[2] py-3.5 bg-[#ff5a00] hover:bg-[#e04e00] text-white font-bold text-[14px] rounded-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle2 className="size-4 text-white" strokeWidth={2.5} />}
                          {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompanyDetail;
