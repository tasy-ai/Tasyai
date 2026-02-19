import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
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

import { useUser } from "@clerk/clerk-react";
import authService from './services/authService';
import React, { useEffect } from 'react';

import SsoCallback from './pages/SsoCallback'

// Hidden component to handle Clerk -> Backend sync
const AuthSync = () => {
  const { user: clerkUser, isLoaded: clerkLoaded, isSignedIn: clerkSignedIn } = useUser();

  useEffect(() => {
    const sync = async () => {
      const localUser = authService.getCurrentUser();
      
      // If signed in to Clerk but no local user OR not onboarded locally, sync with backend
      if (clerkLoaded && clerkSignedIn && (!localUser || !localUser.isOnboarded)) {
        try {
          console.log('Global Sync: Syncing Clerk user to backend...', clerkUser.primaryEmailAddress?.emailAddress);
          const userData = {
            email: clerkUser.primaryEmailAddress?.emailAddress,
            name: clerkUser.fullName,
            profilePicture: clerkUser.imageUrl,
          };
          const res = await authService.googleLogin(userData);
          
          // Only reload if we didn't have a local user before (to initialize state)
          // or if the onboarding status changed.
          if (!localUser || localUser.isOnboarded !== res.isOnboarded) {
             console.log('Global Sync: State changed, refreshing...');
             window.location.reload(); 
          }
        } catch (error) {
          console.error('Global Sync: Failed to sync Clerk user:', error);
        }
      }
    };
    sync();
  }, [clerkLoaded, clerkSignedIn, clerkUser]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <AuthSync />
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/sso-callback" element={<SsoCallback />} />  
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/found-talent" element={<FoundTalent />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-company" element={<CreateCompanyProfile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/my-startups" element={<MyStartups />} />
        <Route path="/company-detail" element={<CompanyDetail />} />
        <Route path="/profile-expansion" element={<ProfileExpansion />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/OnboardingChatbot" element={<OnboardingChatbot />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
