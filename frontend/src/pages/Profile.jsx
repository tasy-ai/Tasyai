import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { 
  Code2,
  MapPin,
  Edit3,
  Share2,
  User,
  Zap,
  Link2,
  Code,
  Globe,
  FileText,
  Building2,
  Plus,
  Rocket,
  Shield,
  Clock,
  Users,
  Eye,
  Mail,
  Send,
  Loader2,
  ArrowRight,
  Linkedin,
  Github,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import companyService from '../services/companyService';
import Achievements from '../components/profile/Achievements';
import Moto from '../components/profile/Moto';
import Availability from '../components/profile/Availability';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('My Ventures');

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
            role: data.role || "Role not set",
            headline: data.motto || "No headline yet",
            location: data.country || "Location not set",
            email: data.email || "",
            image: data.profilePicture, 
            achievements: data.achievements,
            motto: data.motto,
            availability: data.time,
            skills: data.skills ? data.skills.map(s => ({ name: s, level: 'high' })) : [],
            ventures: myCompanies.map(c => ({
                id: c._id,
                name: c.name,
                role: 'Founder',
                description: c.tagline,
                icon: Building2,
                color: 'from-indigo-500 to-purple-600'
            })),
            links: [
                { name: 'LinkedIn', url: data.linkedin, icon: Linkedin, color: 'bg-[#0077b5]' },
                { name: 'GitHub', url: data.github, icon: Github, color: 'bg-slate-800' },
                { name: 'Portfolio', url: data.portfolio, icon: Globe, color: 'bg-primary/40' }
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
      <div className="flex bg-[#020617] min-h-screen items-center justify-center">
          <Loader2 className="size-10 text-[#4245f0] animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#020617] text-white">
            <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Profile Not Found</h3>
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="px-8 py-3 bg-[#4245f0] rounded-xl font-bold hover:bg-[#4245f0]/90 transition-all"
                >
                    Return to Ecosystem
                </button>
            </div>
        </div>
    );
  }

  const getSkillClasses = (level) => {
    const levels = {
      high: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      medium: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
      low: 'bg-slate-500/10 border-slate-500/20 text-slate-400'
    };
    return levels[level] || levels.medium;
  };

  return (
    <>
      <SEO 
        title={user?.name || "Professional Profile"}
        description={user?.headline || "Connect with world-class talent and projects on Tasyai."}
      />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="p-5 md:p-10 pb-20">
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start gap-10 mb-12">
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#4245f0] to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-3xl overflow-hidden border-4 border-slate-950 shadow-2xl bg-slate-900">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                    <User className="size-16 md:size-24 text-slate-700" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 pt-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <div>
                  <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">{user.name}</h1>
                  <p className="text-lg md:text-xl text-slate-400 font-medium">{user.role}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <Share2 className="size-5 text-slate-400" />
                  </button>
                  <Link 
                    to="/settings"
                    className="px-6 py-3 bg-[#4245f0] hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-[#4245f0]/20 flex items-center gap-2"
                  >
                    <Edit3 className="size-5" />
                    Edit Profile
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div className="flex items-center gap-3 text-slate-400 bg-white/5 px-4 py-3 rounded-2xl border border-white/5">
                  <MapPin className="size-5 text-[#4245f0]" />
                  <span className="text-sm font-medium">{user.location}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 bg-white/5 px-4 py-3 rounded-2xl border border-white/5">
                  <Mail className="size-5 text-[#4245f0]" />
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column */}
            <div className="lg:col-span-12 xl:col-span-7 space-y-10">
              {/* Motto Card */}
              <Moto user={user} />

              {/* Achievements Card */}
              <Achievements user={user} />

              {/* Ventures/Tabs Section */}
              <div className="space-y-6">
                <div className="flex border-b border-white/10">
                  {['My Ventures', 'Collaborations'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-8 py-4 text-sm font-bold tracking-wider uppercase transition-all relative ${
                        activeTab === tab 
                        ? 'text-[#4245f0]' 
                        : 'text-slate-500 hover:text-white'
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div 
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4245f0]"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeTab === 'My Ventures' && (
                    <>
                      {user.ventures && user.ventures.length > 0 ? (
                        user.ventures.map((venture) => (
                          <motion.div 
                            key={venture.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass p-6 rounded-2xl border border-white/10 hover:border-[#4245f0]/30 transition-all cursor-pointer group"
                            onClick={() => navigate(`/company-detail?id=${venture.id}`)}
                          >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${venture.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                              <venture.icon className="size-6 text-white" />
                            </div>
                            <h4 className="text-lg font-bold text-white mb-1">{venture.name}</h4>
                            <p className="text-sm text-slate-500 font-medium">{venture.role}</p>
                            <div className="mt-4 flex items-center text-[#4245f0] text-xs font-bold gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              MANAGE VENTURE <ArrowRight className="size-3" />
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="col-span-2 glass p-10 rounded-2xl border border-dashed border-white/10 text-center space-y-4">
                          <Rocket className="size-12 text-slate-800 mx-auto" />
                          <p className="text-slate-500">No active ventures yet.</p>
                          <Link to="/add-company" className="inline-block text-[#4245f0] font-bold text-sm">LAUNCH YOUR FIRST VENTURE</Link>
                        </div>
                      )}
                    </>
                  )}
                  {activeTab === 'Collaborations' && (
                    <div className="col-span-2 glass p-10 rounded-2xl border border-dashed border-white/10 text-center">
                      <p className="text-slate-500">Coming soon: Track your contributions to other projects.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-12 xl:col-span-5 space-y-10">
              {/* Availability Card */}
              <Availability user={user} />

              {/* Skills Card */}
              <section className="glass rounded-3xl p-8 border border-white/10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold flex items-center gap-3">
                    <Zap className="size-6 text-[#4245f0]" />
                    Expertise
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {user.skills && user.skills.length > 0 ? (
                    user.skills.map((skill) => (
                      <span 
                        key={skill.name}
                        className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${getSkillClasses(skill.level)}`}
                      >
                        {skill.name}
                      </span>
                    ))
                  ) : (
                    <p className="text-slate-600 italic">No skills added yet.</p>
                  )}
                </div>
              </section>

              {/* Social Links */}
              <section className="glass rounded-3xl p-8 border border-white/10">
                <h3 className="text-xl font-bold flex items-center gap-3 mb-8">
                  <Link2 className="size-6 text-[#4245f0]" />
                  Connect
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {user.links && user.links.length > 0 ? (
                    user.links.map((link) => {
                      const IconComponent = link.icon;
                      return (
                        <a 
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${link.color} shadow-lg`}>
                              <IconComponent className="size-5 text-white" />
                            </div>
                            <span className="font-bold text-white capitalize">{link.name}</span>
                          </div>
                          <ExternalLink className="size-4 text-slate-500 group-hover:text-white transition-colors" />
                        </a>
                      );
                    })
                  ) : (
                    <p className="text-slate-600 italic">No social links added.</p>
                  )}
                </div>
              </section>
            </div>
          </div>
      </div>
    </>
  );
};

export default Profile;