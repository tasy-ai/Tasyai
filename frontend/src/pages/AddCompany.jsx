import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { 
  Rocket,
  X,
  Building2,
  Briefcase,
  HeartHandshake,
  PieChart,
  CalendarClock,
  School,
  Heart,
  Users,
  PlusCircle,
  Verified,
  ArrowRight,
  CloudUpload,
  Plus,
  Trash2
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import companyService from '../services/companyService';

const CreateCompanyProfile = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    tagline: '',
    industry: 'Artificial Intelligence',
    fundingStage: 'Seed',
    mission: '',
    logo: '',
    location: '',
    website: ''
  });

  const [openings, setOpenings] = useState([
    { role: '', experience: 'Mid-Level (3-5 years)', techStack: [], workModel: 'Remote', collaboration: 'Stipend + Equity' }
  ]);

  const [selectedBenefits, setSelectedBenefits] = useState([]);

  const techOptions = [
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'Go', icon: '🔵' },
    { name: 'Rust', icon: '🦀' },
    { name: 'TypeScript', icon: '🟦' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'AWS', icon: '☁️' }
  ];

  const benefits = [
    { id: 'High Equity', icon: PieChart, title: 'High Equity', desc: 'Be a true owner with significant share allocation.' },
    { id: 'Async Culture', icon: CalendarClock, title: 'Async Culture', desc: 'Work on your own schedule, from anywhere.' },
    { id: 'L&D Budget', icon: School, title: 'L&D Budget', desc: 'Annual stipend for courses and conferences.' },
    { id: 'Premium Health', icon: Heart, title: 'Premium Health', desc: 'Full medical coverage for you and family.' },
    { id: 'Annual Retreats', icon: Users, title: 'Annual Retreats', desc: 'All-expenses-paid team offsites globally.' }
  ];

  const toggleBenefit = (benefitId) => {
    setSelectedBenefits(prev => 
      prev.includes(benefitId) 
        ? prev.filter(id => id !== benefitId)
        : [...prev, benefitId]
    );
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOpeningChange = (index, field, value) => {
    const updatedOpenings = [...openings];
    updatedOpenings[index][field] = value;
    setOpenings(updatedOpenings);
  };

  const addOpening = () => {
    setOpenings([...openings, { role: '', experience: 'Mid-Level (3-5 years)', techStack: [], workModel: 'Remote', collaboration: 'Stipend + Equity' }]);
  };

  const removeOpening = (index) => {
    if (openings.length === 1) return;
    setOpenings(openings.filter((_, i) => i !== index));
  };

  const toggleTechInOpening = (openingIndex, techName) => {
    const updatedOpenings = [...openings];
    const techStack = updatedOpenings[openingIndex].techStack;
    if (techStack.includes(techName)) {
      updatedOpenings[openingIndex].techStack = techStack.filter(t => t !== techName);
    } else {
      updatedOpenings[openingIndex].techStack = [...techStack, techName];
    }
    setOpenings(updatedOpenings);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File is too large (max 5MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange('logo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.companyName || !formData.tagline || !formData.mission) {
      alert("Please fill in main company details");
      return;
    }

    setLoading(true);
    try {
      const dataToSubmit = {
        name: formData.companyName,
        tagline: formData.tagline,
        description: formData.mission,
        industry: formData.industry,
        fundingStage: formData.fundingStage,
        logo: formData.logo,
        benefits: selectedBenefits,
        openings: openings.map(o => ({
            ...o,
            workModel: o.workModel // Ensuring it matches enum if needed
        })),
        location: formData.location,
        website: formData.website
      };

      await companyService.createCompany(dataToSubmit);
      alert("Company Profile Published Successfully!");
      navigate('/my-startups');
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to publish profile. Are you logged in?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#020617] text-slate-100 font-sans min-h-screen flex overflow-hidden">
      <SEO 
        title="Launch Venture"
        description="Craft a detailed profile to showcase your vision and team."
      />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <motion.main 
        layout
        className={`flex-1 overflow-y-auto h-full bg-[#020617] ${isSidebarOpen ? 'md:ml-[280px]' : 'md:ml-20'}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-6 md:py-10 pb-32">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pt-12 md:pt-0">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#4245f0] to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Rocket className="text-white size-6" />
                </div>
                <div>
                  <h1 className="text-white text-xl md:text-2xl font-black tracking-tight uppercase">Launch Venture</h1>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Venture Deployment Module</p>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/dashboard')} 
                  className="flex-1 sm:flex-none px-6 py-3 text-slate-400 hover:text-white transition-all font-bold text-xs uppercase tracking-widest border border-white/5 hover:bg-white/5 rounded-xl"
                >
                  Abort
                </button>
                <motion.button 
                  onClick={handleSubmit}
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 sm:flex-none px-8 py-3 bg-[#4245f0] hover:bg-[#4245f0]/90 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-[#4245f0]/20 flex items-center justify-center gap-3 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Transmitting...' : 'Deploy Venture'}
                  <Rocket className="size-4" />
                </motion.button>
             </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-10 xl:gap-16 relative">
            {/* Left Column - Forms */}
            <div className="flex-1 space-y-10">
              {/* Header */}
              <header className="max-w-3xl space-y-4">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white leading-tight">Ignite Your Global Presence.</h2>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed font-medium">Engineer a high-fidelity profile to broadcast your vision, architectural challenges, and core mission to the elite explorer network.</p>
              </header>

            {/* Company Identity */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-[32px] p-6 md:p-10 space-y-10 border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl">
                  <Building2 className="text-[#4245f0] size-6" />
                </div>
                <h3 className="text-xl font-black tracking-tight">Venture Foundation</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Logo Upload */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[10px] font-black text-slate-500 mb-4 uppercase tracking-[0.2em] ml-1">Brand Identity (Logo)</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative border-2 border-dashed border-white/10 rounded-3xl p-10 md:p-16 flex flex-col items-center justify-center bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer group overflow-hidden"
                  >
                    {formData.logo ? (
                      <div className="relative">
                        <img src={formData.logo} alt="Logo Preview" className="max-h-32 md:max-h-40 object-contain rounded-xl" />
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleInputChange('logo', ''); }}
                          className="absolute -top-4 -right-4 p-2 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="p-5 bg-white/5 rounded-2xl mb-6 group-hover:scale-110 group-hover:bg-[#4245f0]/10 transition-all duration-500">
                          <CloudUpload className="size-10 text-slate-600 group-hover:text-[#4245f0]" />
                        </div>
                        <p className="text-sm font-bold text-slate-300 text-center">Broadcast your visual identity</p>
                        <p className="text-[10px] text-slate-500 mt-2 font-black uppercase tracking-widest">SVG, PNG, WEBP • Max 5MB</p>
                      </>
                    )}
                    <input 
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Legal Designation</label>
                  <input 
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:ring-2 focus:ring-[#4245f0] transition-all outline-none placeholder:text-slate-700"
                    placeholder="e.g. Nexa Dynamics"
                  />
                </div>

                {/* Tagline */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Strategic Tagline</label>
                  <input 
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => handleInputChange('tagline', e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:ring-2 focus:ring-[#4245f0] transition-all outline-none placeholder:text-slate-700"
                    placeholder="The future of decentralized compute"
                  />
                </div>

                {/* Industry */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Primary Sector</label>
                  <div className="relative group">
                    <select 
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:ring-2 focus:ring-[#4245f0] transition-all outline-none appearance-none cursor-pointer"
                    >
                      <option className="bg-[#020617]">Artificial Intelligence</option>
                      <option className="bg-[#020617]">Blockchain / Web3</option>
                      <option className="bg-[#020617]">CleanTech</option>
                      <option className="bg-[#020617]">Biotech</option>
                      <option className="bg-[#020617]">Enterprise SaaS</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <ArrowRight className="size-4 rotate-90" />
                    </div>
                  </div>
                </div>

                {/* Funding Stage */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Capital Maturity</label>
                  <div className="relative group">
                    <select 
                      value={formData.fundingStage}
                      onChange={(e) => handleInputChange('fundingStage', e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:ring-2 focus:ring-[#4245f0] transition-all outline-none appearance-none cursor-pointer"
                    >
                      <option className="bg-[#020617]">Stealth Mode</option>
                      <option className="bg-[#020617]">Pre-seed / Bootstrapped</option>
                      <option className="bg-[#020617]">Seed</option>
                      <option className="bg-[#020617]">Series A+</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <ArrowRight className="size-4 rotate-90" />
                    </div>
                  </div>
                </div>

                {/* Mission Statement */}
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Core Manifesto (Mission)</label>
                  <textarea 
                    value={formData.mission}
                    onChange={(e) => handleInputChange('mission', e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:ring-2 focus:ring-[#4245f0] transition-all outline-none resize-none placeholder:text-slate-700 font-medium leading-relaxed"
                    rows="6"
                    placeholder="Articulate the primary problem vector you are solving and your architectural approach to the solution..."
                  ></textarea>
                </div>
              </div>
            </motion.section>

            {/* Open Positions */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-[32px] p-6 md:p-10 space-y-10 border border-white/10"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl">
                    <Briefcase className="text-[#4245f0] size-6" />
                  </div>
                  <h3 className="text-xl font-black tracking-tight uppercase">Talent Acquisition</h3>
                </div>
                <button 
                  onClick={addOpening}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3 border border-emerald-500/20"
                >
                  <Plus className="size-4" /> Expand Arsenal
                </button>
              </div>

              <div className="space-y-8">
                {openings.map((opening, idx) => (
                  <div key={idx} className="p-6 md:p-10 bg-white/[0.02] rounded-3xl border border-white/5 space-y-10 relative group hover:border-[#4245f0]/20 transition-all">
                    <button 
                      onClick={() => removeOpening(idx)}
                      className="absolute top-6 right-6 p-2.5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl md:opacity-0 md:group-hover:opacity-100 transition-all border border-transparent hover:border-red-500/20"
                    >
                      <Trash2 className="size-5" />
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Architectural Role</label>
                        <input 
                          type="text"
                          value={opening.role}
                          onChange={(e) => handleOpeningChange(idx, 'role', e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:ring-2 focus:ring-[#4245f0] transition-all outline-none placeholder:text-slate-700"
                          placeholder="e.g. Senior Backend Architect"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Seniority Tier</label>
                        <div className="relative group">
                          <select 
                            value={opening.experience}
                            onChange={(e) => handleOpeningChange(idx, 'experience', e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:ring-2 focus:ring-[#4245f0] transition-all outline-none appearance-none cursor-pointer"
                          >
                            <option className="bg-[#020617]">Junior (1-2 years)</option>
                            <option className="bg-[#020617]">Mid-Level (3-5 years)</option>
                            <option className="bg-[#020617]">Senior (5-8 years)</option>
                            <option className="bg-[#020617]">Principal / Lead (8+ years)</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                            <ArrowRight className="size-4 rotate-90" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-4">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Core Capability Grid (Tech Stack)</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {techOptions.map((tech) => (
                          <button
                            key={tech.name}
                            onClick={() => toggleTechInOpening(idx, tech.name)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                              opening.techStack.includes(tech.name)
                                ? 'bg-[#4245f0] border-[#4245f0] text-white shadow-lg shadow-indigo-500/20'
                                : 'bg-white/[0.02] border-white/5 hover:border-white/20 text-slate-400'
                            }`}
                          >
                            <span className="text-base">{tech.icon}</span>
                            <span className="text-xs font-bold uppercase tracking-tight">{tech.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Work Model */}
                      <div className="space-y-4">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Operational Model</label>
                        <div className="flex flex-wrap gap-2">
                          {['Remote', 'Hybrid', 'Onsite'].map(m => (
                            <button 
                              key={m}
                              onClick={() => handleOpeningChange(idx, 'workModel', m)}
                              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                opening.workModel === m
                                  ? 'bg-[#4245f0] text-white shadow-lg shadow-indigo-500/20'
                                  : 'bg-white/[0.03] border border-white/5 text-slate-500 hover:bg-white/10'
                              }`}
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Collaboration */}
                      <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Collaboration Logic</label>
                        <div className="relative group">
                          <select 
                            value={opening.collaboration}
                            onChange={(e) => handleOpeningChange(idx, 'collaboration', e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:ring-2 focus:ring-[#4245f0] transition-all outline-none appearance-none cursor-pointer"
                          >
                            <option className="bg-[#020617]">Equity Only (Co-founder)</option>
                            <option className="bg-[#020617]">Stipend + Equity</option>
                            <option className="bg-[#020617]">Project Based</option>
                            <option className="bg-[#020617]">Full Salary + Equity</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                            <ArrowRight className="size-4 rotate-90" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Benefits & Perks */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-[32px] p-6 md:p-10 space-y-10 border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl">
                  <HeartHandshake className="text-[#4245f0] size-6" />
                </div>
                <h3 className="text-xl font-black tracking-tight uppercase">Incentive Infrastructure</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit) => {
                  const IconComponent = benefit.icon;
                  const isSelected = selectedBenefits.includes(benefit.id);
                  
                  return (
                    <label 
                      key={benefit.id}
                      onClick={() => toggleBenefit(benefit.id)}
                      className={`group relative flex flex-col p-6 rounded-3xl border cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? 'bg-indigo-600/10 border-indigo-500 shadow-xl shadow-indigo-500/10'
                          : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${isSelected ? 'bg-indigo-500 text-white' : 'bg-white/5 text-slate-500 group-hover:text-indigo-400'}`}>
                          <IconComponent className="size-5" />
                        </div>
                        <input 
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-5 h-5 rounded-lg border-white/10 bg-[#020617] text-indigo-500 focus:ring-0 transition-all cursor-pointer"
                        />
                      </div>
                      <span className={`text-sm font-black uppercase tracking-tight transition-colors ${isSelected ? 'text-white' : 'text-slate-400'}`}>{benefit.title}</span>
                      <p className="text-[11px] text-slate-500 mt-2 leading-relaxed font-medium">{benefit.desc}</p>
                    </label>
                  );
                })}
              </div>
            </motion.section>
          </div>

          {/* Right Column - Preview */}
          <aside className="w-full xl:w-[440px]">
            <div className="sticky top-24 space-y-8">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Spatial Preview</h3>
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active Stream</span>
                </div>
              </div>

              {/* Preview Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="glass rounded-[40px] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] border border-white/20 relative"
              >
                {/* Banner */}
                <div className="h-32 bg-gradient-to-br from-indigo-600 via-[#4245f0] to-purple-700 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400 rounded-full blur-3xl -ml-24 -mb-24"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-8 pb-10">
                  <div className="-mt-10 mb-8 relative z-10">
                    <div className="size-24 rounded-3xl bg-[#020617] p-1 border-4 border-[#020617] shadow-2xl overflow-hidden shadow-black/80">
                      <div className="w-full h-full rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                        {formData.logo ? (
                          <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-3xl font-black text-white">
                            {formData.companyName ? formData.companyName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'TY'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-8">
                    <h4 className="text-2xl font-black text-white leading-tight tracking-tighter">{formData.companyName || 'Ventuer Designation'}</h4>
                    <p className="text-xs text-slate-500 font-medium italic">"{formData.tagline || 'Innovation at scale'}"</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-10">
                    <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400">{formData.industry}</span>
                    <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-[#4245f0] bg-indigo-500/10 border-indigo-500/20">{formData.fundingStage}</span>
                  </div>

                  <div className="space-y-5">
                    {openings.map((o, i) => o.role && i < 2 && (
                      <div key={i} className="p-5 bg-white/[0.03] rounded-3xl border border-white/5 flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-white truncate uppercase tracking-tight">{o.role}</p>
                          <div className="flex gap-1.5 mt-2">
                            {o.techStack.slice(0, 3).map(tech => (
                              <span key={tech} className="text-[8px] bg-[#020617] px-2 py-0.5 rounded-lg text-slate-500 font-black uppercase tracking-tighter border border-white/5">{tech}</span>
                            ))}
                          </div>
                        </div>
                        <span className="shrink-0 px-3 py-1 bg-indigo-500 text-white text-[8px] font-black uppercase tracking-widest rounded-lg">{o.workModel}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-10 py-5 bg-white text-[#020617] text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#4245f0] hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3">
                    Analyze Portal
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </motion.div>

              {/* Progress */}
              <div className="glass p-8 rounded-[32px] space-y-5 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl -mr-12 -mt-12"></div>
                <div className="flex items-center gap-4">
                  <div className="p-2 py-1.5 bg-indigo-500/20 rounded-lg text-indigo-500">
                    <Verified className="size-5" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Identity verification protocol active. Deployment clearance: 24h.</p>
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '67%' }}
                      className="h-full bg-[#4245f0] shadow-[0_0_12px_rgba(66,69,240,0.4)]"
                    ></motion.div>
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em]">
                    <span className="text-slate-600 tracking-normal">Deployment Fidelity</span>
                    <span className="text-[#4245f0]">67% Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
        </div>
      </motion.main>
    </div>
  );
};

export default CreateCompanyProfile;