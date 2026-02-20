import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import authService from '../services/authService';
import { 
  KeyRound, 
  Mail, 
  ShieldQuestion, 
  ArrowRight, 
  ArrowLeft,
  Loader2,
  CheckCircle2,
  MessageSquare,
  User,
  History,
  Hexagon,
  Lock,
  Eye,
  EyeOff,
  Send
} from 'lucide-react';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: Security Question, 3: Success, 4: Support Request
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Support Form State
  const [supportData, setSupportData] = useState({
    fullName: '',
    reason: ''
  });

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await authService.getSecurityQuestion(email);
      setQuestion(res.securityQuestion);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Email not found or error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await authService.resetPassword(email, answer, newPassword);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Incorrect answer or error.');
    } finally {
      setLoading(false);
    }
  };

  const handleSupportSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await authService.submitFallbackRequest({
        email,
        fullName: supportData.fullName,
        reason: supportData.reason
      });
      alert('Support request submitted. Admin will contact you.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#4245f0]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-[500px] rounded-[32px] p-8 md:p-10 shadow-2xl relative z-10 border border-white/10"
      >
        <Link to="/login" className="absolute top-8 left-8 text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="size-4" />
          Back
        </Link>
        
        <div className="flex flex-col items-center mb-10 mt-4">
            <div className="size-14 bg-[#4245f0]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#4245f0]/20">
              <KeyRound className="size-8 text-[#4245f0]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Password Recovery</h1>
            <p className="text-slate-400 text-sm text-center">
              {step === 1 && "Enter your email to locate your account"}
              {step === 2 && "Answer your security question"}
              {step === 4 && "Submit a request to our support team"}
            </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl text-center font-medium"
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleEmailSubmit} 
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Registered Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#4245f0] transition-colors size-5" />
                  <input 
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-[#4245f0]/50 outline-none transition-all"
                    placeholder="founder@tasyai.com"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 gradient-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-[#4245f0]/20"
              >
                {loading ? <Loader2 className="size-5 animate-spin" /> : "Verify Identity"}
                {!loading && <ArrowRight className="size-5" />}
              </button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleResetSubmit} 
              className="space-y-6"
            >
              <div className="p-5 rounded-2xl bg-[#4245f0]/5 border border-[#4245f0]/10 mb-6">
                <div className="flex items-center gap-2 text-slate-300 text-xs font-bold mb-2 uppercase tracking-widest">
                  <ShieldQuestion className="size-4 text-[#4245f0]" />
                  Your Security Question
                </div>
                <p className="text-white italic text-lg leading-relaxed">"{question}"</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Your Answer</label>
                  <input 
                    required
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-[#4245f0]/50 outline-none transition-all"
                    placeholder="Type your answer here..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                  <div className="relative">
                    <input 
                      required
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-[#4245f0]/50 outline-none transition-all"
                      placeholder="Min. 6 characters"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 gradient-emerald text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/20"
              >
                {loading ? <Loader2 className="size-5 animate-spin" /> : "Update Password"}
                {!loading && <CheckCircle2 className="size-5" />}
              </button>

              <button 
                type="button"
                onClick={() => setStep(4)}
                className="w-full text-slate-400 hover:text-white transition-colors text-sm font-medium"
              >
                Forgot your security answer?
              </button>
            </motion.form>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="size-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                <CheckCircle2 className="size-10 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
              <p className="text-slate-400 mb-8">Your password has been reset successfully. You can now login with your new credentials.</p>
              <Link 
                to="/login"
                className="inline-flex items-center justify-center gap-2 w-full py-4 px-8 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-500/30"
              >
                Proceed to Login
                <ArrowRight className="size-5" />
              </Link>
            </motion.div>
          )}

          {step === 4 && (
            <motion.form 
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSupportSubmit} 
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors size-5" />
                    <input 
                      required
                      type="text"
                      value={supportData.fullName}
                      onChange={(e) => setSupportData({...supportData, fullName: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-amber-500/50 outline-none transition-all"
                      placeholder="Alex Rivera"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Reason for Reset</label>
                  <div className="relative group">
                    <MessageSquare className="absolute left-4 top-4 text-slate-500 group-focus-within:text-amber-500 transition-colors size-5" />
                    <textarea 
                      required
                      rows="4"
                      value={supportData.reason}
                      onChange={(e) => setSupportData({...supportData, reason: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-amber-500/50 outline-none transition-all resize-none"
                      placeholder="e.g. I forgotten my security answer..."
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
              >
                {loading ? <Loader2 className="size-5 animate-spin" /> : "Submit Support Request"}
                {!loading && <Send className="size-5" />}
              </button>

              <button 
                type="button"
                onClick={() => setStep(2)}
                className="w-full text-slate-500 hover:text-slate-300 transition-colors text-xs font-medium"
              >
                Back to security question
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ResetPassword;