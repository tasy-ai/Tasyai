import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-[#020617] text-white font-sans min-h-screen flex overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main 
        className={`flex-1 overflow-y-auto h-screen bg-[#020617] transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-72' : 'md:ml-20'
        }`}
      >
        <Outlet context={{ isSidebarOpen, setIsSidebarOpen }} />
      </main>
    </div>
  );
};

export default MainLayout;
