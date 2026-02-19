import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
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
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <motion.main 
        layout
        className={`flex-1 overflow-y-auto h-full bg-[#020617] ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'}`}
      >
        <div className="max-w-7xl mx-auto px-8 py-8 pb-32">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4245f0] rounded-lg flex items-center justify-center">
                  <Rocket className="text-white size-5" />
                </div>
                <h1 className="text-white text-2xl font-bold tracking-tight">Launch Venture</h1>
             </div>
             <div className="flex items-center gap-4">
                <button onClick={() => navigate('/dashboard')} className="text-slate-400 hover:text-white transition-colors font-medium">Cancel</button>
                <motion.button 
                  onClick={handleSubmit}
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-6 py-2.5 bg-[#4245f0] hover:bg-[#4245f0]/90 text-white font-bold rounded-lg transition-all shadow-lg shadow-[#4245f0]/20 flex items-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Publishing...' : 'Publish Profile'}
                  <Rocket className="size-4" />
                </motion.button>
             </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 relative">
            {/* Left Column - Forms */}
            <div className="flex-1 space-y-12">
              {/* Header */}
              <header className="max-w-3xl">
                <h2 className="text-4xl font-extrabold tracking-tight text-white mb-4">Launch Your Venture</h2>
                <p className="text-slate-400 text-lg leading-relaxed">Craft a detailed profile to showcase your vision, team, and current opportunities to the world's best collaborators.</p>
              </header>

            {/* Company Identity */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-8 space-y-8"
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-6">
                <Building2 className="text-[#4245f0] size-8" />
                <h3 className="text-xl font-bold">Company Identity</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Logo Upload */}
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Company Logo</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative border-2 border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer group overflow-hidden"
                  >
                    {formData.logo ? (
                      <img src={formData.logo} alt="Logo Preview" className="max-h-32 object-contain" />
                    ) : (
                      <>
                        <CloudUpload className="size-12 text-slate-500 group-hover:text-[#4245f0] mb-4" />
                        <p className="text-base font-medium text-slate-300">Drop your brand logo here or click to browse</p>
                        <p className="text-xs text-slate-500 mt-2 font-mono uppercase">SVG, PNG or WEBP (Max 5MB)</p>
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
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Company Name</label>
                  <input 
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#4245f0] focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Nexa Dynamics"
                  />
                </div>

                {/* Tagline */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Tagline</label>
                  <input 
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => handleInputChange('tagline', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#4245f0] focus:border-transparent outline-none transition-all"
                    placeholder="The future of decentralized compute"
                  />
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Primary Industry</label>
                  <select 
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#4245f0] focus:border-transparent outline-none transition-all appearance-none"
                  >
                    <option className="bg-slate-900">Artificial Intelligence</option>
                    <option className="bg-slate-900">Blockchain / Web3</option>
                    <option className="bg-slate-900">CleanTech</option>
                    <option className="bg-slate-900">Biotech</option>
                    <option className="bg-slate-900">Enterprise SaaS</option>
                  </select>
                </div>

                {/* Funding Stage */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Funding Stage</label>
                  <select 
                    value={formData.fundingStage}
                    onChange={(e) => handleInputChange('fundingStage', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#4245f0] focus:border-transparent outline-none transition-all appearance-none"
                  >
                    <option className="bg-slate-900">Stealth Mode</option>
                    <option className="bg-slate-900">Pre-seed / Bootstrapped</option>
                    <option className="bg-slate-900">Seed</option>
                    <option className="bg-slate-900">Series A+</option>
                  </select>
                </div>

                {/* Mission Statement */}
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Mission Statement</label>
                  <textarea 
                    value={formData.mission}
                    onChange={(e) => handleInputChange('mission', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#4245f0] focus:border-transparent outline-none transition-all resize-none"
                    rows="5"
                    placeholder="Describe the problem you are solving and your unique approach..."
                  ></textarea>
                </div>
              </div>
            </motion.section>

            {/* Open Positions */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-8 space-y-8"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <Briefcase className="text-[#4245f0] size-8" />
                  <h3 className="text-xl font-bold">Open Positions</h3>
                </div>
                <button 
                  onClick={addOpening}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg border border-white/10 transition-all flex items-center gap-2"
                >
                  <Plus className="size-4" /> Add Role
                </button>
              </div>

              <div className="space-y-6">
                {openings.map((opening, idx) => (
                  <div key={idx} className="p-8 bg-white/5 rounded-2xl border border-white/10 space-y-8 relative group">
                    <button 
                      onClick={() => removeOpening(idx)}
                      className="absolute top-6 right-6 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="size-5" />
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-tight">Role Title</label>
                        <input 
                          type="text"
                          value={opening.role}
                          onChange={(e) => handleOpeningChange(idx, 'role', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#4245f0] focus:border-transparent outline-none transition-all"
                          placeholder="e.g. Senior Backend Engineer"
                        />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-tight">Experience Level</label>
                        <select 
                          value={opening.experience}
                          onChange={(e) => handleOpeningChange(idx, 'experience', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#4245f0] focus:border-transparent outline-none transition-all appearance-none"
                        >
                          <option className="bg-slate-900">Junior (1-2 years)</option>
                          <option className="bg-slate-900">Mid-Level (3-5 years)</option>
                          <option className="bg-slate-900">Senior (5-8 years)</option>
                          <option className="bg-slate-900">Principal / Lead (8+ years)</option>
                        </select>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-400 mb-3 uppercase tracking-tight">Primary Tech Stack</label>
                      <div className="flex flex-wrap gap-4">
                        {techOptions.map((tech) => (
                          <button
                            key={tech.name}
                            onClick={() => toggleTechInOpening(idx, tech.name)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all group ${
                              opening.techStack.includes(tech.name)
                                ? 'bg-[#4245f0]/20 border-[#4245f0]/40'
                                : 'bg-white/5 border-white/10 hover:border-[#4245f0]/50'
                            }`}
                          >
                            <span className="text-lg">{tech.icon}</span>
                            <span className="text-sm font-medium">{tech.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Work Model */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-tight">Work Model</label>
                        <div className="grid grid-cols-2 gap-2">
                          {['Remote', 'Hybrid', 'Onsite'].map(m => (
                            <button 
                              key={m}
                              onClick={() => handleOpeningChange(idx, 'workModel', m)}
                              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                                opening.workModel === m
                                  ? 'bg-[#4245f0]/20 border border-[#4245f0]/40 text-[#4245f0]'
                                  : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10'
                              }`}
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Collaboration */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-tight">Collaboration</label>
                        <select 
                          value={opening.collaboration}
                          onChange={(e) => handleOpeningChange(idx, 'collaboration', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#4245f0] focus:border-transparent outline-none transition-all appearance-none"
                        >
                          <option className="bg-slate-900">Equity Only (Co-founder)</option>
                          <option className="bg-slate-900">Stipend + Equity</option>
                          <option className="bg-slate-900">Project Based</option>
                        </select>
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
              className="glass rounded-2xl p-8 space-y-8"
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-6">
                <HeartHandshake className="text-[#4245f0] size-8" />
                <h3 className="text-xl font-bold">Benefits & Perks</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {benefits.map((benefit) => {
                  const IconComponent = benefit.icon;
                  const isSelected = selectedBenefits.includes(benefit.id);
                  
                  return (
                    <label 
                      key={benefit.id}
                      onClick={() => toggleBenefit(benefit.id)}
                      className={`group relative flex flex-col p-5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#4245f0]/10 border-[#4245f0]/40'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <IconComponent className="text-[#4245f0] size-6" />
                        <input 
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-5 h-5 rounded-md border-white/20 bg-transparent text-[#4245f0] focus:ring-offset-slate-900"
                        />
                      </div>
                      <span className="text-base font-bold text-white">{benefit.title}</span>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{benefit.desc}</p>
                      {benefit.verified && (
                        <div className="absolute -top-2 -right-2 bg-slate-800 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          Verified Tier 1
                        </div>
                      )}
                    </label>
                  );
                })}
                
                {/* Custom Perk */}
                <label className="group relative flex flex-col p-5 rounded-2xl bg-white/5 border border-white/10 border-dashed border-[#4245f0]/20 cursor-pointer hover:bg-white/10 transition-all">
                  <div className="flex flex-col items-center justify-center h-full gap-2">
                    <PlusCircle className="size-6 text-slate-500" />
                    <span className="text-xs font-bold text-slate-500">Custom Perk</span>
                  </div>
                </label>
              </div>
            </motion.section>
          </div>

          {/* Right Column - Preview */}
          <aside className="w-full lg:w-[420px]">
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Real-time Preview</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-slate-400">Live Sync</span>
                </div>
              </div>

              {/* Preview Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="glass rounded-3xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border-white/20"
              >
                {/* Banner */}
                <div className="h-32 bg-gradient-to-br from-indigo-600 via-[#4245f0] to-purple-600 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-8 pb-8 mt-10">
                  <div className="w-20 h-20 rounded-2xl bg-slate-950 border-4 border-slate-950 shadow-2xl mb-6 overflow-hidden flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                    {formData.logo ? (
                      <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl font-bold text-white">
                        {formData.companyName ? formData.companyName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'TY'}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-1 mb-6">
                    <h4 className="text-2xl font-black text-white leading-tight">{formData.companyName || 'Your Company'}</h4>
                    <p className="text-sm text-slate-400 italic">"{formData.tagline || 'Innovation at scale'}"</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold text-slate-300">{formData.industry}</span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold text-slate-300">{formData.fundingStage}</span>
                    <span className="px-3 py-1 bg-[#4245f0]/20 border border-[#4245f0]/30 text-[#4245f0] rounded-lg text-[11px] font-bold">Hiring</span>
                  </div>

                  <div className="space-y-4">
                    {openings[0] && openings[0].role && (
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Top Opening</p>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-extrabold text-white">{openings[0].role}</p>
                            <div className="flex gap-2 mt-2">
                              {openings[0].techStack.slice(0, 3).map(tech => (
                                <span key={tech} className="text-[9px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono uppercase">{tech}</span>
                              ))}
                            </div>
                          </div>
                          <span className="text-[10px] bg-[#4245f0]/10 text-[#4245f0] px-2 py-1 rounded-full font-bold">{openings[0].workModel}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <button className="w-full mt-8 py-4 bg-white text-slate-950 text-sm font-black rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                    Explore Profile
                    <ArrowRight className="size-5" />
                  </button>
                </div>
              </motion.div>

              {/* Progress */}
              <div className="glass p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-3 text-slate-400">
                  <Verified className="size-5" />
                  <p className="text-xs font-medium">Your profile will be reviewed within 24 hours.</p>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-[#4245f0] shadow-[0_0_12px_rgba(66,69,240,0.5)]"></div>
                </div>
                <p className="text-[10px] text-slate-500 text-center font-bold uppercase tracking-widest">67% Profile Completeness</p>
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