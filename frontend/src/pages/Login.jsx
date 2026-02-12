import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  Hexagon
} from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center overflow-hidden relative font-sans">

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Manrope', sans-serif;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.8);
        }
        
        .orb-1 {
          background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(99, 102, 241, 0) 70%);
        }
        
        .orb-2 {
          background: radial-gradient(circle, rgba(20, 184, 166, 0.3) 0%, rgba(20, 184, 166, 0) 70%);
        }
        
        .primary-gradient {
          background: linear-gradient(135deg, #6467f2 0%, #4338ca 100%);
        }
      `}</style>

      <div className="fixed inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] orb-1 rounded-full blur-[80px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.9, 0.6]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] orb-2 rounded-full blur-[100px]"
        />
      </div>


      <div className="fixed inset-0 pointer-events-none opacity-[0.03] contrast-150 brightness-150 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0" />

   <main className="relative z-10 w-full max-w-[480px] p-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-8 md:p-12 flex flex-col items-center"
        >
          {/* Logo Section */}
          <div className="mb-8 flex flex-col items-center gap-2">
            <div className="size-12 bg-[#6467f2]/20 rounded-full flex items-center justify-center border border-[#6467f2]/30 text-[#6467f2]">
              <Hexagon className="size-8 fill-current" />
            </div>
            <h2 className="text-white text-xl font-extrabold tracking-tight">Tasyai</h2>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-white text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-slate-400 text-sm">Login to continue collaborating</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-slate-300 text-sm font-medium ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 size-5 group-focus-within:text-[#6467f2] transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-full py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-[#6467f2]/50 focus:border-[#6467f2] transition-all duration-200 outline-none"
                  placeholder="e.g. founder@startup.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="block text-slate-300 text-sm font-medium">Password</label>
                <Link to="/reset-password" className="text-[#6467f2] text-xs font-semibold hover:underline">Forgot password?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 size-5 group-focus-within:text-[#6467f2] transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-full py-4 pl-12 pr-12 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-[#6467f2]/50 focus:border-[#6467f2] transition-all duration-200 outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(100, 103, 242, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full primary-gradient text-white font-bold py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#6467f2]/20"
            >
              Sign In
            </motion.button>

            {/* Divider */}
            <div className="relative flex items-center gap-4 py-2">
              <div className="h-px bg-slate-700/50 flex-grow"></div>
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">OR CONTINUE WITH</span>
              <div className="h-px bg-slate-700/50 flex-grow"></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="flex items-center justify-center gap-2 bg-white/5 border border-slate-700/50 py-3 rounded-full text-slate-300 text-sm font-semibold transition-colors"
              >
                <svg className="size-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="flex items-center justify-center gap-2 bg-white/5 border border-slate-700/50 py-3 rounded-full text-slate-300 text-sm font-semibold transition-colors"
              >
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                GitHub
              </motion.button>
            </div>
          </form>

          {/* Footer Section */}
          <div className="mt-10 text-center">
            <p className="text-slate-400 text-sm">
              Don't have an account? 
              <Link to="/register" className="text-[#6467f2] font-bold hover:underline ml-1">Create an account</Link>
            </p>
          </div>
        </motion.div>

        {/* Temporary Testing Navigation */}
        <div className="mt-8 text-center space-y-3">
          <p className="text-xs text-yellow-500/60 font-medium">
            ⚠️ Testing Links (To be removed after backend integration)
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              to="/dashboard" 
              className="px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 text-xs rounded-lg border border-slate-700/50 transition-colors"
            >
              1. Dashboard
            </Link>
            <Link 
              to="/found-talent" 
              className="px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 text-xs rounded-lg border border-slate-700/50 transition-colors"
            >
              2. Found Talent
            </Link>
            <Link 
              to="/OnboardingChatbot" 
              className="px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 text-xs rounded-lg border border-slate-700/50 transition-colors"
            >
              3. Chatbot
            </Link>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-8 flex justify-center gap-6 text-slate-500 text-xs">
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Help Center</a>
        </div>
      </main>
    </div>
  );
};

export default Login;