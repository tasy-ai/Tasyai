import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { 
  MapPin,
  Loader2,
  Box,
  ShieldAlert,
  Search,
  ChevronLeft,
  Share2,
  Edit3
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import companyService from '../services/companyService';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const data = await authService.getProfile();
        const myCompanies = await companyService.getMyCompanies();

        const mappedUser = {
            id: data._id,
            name: data.name || "User",
            role: data.role || "Member",
            motto: data.motto || "No headline yet",
            location: data.country || "Location not set",
            email: data.email || "",
            image: data.profilePicture || `https://ui-avatars.com/api/?name=${data.name || 'User'}&background=random`, 
            achievements: data.achievements || "Professional details not yet added to bio.",
            status: 'Open to collaborate',
            matchScore: 100,
            badge: data.role ? data.role.toUpperCase() : 'FOUNDER',
            skills: data.skills ? data.skills.map(s => ({ name: s })) : [],
            ventures: myCompanies.map(c => ({
                id: c._id,
                name: c.name,
                tagline: c.tagline,
                logoUrl: c.logoUrl
            })),
            links: [
                { name: 'LinkedIn', url: data.linkedin },
                { name: 'GitHub', url: data.github },
                { name: 'Portfolio', url: data.portfolio }
            ].filter(l => l.url)
        };
        setUser(mappedUser);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex bg-[#F8F7F4] min-h-screen items-center justify-center">
          <Loader2 className="size-10 text-[#ff5a00] animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F8F7F4] text-gray-900">
            <div className="text-center">
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Profile Not Found</h3>
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="px-8 py-3 bg-[#ff5a00] text-white rounded-sm font-bold hover:bg-[#e04e00] transition-all shadow-sm"
                >
                    Return to Ecosystem
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] font-sans pb-20 w-full overflow-y-auto">
      <SEO 
        title={`${user?.name || 'My Profile'} | StartupCollab`}
        description={user?.motto || "View professional profile."}
      />
      <Toaster position="top-center" reverseOrder={false} />

      {/* Main Page Container */}
      <div className="w-full max-w-[1100px] mx-auto pt-8 px-4 md:px-8">
          
          <div className="flex items-center justify-between mb-6">
              <button 
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-1.5 text-[13px] font-bold text-gray-400 hover:text-gray-900 transition-colors"
              >
                  <ChevronLeft className="size-4" strokeWidth={3} /> Back
              </button>
              <Link 
                  to="/settings"
                  className="flex items-center gap-1.5 text-[13px] font-bold text-[#ff5a00] hover:text-[#e04e00] transition-colors"
              >
                  <Edit3 className="size-4" /> Edit Profile
              </Link>
          </div>

          {/* White Card Wrapper */}
          <div className="bg-white border border-gray-200 shadow-sm w-full relative">
              


              {/* Profile Hero Section */}
              <div className="p-8 pb-10 flex flex-col md:flex-row items-start gap-6 border-b border-gray-100">
                  <div className="relative group shrink-0">
                      <img 
                          src={user.image} 
                          alt={user.name} 
                          className="w-32 h-32 md:w-40 md:h-40 object-cover border border-gray-200"
                      />
                  </div>
                  <div className="flex-1 pt-1">
                      <div className="flex items-center gap-3 mb-2">
                          <h1 className="text-[28px] font-black text-gray-900 leading-none">{user.name}</h1>
                          <span className="px-2 py-0.5 border border-[#ff5a00] text-[#ff5a00] text-[10px] font-black uppercase tracking-widest rounded-sm">
                              {user.badge}
                          </span>
                      </div>
                      <h2 className="text-[17px] text-gray-700 font-medium mb-3 tracking-tight">
                          {user.motto}
                      </h2>
                      <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500 mb-6">
                          <MapPin className="size-4" />
                          {user.location} 
                          <span className="mx-1">•</span>
                          <span className="text-emerald-600 font-black uppercase text-[10px] tracking-widest">{user.status}</span>
                      </div>
                      <div className="flex items-center gap-3">
                          <Link 
                              to="/settings"
                              className="px-6 py-2 bg-[#ff5a00] hover:bg-[#e04e00] text-white text-[12px] font-bold rounded-sm shadow-sm transition-colors uppercase tracking-wider"
                          >
                              edit profile
                          </Link>
                          <button 
                              onClick={() => {
                                  navigator.clipboard.writeText(window.location.href);
                                  toast.success("Profile link copied!");
                              }}
                              className="px-6 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-[12px] font-bold rounded-sm shadow-sm transition-colors uppercase tracking-wider flex items-center gap-2"
                          >
                              <Share2 className="size-3.5" /> share
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
                              {user.achievements.split('\n').map((paragraph, idx) => (
                                  <p key={idx}>{paragraph}</p>
                              ))}
                          </div>
                      </section>

                      {/* Professional Role */}
                      <section className="mb-12">
                          <h3 className="text-[12px] font-black uppercase tracking-widest text-gray-900 border-t border-b border-gray-100 py-3 mb-6">
                              Experience
                          </h3>
                          <div className="space-y-6 pl-1">
                              <div className="pl-4 border-l-[3px] py-1 border-[#ff5a00]">
                                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                                      CURRENT ROLE
                                  </div>
                                  <h4 className="text-[14px] font-black text-gray-900 mb-1.5">{user.role}</h4>
                                  <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                                      Managing ventures and collaborating on the StartupCollab ecosystem.
                                  </p>
                              </div>
                          </div>
                      </section>

                      {/* Links */}
                      <section>
                          <h3 className="text-[12px] font-black uppercase tracking-widest text-gray-900 border-t border-b border-gray-100 py-3 mb-6">
                              Links
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
                              {user.links.length > 0 ? user.links.map((link, idx) => (
                                  <div key={idx} className="flex items-start gap-2 text-[13px]">
                                      <span className="font-bold text-[#ff5a00] min-w-[80px]">{link.name}:</span>
                                      <a href={link.url.startsWith('http') ? link.url : `https://${link.url}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 font-medium hover:text-gray-900 truncate">
                                          {link.url}
                                      </a>
                                  </div>
                              )) : (
                                  <p className="text-[13px] text-gray-400 font-medium italic">No links added</p>
                              )}
                          </div>
                      </section>

                  </div>

                  {/* Right Column (Sidebar Widgets) */}
                  <div className="w-full lg:w-[35%] p-8">
                      
                      {/* My Ventures Section */}
                      <section className="mb-12">
                          <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-4">
                              <h3 className="text-[12px] font-black uppercase tracking-widest text-gray-900">
                                  My Ventures
                              </h3>
                              <Link to="/add-company" className="text-[10px] font-black text-[#ff5a00] hover:underline uppercase tracking-widest">
                                  Launch
                              </Link>
                          </div>
                          
                          <div className="space-y-6">
                              {user.ventures && user.ventures.length > 0 ? user.ventures.map((venture) => (
                                  <div key={venture.id} className="flex items-start justify-between group">
                                      <div className="flex gap-3">
                                          <div className="w-8 h-8 rounded-sm bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                                              {venture.logoUrl ? (
                                                  <img src={venture.logoUrl} className="w-full h-full object-cover p-1" alt={venture.name} />
                                              ) : (
                                                  <Box className="size-4 text-[#ff5a00]" />
                                              )}
                                          </div>
                                          <div>
                                              <Link to={`/company-detail?id=${venture.id}`} className="text-[13px] font-black text-gray-900 hover:text-[#ff5a00] transition-colors">{venture.name}</Link>
                                              <p className="text-[11px] font-medium text-gray-400 line-clamp-1">{venture.tagline}</p>
                                          </div>
                                      </div>
                                  </div>
                              )) : (
                                  <div className="py-6 text-center border border-dashed border-gray-100 rounded-sm">
                                      <p className="text-[11px] font-medium text-gray-400">No active ventures</p>
                                      <Link to="/add-company" className="text-[11px] font-black text-[#ff5a00] hover:underline uppercase tracking-widest mt-2 block">Create One</Link>
                                  </div>
                              )}
                          </div>
                      </section>

                      {/* Skills */}
                      <section className="mb-12">
                          <h3 className="text-[12px] font-black uppercase tracking-widest text-gray-900 border-b border-gray-100 py-3 mb-6">
                              Skills
                          </h3>
                          <div className="flex flex-wrap gap-x-2 gap-y-1">
                              {user.skills.length > 0 ? user.skills.map((skill, index) => {
                                  let colorClass = "text-gray-800";
                                  if (index > 2 && index <= 4) colorClass = "text-gray-500";
                                  if (index > 4) colorClass = "text-gray-400";
                                  
                                  return (
                                      <span key={index} className={`text-[13px] font-bold ${colorClass}`}>
                                          {skill.name}{index < user.skills.length - 1 ? ', ' : ''}
                                      </span>
                                  );
                              }) : (
                                  <span className="text-[13px] text-gray-400 font-medium italic">No skills listed</span>
                              )}
                          </div>
                      </section>

                      {/* Business Potential Stats */}
                      <section>
                          <h3 className="text-[12px] font-black uppercase tracking-widest text-gray-900 border-b border-gray-100 py-3 mb-6">
                              Network Stats
                          </h3>
                          <div className="flex items-center gap-10">
                              <div>
                                  <div className="text-[24px] font-black text-gray-900 mb-1">
                                      {user.ventures.length}
                                  </div>
                                  <div className="text-[9px] font-black uppercase tracking-widest text-gray-500 tracking-tighter">Ventures</div>
                              </div>
                              <div>
                                  <div className="text-[24px] font-black text-gray-900 mb-1">12</div>
                                  <div className="text-[9px] font-black uppercase tracking-widest text-gray-500 tracking-tighter">Engagements</div>
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
                  <Link to="/dashboard" className="hover:text-gray-900 transition-colors">Guidelines</Link>
                  <Link to="/dashboard" className="hover:text-gray-900 transition-colors">FAQ</Link>
                  <Link to="/dashboard" className="hover:text-gray-900 transition-colors">Lists</Link>
                  <Link to="/dashboard" className="hover:text-gray-900 transition-colors">API</Link>
                  <Link to="/dashboard" className="hover:text-gray-900 transition-colors">Security</Link>
                  <Link to="/dashboard" className="hover:text-gray-900 transition-colors">Legal</Link>
                  <Link to="/found-talent" className="hover:text-gray-900 transition-colors">Apply to Join</Link>
                  <Link to="/settings" className="hover:text-gray-900 transition-colors">Contact</Link>
              </div>
              <p>StartupCollab © 2026</p>
          </footer>

      </div>
    </div>
  );
};

export default Profile;