import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { 
  Building2,
  MapPin,
  Globe,
  TrendingUp,
  Bookmark,
  Loader2,
  Rocket,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Cloud,
  Sun,
  Shield,
  Activity,
  Bot
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import notificationService from '../services/notificationService';
import authService from '../services/authService';

const SavedCompanies = () => {
  const navigate = useNavigate();
  const [savedCompanies, setSavedCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedCompanies = async () => {
      try {
        setLoading(true);
        const data = await authService.getSavedCompanies();
        setSavedCompanies(data);
      } catch (err) {
        console.error("Failed to fetch saved companies:", err);
        toast.error("Failed to load saved companies");
      } finally {
        setLoading(false);
      }
    };
    fetchSavedCompanies();
  }, []);

  const handleUnsave = async (id, e) => {
    e.stopPropagation();
    try {
      const company = savedCompanies.find(c => c._id === id);
      await authService.toggleSaveCompany(id);
      setSavedCompanies(savedCompanies.filter(c => c._id !== id));
      toast.success("Startup removed from vault");
      
      notificationService.addNotification({
          title: 'Company Removed',
          message: `${company?.name || 'Company'} was removed from your saved list.`,
          type: 'info',
          iconName: 'Bookmark',
          color: 'bg-slate-500/10 border-slate-500/20'
      });
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

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
    <div className="min-h-screen font-sans flex flex-col w-full overflow-y-auto">
      <SEO 
        title="Saved Ecosystem"
        description="Track and manage the ventures that caught your eye on Tasyai."
      />

      <div className="flex-1 w-full max-w-[1200px] mx-auto p-6 md:p-10 mb-10">
        
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-[28px] font-black text-gray-900 mb-2.5 tracking-tight">Saved Ecosystem</h1>
          <p className="text-gray-500 text-[15px] max-w-2xl font-medium">Track and manage the ventures that caught your eye.</p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
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
        ) : savedCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedCompanies.map((company, index) => {
              const iconData = getIconData(index);
              
              return (
                <div
                  key={company._id}
                  className="bg-white border border-gray-200 rounded-sm flex flex-col shadow-sm transition-all hover:shadow-md hover:border-gray-300 group overflow-hidden h-full"
                >
                  {/* Banner Header - approx 20% of card height */}
                  <div className={`h-28 w-full relative ${iconData.bg} flex items-center justify-center shrink-0`}>
                     <div className="absolute inset-0 opacity-10 bg-grain"></div>
                     <div className="absolute top-4 right-4 z-10">
                        <button onClick={(e) => handleUnsave(company._id, e)}>
                          <Bookmark className="size-4 fill-[#ff5a00] text-[#ff5a00] transition-colors" strokeWidth={2.5} />
                        </button>
                     </div>
                     
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
                        <span className="px-2.5 py-1 bg-gray-50 border border-gray-100 text-gray-500 text-[11px] font-bold rounded-sm whitespace-nowrap">
                          {company.location || 'Remote'}
                        </span>
                        <span className="px-2.5 py-1 bg-gray-50 border border-gray-100 text-gray-500 text-[11px] font-bold rounded-sm whitespace-nowrap flex items-center gap-1.5">
                          <Globe className="size-3 text-gray-400" />
                          {company.industry || 'Tech'}
                        </span>
                    </div>
                    
                    <div className="mt-4 flex gap-3">
                      <Link 
                        to={`/company-detail?id=${company._id}`} 
                        state={{ company }}
                        className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-[13px] font-bold py-2.5 rounded-sm transition-colors text-center shadow-sm flex items-center justify-center"
                      >
                        View Details
                      </Link>
                      {company.website && (
                        <button 
                          onClick={() => window.open(company.website, '_blank')}
                          className="p-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 rounded-sm transition-colors text-center shadow-sm flex items-center justify-center group-hover:bg-[#ff5a00] group-hover:text-white group-hover:border-[#ff5a00]"
                        >
                          <ExternalLink className="size-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-gray-200 border-dashed rounded-sm">
             <div className="size-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <Bookmark className="size-8 text-gray-300" strokeWidth={2.5} />
             </div>
             <h3 className="text-[17px] font-bold text-gray-900 mb-1">Startup Vault Empty</h3>
             <p className="text-gray-500 text-[13px] font-medium mb-6">You haven't added any ventures to your ecosystem yet.</p>
             <button 
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2.5 bg-[#ff5a00] hover:bg-[#e04e00] text-white font-bold rounded-sm transition-all text-[13px] shadow-sm"
              >
                Scan Ecosystem
              </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full mt-auto border-t border-gray-200 px-6 py-8 bg-[#F8F7F4]">
         <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="flex items-center gap-4 text-gray-500 text-[13px] font-medium">
                 <a href="#" className="hover:text-gray-900 transition-colors">Guidelines</a>
                 <span className="text-gray-300">|</span>
                 <a href="#" className="hover:text-gray-900 transition-colors">FAQ</a>
                 <span className="text-gray-300">|</span>
                 <a href="#" className="hover:text-gray-900 transition-colors">Lists</a>
                 <span className="text-gray-300">|</span>
                 <a href="#" className="hover:text-gray-900 transition-colors">API</a>
                 <span className="text-gray-300">|</span>
                 <a href="#" className="hover:text-gray-900 transition-colors">Security</a>
             </div>
             <div>
                 <p className="text-gray-500 text-[13px] italic font-medium">“Working on something people want.”</p>
             </div>
         </div>
      </footer>
    </div>
  );
};

export default SavedCompanies;
