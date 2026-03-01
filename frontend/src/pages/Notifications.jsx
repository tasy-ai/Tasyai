import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import {motion} from 'framer-motion';
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
    // Removed markAllAsRead from here so users can use the filters
  }, []);

  const handleToggleRead = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: !n.read } : n);
    setNotifications(updated);
    
    // Persist to local storage
    try {
        const stored = notificationService.getNotifications();
        const updatedStored = stored.map(n => n.id === id ? { ...n, read: !n.read } : n);
        localStorage.setItem('tasyai_notifications', JSON.stringify(updatedStored));
    } catch (err) {
        console.error("Failed to update notification state", err);
    }
  };

  const handleMarkAllRead = () => {
    notificationService.markAllAsRead();
    setNotifications(notificationService.getNotifications());
  };

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

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Unread') return !n.read;
    if (activeFilter === 'Read') return n.read;
    if (activeFilter === 'System') return n.type === 'info';
    return n.type === activeFilter.toLowerCase();
  });

  const filters = ['All', 'Unread', 'Read', 'Company', 'People', 'System'];

  return (
    <div className="bg-[#020617] text-slate-100 font-sans min-h-screen flex overflow-hidden">
      <SEO 
        title="Notifications"
        description="Stay updated with your latest activity and matches on Tasyai."
      />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main 
        className={`flex-1 overflow-y-auto h-full bg-[#020617] ${isSidebarOpen ? 'md:ml-[280px]' : 'md:ml-20'}`}
      >
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-10 pb-32">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-12 pt-12 md:pt-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
                <Bell className="size-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Notifications</h1>
                <p className="text-slate-400 text-sm md:text-base">Stay updated with your latest activity</p>
              </div>
            </div>

            <button 
              onClick={handleMarkAllRead}
              className="w-full md:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-xs font-bold text-slate-300 transition-all flex items-center justify-center"
            >
              Mark all as read
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-8 md:mb-10 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all relative whitespace-nowrap ${
                  activeFilter === filter
                    ? 'bg-[#4245f0] text-white shadow-lg shadow-[#4245f0]/20'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {filter}
                {filter === 'Unread' && notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notif, index) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleToggleRead(notif.id)}
                  className={`relative p-5 md:p-6 rounded-[28px] border transition-all duration-300 group cursor-pointer ${
                    notif.read ? 'bg-white/5 border-white/5 opacity-70' : 'bg-white/[0.08] border-[#4245f0]/30 shadow-lg shadow-indigo-500/5'
                  } hover:bg-white/10`}
                >
                  <div className="flex gap-4 md:gap-5">
                    <div className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border ${notif.color}`}>
                      {getIcon(notif.iconName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 mb-2">
                        <h3 className={`font-bold text-base md:text-lg truncate ${notif.read ? 'text-slate-300' : 'text-white'}`}>
                          {notif.title}
                        </h3>
                        <span className="text-[10px] md:text-xs font-bold text-slate-500 whitespace-nowrap flex items-center gap-1.5 uppercase tracking-wider">
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
                    <div className="absolute top-6 right-6 w-2.5 h-2.5 rounded-full bg-[#4245f0] shadow-[0_0_12px_rgba(66,69,240,0.8)]"></div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="text-center py-24 md:py-32 glass rounded-[40px] border border-dashed border-white/10">
                <div className="w-20 h-20 rounded-[32px] bg-white/5 flex items-center justify-center mx-auto mb-6">
                  <Bell className="size-10 text-slate-700" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No notifications found</h3>
                <p className="text-slate-500 text-sm md:text-base max-w-xs mx-auto">You're all caught up! We'll notify you when something important happens.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
