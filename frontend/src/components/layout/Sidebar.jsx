import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { 
  Rocket,
  Compass,
  Star,
  User,
  Book,
  Settings,
  Menu,
  LogOut,
  Bell,
  CheckCircle2
} from 'lucide-react';
import { useClerk } from "@clerk/clerk-react";
import companyService from '../../services/companyService';
import notificationService from '../../services/notificationService';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { signOut } = useClerk();
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const checkNotifications = () => {
      const all = notificationService.getNotifications();
      const unread = all.filter(n => !n.read).length;
      setUnreadCount(unread);
    };

    checkNotifications();
    
    // Listen for new notifications
    window.addEventListener('new_notification', checkNotifications);
    return () => window.removeEventListener('new_notification', checkNotifications);
  }, [location.pathname]); // Also re-check on navigation


  const handleLogout = async () => {
    try {
      await signOut(); // Signs out from Clerk
      authService.logout(); // Clears local storage
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const linkActiveStyle = 'bg-orange-50 text-[#ff5a00] border border-orange-100 font-bold shadow-sm';
  const linkInactiveStyle = 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent font-medium';

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/20 z-40 md:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* Mobile Menu Button - Fixed when sidebar is closed */}
      {!isOpen && (
        <button 
          onClick={toggleSidebar}
          className="fixed top-4 right-4 z-50 p-2.5 rounded-sm bg-white border border-gray-200 text-gray-500 hover:text-gray-900 md:hidden shadow-sm transition-colors"
        >
          <Menu className="size-5" />
        </button>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full z-50 flex flex-col bg-white border-r border-gray-200 shadow-sm transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0 md:w-20'
        }`}
      >
        <div className={`flex flex-col h-full bg-white ${isOpen ? 'p-5' : 'p-3 items-center'} transition-all`}>
          
          {/* Header */}
          <div className={`flex items-center mb-8 mt-2 ${isOpen ? 'justify-between px-2' : 'justify-center'}`}>
            <div className={`flex items-center gap-3 overflow-hidden transition-all duration-500 ${isOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'}`}>
              <div className="flex items-center justify-center size-8 bg-[#ff5a00] text-white rounded-sm shrink-0 font-black text-lg">
                T
              </div>
              <div className="whitespace-nowrap">
                <h1 className="text-[17px] font-black tracking-tight text-gray-900">Tasyai</h1>
              </div>
            </div>

            <button 
              onClick={toggleSidebar}
              className={`p-2 rounded-sm text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors absolute right-[-12px] top-6 z-50 bg-white border border-gray-200 md:static md:mr-0 md:bg-transparent md:border-none ${!isOpen && 'hidden md:block md:mt-2'}`}
            >
               <Menu className="size-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1.5 w-full">
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-3 rounded-sm transition-all group ${
                isOpen ? 'px-4 py-3' : 'p-3 justify-center'
              } ${isActive('/dashboard') ? linkActiveStyle : linkInactiveStyle}`}
            >
              <Compass className={`size-[18px] shrink-0`} strokeWidth={2.5} />
              <span className={`text-[14px] whitespace-nowrap overflow-hidden transition-all duration-500 ${isOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'}`}>
                Discover
              </span>
            </Link>
            
            <Link 
              to="/my-interests" 
              className={`flex items-center gap-3 rounded-sm transition-all group ${
                isOpen ? 'px-4 py-3' : 'p-3 justify-center'
              } ${isActive('/my-interests') ? linkActiveStyle : linkInactiveStyle}`}
            >
              <Star className={`size-[18px] shrink-0`} strokeWidth={2.5} />
              <span className={`text-[14px] whitespace-nowrap overflow-hidden transition-all duration-500 ${isOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'}`}>
                My Interests
              </span>
            </Link>
            
            <Link 
              to="/saved-companies" 
              className={`flex items-center gap-3 rounded-sm transition-all group ${
                isOpen ? 'px-4 py-3' : 'p-3 justify-center'
              } ${isActive('/saved-companies') ? linkActiveStyle : linkInactiveStyle}`}
            >
              <Book className={`size-[18px] shrink-0`} strokeWidth={2.5} />
              <span className={`text-[14px] whitespace-nowrap overflow-hidden transition-all duration-500 ${isOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'}`}>
                Saved Companies
              </span>
            </Link>
            
            <Link 
              to="/my-startups" 
              className={`flex items-center gap-3 rounded-sm transition-all group ${
                isOpen ? 'px-4 py-3' : 'p-3 justify-center'
              } ${isActive('/my-startups') ? linkActiveStyle : linkInactiveStyle}`}
            >
              <Rocket className={`size-[18px] shrink-0`} strokeWidth={2.5} />
              <span className={`text-[14px] whitespace-nowrap overflow-hidden transition-all duration-500 ${isOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'}`}>
                My Startups
              </span>
            </Link>
            
            <Link 
              to="/notifications" 
              className={`flex items-center gap-3 rounded-sm transition-all group ${
                isOpen ? 'px-4 py-3' : 'p-3 justify-center'
              } ${isActive('/notifications') ? linkActiveStyle : linkInactiveStyle}`}
            >
              <div className="relative">
                <Bell className={`size-[18px] shrink-0`} strokeWidth={2.5} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 size-2 bg-[#ff5a00] rounded-full border-[1.5px] border-white"></span>
                )}
              </div>
              <span className={`flex-1 text-[14px] flex items-center justify-between whitespace-nowrap overflow-hidden transition-all duration-500 ${isOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'}`}>
                <span>Notifications</span>
                {unreadCount > 0 && isOpen && (
                   <span className="bg-[#ff5a00] text-white text-[10px] font-black px-1.5 py-0.5 rounded-sm">
                     {unreadCount}
                   </span>
                )}
              </span>
            </Link>

            <Link 
              to="/found-talent" 
              className={`flex items-center gap-3 rounded-sm transition-all group ${
                isOpen ? 'px-4 py-3' : 'p-3 justify-center'
              } ${isActive('/found-talent') ? linkActiveStyle : linkInactiveStyle}`}
            >
              <User className={`size-[18px] shrink-0`} strokeWidth={2.5} />
              <span className={`text-[14px] whitespace-nowrap overflow-hidden transition-all duration-500 ${isOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'}`}>
                Peoples
              </span>
            </Link>
          </nav>

          {/* Bottom Section */}
          <div className={`mt-auto pt-5 border-t border-gray-200 w-full ${!isOpen && 'flex flex-col items-center'}`}>
            <Link 
              to="/settings" 
              className={`flex items-center gap-3 rounded-sm transition-all group ${
                isOpen ? 'px-4 py-3' : 'p-3 justify-center'
              } ${isActive('/settings') ? linkActiveStyle : linkInactiveStyle}`}
            >
              <Settings className={`size-[18px] shrink-0`} strokeWidth={2.5} />
              <span className={`text-[14px] whitespace-nowrap overflow-hidden transition-all duration-500 ${isOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'}`}>
                Settings
              </span>
            </Link>
            
            {/* Profile */}
            <div className="relative">
              {(() => {
                const user = authService.getCurrentUser() || {};
                const name = user.name || 'Guest User';
                const role = user.role || 'Member';
                const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
                
                return (
                  <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className={`mt-3 w-full flex items-center gap-3 rounded-sm transition-colors hover:bg-gray-50 border border-transparent hover:border-gray-200 ${
                    isOpen ? 'px-2 py-2 text-left' : 'p-2 justify-center'
                  }`}
                >
                  <div className="size-9 rounded-sm border border-gray-200 overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
                    {user.profilePicture ? (
                         <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-gray-600 font-bold text-xs">{initials}</span>
                    )}
                  </div>
                  <div className={`flex-1 overflow-hidden transition-all duration-500 ${isOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'}`}>
                    <p className="text-[13px] font-bold text-gray-900 truncate">{name}</p>
                    <p className="text-[11px] font-medium text-gray-500 truncate mt-0.5">{role}</p>
                  </div>
                </button>
                );
              })()}

              {/* Popup Menu */}
              {showProfileMenu && (
                <div
                  className={`absolute bottom-full mb-2 bg-white border border-gray-200 rounded-sm shadow-md overflow-hidden z-50 ${
                    isOpen ? 'left-0 w-full' : 'left-full ml-2 w-48'
                  }`}
                >
                  <div className="p-1">
                    <Link 
                      to="/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2 w-full px-3 py-2.5 text-[13px] font-medium font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-sm transition-colors"
                    >
                      <User className="size-4" strokeWidth={2.5} />
                      <span>View Profile</span>
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-3 py-2.5 text-[13px] font-medium font-bold text-red-500 hover:text-red-600 hover:bg-red-50 rounded-sm transition-colors text-left"
                    >
                      <LogOut className="size-4" strokeWidth={2.5} />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
