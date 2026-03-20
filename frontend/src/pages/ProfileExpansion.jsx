import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import authService from '../services/authService';
import { 
  MapPin,
  ChevronLeft,
  Loader2,
  Box,
  ShieldAlert,
  Search
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

const ProfileExpansion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const candidateId = queryParams.get('id');

  const formatCandidate = (user) => ({
      id: user._id || user.id,
      name: user.name,
      role: user.role || 'Member',
      title: user.motto || 'UX Engineer',
      experience: user.experience || 'N/A',
      location: user.country || 'San Francisco, CA',
      image: user.profilePicture || `https://ui-avatars.com/api/?name=${user.name}&background=random`,
      status: 'Open to collaborate',
      matchScore: 85,
      badge: user.role ? user.role.toUpperCase() : 'FOUNDER',
      quote: user.motto || 'Building decentralized futures.',
      skills: user.skills ? (typeof user.skills[0] === 'string' ? user.skills.map(s => ({ name: s })) : user.skills) : [{name:'React.js'},{name:'Product Strategy'},{name:'Solidity'},{name:'UI/UX Design'},{name:'Rust'}],
      about: [
         user.achievements || "A detailed personal introduction focusing on building scalable systems and guiding startup teams. Dedicated to bridging the gap between high-level product strategy and technical execution.",
         "Currently focused on developing open-source tooling for collaboration protocols. Looking for passionate designers and frontend architects to join the core team."
      ],
      experienceList: [
          {
              title: user.role || 'Principal Architect • BlockTech',
              period: '2021 — PRESENT',
              description: user.achievements || 'Led the development of a layer-2 scaling solution used by 50k+ daily users.',
              active: true
          },
          {
              title: 'Lead Designer • CreativeX',
              period: '2018 — 2021',
              description: 'Designed enterprise design systems for Fortune 500 startups.',
              active: false
          }
      ],
      links: [
          { name: 'Github', url: user.github || 'github.com/arivera-dev' },
          { name: 'LinkedIn', url: user.linkedin || 'linkedin.com/in/alexrivera' },
          { name: 'Personal', url: user.portfolio || 'alexrivera.io' },
          { name: 'Whitepapers', url: 'Medium / Substack' }
      ]
  });

  const [candidate, setCandidate] = useState(() => {
     if (location.state?.candidate) return formatCandidate(location.state.candidate);
     return null;
  });
  const [loading, setLoading] = useState(!candidate && !!candidateId);

  useEffect(() => {
    const fetchCandidate = async () => {
        if (!candidateId || candidate) return;
        
        try {
            setLoading(true);
            const user = await authService.getUserById(candidateId);
            if (user) {
                setCandidate(formatCandidate(user));
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
        <div className="flex items-center justify-center min-h-screen bg-[#F8F7F4]">
            <Loader2 className="animate-spin size-10 text-[#ff5a00]" />
        </div>
    );
  }

  if (!candidate) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F8F7F4] text-gray-900">
            <div className="text-center">
                <h2 className="text-2xl font-black mb-2">No candidate data found</h2>
                <p className="text-gray-500 mb-6 font-medium">Please select a candidate from the main directory.</p>
                <button 
                    onClick={() => navigate('/found-talent')}
                    className="px-6 py-3 bg-[#ff5a00] text-white rounded-sm hover:bg-[#e04e00] transition-colors font-bold shadow-sm"
                >
                    Back to Directory
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] font-sans pb-20 w-full overflow-y-auto">
      <SEO 
        title={`${candidate?.name || 'Talent Profile'} | StartupCollab`}
        description={candidate?.quote || "View professional profile."}
      />
      <Toaster position="top-center" reverseOrder={false} />

      {/* Main Page Container */}
      <div className="w-full max-w-[1100px] mx-auto pt-8 px-4 md:px-8">
          
          <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-[13px] font-bold text-gray-400 hover:text-gray-900 mb-6 transition-colors"
          >
              <ChevronLeft className="size-4" strokeWidth={3} /> Back
          </button>

          {/* White Card Wrapper */}
          <div className="bg-white border border-gray-200 shadow-sm w-full relative">
              
              {/* Fake StartupCollab Orange Top Navbar inside the card to match the mock exactly */}
              <div className="bg-[#ff5a00] w-full flex flex-col md:flex-row items-center justify-between px-6 py-3 text-white">
                  <div className="flex items-center gap-4">
                      {/* Logo Area */}
                      <div className="flex items-center gap-2">
                          <div className="bg-white p-1 rounded-sm">
                              <Box className="size-5 text-[#ff5a00]" strokeWidth={3} />
                          </div>
                          <span className="font-extrabold text-[17px] tracking-tight">StartupCollab</span>
                      </div>
                      <div className="hidden md:flex items-center gap-3 text-[13px] font-bold text-white/80">
                          <span className="text-white/40">|</span>
                          <a href="#" className="hover:text-white transition-colors">explore</a>
                          <span className="text-white/40">|</span>
                          <a href="#" className="hover:text-white transition-colors">network</a>
                          <span className="text-white/40">|</span>
                          <a href="#" className="hover:text-white transition-colors">projects</a>
                          <span className="text-white/40">|</span>
                          <a href="#" className="hover:text-white transition-colors">messages</a>
                      </div>
                  </div>
                  
                  <div className="hidden md:flex items-center gap-4">
                      <div className="relative">
                          Search
                          <input 
                              type="text" 
                              placeholder="search" 
                              className="bg-white/20 border-none outline-none text-white placeholder:text-white/60 text-[12px] px-3 py-1.5 rounded-sm w-48 font-medium"
                          />
                      </div>
                      <div className="flex items-center gap-3 text-[13px] font-bold">
                          <span>{candidate.name.toLowerCase().replace(' ', '_')}</span>
                          <a href="#" className="text-black/60 hover:text-black transition-colors">logout</a>
                      </div>
                  </div>
              </div>

              {/* Profile Hero Section */}
              <div className="p-8 pb-10 flex flex-col md:flex-row items-start gap-6 border-b border-gray-100">
                  <img 
                      src={candidate.image} 
                      alt={candidate.name} 
                      className="w-32 h-32 md:w-40 md:h-40 object-cover border border-gray-200"
                  />
                  <div className="flex-1 pt-1">
                      <div className="flex items-center gap-3 mb-2">
                          <h1 className="text-[28px] font-black text-gray-900 leading-none">{candidate.name}</h1>
                          <span className="px-2 py-0.5 border border-[#ff5a00] text-[#ff5a00] text-[10px] font-black uppercase tracking-widest rounded-sm">
                              {candidate.badge}
                          </span>
                      </div>
                      <h2 className="text-[17px] text-gray-700 font-medium mb-3 tracking-tight">
                          {candidate.quote} | {candidate.title}
                      </h2>
                      <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500 mb-6">
                          <MapPin className="size-4" />
                          {candidate.location} 
                          <span className="mx-1">•</span>
                          <span className="text-emerald-600">{candidate.status}</span>
                      </div>
                      <div className="flex items-center gap-3">
                          <button 
                              onClick={() => toast.success("Edit profile opened")}
                              className="px-6 py-2 bg-[#ff5a00] hover:bg-[#e04e00] text-white text-[12px] font-bold rounded-sm shadow-sm transition-colors uppercase tracking-wider"
                          >
                              edit profile
                          </button>
                          <button 
                              onClick={() => toast.success("Profile link copied")}
                              className="px-6 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-[12px] font-bold rounded-sm shadow-sm transition-colors uppercase tracking-wider"
                          >
                              share
                          </button>
                      </div>
                  </div>
              </div>

              {/* Two Column Layout Grid */}
              <div className="flex flex-col lg:flex-row">
                  
                  {/* Left Column (Main Content) */}
                  <div className="flex-1 p-8 lg:pr-12 border-b lg:border-b-0 lg:border-r border-gray-100">
                      
                      {/* About */}
                      <section className="mb-12">
                          <h3 className="text-[12px] font-black uppercase tracking-widest text-gray-900 border-t border-b border-gray-100 py-3 mb-6">
                              About
                          </h3>
                          <div className="space-y-4 text-[14px] leading-relaxed text-gray-700 font-medium">
                              {candidate.about && candidate.about.map((paragraph, idx) => (
                                  <p key={idx}>{paragraph}</p>
                              ))}
                          </div>
                      </section>

                      {/* Experience */}
                      <section className="mb-12">
                          <h3 className="text-[12px] font-black uppercase tracking-widest text-gray-900 border-t border-b border-gray-100 py-3 mb-6">
                              Experience
                          </h3>
                          <div className="space-y-6 pl-1">
                              {candidate.experienceList && candidate.experienceList.map((exp, idx) => (
                                  <div key={idx} className={`pl-4 border-l-[3px] py-1 ${exp.active ? 'border-[#ff5a00]' : 'border-gray-200'}`}>
                                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                                          {exp.period}
                                      </div>
                                      <h4 className="text-[14px] font-black text-gray-900 mb-1.5">{exp.title}</h4>
                                      <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                                          {exp.description}
                                      </p>
                                  </div>
                              ))}
                          </div>
                      </section>

                      {/* Links */}
                      <section>
                          <h3 className="text-[12px] font-black uppercase tracking-widest text-gray-900 border-t border-b border-gray-100 py-3 mb-6">
                              Links
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
                              {candidate.links && candidate.links.map((link, idx) => (
                                  <div key={`${link.name}-${idx}`} className="flex items-start gap-2 text-[13px]">
                                      <span className="font-bold text-[#ff5a00] min-w-[80px]">{link.name}:</span>
                                      <a href={link.url.startsWith('http') ? link.url : `https://${link.url}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 font-medium hover:text-gray-900 truncate">
                                          {link.url}
                                      </a>
                                  </div>
                              ))}
                          </div>
                      </section>

                  </div>

                  {/* Right Column (Sidebar Widgets) */}
                  <div className="w-full lg:w-[35%] p-8">
                      
                      {/* Company Activity */}
                      <section className="mb-12">
                          <h3 className="text-[12px] font-black uppercase tracking-widest text-gray-900 border-b border-gray-100 py-3 mb-4">
                              Company Activity
                          </h3>
                          <div className="flex items-center gap-4 border-b border-gray-100 mb-6 pb-2 text-[10px] font-black uppercase tracking-widest">
                              <span className="text-gray-900 border-b-2 border-gray-900 pb-2 -mb-[10px]">My Ventures</span>
                              <span className="text-gray-400">Applied To</span>
                          </div>
                          
                          <div className="space-y-6">
                              <div className="flex items-start justify-between group">
                                  <div className="flex gap-3">
                                      <div className="w-8 h-8 rounded-sm bg-blue-50 flex items-center justify-center shrink-0">
                                          <Box className="size-4 text-blue-500 fill-blue-500" />
                                      </div>
                                      <div>
                                          <h4 className="text-[13px] font-black text-gray-900">Project Nexus</h4>
                                          <p className="text-[11px] font-medium text-gray-400">Decentralized ERP Systems</p>
                                      </div>
                                  </div>
                                  <button className="text-[11px] font-bold text-[#ff5a00] hover:underline">
                                      manage
                                  </button>
                              </div>

                              <div className="flex items-start justify-between group">
                                  <div className="flex gap-3">
                                      <div className="w-8 h-8 rounded-sm bg-orange-50 flex items-center justify-center shrink-0">
                                          <ShieldAlert className="size-4 text-[#ff5a00] fill-[#ff5a00]" />
                                      </div>
                                      <div>
                                          <h4 className="text-[13px] font-black text-gray-900">SafeGuard AI</h4>
                                          <p className="text-[11px] font-medium text-gray-400">Governance Security Tools</p>
                                      </div>
                                  </div>
                                  <button className="text-[11px] font-bold text-[#ff5a00] hover:underline">
                                      manage
                                  </button>
                              </div>
                          </div>
                      </section>

                      {/* Skills */}
                      <section className="mb-12">
                          <h3 className="text-[12px] font-black uppercase tracking-widest text-gray-900 border-b border-gray-100 py-3 mb-6">
                              Skills
                          </h3>
                          <p className="text-[13px] font-bold leading-relaxed">
                              {candidate.skills.map((skill, index) => {
                                  // Replicate the fading color effect from the image
                                  let colorClass = "text-gray-800";
                                  if (index > 2 && index <= 4) colorClass = "text-gray-500";
                                  if (index > 4) colorClass = "text-gray-400";
                                  
                                  return (
                                      <span key={index} className={`${colorClass}`}>
                                          {skill.name}{index < candidate.skills.length - 1 ? ', ' : ''}
                                      </span>
                                  );
                              })}
                          </p>
                      </section>

                      {/* Stats */}
                      <section>
                          <h3 className="text-[12px] font-black uppercase tracking-widest text-gray-900 border-b border-gray-100 py-3 mb-6">
                              Stats
                          </h3>
                          <div className="flex items-center gap-10">
                              <div>
                                  <div className="text-[24px] font-black text-gray-900 mb-1">42</div>
                                  <div className="text-[9px] font-black uppercase tracking-widest text-gray-500">Collaborations</div>
                              </div>
                              <div>
                                  <div className="text-[24px] font-black text-gray-900 mb-1">1.2k</div>
                                  <div className="text-[9px] font-black uppercase tracking-widest text-gray-500">Profile Views</div>
                              </div>
                          </div>
                      </section>

                  </div>
              </div>

              {/* Bottom Thick Orange Border */}
              <div className="h-1.5 w-full bg-[#ff5a00]"></div>
          </div>

          {/* Footer Below Card */}
          <footer className="mt-8 mb-16 text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider space-y-4">
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                  <a href="#" className="hover:text-gray-900 transition-colors">Guidelines</a>
                  <a href="#" className="hover:text-gray-900 transition-colors">FAQ</a>
                  <a href="#" className="hover:text-gray-900 transition-colors">Lists</a>
                  <a href="#" className="hover:text-gray-900 transition-colors">API</a>
                  <a href="#" className="hover:text-gray-900 transition-colors">Security</a>
                  <a href="#" className="hover:text-gray-900 transition-colors">Legal</a>
                  <a href="#" className="hover:text-gray-900 transition-colors">Apply to YC</a>
                  <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
              </div>
              <p>StartupCollab © 2024</p>
          </footer>

      </div>
    </div>
  );
};

export default ProfileExpansion;
