import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { 
  Rocket,
  ImageUp,
  Plus,
  Trash2,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import companyService from '../services/companyService';
import authService from '../services/authService';
import { useUser } from "@clerk/clerk-react";
import { toast, Toaster } from 'react-hot-toast';

const AddCompany = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    tagline: '',
    industry: 'Artificial Intelligence',
    fundingStage: 'Stealth Mode',
    mission: '',
    logo: '',
    location: '',
    website: '',
    customBenefits: [],
    questions: []
  });

  const [newBenefit, setNewBenefit] = useState('');
  const [newQuestion, setNewQuestion] = useState('');

  const [openings, setOpenings] = useState([
    { role: '', experience: 'Junior (1-2 years)', techStack: [], workModel: 'Remote', collaboration: 'Equity Only (Co-founder)' }
  ]);

  const [selectedBenefits, setSelectedBenefits] = useState(['High Equity', 'L&D Budget']);

  const benefitsList = [
    { id: 'High Equity', title: 'High Equity', desc: 'Significant share allocation for early hires.' },
    { id: 'Async Culture', title: 'Async Culture', desc: 'Work on your own schedule from anywhere.' },
    { id: 'L&D Budget', title: 'L&D Budget', desc: 'Annual stipend for courses and books.' },
    { id: 'Premium Health', title: 'Premium Health', desc: 'Full medical coverage for you and family.' }
  ];

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleOpeningChange = (index, field, value) => {
    const updated = [...openings];
    updated[index][field] = value;
    setOpenings(updated);
  };

  const handleTechStackChange = (index, value) => {
      const parts = value.split(',').map(s => s.trim()).filter(Boolean);
      handleOpeningChange(index, 'techStack', parts);
  }

  const toggleBenefit = (benefitId) => {
    setSelectedBenefits(prev => 
      prev.includes(benefitId) ? prev.filter(id => id !== benefitId) : [...prev, benefitId]
    );
  };

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setFormData(prev => ({ ...prev, questions: [...prev.questions, newQuestion.trim()] }));
      setNewQuestion('');
    }
  };

  const removeQuestion = (index) => {
    setFormData(prev => ({ ...prev, questions: prev.questions.filter((_, i) => i !== index) }));
  };

  const addOpening = () => setOpenings([...openings, { role: '', experience: 'Junior (1-2 years)', techStack: [], workModel: 'Remote', collaboration: 'Equity Only (Co-founder)' }]);
  
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) return toast.error("File is too large (max 5MB)");
      const reader = new FileReader();
      reader.onloadend = () => handleInputChange('logo', reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.companyName || !formData.industry) return toast.error("Please fill in company name & industry");
    setLoading(true);
    try {
      const dataToSubmit = {
        name: formData.companyName,
        tagline: formData.tagline,
        description: formData.mission,
        industry: formData.industry,
        fundingStage: formData.fundingStage,
        logo: formData.logo,
        benefits: [...selectedBenefits, ...formData.customBenefits],
        openings: openings.map(o => ({ ...o })),
        questions: formData.questions,
        location: formData.location || 'Remote',
        website: formData.website
      };
      await companyService.createCompany(dataToSubmit);
      toast.success("Profile Published Successfully!");
      setTimeout(() => navigate('/my-startups'), 1000);
    } catch (err) {
      toast.error("Failed to publish. Are you logged in?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] font-sans pb-32">
      <SEO title="Create Company Profile" description="Showcase your startup." />
      <Toaster position="top-center" />

      {/* Top Navbar */}
      <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
                  <div className="bg-[#ff5a00] p-1.5 rounded-sm">
                      <Rocket className="size-4 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="font-extrabold text-[15px] tracking-tight text-gray-900">Startup Hub</span>
              </div>
              <div className="flex items-center gap-6 text-[13px] font-bold">
                  <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-900 transition-colors">Cancel</button>
                  <button 
                      onClick={handleSubmit} 
                      disabled={loading}
                      className="px-6 py-2 bg-[#ff5a00] hover:bg-[#e04e00] text-white rounded-sm shadow-sm transition-colors disabled:opacity-50"
                  >
                      {loading ? 'Publishing...' : 'Publish Profile'}
                  </button>
              </div>
          </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-12">
          
          <header className="mb-12">
              <h1 className="text-[32px] font-black text-gray-900 tracking-tight mb-2">Create Your Company Profile</h1>
              <p className="text-[14px] text-gray-500 font-medium">Fill out the information below to showcase your startup to potential co-founders and collaborators.</p>
          </header>

          <div className="space-y-12">
              {/* Section 1: Company Identity */}
              <section>
                  <h2 className="text-[15px] font-black text-gray-900 mb-6 pb-2 border-b border-gray-200">Company Identity</h2>
                  
                  <div className="space-y-6">
                      {/* Logo Upload */}
                      <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Company Logo</label>
                          <div 
                              onClick={() => fileInputRef.current?.click()}
                              className="w-full bg-white border border-dashed border-gray-300 rounded-sm p-12 flex flex-col items-center justify-center cursor-pointer hover:border-[#ff5a00] hover:bg-orange-50/10 transition-colors"
                          >
                              {formData.logo ? (
                                  <img src={formData.logo} alt="Preview" className="h-20 object-contain" />
                              ) : (
                                  <>
                                      <ImageUp className="size-6 text-gray-400 mb-2" strokeWidth={2} />
                                      <h4 className="text-[13px] font-bold text-gray-900">Upload brand logo</h4>
                                      <p className="text-[10px] text-gray-400 uppercase font-black uppercase tracking-widest mt-1">SVG, PNG OR WEBP (MAX 5MB)</p>
                                  </>
                              )}
                              <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Company Name</label>
                              <input 
                                  value={formData.companyName} onChange={e => handleInputChange('companyName', e.target.value)}
                                  className="w-full bg-white border border-gray-200 rounded-sm px-4 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors placeholder:text-gray-400"
                                  placeholder="e.g. Nexa Dynamics"
                              />
                          </div>
                          <div>
                              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Tagline</label>
                              <input 
                                  value={formData.tagline} onChange={e => handleInputChange('tagline', e.target.value)}
                                  className="w-full bg-white border border-gray-200 rounded-sm px-4 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors placeholder:text-gray-400"
                                  placeholder="Short description of your startup"
                              />
                          </div>
                          <div>
                              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Primary Industry</label>
                              <select 
                                  value={formData.industry} onChange={e => handleInputChange('industry', e.target.value)}
                                  className="w-full bg-white border border-gray-200 rounded-sm px-4 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors appearance-none"
                              >
                                  <option>Artificial Intelligence</option>
                                  <option>Blockchain / Web3</option>
                                  <option>Enterprise SaaS</option>
                                  <option>Consumer Tech</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Funding Stage</label>
                              <select 
                                  value={formData.fundingStage} onChange={e => handleInputChange('fundingStage', e.target.value)}
                                  className="w-full bg-white border border-gray-200 rounded-sm px-4 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors appearance-none"
                              >
                                  <option>Stealth Mode</option>
                                  <option>Pre-seed / Bootstrapped</option>
                                  <option>Seed</option>
                                  <option>Series A</option>
                              </select>
                          </div>
                      </div>

                      <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Mission Statement</label>
                          <textarea 
                              value={formData.mission} onChange={e => handleInputChange('mission', e.target.value)}
                              className="w-full bg-white border border-gray-200 rounded-sm px-4 py-3 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors placeholder:text-gray-400 resize-none"
                              rows="4"
                              placeholder="Describe the problem you are solving..."
                          ></textarea>
                      </div>
                  </div>
              </section>

              {/* Section 2: Open Positions */}
              <section>
                  <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200">
                      <h2 className="text-[15px] font-black text-gray-900">Open Positions</h2>
                      <button onClick={addOpening} className="text-[11px] font-bold text-[#ff5a00] hover:underline flex items-center gap-1">
                          <Plus className="size-3" strokeWidth={3} /> Add Role
                      </button>
                  </div>

                  <div className="space-y-4">
                      {openings.map((opening, idx) => (
                          <div key={idx} className="bg-white border border-gray-200 p-6 rounded-sm relative">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Role Title</label>
                                      <input 
                                          value={opening.role} onChange={e => handleOpeningChange(idx, 'role', e.target.value)}
                                          className="w-full bg-white border border-gray-200 rounded-sm px-4 py-2 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors placeholder:text-gray-400"
                                          placeholder="e.g. Senior Backend Engineer"
                                      />
                                  </div>
                                  <div>
                                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Experience Level</label>
                                      <select 
                                          value={opening.experience} onChange={e => handleOpeningChange(idx, 'experience', e.target.value)}
                                          className="w-full bg-white border border-gray-200 rounded-sm px-4 py-2 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors appearance-none"
                                      >
                                          <option>Entry (0-1 years)</option>
                                          <option>Junior (1-2 years)</option>
                                          <option>Mid (3-5 years)</option>
                                          <option>Senior (5+ years)</option>
                                          <option>Lead / Director</option>
                                      </select>
                                  </div>
                                  <div>
                                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Primary Tech Stack</label>
                                      <div className="flex gap-2">
                                          <input 
                                              onChange={e => handleTechStackChange(idx, e.target.value)}
                                              className="flex-1 bg-white border border-gray-200 rounded-sm px-4 py-2 text-[13px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors"
                                              placeholder="e.g. React, Python"
                                          />
                                      </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                      <div>
                                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Work Model</label>
                                          <div className="flex rounded-sm overflow-hidden border border-gray-200">
                                              <button 
                                                  onClick={() => handleOpeningChange(idx, 'workModel', 'Remote')}
                                                  className={`flex-1 py-2 text-[11px] font-bold transition-colors ${opening.workModel === 'Remote' ? 'bg-[#ff5a00] text-white' : 'bg-white text-gray-600'}`}
                                              >
                                                  Remote
                                              </button>
                                              <button 
                                                  onClick={() => handleOpeningChange(idx, 'workModel', 'Hybrid')}
                                                  className={`flex-1 py-2 text-[11px] font-bold transition-colors border-l border-gray-200 ${opening.workModel === 'Hybrid' ? 'bg-[#ff5a00] text-white' : 'bg-white text-gray-600'}`}
                                              >
                                                  Hybrid
                                              </button>
                                          </div>
                                      </div>
                                      <div>
                                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Collaboration Type</label>
                                          <select 
                                              value={opening.collaboration} onChange={e => handleOpeningChange(idx, 'collaboration', e.target.value)}
                                              className="w-full bg-white border border-gray-200 rounded-sm px-3 py-2 text-[11px] text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors appearance-none"
                                          >
                                              <option>Equity Only (Co-founder)</option>
                                              <option>Salary + Equity</option>
                                              <option>Contract</option>
                                          </select>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </section>

              {/* Section 3: Benefits & Perks */}
              <section>
                  <h2 className="text-[15px] font-black text-gray-900 mb-6 pb-2 border-b border-gray-200">Benefits & Perks</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {benefitsList.map(benefit => {
                          const isSelected = selectedBenefits.includes(benefit.id);
                          return (
                              <div 
                                  key={benefit.id} 
                                  onClick={() => toggleBenefit(benefit.id)}
                                  className="bg-white border border-gray-200 p-5 rounded-sm flex flex-col cursor-pointer transition-colors hover:border-[#ff5a00]"
                              >
                                  <div className="flex gap-3">
                                      <div className={`mt-0.5 min-w-[16px] w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${isSelected ? 'bg-[#ff5a00] border-[#ff5a00]' : 'border-gray-300'}`}>
                                          {isSelected && <Check className="size-3 text-white" strokeWidth={3} />}
                                      </div>
                                      <div>
                                          <h4 className="text-[13px] font-bold text-gray-900 mb-1 leading-none">{benefit.title}</h4>
                                          <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{benefit.desc}</p>
                                      </div>
                                  </div>
                              </div>
                          )
                      })}
                      
                      <div className="bg-white border border-dashed border-gray-300 p-5 rounded-sm flex flex-col items-center justify-center cursor-pointer hover:border-[#ff5a00] transition-colors min-h-[90px]">
                          <Plus className="size-4 text-gray-400 mb-1" strokeWidth={3} />
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Custom Perk</span>
                      </div>
                  </div>
              </section>

              {/* Section 4: Custom Application Questions */}
              <section>
                  <h2 className="text-[15px] font-black text-gray-900 mb-6 pb-2 border-b border-gray-200">Custom Application Questions</h2>
                  <p className="text-[12px] text-gray-500 font-medium mb-6">Add specific questions you want applicants to answer. This helps you filter for the right talent faster.</p>
                  
                  <div className="space-y-4 mb-6">
                      {formData.questions.map((q, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-white border border-gray-200 p-4 rounded-sm group">
                              <span className="text-[13px] font-bold text-gray-400 w-6">0{idx + 1}</span>
                              <p className="flex-1 text-[13px] font-medium text-gray-900">{q}</p>
                              <button 
                                  onClick={() => removeQuestion(idx)}
                                  className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                              >
                                  <Trash2 className="size-4" strokeWidth={2.5} />
                              </button>
                          </div>
                      ))}
                      
                      {formData.questions.length === 0 && (
                          <div className="text-center py-10 bg-white border border-dashed border-gray-200 rounded-sm">
                              <p className="text-[13px] text-gray-400 font-medium italic">No custom questions added yet.</p>
                          </div>
                      )}
                  </div>

                  <div className="flex gap-2">
                      <input 
                          value={newQuestion}
                          onChange={(e) => setNewQuestion(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addQuestion()}
                          placeholder="e.g. What is your experience with distributed systems?"
                          className="flex-1 bg-white border border-gray-200 rounded-sm px-4 py-2.5 text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#ff5a00] focus:border-[#ff5a00] transition-all placeholder:text-gray-400"
                      />
                      <button 
                          onClick={addQuestion}
                          disabled={!newQuestion.trim()}
                          className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold text-[13px] rounded-sm transition-colors disabled:opacity-50"
                      >
                          Add Question
                      </button>
                  </div>
              </section>

              {/* Section 4: Live Preview */}
              <section className="pt-8">
                  <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
                      <h2 className="text-[12px] font-black uppercase tracking-widest text-gray-400">Live Preview</h2>
                      <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Updates Live</span>
                      </div>
                  </div>

                  <div className="bg-white border text-left border-gray-200 shadow-sm flex flex-col relative">
                      <div className="h-1.5 w-full bg-[#ff5a00] absolute top-0 left-0"></div>
                      <div className="p-8 pb-6 flex flex-col">
                          <div className="flex gap-4 items-start mb-6">
                              <div className="w-14 h-14 bg-gray-900 rounded-sm flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden">
                                  {formData.logo ? (
                                      <img src={formData.logo} alt="Preview" className="w-full h-full object-cover" />
                                  ) : (
                                      <span className="text-white font-black text-xl">
                                          {formData.companyName ? formData.companyName.charAt(0).toUpperCase() : 'A'}
                                      </span>
                                  )}
                              </div>
                              <div className="pt-0.5">
                                  <div className="flex items-center gap-2 mb-1">
                                      <h3 className="text-[20px] font-black text-gray-900 leading-none">{formData.companyName || 'Nexa Dynamics'}</h3>
                                      <span className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 text-gray-500 text-[9px] font-black uppercase tracking-widest rounded-sm">
                                          {formData.fundingStage === 'Stealth Mode' ? 'SEED' : formData.fundingStage.toUpperCase()}
                                      </span>
                                  </div>
                                  <p className="text-[13px] text-gray-500 font-medium italic">"{formData.tagline || 'The future of decentralized compute'}"</p>
                              </div>
                          </div>

                          <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-2">
                              <div>
                                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Featured Opening</p>
                                  <h4 className="text-[14px] font-bold text-gray-900">{openings[0]?.role || 'Backend Lead'}</h4>
                                  <div className="flex gap-2 mt-2">
                                      <span className="text-[#ff5a00] text-[9px] font-bold uppercase tracking-wider">PYTHON</span>
                                      <span className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">REDIS</span>
                                  </div>
                              </div>
                              <div className="flex flex-col items-end gap-3">
                                  <span className="px-2 py-1 border border-gray-200 text-gray-400 text-[9px] font-black uppercase tracking-widest rounded-sm">
                                      {openings[0]?.workModel || 'REMOTE'}
                                  </span>
                                  <button disabled className="px-6 py-2.5 bg-[#ff5a00] text-white text-[11px] font-bold rounded-sm shadow-sm opacity-90">
                                      View Full Profile
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/* Progress & Submit */}
              <div className="pt-12 pb-24 border-t border-gray-200 mt-12 flex flex-col items-center">
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-3">67% Profile Completeness</p>
                  <div className="w-1/2 h-1 bg-gray-200 rounded-full mb-3 overflow-hidden">
                      <div className="h-full w-2/3 bg-[#ff5a00]"></div>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium">Your profile will be reviewed by our team before publishing.</p>
                  
                  <div className="w-full flex justify-end gap-4 mt-12">
                      <button className="px-6 py-2.5 bg-[#F8F7F4] border border-gray-200 hover:bg-white text-gray-600 font-bold text-[13px] rounded-sm transition-colors">
                          Save Draft
                      </button>
                      <button 
                          onClick={handleSubmit} 
                          disabled={loading}
                          className="px-6 py-2.5 bg-[#ff5a00] hover:bg-[#e04e00] text-white font-bold text-[13px] rounded-sm transition-colors shadow-sm disabled:opacity-50"
                      >
                          {loading ? 'Publishing...' : 'Publish to Startup Hub'}
                      </button>
                  </div>
              </div>

          </div>
      </div>
    </div>
  );
};

export default AddCompany;