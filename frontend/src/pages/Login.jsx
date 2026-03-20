import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { Hexagon } from 'lucide-react';
import { useSignIn, useUser, useClerk } from "@clerk/clerk-react";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      if (!signInLoaded) return;
      setIsRedirecting(true);
      
      // Force account selection: Sign out if already signed in
      if (isSignedIn) {
        await signOut();
      }

      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
        prompt: 'select_account' // This forces the account picker
      });
    } catch (err) {
      console.error("Google login error:", err);
      setIsRedirecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col items-center justify-center font-sans text-gray-900 relative">
      <SEO 
        title="Login"
        description="Login to Tasyai to access your startup dashboard and connect with top talent."
      />

      {isRedirecting && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-[#F8F7F4]/90 backdrop-blur-sm flex items-center justify-center flex-col gap-6"
        >
          <div className="size-12 border-4 border-[#ff5a00] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium text-sm animate-pulse">Connecting to Secure Portal...</p>
        </motion.div>
      )}

      {/* Main Container */}
      <div className="w-full max-w-[420px] flex flex-col items-center px-4 relative z-10">
        
        {/* Logo Area */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-[#ff5a00] flex items-center justify-center mb-4">
            <Hexagon className="w-7 h-7 text-white fill-white" />
          </div>
          <h1 className="text-[20px] font-bold tracking-tight text-gray-900">Tasyai</h1>
        </div>

        {/* Login Card */}
        <div className="w-full bg-white border border-gray-200 py-10 px-8 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-[24px] font-bold mb-2 text-gray-900 tracking-tight">Login</h2>
            <p className="text-gray-500 text-[14px]">Sign in to your account to continue</p>
          </div>
          
          <button
            onClick={handleGoogleLogin}
            disabled={!signInLoaded}
            className={`w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-2.5 font-semibold text-[13px] transition-all ${!signInLoaded ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="mt-8 border-t border-gray-100 pt-6 text-center">
            <p className="text-gray-500 text-[13px]">
              New to Tasyai?{' '}
              <Link to="/register" className="text-[#ff5a00] font-bold hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <footer className="absolute bottom-10 w-full flex justify-center items-center gap-4 text-gray-400 text-[12px] font-medium">
        <a href="#" className="hover:text-gray-600 transition-colors">Guidelines</a>
        <span className="text-gray-300">|</span>
        <a href="#" className="hover:text-gray-600 transition-colors">FAQ</a>
        <span className="text-gray-300">|</span>
        <a href="#" className="hover:text-gray-600 transition-colors">Terms</a>
        <span className="text-gray-300">|</span>
        <a href="#" className="hover:text-gray-600 transition-colors">Privacy</a>
        <span className="text-gray-300">|</span>
        <a href="#" className="hover:text-gray-600 transition-colors">Contact</a>
      </footer>
    </div>
  );
};

export default Login;