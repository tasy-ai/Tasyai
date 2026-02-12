import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, 
  ArrowRight, 
//   Hub,
  Shield,
  Lock
} from 'lucide-react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col font-sans overflow-x-hidden relative">
      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Manrope', sans-serif;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .glow-orb {
          filter: blur(80px);
          opacity: 0.4;
        }
        
        .input-glass {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .input-glass:focus {
          border-color: #4245f0;
          box-shadow: 0 0 15px rgba(66, 69, 240, 0.3);
        }
      `}</style>

      {/* Ambient Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.5, 0.4]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-600 glow-orb"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] rounded-full bg-purple-700 glow-orb"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.08, 1],
            opacity: [0.35, 0.45, 0.35]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-[#4245f0] glow-orb"
        />
        
        {/* Grain Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[480px] glass-card rounded-xl p-10 md:p-12 shadow-2xl"
        >
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-10">
            <div className="size-12 bg-[#4245f0] rounded-xl flex items-center justify-center shadow-lg shadow-[#4245f0]/30 mb-4">
              {/* <Hub className="text-white size-7" /> */}
            </div>
            <h2 className="text-white text-xl font-extrabold tracking-tight">Tasyai Platform</h2>
          </div>

          {/* Success State */}
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="size-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="size-8 text-emerald-400" />
              </div>
              <h3 className="text-white text-2xl font-bold mb-3">Check your email</h3>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                We've sent a password reset link to <span className="text-white font-medium">{email}</span>
              </p>
              <button 
                onClick={() => {setIsSubmitted(false); setEmail('');}}
                className="text-[#4245f0] hover:text-indigo-400 transition-colors font-bold text-sm"
              >
                Send to another email
              </button>
            </motion.div>
          ) : (
            <>
              {/* Header Text */}
              <div className="text-center mb-8">
                <h1 className="text-white text-3xl font-bold mb-3 tracking-tight">Reset your password</h1>
                <p className="text-slate-400 text-base leading-relaxed">
                  Enter the email address associated with your account and we'll send you a link to reset your password.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-300 ml-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 size-5 group-focus-within:text-[#4245f0] transition-colors" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="input-glass w-full h-14 pl-12 pr-4 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:ring-0"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full h-14 bg-[#4245f0] hover:bg-indigo-500 text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-[#4245f0]/20 hover:shadow-[#4245f0]/40 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="size-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            </>
          )}

          {/* Footer Links */}
          <div className="mt-10 pt-8 border-t border-white/10 text-center">
            <p className="text-slate-400 font-medium">
              Remember your password? 
              <Link 
                to="/login" 
                className="text-[#4245f0] hover:text-indigo-400 transition-colors font-bold ml-1 inline-flex items-center gap-1 group"
              >
                Back to Login
                <ArrowRight className="size-4 group-hover:-translate-x-1 transition-transform rotate-180" />
              </Link>
            </p>
          </div>
        </motion.div>

        {/* System Status Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex items-center gap-4 text-slate-500 text-sm font-medium"
        >
          <div className="flex items-center gap-1.5">
            <span className="size-2 bg-emerald-500 rounded-full animate-pulse"></span>
            System Secure
          </div>
          <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
          <div className="flex items-center gap-1.5">
            <Lock className="size-3" />
            256-bit Encryption
          </div>
          <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
          <div className="flex items-center gap-1.5">
            <Shield className="size-3" />
            Protected
          </div>
        </motion.div>
      </main>

      {/* Simple Bottom Bar */}
      <footer className="p-6 relative z-10 text-center">
        <p className="text-slate-600 text-xs uppercase tracking-widest font-semibold">
          © 2024 Tasyai. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ResetPassword;