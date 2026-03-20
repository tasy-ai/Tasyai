import React, { useState, useRef, useEffect } from 'react';
import SEO from '../components/SEO';
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
import authService from '../services/authService';
import notificationService from '../services/notificationService';

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
    linkedin: '',
    github: '',
    portfolio: '',
    skills: [],
    skills_experience: '',
    profile_picture: null,
    profile_picture_preview: null
  });
  
  const [inputValue, setInputValue] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [isDragging, setIsDragging] = useState(false); // For drag and drop visual state
  
  const [messages, setMessages] = useState([
    { type: 'bot', content: "Hi! Let's set up your profile 👋", delay: 0 },
    { type: 'bot', content: "First things first, what's your full name?", delay: 800 }
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null); // Ref to trigger file input programmatically
 
  const totalSteps = steps.length;
  const progress = ((currentStep) / (totalSteps - 1)) * 100;

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, userData.profile_picture_preview]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  const handleComplete = async () => {
    try {
      let profilePictureData = userData.profile_picture;
      if (userData.profile_picture instanceof File) {
          const reader = new FileReader();
          reader.readAsDataURL(userData.profile_picture);
          await new Promise(resolve => reader.onload = () => {
              profilePictureData = reader.result;
              resolve();
          });
      }

      const dataToSend = {
          ...userData,
          profilePicture: profilePictureData
      };

      await authService.updateProfile(dataToSend);
      
      notificationService.addNotification({
          title: 'Profile Created!',
          message: 'Your profile has been successfully set up. Welcome to Tasyai!',
          type: 'success',
          iconName: 'CheckCircle2',
          color: 'bg-emerald-500/10 border-emerald-500/20'
      });

      if (onComplete) onComplete(userData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Profile update failed', error);
      alert('Failed to save profile. Please try again.');
    }
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

  const handleFileChange = (file) => {
    if (!file) return;
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

  const currentStepData = steps[currentStep];

  return (
    <div className="bg-white text-gray-900 font-sans min-h-screen w-full flex flex-col relative">
      <SEO 
        title="Complete Your Profile"
        description="Craft an amazing professional profile with our AI assistant on Tasyai."
      />

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white shrink-0 shadow-sm relative z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-[#ff5a00] flex items-center justify-center">
            <Bot className="text-white size-6" />
          </div>
          <div>
            <h1 className="font-black text-gray-900 leading-tight">Startup Assistant</h1>
            <p className="text-[10px] text-[#ff5a00] font-black tracking-widest uppercase mt-0.5">Online</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-1 bg-gray-200 overflow-hidden">
            <motion.div 
              className="h-full bg-[#ff5a00]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <span className="text-[11px] text-gray-500 font-semibold tracking-wide whitespace-nowrap">
            Step {Math.min(currentStep + 1, totalSteps)} of {totalSteps}
          </span>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 scroll-smooth max-w-4xl mx-auto w-full pb-36">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {msg.type === 'bot' && (
                <div className="w-10 h-10 rounded-sm bg-gray-100/80 flex items-center justify-center shrink-0">
                  <Bot className="text-gray-400 size-5" />
                </div>
              )}
              
              <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-md text-[15px] leading-relaxed shadow-sm font-medium ${
                msg.type === 'user' 
                  ? 'bg-gray-100 text-gray-800' 
                  : msg.type === 'sub' 
                    ? 'bg-transparent text-gray-400 p-0 ml-14 italic shadow-none'
                    : 'bg-gray-50 text-gray-700'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {currentStepData && !isTyping && currentStep < totalSteps - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="ml-0 md:ml-14 mt-4"
          >
            {currentStepData.options && (
              <div className={`grid gap-4 ${currentStepData.options.length > 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {currentStepData.options.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      className="group flex flex-col items-start p-6 rounded-md bg-white border border-gray-200 hover:border-[#ff5a00] hover:shadow-sm transition-all text-left"
                    >
                      <div className="mb-4">
                        <IconComponent className="size-6 text-[#ff5a00]" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-[15px] mb-1.5">{option.label}</h3>
                        <p className="text-[13px] text-gray-400 font-medium">{option.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {currentStepData.file && (
              <div className="space-y-4 max-w-sm">
                {!userData.profile_picture_preview ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`cursor-pointer flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-md transition-all duration-300 group
                      ${isDragging 
                        ? 'border-[#ff5a00] bg-[#ff5a00]/5 scale-[1.02]' 
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300'
                      }`}
                  >
                    <div className="flex flex-col items-center justify-center pointer-events-none">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300
                        ${isDragging ? 'bg-[#ff5a00] text-white' : 'bg-white border-gray-200 border text-gray-400 shadow-sm group-hover:text-[#ff5a00]'}`}>
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-[13px] text-gray-600 font-bold">
                        {isDragging ? 'Drop it here!' : 'Click or Drag photo here'}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1 uppercase font-bold tracking-wider">SVG, PNG, JPG up to 5MB</p>
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
                  <div className="relative w-full bg-white border border-gray-200 rounded-md p-5 flex flex-col items-center shadow-sm">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-sm mb-5 group ring-4 ring-gray-50">
                      <img 
                        src={userData.profile_picture_preview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                      <div 
                        onClick={clearFile}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <X className="text-white size-6" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-[13px] text-gray-500 font-semibold mb-5 bg-gray-50 py-1.5 px-3 rounded-full border border-gray-100 max-w-full">
                      <ImageIcon className="size-4 shrink-0" />
                      <span className="truncate">{userData.profile_picture?.name}</span>
                    </div>

                    <div className="flex gap-3 w-full">
                      <button 
                        onClick={clearFile}
                        className="flex-1 py-2.5 rounded-sm border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 text-sm font-bold transition-colors"
                      >
                        Change
                      </button>
                      <button 
                        onClick={confirmFile}
                        className="flex-[2] py-2.5 rounded-sm bg-[#ff5a00] text-white hover:bg-[#e04e00] text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="size-4" />
                        Confirm Photo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStepData.isSkillInput && (
              <div className="space-y-4 max-w-lg">
                <div className="flex flex-wrap gap-2 min-h-[40px]">
                  <AnimatePresence>
                    {userData.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-gray-100 border border-gray-200 text-gray-700 text-xs font-bold"
                      >
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="hover:text-[#ff5a00]">
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
                    className="w-full bg-white border border-gray-200 rounded-sm py-3.5 pl-4 pr-12 text-sm text-gray-900 focus:outline-none focus:border-[#ff5a00] transition-colors placeholder:text-gray-400 font-medium shadow-sm"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 flex items-center gap-1 bg-gray-50 py-1 px-2 rounded-sm border border-gray-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest leading-none mt-0.5">Enter</span>
                    <Plus className="size-3" />
                  </div>
                </div>

                {userData.skills.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={confirmSkills}
                    className="w-full py-3.5 bg-[#ff5a00] hover:bg-[#e04e00] text-white rounded-sm text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <CheckCircle2 className="size-4" />
                    Confirm {userData.skills.length} Skills
                  </motion.button>
                )}
              </div>
            )}
          </motion.div>
        )}

        {currentStepData?.summary && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ml-0 md:ml-14 bg-white border border-gray-200 rounded-md p-6 md:p-8 space-y-8 shadow-sm"
          >
            <div className="flex items-center gap-5 pb-6 border-b border-gray-100">
              {userData.profile_picture_preview ? (
                  <img src={userData.profile_picture_preview} alt="Profile" className="w-20 h-20 rounded-full object-cover border border-gray-200 shadow-sm" />
              ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center shadow-sm">
                      <User className="text-gray-300 size-10" />
                  </div>
              )}
              <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-1">{userData.name}</h2>
                  <p className="text-[#ff5a00] font-bold text-sm tracking-wide uppercase">{userData.role} <span className="text-gray-300 mx-2">•</span> {userData.country}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <SummaryItem label="Experience" value={userData.experience} />
              <SummaryItem label="Availability" value={userData.time} />
              <SummaryItem label="Motto" value={userData.motto} />
              <SummaryItem label="Looking for" value={userData.partnership} />
              <SummaryItem label="LinkedIn" value={userData.linkedin} />
              <SummaryItem label="GitHub" value={userData.github} />
              <SummaryItem label="Portfolio" value={userData.portfolio} />
              <div className="col-span-1 md:col-span-2">
                  <span className="block text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Skills</span>
                  <div className="flex flex-wrap gap-2">
                      {userData.skills.map(skill => (
                          <span key={skill} className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-sm text-xs font-bold text-gray-500">{skill}</span>
                      ))}
                  </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-50">
                <button
                onClick={handleComplete}
                className="w-full py-4 bg-[#ff5a00] hover:bg-[#e04e00] text-white rounded-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2"
                >
                <CheckCircle2 className="size-5" />
                Complete Profile Setup
                </button>
            </div>
          </motion.div>
        )}

        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-sm bg-gray-100/80 flex items-center justify-center shrink-0 border border-gray-100">
              <Bot className="text-gray-400 size-5" />
            </div>
            <div className="bg-gray-50 px-4 py-3 rounded-md flex gap-1.5 items-center h-10 shadow-sm border border-gray-100/50">
              <motion.span 
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-gray-300 rounded-full"
              />
              <motion.span 
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.2 }}
                className="w-1.5 h-1.5 bg-gray-300 rounded-full"
              />
              <motion.span 
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.4 }}
                className="w-1.5 h-1.5 bg-gray-300 rounded-full"
              />
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} className="h-4" />
      </main>

      {/* Persistent Bottom Footer / Input area */}
      <footer className="fixed bottom-0 left-0 w-full bg-white pb-6 pt-4 px-6 md:px-10 z-20 border-t border-gray-100 md:border-t-0 shadow-[0_-10px_40px_rgba(0,0,0,0.02)] md:shadow-none">
        <div className="absolute inset-x-0 bottom-full h-10 bg-gradient-to-t from-white to-transparent pointer-events-none hidden md:block" />
        
        {!currentStepData?.options && !currentStepData?.file && !currentStepData?.isSkillInput && !currentStepData?.summary && (
          <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
            <div className="w-full flex items-center gap-x-6">
               <button 
                 onClick={() => {
                   processStepData('Skipped');
                 }}
                 className="text-[11px] font-black text-gray-400 tracking-widest hover:text-gray-600 transition-colors uppercase shrink-0"
               >
                 Skip
               </button>
               
               <form onSubmit={handleInputSubmit} className="relative w-full flex items-center">
                 <input
                   type="text"
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
                   placeholder={currentStepData?.placeholder || "Type your answer here..."}
                   className="w-full bg-white border border-gray-200 rounded-sm py-4 pl-5 pr-28 text-gray-900 text-sm font-medium focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-50 transition-all placeholder:text-gray-300 placeholder:font-normal shadow-sm"
                   autoFocus
                 />
                 <button
                   type="submit"
                   disabled={!inputValue.trim()}
                   className="absolute right-2 top-2 bottom-2 px-6 bg-[#ff5a00] text-white rounded-sm hover:bg-[#e04e00] disabled:opacity-40 disabled:hover:bg-[#ff5a00] transition-colors flex items-center justify-center gap-2 font-bold text-[13px] shadow-sm"
                 >
                   Send <ArrowRight className="size-4" />
                 </button>
               </form>
            </div>
            
            <div className="mt-5 text-[10px] text-gray-400 font-bold tracking-widest uppercase">
              Press <span className="text-gray-600 mx-1">Enter</span> to send
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};

const SummaryItem = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1.5">{label}</span>
        <span className="text-gray-900 font-semibold text-[15px] truncate">{value || '-'}</span>
    </div>
);

export default OnboardingChatbot;
