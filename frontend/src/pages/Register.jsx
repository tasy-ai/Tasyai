import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import authService from '../services/authService';
import { 
  Rocket, 
  Hexagon,
  Sparkles,
  Zap,
  Globe,
  ArrowRight
} from 'lucide-react';
import { useSignUp } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

const Register = () => {
  const navigate = useNavigate();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const { isSignedIn, isLoaded: userLoaded, user } = useUser();

  const handleGoogleSignup = async () => {
    try {
      if (!signUpLoaded) return;
      if (isSignedIn) {
        navigate("/OnboardingChatbot");
        return;
      }

      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/OnboardingChatbot"
      });
    } catch (err) {
      console.error("Google signup error:", err);
    }
  };

  useEffect(() => {
    const syncClerkUser = async () => {
      if (!userLoaded) return;
      if (isSignedIn && user) {
        try {
          const res = await authService.googleLogin({
            name: user.fullName,
            email: user.primaryEmailAddress.emailAddress,
            profilePicture: user.imageUrl
          });

          if (res.isOnboarded) {
            navigate("/dashboard");
          } else {
            navigate("/OnboardingChatbot");
          }
        } catch (err) {
          console.error("Backend sync failed:", err);
        }
      }
    };
    syncClerkUser();
  }, [isSignedIn, userLoaded, navigate, user]);

  const valueProps = [
    { icon: <Rocket className="size-5" />, title: "Launch Fast", desc: "Build MVP ready projects with vetted teams." },
    { icon: <Zap className="size-5" />, title: "Proof-of-Work", desc: "Showcase your skills through real contributions." },
    { icon: <Globe className="size-5" />, title: "Global Network", desc: "Join 5,000+ builders from across the globe." }
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center overflow-hidden relative font-sans text-white">
      <SEO 
        title="Join Tasyai"
        description="Register for Tasyai and start your journey as a founder or talent in the startup ecosystem."
      />

      {/* Decorative Orbs */}
      <div className="fixed inset-0 z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#4245f0]/30 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0" />

      <main className="relative z-10 w-full max-w-5xl p-4 flex flex-col md:flex-row-reverse gap-6 items-center">
        {/* Right Side: Visual/Text Section */}
        <div className="flex-1 hidden md:flex flex-col gap-6 pl-8">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="size-10 bg-[#4245f0] rounded-xl flex items-center justify-center shadow-lg">
              <Hexagon className="size-7 fill-white text-white" />
            </div>
            <h2 className="text-2xl font-black tracking-tighter">Tasyai</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-4">
              Start your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4245f0] to-purple-400 italic">Builder Journey</span>
            </h1>
            <p className="text-slate-400 text-base max-w-sm font-light leading-relaxed">
              Connect with visionary founders and elite talent. Just pure creation.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {valueProps.slice(0, 2).map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
              >
                <div className="p-2 bg-[#4245f0]/10 rounded-lg text-[#4245f0]">
                  {p.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-0.5">{p.title}</h4>
                  <p className="text-slate-500 text-xs">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Left Side: Register Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[440px] glass-card rounded-[32px] p-8 md:p-10 border border-white/10 relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10 text-center">
             {/* Mobile Brand */}
             <div className="md:hidden flex flex-col items-center gap-3 mb-6">
               <div className="size-12 bg-[#4245f0] rounded-xl flex items-center justify-center">
                 <Hexagon className="size-8 fill-white" />
               </div>
               <h1 className="text-3xl font-black tracking-tighter text-white">Tasyai</h1>
            </div>

            <div className="mb-8">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#4245f0]/10 border border-[#4245f0]/20 text-[#4245f0] text-[10px] font-black uppercase tracking-widest mb-4">
                <Sparkles className="size-3" />
                Join builders
              </span>
              <h2 className="text-3xl font-black mb-2">Create Account</h2>
              <p className="text-slate-400 text-sm max-w-[280px] mx-auto leading-tight">Instant Google setup in seconds.</p>
            </div>

            <motion.button
              whileHover={signUpLoaded ? { scale: 1.02, y: -2 } : {}}
              whileTap={signUpLoaded ? { scale: 0.98 } : {}}
              onClick={handleGoogleSignup}
              disabled={!signUpLoaded}
              className={`w-full group relative flex items-center justify-center gap-3 bg-white text-black py-4 rounded-xl font-black text-lg transition-all ${!signUpLoaded ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'}`}
            >
              <svg className="size-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Join Google
              <ArrowRight className="size-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all font-black" />
            </motion.button>

            <div className="mt-10 pt-6 border-t border-white/5">
              <p className="text-slate-500 text-sm">
                Already member? 
                <Link to="/login" className="text-[#4245f0] font-black ml-2 hover:underline tracking-tight">Login Now</Link>
              </p>
              <p className="text-[9px] text-slate-600 uppercase tracking-tighter mt-4 max-w-[200px] mx-auto leading-none">
                By signing, you agree to Terms & Privacy
              </p>
            </div>
          </div>
          <div className="absolute top-0 left-0 p-20 bg-indigo-500/5 rounded-full blur-3xl -ml-16 -mt-16 pointer-events-none"></div>
        </motion.div>
      </main>

      {/* Persistent Decorative Link */}
      <footer className="fixed bottom-8 w-full flex justify-center text-slate-500 text-[10px] font-bold uppercase tracking-widest z-10">
        Design optimized for builders
      </footer>
    </div>
  );
};

export default Register;