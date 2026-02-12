import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Hexagon
} from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    terms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col font-sans overflow-x-hidden relative">
      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Manrope', sans-serif;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .bg-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
        }
      `}</style>

      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#020617] via-[#0F172A] to-[#020617] z-0" />
      <div className="fixed inset-0 bg-grain z-0 pointer-events-none" />
      
      {/* Animated Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] bg-[#5a5cf2]/20 rounded-full blur-[100px] top-[-10%] left-[-10%] z-0"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] bottom-[10%] right-[-5%] z-0"
      />
      <div className="absolute w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] top-[20%] right-[15%] z-0" />

      {/* Header */}
      <header className="relative z-10 w-full px-8 py-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="size-10 bg-[#5a5cf2] rounded-xl flex items-center justify-center shadow-lg shadow-[#5a5cf2]/20 group-hover:shadow-[#5a5cf2]/40 transition-all">
            <Hexagon className="text-white size-6 fill-white" />
          </div>
          <span className="text-white text-xl font-bold tracking-tight">Tasyai</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Community', 'Platform'].map((item) => (
            <a 
              key={item}
              href="#" 
              className="text-slate-400 hover:text-white transition-colors text-sm font-medium relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5a5cf2] transition-all group-hover:w-full" />
            </a>
          ))}
          <Link to="/login" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-2 rounded-full text-sm font-semibold transition-all backdrop-blur-md hover:border-white/20">
            Login
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card w-full max-w-[520px] rounded-[24px] p-8 md:p-12 shadow-2xl relative"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center size-14 bg-[#5a5cf2]/10 rounded-2xl mb-6">
              <Rocket className="text-[#5a5cf2] size-7" />
            </div>
            <h1 className="text-white text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
              Create your account
            </h1>
            <p className="text-slate-400 text-base">
              Join the ecosystem and start collaborating today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-slate-300 text-sm font-semibold ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center text-slate-500 group-focus-within:text-[#5a5cf2] transition-colors">
                    <User className="size-5" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#5a5cf2]/50 focus:ring-4 focus:ring-[#5a5cf2]/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-slate-300 text-sm font-semibold ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center text-slate-500 group-focus-within:text-[#5a5cf2] transition-colors">
                    <Mail className="size-5" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#5a5cf2]/50 focus:ring-4 focus:ring-[#5a5cf2]/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none transition-all"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-slate-300 text-sm font-semibold ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center text-slate-500 group-focus-within:text-[#5a5cf2] transition-colors">
                    <Lock className="size-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#5a5cf2]/50 focus:ring-4 focus:ring-[#5a5cf2]/20 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-slate-600 outline-none transition-all"
                    placeholder="Min. 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 px-1">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="mt-1 rounded bg-white/5 border-white/20 text-[#5a5cf2] focus:ring-offset-[#020617] focus:ring-[#5a5cf2]/50 size-4 cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-slate-400 leading-relaxed cursor-pointer">
                I agree to the <a className="text-[#5a5cf2] hover:underline font-medium" href="#">Terms & Conditions</a> and <a className="text-[#5a5cf2] hover:underline font-medium" href="#">Privacy Policy</a>.
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => navigate('/OnboardingChatbot')}
              className="w-full bg-[#5a5cf2] hover:bg-[#5a5cf2]/90 text-white font-bold py-4 rounded-full shadow-lg shadow-[#5a5cf2]/30 transition-all flex items-center justify-center gap-2 group"
            >
              Start Onboarding
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Divider */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-4 text-slate-500 text-xs font-bold uppercase tracking-widest">Or sign up with</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            {/* Social Buttons */}
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="size-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white transition-colors"
              >
                <svg className="size-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="size-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white transition-colors"
              >
                <svg className="size-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.button>
            </div>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-slate-400 text-sm">
                Already have an account? <Link className="text-[#5a5cf2] font-bold hover:underline" to="/login">Login</Link>
              </p>
            </div>
          </form>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-8 text-center">
        <p className="text-slate-600 text-xs font-medium">
          © 2024 Tasyai Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Register;