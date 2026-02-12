import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Bot,
  Send,
  CheckCircle2,
  Sparkles,
  Upload,
  X,
  Plus,
  ArrowRight,
  User,
  Image as ImageIcon
} from 'lucide-react';
import { steps } from '../data/chatbotData';

const OnboardingChatbot = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    name: '',
    country: '',
    experience: '',
    experience_desc: '',
    role: '',
    achievements: '',
    partnership: '',
    motto: '',
    time: '',
    skills: [],
    skills_experience: '',
    profile_picture: null,
    profile_picture_preview: null
  });
  
  const [inputValue, setInputValue] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [isDragging, setIsDragging] = useState(false); // For drag and drop visual state
  
  const [messages, setMessages] = useState([
    { type: 'bot', content: "Hey there! Welcome aboard 👋", delay: 0 },
    { type: 'bot', content: "I'm your AI assistant. Let's craft an amazing profile for you.", delay: 800 },
    { type: 'bot', content: "First things first, what's your full name?", delay: 1600 }
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null); // Ref to trigger file input programmatically
 
  const totalSteps = 12;
  const progress = ((currentStep) / (totalSteps - 1)) * 100;

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, userData.profile_picture_preview]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  const addMessage = (type, content, delay = 0) => {
    setTimeout(() => {
      setMessages(prev => [...prev, { type, content }]);
    }, delay);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    processStepData(inputValue);
    setInputValue('');
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!skillInput.trim()) return;
      const newSkill = skillInput.trim();
      if (!userData.skills.includes(newSkill)) {
        setUserData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setUserData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const confirmSkills = () => {
    if (userData.skills.length === 0) return;
    const skillsString = userData.skills.join(', ');
    addMessage('user', `My skills: ${skillsString}`, 0);
    proceedToNextStep();
  };

  const processStepData = (data) => {
    const currentStepData = steps[currentStep];
    setUserData(prev => ({ ...prev, [currentStepData.id]: data }));
    addMessage('user', data, 0);
    proceedToNextStep();
  };

  const proceedToNextStep = () => {
    setIsTyping(true);
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      setIsTyping(false);
      
      const nextStep = steps[currentStep + 1];
      if (nextStep) {
        addMessage('bot', nextStep.question, 500);
        if(nextStep.subtext) {
             addMessage('bot', nextStep.subtext, 1200, 'sub');
        }
      }
    }, 1000);
  };

  const handleOptionSelect = (optionId) => {
    const currentStepData = steps[currentStep];
    const selectedOption = currentStepData.options.find(opt => opt.id === optionId);
    setUserData(prev => ({ ...prev, [currentStepData.id]: optionId }));
    addMessage('user', selectedOption.label, 300);
    proceedToNextStep();
  };

  // --- FILE UPLOAD LOGIC ---

  const handleFileChange = (file) => {
    if (!file) return;
    // Simple validation
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
    }
    if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
    }

    const imageUrl = URL.createObjectURL(file);
    setUserData(prev => ({ 
      ...prev, 
      profile_picture: file,
      profile_picture_preview: imageUrl 
    }));
  };

  const handleFileSelect = (e) => {
    handleFileChange(e.target.files[0]);
  };

  // Drag and Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    setUserData(prev => ({ ...prev, profile_picture: null, profile_picture_preview: null }));
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  const confirmFile = () => {
    addMessage('user', '📎 Uploaded Profile Picture', 300);
    proceedToNextStep();
  };

  // --- END FILE UPLOAD ---

  const handleComplete = () => {
    if (onComplete) onComplete(userData);
    console.log('Final Data:', userData);
    navigate('/profile');
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="bg-[#020617] text-slate-100 font-sans min-h-screen w-full flex items-center justify-center p-0 md:p-6 overflow-hidden relative">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-3xl h-[100dvh] md:h-[85vh] flex flex-col bg-[#0B1120]/80 backdrop-blur-xl md:border md:border-white/10 md:rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-[#0B1120]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Bot className="text-white size-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight">Onboarding Assistant</h1>
              <div className="flex items-center gap-1.5">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <p className="text-[10px] text-slate-400 font-medium">Online</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1 w-1/3">
            <div className="flex justify-between w-full text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex items-end gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {msg.type === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/10">
                    <Bot className="text-indigo-400 size-4" />
                  </div>
                )}
                
                <div className={`max-w-[85%] md:max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.type === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : msg.type === 'sub' 
                      ? 'bg-transparent text-slate-400 p-0 shadow-none ml-11 italic'
                      : 'bg-slate-800/80 text-slate-200 border border-white/5 rounded-bl-none'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Interactive Components Area */}
          {currentStepData && !isTyping && currentStep < totalSteps - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="ml-11 mt-2"
            >
              {/* Option Cards */}
              {currentStepData.options && (
                <div className={`grid gap-3 ${currentStepData.options.length > 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                  {currentStepData.options.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option.id)}
                        className="group flex items-center gap-4 p-4 rounded-xl bg-slate-800/40 border border-white/5 hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all text-left"
                      >
                        <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
                          <IconComponent className="size-5 text-slate-400 group-hover:text-indigo-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-sm">{option.label}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">{option.desc}</p>
                        </div>
                        <ArrowRight className="size-4 text-slate-600 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* --- ENHANCED FILE UPLOAD ZONE --- */}
              {currentStepData.file && (
                <div className="space-y-4">
                  {!userData.profile_picture_preview ? (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`cursor-pointer flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl transition-all duration-300 group
                        ${isDragging 
                          ? 'border-indigo-500 bg-indigo-500/10 scale-[1.02]' 
                          : 'border-slate-700 bg-slate-800/30 hover:bg-slate-800/50 hover:border-indigo-500/50'
                        }`}
                    >
                      <div className="flex flex-col items-center justify-center pointer-events-none">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-all duration-300
                          ${isDragging ? 'bg-indigo-500 text-white scale-110' : 'bg-slate-700/50 text-slate-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-400'}`}>
                          <Upload className="w-7 h-7" />
                        </div>
                        <p className="text-sm text-slate-300 font-medium">
                          {isDragging ? 'Drop it here!' : 'Click or Drag photo here'}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG up to 5MB</p>
                      </div>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleFileSelect} 
                      />
                    </div>
                  ) : (
                    // Preview State
                    <div className="relative w-full bg-slate-800/40 border border-white/5 rounded-xl p-4 flex flex-col items-center animate-in fade-in zoom-in duration-300">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500/30 shadow-xl mb-4 group">
                        <img 
                          src={userData.profile_picture_preview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                        {/* Hover Overlay to change */}
                        <div 
                          onClick={clearFile}
                          className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <X className="text-white size-6" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                        <ImageIcon className="size-4" />
                        <span className="truncate max-w-[200px]">{userData.profile_picture?.name}</span>
                      </div>

                      <div className="flex gap-3 w-full">
                        <button 
                          onClick={clearFile}
                          className="flex-1 py-2.5 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 text-sm font-medium transition-colors"
                        >
                          Change
                        </button>
                        <button 
                          onClick={confirmFile}
                          className="flex-[2] py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 text-sm font-bold shadow-lg shadow-indigo-900/20 transition-colors flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 className="size-4" />
                          Confirm Photo
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Dynamic Skill Input */}
              {currentStepData.isSkillInput && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 min-h-[40px]">
                    <AnimatePresence>
                      {userData.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 text-xs font-medium"
                        >
                          {skill}
                          <button onClick={() => removeSkill(skill)} className="hover:text-white">
                            <X className="size-3" />
                          </button>
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleSkillKeyDown}
                      placeholder="Type a skill and press Enter..."
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <Plus className="size-4" />
                    </div>
                  </div>

                  {userData.skills.length > 0 && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={confirmSkills}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20"
                    >
                      <CheckCircle2 className="size-4" />
                      Confirm {userData.skills.length} Skills
                    </motion.button>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Summary View */}
          {currentStepData?.summary && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="ml-0 md:ml-11 bg-slate-800/40 border border-white/5 rounded-2xl p-6 md:p-8 space-y-6"
            >
              <div className="flex items-center gap-4 pb-6 border-b border-white/5">
                {userData.profile_picture_preview ? (
                    <img src={userData.profile_picture_preview} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/50" />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center">
                        <User className="text-slate-400 size-8" />
                    </div>
                )}
                <div>
                    <h2 className="text-xl font-bold text-white">{userData.name}</h2>
                    <p className="text-indigo-400 text-sm capitalize">{userData.role} • {userData.country}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <SummaryItem label="Experience" value={userData.experience} />
                <SummaryItem label="Availability" value={userData.time} />
                <SummaryItem label="Motto" value={userData.motto} />
                <SummaryItem label="Looking for" value={userData.partnership} />
                <div className="col-span-1 md:col-span-2">
                    <span className="block text-slate-500 text-xs uppercase tracking-wider mb-1">Skills</span>
                    <div className="flex flex-wrap gap-2">
                        {userData.skills.map(skill => (
                            <span key={skill} className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">{skill}</span>
                        ))}
                    </div>
                </div>
              </div>

              <button
                onClick={handleComplete}
                className="w-full mt-4 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-900/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Sparkles className="size-5" />
                Complete Setup
              </button>
            </motion.div>
          )}

          {/* --- WHATSAPP STYLE TYPING INDICATOR --- */}
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-end gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/10">
                <Bot className="text-indigo-400 size-4" />
              </div>
              
              {/* The Bubble */}
              <div className="bg-slate-800/80 border border-white/5 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1 items-center h-10 w-16 justify-center">
                {/* Dot 1 */}
                <motion.span 
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                />
                {/* Dot 2 */}
                <motion.span 
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.2 }}
                  className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                />
                {/* Dot 3 */}
                <motion.span 
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.4 }}
                  className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                />
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} className="h-4" />
        </main>

        {/* Footer */}
        <footer className="p-4 md:p-6 bg-[#0B1120]/80 border-t border-white/5 backdrop-blur-md">
          {/* Standard Text Input */}
          {!currentStepData?.options && !currentStepData?.file && !currentStepData?.isSkillInput && !currentStepData?.summary && (
            <form onSubmit={handleInputSubmit} className="relative flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={currentStepData?.placeholder || "Type your answer..."}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3.5 pl-5 pr-12 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                autoFocus
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="absolute right-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
              >
                <Send className="size-4" />
              </button>
            </form>
          )}
          
          {/* Helper text for specific states */}
          {currentStepData?.isSkillInput && (
              <div className="text-center text-xs text-slate-500">
                Press <span className="text-indigo-400 font-bold">Enter</span> to add a skill
              </div>
          )}
          {currentStepData?.file && !userData.profile_picture_preview && (
              <div className="text-center text-xs text-slate-500">
                Drag & drop or click to upload
              </div>
          )}
        </footer>
      </div>
    </div>
  );
};

const SummaryItem = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-slate-500 text-xs uppercase tracking-wider mb-1">{label}</span>
        <span className="text-slate-200 font-medium truncate">{value || '-'}</span>
    </div>
);

export default OnboardingChatbot;