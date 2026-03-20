import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { 
  Check,
  SlidersHorizontal,
  Zap,
  AtSign,
  MessageSquare,
  ShieldCheck,
  Handshake,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import notificationService from '../services/notificationService';

const Notifications = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Specifically clear out old notifications to inject the exact UI mocks
    notificationService.clearAll();

    const mockData = [
      {
        id: '1',
        title: 'Aura.ai is interested in your profile',
        message: 'A specialized AI research startup just viewed your contribution history and wants to connect regarding their "Lumina" project.',
        time: '2M AGO',
        read: false,
        iconName: 'Zap',
        hasActions: true
      },
      {
        id: '2',
        title: 'Sarah Chen mentioned you',
        message: '"I think @user would be a great fit for the frontend architecture design of the mobile app."',
        time: '4H AGO',
        read: true,
        iconName: 'AtSign'
      },
      {
        id: '3',
        title: 'New message from Nexus Lab',
        message: '"Hey! We\'ve reviewed your proposal and would love to jump on a quick call this week to discuss..."',
        time: '6H AGO',
        read: false,
        iconName: 'MessageSquare'
      },
      {
        id: '4',
        title: 'Security: New login detected',
        message: 'Your account was accessed from a new device in San Francisco, CA. If this wasn\'t you, please reset your password.',
        time: '1D AGO',
        read: true,
        iconName: 'ShieldCheck'
      },
      {
        id: '5',
        title: 'Partnership opportunity: Cloud Scale',
        message: 'Cloud Scale has invited you to join their preferred developer network for early access to their upcoming SDK.',
        time: '2D AGO',
        read: true,
        iconName: 'Handshake'
      }
    ];

    // Seed mock data for visual showcase
    localStorage.setItem('tasyai_notifications', JSON.stringify(mockData));
    setNotifications(mockData);
  }, []);

  const handleToggleRead = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    localStorage.setItem('tasyai_notifications', JSON.stringify(updated));
  };

  const handleMarkAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('tasyai_notifications', JSON.stringify(updated));
  };

  const getIconWrapper = (iconName) => {
    switch(iconName) {
        case 'Zap': 
            return (
                <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-orange-50 shrink-0">
                    <Zap className="size-5 text-[#ff5a00] fill-[#ff5a00]" strokeWidth={2.5} />
                </div>
            );
        case 'AtSign': 
            return (
                <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-[#e2e8f0] shrink-0">
                    <AtSign className="size-5 text-slate-500" strokeWidth={3} />
                </div>
            );
        case 'MessageSquare': 
            return (
                <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-blue-50 shrink-0">
                    <MessageSquare className="size-5 text-blue-600 fill-blue-600" strokeWidth={2.5} />
                </div>
            );
        case 'ShieldCheck': 
            return (
                <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-[#e2e8f0] shrink-0">
                    <ShieldCheck className="size-5 text-slate-500 fill-slate-500" strokeWidth={2.5} />
                </div>
            );
        case 'Handshake': 
            return (
                <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-[#e2e8f0] shrink-0">
                    <Handshake className="size-6 text-slate-500" strokeWidth={2.5} />
                </div>
            );
        default: 
            return (
                <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-gray-100 shrink-0">
                    <CheckCircle2 className="size-5 text-gray-400" />
                </div>
            );
    }
  };

  return (
    <>
      <SEO 
        title="Notifications"
        description="Stay updated on the latest startup opportunities and team interest on Tasyai."
      />
      <div className="min-h-screen bg-[#F8F7F4] font-sans pb-20 w-full overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-16">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[#ff5a00] text-[10px] font-black uppercase tracking-widest mb-2.5">Updates & Activity</p>
              <h1 className="text-[52px] font-black text-black tracking-tighter leading-none">Notifications</h1>
            </div>

            <div className="flex flex-col items-end gap-3">
              <button 
                onClick={handleMarkAllRead}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#e5e5e5] hover:bg-gray-300 rounded-sm text-[11px] font-black text-black uppercase tracking-wider transition-colors shadow-sm"
              >
                <Check className="size-4" strokeWidth={4} />
                Mark all as read
              </button>
              <button className="flex items-center justify-center p-2.5 bg-[#e5e5e5] hover:bg-gray-300 rounded-sm text-black transition-colors shadow-sm w-[42px] h-[40px]">
                 <SlidersHorizontal className="size-4" strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* Tabs Nav */}
          <div className="bg-[#f0ece6] p-1.5 rounded-sm flex items-center w-full mb-10 shadow-inner overflow-x-auto no-scrollbar">
             {['All', 'Interests', 'Messages', 'System'].map((tab) => (
                 <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 min-w-[100px] text-center py-2.5 rounded-sm text-[14px] font-bold transition-all ${
                        activeTab === tab 
                        ? 'bg-white text-black shadow-sm' 
                        : 'text-gray-500 hover:text-black hover:bg-black/5'
                    }`}
                 >
                    {tab}
                 </button>
             ))}
          </div>

          {/* Notifications List */}
          <div className="space-y-4 mb-20">
            {notifications.map((notif, index) => {
              // Alternating color background just like the image
              const isEven = index % 2 === 1;
              const bgClass = isEven ? 'bg-[#f0ede6]' : 'bg-white';
              
              return (
                <div
                  key={notif.id}
                  onClick={() => handleToggleRead(notif.id)}
                  className={`relative p-8 rounded-sm flex gap-6 cursor-pointer transition-all shadow-sm ${bgClass}`}
                >
                  {/* Left Orange Stripe for active items */}
                  {!notif.read && (
                      <div className="absolute left-0 top-[20%] h-[60%] w-[6px] bg-[#ff5a00] rounded-r-sm"></div>
                  )}

                  {/* Icon */}
                  {getIconWrapper(notif.iconName)}

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h3 className="font-extrabold text-[17px] text-black mb-2 tracking-tight">{notif.title}</h3>
                    <p className="text-[14px] text-gray-500 font-medium leading-relaxed max-w-[95%]">{notif.message}</p>
                    
                    {/* Action Buttons */}
                    {notif.hasActions && (
                        <div className="flex items-center gap-3 mt-6">
                            <button 
                              onClick={(e) => { e.stopPropagation(); navigate('/my-interests'); }}
                              className="bg-[#d95d39] hover:bg-[#c24f2b] text-white px-6 py-2 rounded-sm text-[12px] font-bold transition-colors shadow-sm"
                            >
                                View Request
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleToggleRead(notif.id); }}
                              className="bg-[#e5e5e5] hover:bg-gray-300 text-black px-6 py-2 rounded-sm text-[12px] font-bold transition-colors shadow-sm"
                            >
                                Dismiss
                            </button>
                        </div>
                    )}
                  </div>

                  {/* Datetime Stamp */}
                  <div className="text-right shrink-0">
                      <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">
                          {notif.time}
                      </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Archive Link */}
          <div className="text-center pb-20 border-t border-gray-100 pt-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">You're all caught up for today</p>
              <button className="text-[#ff5a00] hover:text-[#e04e00] text-[13px] font-black tracking-wider transition-colors hover:underline uppercase">
                  View Archive
              </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default Notifications;
