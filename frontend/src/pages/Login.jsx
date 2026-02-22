import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import authService from '../services/authService';
import { 
  Hexagon,
  Sparkles,
  Zap,
  Users,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useSignIn } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { isSignedIn, isLoaded: userLoaded, user } = useUser();

  const handleGoogleLogin = async () => {
    try {
      if (!signInLoaded) return;
      if (isSignedIn) return;

      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard"
      });
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  useEffect(() => {
    const syncClerkUser = async () => {
      if (!userLoaded || !isSignedIn || !user) return;

      try {
        const res = await authService.googleLogin({
          name: user.fullName,
          email: user.primaryEmailAddress?.emailAddress,
          profilePicture: user.imageUrl
        });

        if (res && res.isOnboarded) {
          navigate("/dashboard");
        } else {
          navigate("/OnboardingChatbot");
        }
      } catch (err) {
        console.error("Backend sync failed:", err);
      }
    };

    if (isSignedIn && userLoaded) {
      syncClerkUser();
    }
  }, [isSignedIn, userLoaded, user, navigate]);

  const features = [
    { icon: <Zap className="size-5" />, title: "Instant Access", desc: "Collaborate with high-growth startups immediately." },
    { icon: <Users className="size-5" />, title: "Verified Network", desc: "Connect with vetted founders and top-tier builders." },
    { icon: <ShieldCheck className="size-5" />, title: "Secure & Simple", desc: "Enterprise-grade security with seamless Google auth." }
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center overflow-hidden relative font-sans text-white">
      <SEO 
        title="Login"
        description="Login to Tasyai to access your startup dashboard and connect with top talent."
      />

      {/* Decorative Background */}
      <div className="fixed inset-0 z-0">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#4245f0]/30 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-indigo-600/20 rounded-full blur-[150px]"
        />
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0" />

      <main className="relative z-10 w-full max-w-4xl p-4 flex flex-col md:flex-row gap-6 items-center">
        {/* Left Side: Brand & Features (Desktop) */}
        <div className="flex-1 hidden md:flex flex-col gap-6 pr-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="size-10 bg-[#4245f0] rounded-xl flex items-center justify-center shadow-lg shadow-[#4245f0]/20">
              <Hexagon className="size-7 fill-white text-white" />
            </div>
            <h2 className="text-2xl font-black tracking-tighter">Tasyai</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-4">
              Welcome to the<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4245f0] to-indigo-400 italic">Future of Build</span>
            </h1>
            <p className="text-slate-400 text-base max-w-sm font-light leading-relaxed">
              Skip the resumes. Join a community of builders solving real-world challenges.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {features.slice(0, 2).map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5"
              >
                <div className="p-2 bg-[#4245f0]/10 rounded-lg text-[#4245f0]">
                  {f.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-0.5">{f.title}</h4>
                  <p className="text-slate-500 text-xs">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Login Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[420px] glass-card rounded-[28px] p-8 md:p-10 border border-white/10 relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10">
            {/* Header (Mobile Logo) */}
            <div className="md:hidden flex flex-col items-center gap-3 mb-6 text-center">
               <div className="size-12 bg-[#4245f0] rounded-xl flex items-center justify-center shadow-xl">
                 <Hexagon className="size-8 fill-white" />
               </div>
               <h1 className="text-3xl font-black">Tasyai</h1>
            </div>

            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#4245f0]/10 border border-[#4245f0]/20 text-[#4245f0] text-[10px] font-black uppercase tracking-widest mb-3">
                <Sparkles className="size-3" />
                Auth by Clerk
              </span>
              <h2 className="text-2xl font-bold mb-2">Sign in to continue</h2>
              <p className="text-slate-400 text-sm">One-click secure access.</p>
            </div>

            <motion.button
              whileHover={signInLoaded ? { scale: 1.02, y: -2 } : {}}
              whileTap={signInLoaded ? { scale: 0.98 } : {}}
              onClick={handleGoogleLogin}
              disabled={!signInLoaded}
              className={`w-full group relative flex items-center justify-center gap-3 bg-white text-black py-4 rounded-xl font-black text-lg transition-all ${!signInLoaded ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'}`}
            >
              <svg className="size-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google Login
              <ArrowRight className="size-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </motion.button>

            <div className="mt-8 text-center border-t border-white/5 pt-6">
              <p className="text-slate-500 text-sm font-medium">
                Don't have an account? 
                <Link to="/register" className="text-[#4245f0] font-black ml-2 hover:underline tracking-tight">Join Node</Link>
              </p>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 p-16 bg-[#4245f0]/5 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"></div>
        </motion.div>
      </main>

      {/* Footer Links */}
      <footer className="fixed bottom-8 w-full flex justify-center gap-8 text-slate-500 text-xs font-semibold z-10">
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Help</a>
      </footer>
    </div>
  );
};

export default Login;