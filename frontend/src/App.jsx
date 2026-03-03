import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import MainLayout from './components/layout/MainLayout'
import Register from './pages/Register'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'
import FoundTalent from './pages/FoundTalent'
import Profile from './pages/Profile'
import CreateCompanyProfile from './pages/AddCompany'
import Notifications from './pages/Notifications'
import MyStartups from './pages/MyStartups'
import ProfileExpansion from './pages/ProfileExpansion'
import CompanyDetail from './pages/CompanyDetail'
import Settings from './pages/Settings'
import OnboardingChatbot from './pages/OnboardingChatbot'
import SavedCompanies from './pages/SavedCompanies'
import MyInterests from './pages/MyInterests'
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";
import authService from './services/authService';
import SsoCallback from './pages/SsoCallback';

// Hidden component to handle Clerk -> Backend sync
const AuthSync = ({ children }) => {
  const { user: clerkUser, isLoaded: clerkLoaded, isSignedIn: clerkSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSyncing, setIsSyncing] = React.useState(false);

  useEffect(() => {
    const sync = async () => {
      if (!clerkLoaded) return;
      
      const localUser = authService.getCurrentUser();
      
      // 1. Handle Signed In State
      if (clerkSignedIn) {
        // If no local user OR if clerk email doesn't match local user email (account switching)
        if (!localUser || (clerkUser.primaryEmailAddress?.emailAddress !== localUser.email)) {
          setIsSyncing(true);
          try {
            const userData = {
               email: clerkUser.primaryEmailAddress?.emailAddress,
               name: clerkUser.fullName,
               profilePicture: clerkUser.imageUrl,
            };
            const res = await authService.googleLogin(userData);
            
            // Redirect logic after initial sync
            if (!res.isOnboarded) {
              navigate('/OnboardingChatbot');
            } else if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/' || location.pathname === '/OnboardingChatbot') {
              navigate('/dashboard');
            }
          } catch (error) {
            console.error('Global Sync: Failed to sync Clerk user:', error);
          } finally {
            setIsSyncing(false);
          }
        } else {
           // Enforcement: If signed in, ensure they are where they belong
           if (!localUser.isOnboarded && location.pathname !== '/OnboardingChatbot') {
              navigate('/OnboardingChatbot');
           } else if (localUser.isOnboarded && location.pathname === '/OnboardingChatbot') {
              navigate('/dashboard');
           }
        }
      } 
      // 2. Handle Signed Out State
      else {
        // If Clerk says signed out but local user exists, clear it
        if (localUser) {
          authService.logout();
          window.location.reload(); // Refresh to clear context
          return;
        }

        const protectedRoutes = ['/dashboard', '/found-talent', '/profile', '/add-company', '/notifications', '/my-startups', '/company-detail', '/profile-expansion', '/settings', '/saved-companies', '/my-interests', '/OnboardingChatbot'];
        if (protectedRoutes.includes(location.pathname)) {
          navigate('/login');
        }
      }
    };
    sync();
  }, [clerkLoaded, clerkSignedIn, clerkUser?.id, location.pathname, navigate]);

  if (isSyncing || !clerkLoaded) {
    return (
      <div className="bg-[#020617] text-white flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#6467f2] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium">Synchronizing your ecosystem...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div id="clerk-captcha"></div>
      {children}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthSync>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/sso-callback" element={<SsoCallback />} />  
          
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/found-talent" element={<FoundTalent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-company" element={<CreateCompanyProfile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/my-startups" element={<MyStartups />} />
            <Route path="/company-detail" element={<CompanyDetail />} />
            <Route path="/profile-expansion" element={<ProfileExpansion />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/saved-companies" element={<SavedCompanies />} />
            <Route path="/my-interests" element={<MyInterests />} />
          </Route>

          <Route path="/OnboardingChatbot" element={<OnboardingChatbot />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthSync>
    </BrowserRouter>
  )
}
export default App;
