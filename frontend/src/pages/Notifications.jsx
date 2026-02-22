import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { 
  Building2, 
  User, 
  Bell, 
  Search,
  Filter,
  MoreHorizontal,
  Briefcase,
  CheckCircle2,
  XCircle,
  Rocket,
  Sparkles,
  Clock,
  ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import notificationService from '../services/notificationService';

const Notifications = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = () => {
        let stored = notificationService.getNotifications();
        
        // Force refresh if old dummy data exists
        const hasOldData = stored.some(n => 
          n.title === 'New Connection Request' || 
          n.title === 'Interview Request'
        );
        
        if (hasOldData) {
            notificationService.clearAll();
            stored = [];
        }
        
        // Populate if empty
        if (stored.length === 0) {
            notificationService.addNotification({
                title: 'Welcome to Tasyai!',
                message: 'Your journey to discovering the next big startup begins here. Complete your profile to get personalized matches.',
                type: 'info',
                iconName: 'Rocket',
                color: 'bg-indigo-500/10 border-indigo-500/20'
            });
            notificationService.addNotification({
                title: 'New Features Unlocked!',
                message: 'Explore the new Discovery Engine, Personalized Interests matching, and Secure Vault features added to your workspace.',
                type: 'info',
                iconName: 'Sparkles',
                color: 'bg-emerald-500/10 border-emerald-500/20'
            });
            notificationService.addNotification({
                title: 'System Update',
                message: 'The Discovery Engine matching algorithm has been upgraded. You may see new high-quality matches.',
                type: 'info',
                iconName: 'Briefcase',
                color: 'bg-blue-500/10 border-blue-500/20'
            });
            stored = notificationService.getNotifications();
        }
        setNotifications(stored);
    };

    fetchNotifications();
    notificationService.markAllAsRead(); // Mark as read when page is opened
  }, []);

  const getIcon = (iconName) => {
    switch(iconName) {
        case 'Building2': return <Building2 className="size-5 text-indigo-400" />;
        case 'User': return <User className="size-5 text-emerald-400" />;
        case 'Briefcase': return <Briefcase className="size-5 text-blue-400" />;
        case 'CheckCircle2': return <CheckCircle2 className="size-5 text-amber-400" />;
        case 'Rocket': return <Rocket className="size-5 text-purple-400" />;
        case 'Sparkles': return <Sparkles className="size-5 text-emerald-400" />;
        default: return <Bell className="size-5 text-slate-400" />;
    }
  };

  const filteredNotifications = activeFilter === 'All' 
    ? notifications 
    : notifications.filter(n => n.type === activeFilter.toLowerCase() || (activeFilter === 'System' && n.type === 'info'));

  const filters = ['All', 'Company', 'People', 'System'];

  return (
    <div className="bg-[#020617] text-slate-100 font-sans min-h-screen flex overflow-hidden">
      <SEO 
        title="Notifications"
        description="Stay updated with your latest activity and matches on Tasyai."
      />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main 
        className={`flex-1 overflow-y-auto h-full bg-[#020617] transition-all duration-300 ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'}`}
      >
        <div className="max-w-4xl mx-auto px-6 py-8 pb-32">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Bell className="size-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Notifications</h1>
                <p className="text-slate-400 text-sm">Stay updated with your latest activity</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeFilter === filter
                    ? 'bg-[#4245f0] text-white shadow-lg shadow-[#4245f0]/20'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notif, index) => (
                <div
                  key={notif.id}
                  className={`relative p-5 rounded-2xl border ${
                    notif.read ? 'bg-white/5 border-white/5' : 'bg-white/[0.07] border-white/10'
                  } hover:bg-white/10 transition-colors group cursor-pointer`}
                >
                  <div className="flex gap-4">
                    <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border ${notif.color}`}>
                      {getIcon(notif.iconName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <h3 className={`font-bold text-base truncate ${notif.read ? 'text-slate-200' : 'text-white'}`}>
                          {notif.title}
                        </h3>
                        <span className="text-xs font-medium text-slate-500 whitespace-nowrap flex items-center gap-1">
                          <Clock className="size-3" />
                          {notif.time}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                        {notif.message}
                      </p>
                    </div>
                  </div>
                  
                  {!notif.read && (
                    <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-[#4245f0] shadow-[0_0_8px_rgba(66,69,240,0.8)]"></div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Bell className="size-8 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">No notifications found</h3>
                <p className="text-slate-500 text-sm">You're all caught up! Check back later.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
