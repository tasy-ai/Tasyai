import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Rocket,
  Compass,
  Star,
  User,
  Book,
  Settings,
  Menu,
  LogOut,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const sidebarVariants = {
    open: {
      width: "18rem",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: {
      width: "5rem", 
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, width: 0, transition: { duration: 0.2 } },
    visible: { opacity: 1, width: "auto", transition: { duration: 0.2, delay: 0.1 } }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { width: "18rem", x: 0 },
          closed: { 
            width: "5rem", 
            // On mobile, we might want x: -100%, but for now relying on CSS classes for mobile transform
            // We use className for the responsive base, and animate for width smoothing on desktop
          }
        }}
        // Using layout prop for automatic smoothing of class changes especially useful for desktop width
        layout
        className={`fixed left-0 top-0 h-full z-40 flex flex-col sidebar-glass border-r border-white/5 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{ width: isOpen ? '18rem' : '5rem' }} // Fallback/Base
      >
        <div className={`flex flex-col h-full ${isOpen ? 'p-6' : 'p-4 items-center'} transition-all`}>
          
          {/* Header */}
          <div className={`flex items-center mb-8 ${isOpen ? 'justify-start gap-4' : 'justify-center'}`}>
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors absolute right-0 top-6 mr-[-12px] md:static md:mr-0 z-50 bg-[#020617] md:bg-transparent border md:border-none border-white/10"
            >
               <Menu className="size-6" />
            </button>
            
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={textVariants}
                  className="flex items-center gap-3 overflow-hidden"
                >
              
                  <div className="whitespace-nowrap">
                    <h1 className="text-lg font-bold tracking-tight text-white">Tasyai</h1>
                    <p className="text-[10px] text-slate-400">Discovery Engine</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 w-full">
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-3 rounded-xl transition-all group ${
                isOpen ? 'px-4 py-3' : 'p-3 justify-center'
              } ${
                isActive('/dashboard')
                  ? 'bg-[#6467f2]/20 text-[#6467f2] border border-[#6467f2]/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Compass className={`size-[22px] shrink-0 ${isActive('/dashboard') ? 'fill-current' : ''}`} />
              <AnimatePresence>
                {isOpen && (
                  <motion.span 
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="text-sm font-semibold whitespace-nowrap overflow-hidden"
                  >
                    Discover Companies
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-3 rounded-xl transition-all group ${
                isOpen ? 'px-4 py-3' : 'p-3 justify-center'
              } text-slate-400 hover:bg-white/5 hover:text-white`}
            >
              <Star className="size-[22px] shrink-0" />
              <AnimatePresence>
                {isOpen && (
                  <motion.span 
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="text-sm font-medium whitespace-nowrap overflow-hidden"
                  >
                    My Interests
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-3 rounded-xl transition-all group ${
                isOpen ? 'px-4 py-3' : 'p-3 justify-center'
              } text-slate-400 hover:bg-white/5 hover:text-white`}
            >
              <Book className="size-[22px] shrink-0" />
              <AnimatePresence>
                {isOpen && (
                  <motion.span 
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="text-sm font-medium whitespace-nowrap overflow-hidden"
                  >
                    Saved Companies
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <Link 
              to="/my-startups" 
              className={`flex items-center gap-3 rounded-xl transition-all group ${
                isOpen ? 'px-4 py-3' : 'p-3 justify-center'
              } ${
                isActive('/my-startups')
                  ? 'bg-[#6467f2]/20 text-[#6467f2] border border-[#6467f2]/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Rocket className={`size-[22px] shrink-0 ${isActive('/my-startups') ? 'fill-current' : ''}`} />
              <AnimatePresence>
                {isOpen && (
                  <motion.span 
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="text-sm font-medium whitespace-nowrap overflow-hidden"
                  >
                    My Startups
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <Link 
              to="/notifications" 
              className={`flex items-center gap-3 rounded-xl transition-all group ${
                isOpen ? 'px-4 py-3' : 'p-3 justify-center'
              } ${
                isActive('/notifications')
                  ? 'bg-[#6467f2]/20 text-[#6467f2] border border-[#6467f2]/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Bell className={`size-[22px] shrink-0 ${isActive('/notifications') ? 'fill-current' : ''}`} />
              <AnimatePresence>
                {isOpen && (
                  <motion.span 
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="text-sm font-medium whitespace-nowrap overflow-hidden"
                  >
                    Notifications
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <Link 
              to="/found-talent" 
              className={`flex items-center gap-3 rounded-xl transition-all group ${
                isOpen ? 'px-4 py-3' : 'p-3 justify-center'
              } ${
                isActive('/found-talent')
                  ? 'bg-[#6467f2]/20 text-[#6467f2] border border-[#6467f2]/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <User className={`size-[22px] shrink-0 ${isActive('/found-talent') ? 'fill-current' : ''}`} />
              <AnimatePresence>
                {isOpen && (
                  <motion.span 
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="text-sm font-semibold whitespace-nowrap overflow-hidden"
                  >
                    Peoples
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </nav>

          {/* Bottom Section */}
          <div className={`mt-auto pt-6 border-t border-white/10 w-full ${!isOpen && 'flex flex-col items-center'}`}>
            <Link 
              to="/settings" 
              className={`flex items-center gap-3 rounded-xl transition-all group ${
                isOpen ? 'px-4 py-3' : 'p-3 justify-center'
              } ${
                isActive('/settings')
                  ? 'bg-[#6467f2]/20 text-[#6467f2] border border-[#6467f2]/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Settings className={`size-[22px] shrink-0 ${isActive('/settings') ? 'fill-current' : ''}`} />
              <AnimatePresence>
                {isOpen && (
                  <motion.span 
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="text-sm font-medium whitespace-nowrap overflow-hidden"
                  >
                    Settings
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            
            {/* Profile */}
            {/* Profile Menu Trigger */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={`mt-4 w-full flex items-center gap-3 rounded-xl transition-colors hover:bg-white/5 ${
                  isOpen ? 'px-2 py-2 text-left' : 'p-2 justify-center'
                }`}
              >
                <div className="size-10 rounded-full border border-white/10 overflow-hidden bg-gradient-to-br from-indigo-500/30 to-purple-500/30 shrink-0">
                  <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">
                    AR
                  </div>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="overflow-hidden"
                    >
                      <p className="text-sm font-semibold text-white truncate">Alex Rivera</p>
                      <p className="text-xs text-slate-500 truncate">Product Designer</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Popup Menu */}
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={`absolute bottom-full mb-2 bg-[#0f172a] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 ${
                      isOpen ? 'left-0 w-full' : 'left-full ml-2 w-48'
                    }`}
                  >
                    <div className="p-1">
                      <Link 
                        to="/profile"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <User className="size-4" />
                        <span>View Profile</span>
                      </Link>
                      <button 
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                      >
                        <LogOut className="size-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
