import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Send,
  MoreVertical,
  Paperclip,
  Check,
  CheckCheck,
  ArrowLeft,
  Filter,
  Users,
  MessageSquare,
  Building2,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import authService from '../services/authService';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [isMobileListOpen, setIsMobileListOpen] = useState(true);
  const scrollRef = useRef(null);

  // Mock data for chats
  const [chats] = useState([
    {
      id: 1,
      name: 'Google',
      role: 'Frontend Developer Internship',
      lastMessage: 'Your application has been shortlisted for the next round.',
      time: '10:30 AM',
      unreadCount: 2,
      online: true,
      avatar: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
      messages: [
        { id: 1, text: 'Hello! I saw your profile on Tasyai.', sender: 'them', time: '10:00 AM' },
        { id: 2, text: 'Hi! Thank you for reaching out.', sender: 'me', time: '10:05 AM' },
        { id: 3, text: 'Your application has been shortlisted for the next round.', sender: 'them', time: '10:30 AM' }
      ]
    },
    {
      id: 2,
      name: 'Microsoft',
      role: 'Software Engineer Intern',
      lastMessage: 'When can we schedule the interview?',
      time: '9:45 AM',
      unreadCount: 0,
      online: false,
      avatar: 'https://cdn-icons-png.flaticon.com/512/732/732221.png',
      messages: [
        { id: 1, text: 'When can we schedule the interview?', sender: 'them', time: '9:45 AM' }
      ]
    },
    {
      id: 3,
      name: 'Meta',
      role: 'Product Design Intern',
      lastMessage: 'Great work on the previous assignment!',
      time: 'Yesterday',
      unreadCount: 0,
      online: true,
      avatar: 'https://cdn-icons-png.flaticon.com/512/6033/6033716.png',
      messages: [
        { id: 1, text: 'Great work on the previous assignment!', sender: 'them', time: 'Yesterday' }
      ]
    },
    {
      id: 4,
      name: 'Amazon',
      role: 'SDE Intern',
      lastMessage: 'We have received your application.',
      time: 'Mar 22',
      unreadCount: 0,
      online: false,
      avatar: 'https://cdn-icons-png.flaticon.com/512/732/732177.png',
      messages: [
        { id: 1, text: 'We have received your application.', sender: 'them', time: 'Mar 22' }
      ]
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (selectedChat) {
      selectedChat.messages.push(newMessage);
    }
    setMessage('');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedChat?.messages.length]);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.messages.some(m => m.text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-0px)] bg-[#F8F7F4] text-gray-900 font-sans">
      <div className="flex-1 flex overflow-hidden bg-white border-t border-gray-200 relative">

        {/* Sidebar - Chat List */}
        <div className={`w-full md:w-[400px] border-r border-gray-100 flex flex-col bg-[#FDFDFB] transition-all duration-300 ${!isMobileListOpen && 'hidden md:flex'}`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black tracking-tight text-gray-900 flex items-center gap-3">
                Messages
                {searchQuery && (
                  <span className="text-[10px] font-black bg-[#ff5a00]/10 text-[#ff5a00] px-2 py-0.5 rounded-sm uppercase tracking-widest">
                    {filteredChats.length} found
                  </span>
                )}
              </h2>
              <button className="p-2 hover:bg-gray-100 rounded-sm transition-colors text-gray-400">
                <Filter className="size-4" />
              </button>
            </div>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 group-focus-within:text-[#ff5a00] transition-colors z-10" />
              <input
                type="text"
                placeholder="Search by company, role or message..."
                className="w-full bg-white border border-gray-200 rounded-sm py-3.5 pl-11 pr-4 text-[14px] font-medium focus:outline-none focus:border-[#ff5a00]/50 focus:ring-4 focus:ring-[#ff5a00]/5 transition-all placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pb-10">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => {
                  setSelectedChat(chat);
                  setIsMobileListOpen(false);
                }}
                className={`w-full flex items-start gap-4 p-5 hover:bg-gray-50 transition-all text-left relative group border-b border-gray-50 ${selectedChat?.id === chat.id ? 'bg-[#ff5a00]/5 border-l-[4px] border-[#ff5a00]' : 'border-l-[4px] border-transparent'}`}
              >
                <div className="relative shrink-0 mt-1">
                  <div className="size-14 rounded-sm bg-white border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center p-2.5 group-hover:scale-105 transition-transform">
                    <img src={chat.avatar} alt={chat.name} className="w-full h-full object-contain" />
                  </div>
                  {chat.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 size-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between mb-1.5 mt-0.5">
                    <h3 className="font-bold text-[15px] truncate text-gray-900">{chat.name}</h3>
                    <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{chat.time}</span>
                  </div>
                  <p className="text-[11px] text-[#ff5a00] font-black truncate mb-1 uppercase tracking-[0.05em]">{chat.role}</p>
                  <p className={`text-[13px] truncate leading-snug ${chat.unreadCount > 0 ? 'text-gray-800 font-bold' : 'text-gray-500 font-medium'}`}>
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unreadCount > 0 && (
                  <div className="absolute right-5 bottom-8 size-5 bg-[#ff5a00] rounded-sm flex items-center justify-center shadow-lg shadow-[#ff5a00]/20">
                    <span className="text-[10px] font-black text-white">{chat.unreadCount}</span>
                  </div>
                )}
              </button>
            ))}
            {filteredChats.length === 0 && (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="size-16 bg-gray-50 rounded-sm flex items-center justify-center mb-4 text-gray-200">
                  <Users className="size-8" />
                </div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No conversations</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col bg-white relative transition-all duration-300 ${isMobileListOpen && 'hidden md:flex'}`}>
          <AnimatePresence mode="wait">
            {selectedChat ? (
              <motion.div
                key={selectedChat.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col h-full"
              >
                {/* Chat Header */}
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsMobileListOpen(true)}
                      className="md:hidden p-2 hover:bg-gray-50 rounded-sm transition-colors -ml-2 text-gray-400"
                    >
                      <ArrowLeft className="size-5" />
                    </button>
                    <div className="size-12 rounded-sm bg-white border border-gray-100 shadow-sm overflow-hidden p-2">
                      <img src={selectedChat.avatar} alt={selectedChat.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-black text-[17px] text-gray-900 leading-tight">{selectedChat.name}</h2>
                        <span className="text-[10px] font-black text-green-600 bg-green-50 px-1.5 py-0.5 rounded-sm uppercase tracking-tighter">Active</span>
                      </div>
                      <p className="text-[12px] font-bold text-[#ff5a00] uppercase tracking-wider">{selectedChat.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="hidden sm:flex items-center gap-2 px-5 py-2 hover:bg-[#ff5a00] hover:text-white text-gray-700 border border-gray-200 hover:border-[#ff5a00] rounded-sm text-[13px] font-bold transition-all shadow-sm">
                      Apply Now <ExternalLink className="size-3" />
                    </button>
                    <button className="p-2.5 hover:bg-gray-50 rounded-sm transition-colors text-gray-400">
                      <MoreVertical className="size-5" />
                    </button>
                  </div>
                </div>

                {/* Messages List */}
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 custom-scrollbar bg-[#FAFAFA]"
                >
                  <div className="flex justify-center mb-8">
                    <span className="px-4 py-1.5 bg-white shadow-sm text-[11px] font-bold text-gray-400 rounded-sm uppercase tracking-[0.15em] border border-gray-100">
                      Conversation started on {selectedChat.time}
                    </span>
                  </div>

                  {selectedChat.messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ scale: 0.98, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[90%] md:max-w-[85%] px-5 py-4 rounded-sm ${msg.sender === 'me'
                          ? 'bg-[#ff5a00] text-white rounded-br-none shadow-xl shadow-[#ff5a00]/10 font-medium'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                        }`}>
                        <p className="text-[14px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        <div className={`flex items-center justify-end gap-1.5 mt-2.5 ${msg.sender === 'me' ? 'text-white/70' : 'text-gray-400'}`}>
                          <span className="text-[10px] uppercase font-black tracking-widest">{msg.time}</span>
                          {msg.sender === 'me' && <CheckCheck className="size-3.5" />}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="p-6 bg-white border-t border-gray-100">
                  <div className="flex items-end gap-4 bg-gray-50 border border-gray-200 rounded-sm p-3 group focus-within:bg-white focus-within:border-[#ff5a00]/50 focus-within:ring-4 focus-within:ring-[#ff5a00]/5 transition-all">
                    <button className="p-2.5 hover:bg-gray-100 text-gray-400 hover:text-gray-600 rounded-sm transition-colors shrink-0">
                      <Paperclip className="size-5" />
                    </button>
                    <textarea
                      rows="1"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Type a message to start collaboration..."
                      className="flex-1 bg-transparent border-none py-2 px-1 text-[14px] focus:ring-0 resize-none max-h-40 custom-scrollbar text-gray-800 placeholder:text-gray-400 font-medium leading-relaxed"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className={`p-3 rounded-sm transition-all shrink-0 ${message.trim()
                          ? 'bg-[#ff5a00] text-white shadow-lg shadow-[#ff5a00]/30 hover:bg-[#e04e00]'
                          : 'bg-gray-200 text-white'
                        }`}
                    >
                      <Send className="size-5" />
                    </button>
                  </div>

                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#FDFDFB]">
                <div className="size-24 rounded-sm bg-[#ff5a00]/5 flex items-center justify-center mb-8 border border-[#ff5a00]/10">
                  <MessageSquare className="size-10 text-[#ff5a00]" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Your Workspace</h3>
                <p className="text-gray-500 max-w-sm font-medium leading-relaxed text-[15px]">
                  Select a company to view your application status and start communicating with hiring managers.
                </p>
                <div className="mt-12 flex gap-8">
                  <div className="flex flex-col items-center gap-3">
                    <div className="size-12 rounded-sm bg-indigo-50 flex items-center justify-center text-indigo-500 border border-indigo-100">
                      <CheckCheck className="size-6" />
                    </div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Real-time</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="size-12 rounded-sm bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100">
                      <Building2 className="size-6" />
                    </div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Company Verified</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="size-12 rounded-sm bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
                      <Users className="size-6" />
                    </div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Elite Talent</span>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-400 bg-white">
        <div className="flex items-center gap-6 uppercase tracking-widest">
          <span className="text-[#ff5a00]">Tasyai Messenger 1.0</span>
          <span className="hidden sm:block">Cloud Sync: Active</span>
          <span className="hidden sm:block">Status: Connected</span>
        </div>
        <div className="uppercase tracking-widest flex items-center gap-2">
          <div className="size-1.5 bg-green-500 rounded-full animate-pulse"></div>
          Everything is secure
        </div>
      </div>

      <style jsx="true">{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D1D5DB;
        }
      `}</style>
    </div>
  );
};

export default Messages;
