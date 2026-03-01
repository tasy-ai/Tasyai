import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  X,
  Plus
} from 'lucide-react';
import notificationService from '../../services/notificationService';

const Sidebar = ({ isOpen, toggleSidebar }) => {
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
  }, [location.pathname]);

  // Close sidebar on navigation on mobile
  useEffect(() => {
    if (window.innerWidth < 768 && isOpen) {
      toggleSidebar();
    }
  }, [location.pathname]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Toggle Button (Fixed Top-Left) */}
      <motion.button 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-[100] p-3 rounded-xl bg-[#6467f2] text-white md:hidden shadow-lg shadow-[#6467f2]/20 hover:bg-[#6467f2]/90 transition-all flex items-center justify-center ${
          isOpen ? 'rotate-90' : 'rotate-0'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
              <Menu size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <aside 
        className={`fixed left-0 top-0 h-screen z-[90] flex flex-col bg-[#020617] border-r border-white/5 transition-all duration-500 ease-in-out ${
          isOpen 
            ? 'translate-x-0 w-72' 
            : '-translate-x-full md:translate-x-0 md:w-20'
        }`}
      >
        <div className={`flex flex-col h-full ${isOpen ? 'p-6' : 'p-4 items-center'} transition-all`}>
          
          {/* Logo Section */}
          <div className={`flex items-center mb-10 ${isOpen ? 'justify-between' : 'justify-center'}`}>
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigate('/dashboard')}
            >
              <div className="size-10 bg-[#6467f2] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Rocket className="size-6 text-white" />
              </div>
              <span className={`text-xl font-bold text-white transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                Tasyai
              </span>
            </div>
            {/* Desktop Toggle Button */}
            <button 
              onClick={toggleSidebar}
              className={`p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all md:flex hidden ${!isOpen && 'hidden'}`}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2 w-full overflow-y-auto no-scrollbar">
            <NavItem 
              to="/dashboard" 
              icon={<Compass />} 
              label="Discover Companies" 
              isOpen={isOpen} 
              isActive={isActive('/dashboard')}
            />
            
            <NavItem 
              to="/my-interests" 
              icon={<Star />} 
              label="My Interests" 
              isOpen={isOpen} 
              isActive={isActive('/my-interests')}
            />
            
            <NavItem 
              to="/saved-companies" 
              icon={<Book />} 
              label="Saved Companies" 
              isOpen={isOpen} 
              isActive={isActive('/saved-companies')}
            />

            <NavItem 
              to="/my-startups" 
              icon={<Rocket />} 
              label="My Startups" 
              isOpen={isOpen} 
              isActive={isActive('/my-startups')}
            />

            <NavItem 
              to="/notifications" 
              icon={<Bell />} 
              label="Notifications" 
              isOpen={isOpen} 
              isActive={isActive('/notifications')}
              count={unreadCount}
            />

            <NavItem 
              to="/found-talent" 
              icon={<User />} 
              label="Peoples" 
              isOpen={isOpen} 
              isActive={isActive('/found-talent')}
            />

            <div className={`mt-6 pt-6 border-t border-white/5 ${!isOpen && 'hidden'}`}>
               <Link 
                to="/add-company"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-[#6467f2] text-white hover:bg-[#6467f2]/90 transition-all font-semibold text-sm shadow-lg shadow-[#6467f2]/10"
              >
                <Plus className="size-4" />
                <span>Add Company</span>
              </Link>
            </div>
          </nav>

          {/* Bottom Controls */}
          <div className={`mt-auto pt-6 border-t border-white/5 w-full space-y-2 ${!isOpen && 'flex flex-col items-center'}`}>
            <NavItem 
              to="/settings" 
              icon={<Settings />} 
              label="Settings" 
              isOpen={isOpen} 
              isActive={isActive('/settings')}
            />
            
            {/* User Profile */}
            <div className="relative">
              {(() => {
                const user = authService.getCurrentUser() || {};
                const name = user.name || 'User';
                const role = user.role || 'Member';
                const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
                
                return (
                  <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className={`w-full flex items-center gap-3 rounded-2xl transition-all hover:bg-white/5 ${
                    isOpen ? 'px-3 py-2' : 'p-2 justify-center'
                  }`}
                >
                  <div className="size-10 rounded-xl bg-slate-800 flex items-center justify-center overflow-hidden border border-white/5">
                    {user.profilePicture ? (
                      <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-sm font-bold text-slate-400">{initials}</span>
                    )}
                  </div>
                  
                  <div className={`text-left overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 max-w-[150px]' : 'opacity-0 max-w-0'}`}>
                    <p className="text-sm font-bold text-white truncate">{name}</p>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{role}</p>
                  </div>
                </button>
                );
              })()}

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute bottom-full mb-4 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[100] p-1 min-w-[200px] ${
                      isOpen ? 'left-0 right-0' : 'left-full ml-4'
                    }`}
                  >
                    <Link 
                      to="/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                      <User className="size-4" />
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-all"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

// NavItem sub-component for cleaner code
const NavItem = ({ to, icon, label, isOpen, isActive, count }) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 rounded-2xl transition-all group relative ${
        isOpen ? 'px-4 py-3' : 'p-3 justify-center'
      } ${
        isActive
          ? 'bg-[#6467f2] text-white shadow-lg shadow-[#6467f2]/20'
          : 'text-slate-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
        {React.cloneElement(icon, { size: 20 })}
      </div>
      
      <span className={`text-sm font-semibold whitespace-nowrap overflow-hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0 pointer-events-none'
        }`}
      >
        {label}
      </span>

      {/* Count Badge */}
      {count > 0 && (
        <span className={`bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#020617] transition-all duration-300 ${
          isOpen ? 'px-1.5 min-w-[20px] h-5' : 'absolute top-1 right-1 size-4 border-none text-[8px]'
        }`}>
          {count}
        </span>
      )}

      {/* Tooltip for collapsed state */}
      {!isOpen && (
        <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100] border border-white/5 shadow-xl">
          {label}
        </div>
      )}
    </Link>
  );
};

export default Sidebar;
