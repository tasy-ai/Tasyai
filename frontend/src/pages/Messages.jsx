import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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
import io from 'socket.io-client';
import axios from 'axios';

const ENDPOINT = 'http://localhost:5000'; // Fallback to localhost if env isn't set
const API_URL = `${import.meta.env.VITE_API_URL || ENDPOINT}/api/messages`;

const Messages = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [isMobileListOpen, setIsMobileListOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef(null);
  const socketRef = useRef(null);
  const location = useLocation();

  const currentUser = authService.getCurrentUser();

  // Initialize Socket.io
  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_API_URL || ENDPOINT);

    socketRef.current.on('connect', () => {
      console.log('Socket connected');
    });

    socketRef.current.on('receive_message', (receivedMsg) => {
      // If the message belongs to the currently open chat, add it
      if (selectedChatRef.current && selectedChatRef.current._id === receivedMsg.conversationId) {
        setMessages((prev) => [...prev, receivedMsg]);
      }

      // Update the chat list with the new last message and move it to the top
      setChats((prevChats) => {
        const index = prevChats.findIndex((chat) => chat._id === receivedMsg.conversationId);
        if (index !== -1) {
          const updatedChat = { ...prevChats[index], lastMessage: { text: receivedMsg.text, sender: receivedMsg.sender } };
          const newChats = [...prevChats];
          newChats.splice(index, 1);
          return [updatedChat, ...newChats];
        }
        return prevChats;
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Use a ref to keep track of selectedChat for the socket listener callback
  const selectedChatRef = useRef(selectedChat);
  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  // Fetch initial conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = authService.getToken();
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const res = await axios.get(`${API_URL}/conversations`, config);
        let fetchedChats = res.data;

        // Check if there's a companyId in URL to open specific chat
        const params = new URLSearchParams(location.search);
        const targetCompanyId = params.get('companyId');
        const targetUserId = params.get('userId');

        if (targetCompanyId) {
          // See if we already have it in the list
          const existingChat = fetchedChats.find(c => c.company && c.company._id === targetCompanyId);
          if (existingChat) {
            setSelectedChat(existingChat);
            setIsMobileListOpen(false);
          } else {
            // We need to create/initiate this conversation
            const newChatRes = await axios.post(`${API_URL}/conversation`, { companyId: targetCompanyId }, config);
            const newChat = newChatRes.data;
            fetchedChats = [newChat, ...fetchedChats];
            setSelectedChat(newChat);
            setIsMobileListOpen(false);
          }
        } else if (targetUserId) {
          // See if we already have it in the list
          const existingChat = fetchedChats.find(c => !c.company && c.participants.some(p => p._id === targetUserId || p.id === targetUserId));
          if (existingChat) {
            setSelectedChat(existingChat);
            setIsMobileListOpen(false);
          } else {
            // We need to create/initiate this direct conversation
            const newChatRes = await axios.post(`${API_URL}/user-conversation`, { targetUserId }, config);
            const newChat = newChatRes.data;
            fetchedChats = [newChat, ...fetchedChats];
            setSelectedChat(newChat);
            setIsMobileListOpen(false);
          }
        }

        setChats(fetchedChats);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUser) {
      fetchConversations();
    }
  }, [location.search, currentUser?._id, currentUser?.id]);

  // When a chat gets selected, fetch its messages and join the socket room
  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        try {
          const token = authService.getToken();
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const res = await axios.get(`${API_URL}/${selectedChat._id}`, config);
          setMessages(res.data);
        } catch (error) {
          console.error('Failed to fetch messages:', error);
        }
      };
      fetchMessages();
      socketRef.current.emit('join_conversation', selectedChat._id);
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedChat) return;

    const msgData = {
      conversationId: selectedChat._id,
      sender: currentUser._id || currentUser.id,
      text: messageText,
      time: new Date()
    };

    // Emit to socket server
    socketRef.current.emit('send_message', msgData);

    // Optimistically add to UI
    const optimisticMsg = { ...msgData, _id: Date.now().toString() };
    setMessages((prev) => [...prev, optimisticMsg]);

    // Update chat list last message and move to top
    setChats((prevChats) => {
      const index = prevChats.findIndex((chat) => chat._id === selectedChat._id);
      if (index !== -1) {
        const updatedChat = { ...prevChats[index], lastMessage: { text: msgData.text, sender: msgData.sender } };
        const newChats = [...prevChats];
        newChats.splice(index, 1);
        return [updatedChat, ...newChats];
      }
      return prevChats;
    });

    setMessageText('');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages.length]);

  // Helper function to extract chat display info based on whether it's a company chat or direct user
  const getChatInfo = (chat) => {
    const currentUserId = currentUser._id || currentUser.id;

    // If the user is the company creator, they should see the applicant's name
    if (chat.company && chat.company.creator === currentUserId) {
      const applicant = chat.participants.find(p => p._id !== currentUserId);
      return {
        name: applicant ? applicant.name : 'Applicant',
        avatar: applicant && applicant.profilePicture ? applicant.profilePicture : 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
        role: 'APPLICANT'
      };
    }

    // If company context exists and user is applicant, show company details
    if (chat.company) {
      return {
        name: chat.company.name,
        avatar: chat.company.logo || 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png', // fallback
        role: chat.company.role || 'COMPANY REP' // Default or grab from company openings
      };
    }
    // Otherwise, show the other participant
    const otherUser = chat.participants.find(p => p._id !== currentUserId);
    return {
      name: otherUser ? otherUser.name : 'Unknown User',
      avatar: otherUser && otherUser.profilePicture ? otherUser.profilePicture : 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
      role: 'USER'
    };
  };

  const filteredChats = chats.filter(chat => {
    const info = getChatInfo(chat);
    const query = searchQuery.toLowerCase();
    const lastMsg = chat.lastMessage?.text || '';
    return (
      info.name.toLowerCase().includes(query) ||
      info.role.toLowerCase().includes(query) ||
      lastMsg.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-0px)] bg-[#F8F7F4] text-gray-900 font-sans">
      <div className="flex-1 flex overflow-hidden bg-white border-t border-gray-200 relative">

        {/* Sidebar - Chat List */}
        <div className={`w-full md:w-[350px] border-r border-gray-100 flex flex-col bg-[#FDFDFB] transition-all duration-300 ${!isMobileListOpen && 'hidden md:flex'}`}>
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
                placeholder="Search..."
                className="w-full bg-white border border-gray-200 rounded-sm py-3.5 pl-11 pr-4 text-[14px] font-medium focus:outline-none focus:border-[#ff5a00]/50 focus:ring-4 focus:ring-[#ff5a00]/5 transition-all placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pb-10">
            {isLoading ? (
              <div className="p-12 text-center text-gray-400 text-sm font-bold">Loading...</div>
            ) : filteredChats.map((chat) => {
              const info = getChatInfo(chat);
              return (
                <button
                  key={chat._id}
                  onClick={() => {
                    setSelectedChat(chat);
                    setIsMobileListOpen(false);
                  }}
                  className={`w-full flex items-start gap-4 p-5 hover:bg-gray-50 transition-all text-left relative group border-b border-gray-50 ${selectedChat?._id === chat._id ? 'bg-[#ff5a00]/5 border-l-[4px] border-[#ff5a00]' : 'border-l-[4px] border-transparent'}`}
                >
                  <div className="relative shrink-0 mt-1">
                    <div className="size-14 rounded-sm bg-white border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center p-2.5 group-hover:scale-105 transition-transform">
                      <img src={info.avatar} alt={info.name} className="w-full h-full object-contain" />
                    </div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between mb-1.5 mt-0.5">
                      <h3 className="font-bold text-[15px] truncate text-gray-900">{info.name}</h3>
                    </div>
                    <p className="text-[11px] text-[#ff5a00] font-black truncate mb-1 uppercase tracking-[0.05em]">{info.role}</p>
                    <p className={`text-[13px] truncate leading-snug text-gray-500 font-medium`}>
                      {chat.lastMessage ? chat.lastMessage.text : 'Start a conversation'}
                    </p>
                  </div>
                </button>
              );
            })}
            {!isLoading && filteredChats.length === 0 && (
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
                key={selectedChat._id}
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
                      <img src={getChatInfo(selectedChat).avatar} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-black text-[17px] text-gray-900 leading-tight">{getChatInfo(selectedChat).name}</h2>
                        <span className="text-[10px] font-black text-green-600 bg-green-50 px-1.5 py-0.5 rounded-sm uppercase tracking-tighter">Connected</span>
                      </div>
                      <p className="text-[12px] font-bold text-[#ff5a00] uppercase tracking-wider">{getChatInfo(selectedChat).role}</p>
                    </div>
                  </div>
                </div>

                {/* Messages List */}
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 custom-scrollbar bg-[#FAFAFA]"
                >
                  <div className="flex justify-center mb-8">
                    <span className="px-4 py-1.5 bg-white shadow-sm text-[11px] font-bold text-gray-400 rounded-sm uppercase tracking-[0.15em] border border-gray-100 text-center">
                      {selectedChat.company
                        ? `${selectedChat.participants.find(p => p._id !== selectedChat.company.creator)?.name || 'Someone'} showed interest for ${selectedChat.company.name}`
                        : "Private encrypted session"}
                    </span>
                  </div>

                  {messages.map((msg) => {
                    const isMe = msg.sender === (currentUser._id || currentUser.id);
                    const timeString = new Date(msg.createdAt || msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    return (
                      <motion.div
                        key={msg._id}
                        initial={{ scale: 0.98, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[85%] md:max-w-[70%] px-5 py-4 rounded-sm ${isMe
                          ? 'bg-[#ff5a00] text-white rounded-br-none shadow-xl shadow-[#ff5a00]/10 font-medium'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                          }`}>
                          <p className="text-[14px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                          <div className={`flex items-center justify-end gap-1.5 mt-2.5 ${isMe ? 'text-white/70' : 'text-gray-400'}`}>
                            <span className="text-[10px] uppercase font-black tracking-widest">{timeString}</span>
                            {isMe && <CheckCheck className="size-3.5" />}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Input Area */}
                <div className="p-6 bg-white border-t border-gray-100">
                  <div className="flex items-end gap-4 bg-gray-50 border border-gray-200 rounded-sm p-3 group focus-within:bg-white focus-within:border-[#ff5a00]/50 focus-within:ring-4 focus-within:ring-[#ff5a00]/5 transition-all">
                    <textarea
                      rows="1"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
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
                      disabled={!messageText.trim()}
                      className={`p-3 rounded-sm transition-all shrink-0 ${messageText.trim()
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
        .custom-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        .custom-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `}</style>
    </div>
  );
};

export default Messages;
