import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import {
  Plus,
  Bookmark,
  Building2,
  SlidersHorizontal,
  Cloud,
  Sun,
  Shield,
  Activity,
  Bot,
  ChevronDown
} from 'lucide-react';
import { filters, companies as mockCompanies } from '../data/dashboardData';

import { useUser } from "@clerk/clerk-react";
import authService from '../services/authService';
import companyService from '../services/companyService';
import notificationService from '../services/notificationService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All Roles');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedCompanyIds, setSavedCompanyIds] = useState([]);
  const { user: clerkUser, isLoaded: clerkLoaded, isSignedIn: clerkSignedIn } = useUser();
  const [isSyncing, setIsSyncing] = useState(false);

  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);

  // Fetch saved companies status
  useEffect(() => {
    const fetchSavedStatus = async () => {
      try {
        const saved = await authService.getSavedCompanies();
        setSavedCompanyIds(saved.map(c => c._id));
      } catch (err) {
        console.error("Error fetching saved status:", err);
      }
    };
    if (clerkSignedIn) fetchSavedStatus();
  }, [clerkSignedIn]);

  // Fetch companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoadingCompanies(true);
        const data = await companyService.getCompanies();
        if (data && data.length > 0) {
          setCompanies(data);
        } else {
          // Fallback to exactly match the design image and show companies
          const formattedMocks = mockCompanies.map(c => ({
            _id: c.id.toString(),
            name: c.name,
            description: c.description,
            logo: c.image,
            openings: c.roles.map(r => ({ role: r })),
            industry: 'Technology'
          }));
          setCompanies(formattedMocks);
        }
      } catch (err) {
        console.error("Failed to fetch companies:", err);
      } finally {
        setLoadingCompanies(false);
      }
    };
    fetchCompanies();
  }, []);

  if (isSyncing || !clerkLoaded) {
    return (
      <div className="bg-white text-gray-900 flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#ff5a00] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  const filteredCompanies = companies.filter(company => {
    // 1. Search Logic
    if (searchQuery.trim() !== '') {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        company.name?.toLowerCase().includes(searchLower) ||
        company.industry?.toLowerCase().includes(searchLower) ||
        company.tagline?.toLowerCase().includes(searchLower) ||
        company.description?.toLowerCase().includes(searchLower) ||
        company.openings?.some(op =>
          op.role?.toLowerCase().includes(searchLower) ||
          op.techStack?.some(tech => tech.toLowerCase().includes(searchLower))
        );

      if (!matchesSearch) return false;
    }

    // 2. Filter Logic
    if (activeFilter === 'All Roles') return true;

    if (activeFilter === 'Remote') {
      return company.location?.toLowerCase().includes('remote') ||
        company.openings?.some(op => op.workModel === 'Remote');
    }

    if (activeFilter === 'Equity') {
      return company.benefits?.some(b => b.toLowerCase().includes('equity')) ||
        company.description?.toLowerCase().includes('equity');
    }

    if (activeFilter === 'Full-time') {
      return company.description?.toLowerCase().includes('full-time') ||
        company.description?.toLowerCase().includes('fulltime') ||
        true;
    }

    if (activeFilter === 'AI/ML') {
      const aiKeywords = ['ai', 'ml', 'machine learning', 'artificial intelligence', 'nlp', 'vision'];
      return company.industry?.toLowerCase().includes('ai') ||
        company.industry?.toLowerCase().includes('machine learning') ||
        company.tagline?.toLowerCase().includes('ai') ||
        company.description?.toLowerCase().includes('intelligence') ||
        company.openings?.some(op =>
          op.techStack?.some(tech => aiKeywords.includes(tech.toLowerCase()))
        );
    }

    if (activeFilter === 'Sustainability') {
      const greenKeywords = ['sustainability', 'green', 'clean', 'energy', 'climate', 'eco'];
      return company.industry?.toLowerCase().includes('sustain') ||
        company.industry?.toLowerCase().includes('energy') ||
        greenKeywords.some(kd => company.description?.toLowerCase().includes(kd));
    }

    return true;
  });

  const toggleSave = async (companyId) => {
    try {
      const res = await authService.toggleSaveCompany(companyId);
      const company = companies.find(c => c._id === companyId);

      if (res.isSaved) {
        setSavedCompanyIds(prev => [...prev, companyId]);
        notificationService.addNotification({
          title: 'Saved',
          message: `${company?.name || 'Company'} saved.`,
          type: 'company',
          iconName: 'Bookmark',
          color: 'bg-[#ff5a00]/10 border-[#ff5a00]/20 text-[#ff5a00]'
        });
      } else {
        setSavedCompanyIds(prev => prev.filter(id => id !== companyId));
      }
    } catch (err) {
      console.error("Save toggle failed:", err);
    }
  };

  // Helper icons logic for random card icons just like the image
  const getIconData = (index) => {
    const iconStyles = [
      { bg: 'bg-indigo-50', icon: <Bot className="size-5 text-indigo-500" /> },
      { bg: 'bg-orange-50', icon: <Sun className="size-5 text-orange-500" /> },
      { bg: 'bg-emerald-50', icon: <Cloud className="size-5 text-emerald-500" /> },
      { bg: 'bg-pink-50', icon: <Activity className="size-5 text-pink-500" /> },
      { bg: 'bg-cyan-50', icon: <Bot className="size-5 text-cyan-500" /> },
      { bg: 'bg-purple-50', icon: <Shield className="size-5 text-purple-500" /> },
    ];
    return iconStyles[index % iconStyles.length];
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] font-sans flex flex-col w-full overflow-y-auto">
      <SEO
        title="Dashboard"
        description="Discover high-growth startups and collaborative opportunities on Tasyai."
      />



      <div className="flex-1 w-full max-w-[1200px] mx-auto p-6 md:p-10 mb-10">

        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-[28px] font-black text-gray-900 mb-2.5 tracking-tight">Discover Companies</h1>
            <p className="text-gray-500 text-[15px] max-w-2xl font-medium">Collaborate with high-growth startups looking for world-class talent.</p>
          </div>
          <button
            onClick={() => navigate('/add-company')}
            className="flex items-center gap-2 text-white bg-[#ff5a00] px-5 py-2.5 rounded-sm font-bold text-[13px] hover:bg-[#e04e00] transition-colors shadow-sm self-start md:self-auto uppercase tracking-wider"
          >
            <Plus className="size-4" strokeWidth={3} /> Add Company
          </button>
        </header>

        {/* Search */}
        <div className="bg-white border border-gray-200 rounded-sm flex items-center px-4 py-3.5 shadow-sm mb-5 transition-shadow focus-within:ring-2 focus-within:ring-[#ff5a00]/20 focus-within:border-[#ff5a00]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-[15px] font-medium text-gray-900 placeholder:text-gray-400 placeholder:font-normal"
            placeholder="Search by name, role, or technology stack..."
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {filters.slice(0, 6).map(filter => {
            const isActive = activeFilter === filter.name;
            return (
              <button
                key={filter.name}
                onClick={() => setActiveFilter(filter.name)}
                className={`px-4 py-2 rounded-sm text-[13px] font-bold transition-all bg-white shadow-sm ${isActive
                    ? 'border border-[#ff5a00] text-[#ff5a00]'
                    : 'border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {filter.name}
              </button>
            )
          })}
          <div className="w-px h-6 bg-gray-200 mx-2 hidden sm:block"></div>
          <button className="flex items-center gap-2 px-3 py-2 text-[13px] font-bold text-gray-500 hover:text-gray-800 transition-colors">
            <SlidersHorizontal className="size-3.5" /> More Filters
          </button>
        </div>

        {/* Grid View */}
        {loadingCompanies ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-72 rounded-sm border border-gray-100 bg-white shadow-sm animate-pulse p-6">
                <div className="w-10 h-10 bg-gray-100/50 rounded-sm mb-6"></div>
                <div className="w-3/4 h-5 bg-gray-100/50 mb-3 rounded-sm"></div>
                <div className="w-full h-4 bg-gray-100/50 mb-2 rounded-sm"></div>
                <div className="w-1/2 h-4 bg-gray-100/50 mb-6 rounded-sm"></div>
                <div className="mt-auto flex gap-3 h-10">
                  <div className="flex-1 bg-gray-100/50 rounded-sm"></div>
                  <div className="flex-1 bg-gray-100/50 rounded-sm"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company, index) => {
              const isSaved = savedCompanyIds.includes(company._id);
              const iconData = getIconData(index);
              const currentUser = authService.getCurrentUser();
              const creatorId = company.creator?._id || company.creator;
              const isOwner = currentUser && creatorId === currentUser._id;

              return (
                <div
                  key={company._id}
                  className="bg-white border border-gray-200 rounded-sm flex flex-col shadow-sm transition-all hover:shadow-md hover:border-gray-300 group overflow-hidden h-full"
                >
                  {/* Banner Header - approx 20% of card height */}
                  <div className={`h-28 w-full relative ${iconData.bg} flex items-center justify-center shrink-0`}>
                    <div className="absolute inset-0 opacity-10 bg-grain"></div>

                    {!isOwner && (
                      <div className="absolute top-4 right-4 z-10">
                        <button onClick={(e) => { e.preventDefault(); toggleSave(company._id); }}>
                          <Bookmark className={`size-4 transition-colors ${isSaved ? 'fill-[#ff5a00] text-[#ff5a00]' : 'text-gray-400 group-hover:text-[#ff5a00]'}`} />
                        </button>
                      </div>
                    )}

                    {/* Centered Logo or Icon */}
                    <div className="w-14 h-14 bg-white rounded-sm shadow-md flex items-center justify-center z-10 overflow-hidden border border-gray-50">
                      {company.logo ? (
                        <img src={company.logo} alt="logo" className="w-full h-full object-contain p-2" />
                      ) : (
                        React.cloneElement(iconData.icon, { className: "size-6" })
                      )}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-900 text-[17px] mb-2">{company.name}</h3>
                    <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-2 mb-5 min-h-[40px] font-medium">{company.description || company.tagline || 'No description provided.'}</p>

                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                      {company.openings?.slice(0, 2).map((op, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-gray-50 border border-gray-100 text-gray-500 text-[11px] font-bold rounded-sm whitespace-nowrap"
                        >
                          {op.role}
                        </span>
                      ))}
                      {company.openings?.length === 0 && (
                        <span className="px-2.5 py-1 bg-gray-50 border border-gray-100 text-gray-400 text-[11px] font-bold rounded-sm">General</span>
                      )}
                    </div>

                    <div className="mt-4 flex">
                      <Link
                        to={`/company-detail?id=${company._id}`}
                        state={{ company }}
                        className="flex-1 bg-[#ff5a00] hover:bg-[#e04e00] text-white text-[13px] font-bold py-2.5 rounded-sm transition-colors shadow-sm text-center flex items-center justify-center uppercase tracking-wider"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-gray-200 border-dashed rounded-sm">
            <Building2 className="size-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-[17px] font-bold text-gray-900 mb-1">No startups found</h3>
            <p className="text-gray-500 text-[13px] font-medium">Try adjusting your filters or search terms.</p>
          </div>
        )}

        {/* Load More */}
        {filteredCompanies.length > 0 && (
          <div className="mt-12 flex justify-center">
            <button className="px-5 py-2.5 bg-gray-50 rounded-sm border border-gray-200 hover:bg-gray-100 hover:border-gray-300 text-gray-900 font-bold text-[13px] transition-all flex items-center gap-2 shadow-sm">
              Load More Startups
              <ChevronDown className="size-4 text-gray-500" />
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full mt-auto border-t border-gray-200 px-6 py-8">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-gray-500 text-[13px] font-bold uppercase tracking-widest">
            <Link to="/guidelines" className="hover:text-[#ff5a00] transition-colors">Guidelines</Link>
            <span className="text-gray-300 opacity-50">|</span>
            <Link to="/faq" className="hover:text-[#ff5a00] transition-colors">FAQ</Link>
            <span className="text-gray-300 opacity-50">|</span>
            <Link to="/lists" className="hover:text-[#ff5a00] transition-colors">Lists</Link>
            <span className="text-gray-300 opacity-50">|</span>
            <Link to="/security" className="hover:text-[#ff5a00] transition-colors">Security</Link>
          </div>
          <div>
            <p className="text-gray-500 text-[13px] italic font-medium">“Working on something people want.”</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
