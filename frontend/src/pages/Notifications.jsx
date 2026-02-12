import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Clock,
  ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';

const Notifications = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Mock Notification Data
  const notifications = [
    {
      id: 1,
      type: 'company',
      title: 'Interview Request',
      message: 'TechCorp Inc. wants to schedule an interview for the Senior React Developer role.',
      time: '2 hours ago',
      read: false,
      icon: <Building2 className="size-5 text-indigo-400" />,
      color: 'bg-indigo-500/10 border-indigo-500/20'
    },
    {
      id: 2,
      type: 'people',
      title: 'New Connection',
      message: 'Sarah Jenkins sent you a connection request.',
      time: '5 hours ago',
      read: true,
      icon: <User className="size-5 text-emerald-400" />,
      color: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      id: 3,
      type: 'company',
      title: 'Application Viewed',
      message: 'Your application for Frontend Engineer at StartupX was viewed.',
      time: '1 day ago',
      read: true,
      icon: <Briefcase className="size-5 text-blue-400" />,
      color: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      id: 4,
      type: 'people',
      title: 'Profile Endorsement',
      message: 'Michael Chen endorsed your React skills.',
      time: '2 days ago',
      read: true,
      icon: <CheckCircle2 className="size-5 text-amber-400" />,
      color: 'bg-amber-500/10 border-amber-500/20'
    }
  ];

  const filteredNotifications = activeFilter === 'All' 
    ? notifications 
    : notifications.filter(n => n.type === activeFilter.toLowerCase());

  const filters = ['All', 'Company', 'People'];

  return (
    <div className="bg-[#020617] text-slate-100 font-sans min-h-screen flex overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <motion.main 
        layout
        className={`flex-1 overflow-y-auto h-full bg-[#020617] ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'}`}
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
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative p-5 rounded-2xl border ${
                    notif.read ? 'bg-white/5 border-white/5' : 'bg-white/[0.07] border-white/10'
                  } hover:bg-white/10 transition-colors group cursor-pointer`}
                >
                  <div className="flex gap-4">
                    <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border ${notif.color}`}>
                      {notif.icon}
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
                </motion.div>
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
      </motion.main>
    </div>
  );
};

export default Notifications;
