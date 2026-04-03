import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import authService from '../services/authService';
import {
  Filter,
  ArrowUpDown,
  Bookmark,
  UserPlus,
  Loader2,
  TrendingUp,
  Zap,
  Info
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const FoundTalent = () => {
  const navigate = useNavigate();

  const [activeRole, setActiveRole] = useState('All Roles (128)');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = ['All Roles (128)', 'Lead UI Designer', 'Full-Stack Developer', 'Product Manager', 'Growth Marketer'];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await authService.getUsers();
        // Fallback exact mock data if database is empty or sparse, to match the visual
        const baseMocks = [
          { id: '1', name: 'Marcus Thorne', experience: '8 Years Exp', location: 'London', image: 'https://i.pravatar.cc/150?img=11', matchScore: 98, badge: 'TOP 5% TALENT', badgeType: 'green', quote: 'Passionate about scaling series-A startups through design-led engineering and high-performance React architectures.', skills: [{ name: 'REACT' }, { name: 'NODE.JS' }, { name: 'AWS' }] },
          { id: '2', name: 'Elena Rodriguez', experience: '6 Years Exp', location: 'Madrid', image: 'https://ui-avatars.com/api/?name=Elena+Rodriguez&background=0D1B2A&color=fff', matchScore: 94, badge: 'UI/UX SPECIALIST', badgeType: 'blue', quote: 'Specialized in creating seamless design systems that bridge the gap between aesthetics and functionality.', skills: [{ name: 'FIGMA' }, { name: 'TAILWIND' }, { name: 'MOTION' }] },
          { id: '3', name: 'Julian Vosh', experience: '10 Years Exp', location: 'Remote', image: 'https://i.pravatar.cc/150?img=12', matchScore: 91, badge: 'FORMER CTO', badgeType: 'orange', quote: 'Experienced product leader with a focus on AI-driven SaaS growth and high-level technical strategy.', skills: [{ name: 'LEADERSHIP' }, { name: 'MLOPS' }] },
        ];

        let mappedUsers = [];

        if (data && data.length >= 3) {
          mappedUsers = data.map((u, index) => {
            const mockColors = ['green', 'blue', 'orange'];
            return {
              id: u._id,
              name: u.name,
              experience: `${u.experience || '3'} Years Exp`,
              location: u.country || 'Remote',
              image: u.profilePicture || `https://ui-avatars.com/api/?name=${u.name}&background=random`,
              matchScore: Math.floor(Math.random() * 20) + 80,
              badge: u.role?.toUpperCase() || 'SPECIALIST',
              badgeType: mockColors[index % mockColors.length],
              quote: u.motto || 'Looking for an exciting new role in a fast-paced environment.',
              skills: u.skills ? u.skills.map(s => ({ name: s.toUpperCase() })) : [{ name: 'REACT' }],
              candidateData: u
            };
          });
        } else {
          mappedUsers = baseMocks;
        }

        setUsers(mappedUsers);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'green': return 'bg-emerald-50 text-emerald-600';
      case 'blue': return 'bg-blue-50 text-blue-600';
      case 'orange': return 'bg-orange-50 text-[#ff5a00]';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const notifyContact = (e) => {
    e.stopPropagation();
    toast.success("Contact request sent!");
  }

  const toggleBookmark = (e) => {
    e.stopPropagation();
    toast.success("Candidate saved");
  }

  return (
    <>
      <SEO
        title="Interested Talent"
        description="Connect with top-tier professionals ready to join your startup team."
      />
      <div className="min-h-screen bg-[#F8F7F4] font-sans pb-20 w-full overflow-y-auto pt-6">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">

          {/* Tabs Section */}
          <div className="flex items-center gap-8 border-b border-gray-200 mb-10 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeRole === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveRole(tab)}
                  className={`pb-4 text-[14px] font-bold whitespace-nowrap transition-colors relative ${isActive ? 'text-[#ff5a00]' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {tab}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff5a00]"></div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Interested Talent Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-[26px] font-light tracking-tight text-gray-800">Interested Talent</h2>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-sm text-[13px] font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
                <Filter className="size-4" strokeWidth={2.5} />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-sm text-[13px] font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
                <ArrowUpDown className="size-4" strokeWidth={2.5} />
                Sort
              </button>
            </div>
          </div>

          {/* Candidates Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin size-10 text-[#ff5a00] text-[#ff5a00]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((candidate, index) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-gray-200 p-6 flex flex-col shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Top Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex gap-4">
                      <img
                        src={candidate.image}
                        alt={candidate.name}
                        className="w-12 h-12 rounded-sm object-cover bg-gray-100"
                      />
                      <div>
                        <h3 className="text-[17px] font-bold text-black tracking-tight">{candidate.name}</h3>
                        <p className="text-[12px] font-medium text-gray-500 mt-0.5">{candidate.experience} • {candidate.location}</p>
                        <div className={`mt-2 inline-block px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-sm ${getBadgeStyle(candidate.badgeType)}`}>
                          {candidate.badge}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[20px] font-light text-[#ff5a00]">{candidate.matchScore}%</div>
                      <div className="text-[8px] font-black uppercase tracking-widest text-gray-400 mt-0.5">MATCH</div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="mb-6">
                    <p className="text-[14px] leading-relaxed text-gray-700 font-medium">"{candidate.quote}"</p>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {candidate.skills.slice(0, 3).map((s, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 font-bold text-[10px] rounded-sm tracking-wider uppercase">
                        {s.name}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Actions */}
                  <div className="mt-auto pt-2 flex items-center gap-3">
                    <Link
                      to={`/profile-expansion?id=${candidate.id}`}
                      state={{ candidate: candidate.candidateData }}
                      className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-900 font-bold text-[13px] rounded-sm text-center hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => navigate(`/messages?userId=${candidate.id}`)}
                      className="flex-1 py-2.5 bg-[#ff5a00] hover:bg-[#e04e00] text-white font-bold text-[13px] rounded-sm text-center transition-colors shadow-sm"
                    >
                      Contact
                    </button>
                    <button
                      onClick={toggleBookmark}
                      className="p-2.5 bg-white border border-gray-200 rounded-sm hover:bg-gray-50 text-gray-500 transition-colors shadow-sm"
                    >
                      <Bookmark className="size-4" strokeWidth={2.5} />
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Empty Promote Card */}
              <div className="bg-transparent border-2 border-dashed border-gray-200 p-8 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <UserPlus className="size-5 text-gray-400" strokeWidth={2.5} />
                </div>
                <h3 className="text-[17px] font-bold text-gray-900 tracking-tight mb-1">Discover more talent</h3>
                <p className="text-[13px] text-gray-500 font-medium max-w-[200px] leading-relaxed mb-6">Boost your role listing to reach 2,000+ monthly active candidates.</p>
                <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-800 font-bold text-[13px] rounded-sm shadow-sm hover:bg-gray-50 transition-colors">
                  Promote Role
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default FoundTalent;