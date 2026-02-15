// Components/Chat/FloatingChat.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiMessageCircle, FiX, FiMessageSquare, FiBot,
    FiMail, FiSend, FiHelpCircle, FiChevronRight,
    FiHeadphones, FiZap, FiGlobe, FiSmartphone
} from 'react-icons/fi';
import { FaWhatsapp, FaTelegram, FaRobot, FaHeadset } from 'react-icons/fa';
import { BsChatDotsFill } from 'react-icons/bs';

const FloatingChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [activeChat, setActiveChat] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const chatRef = useRef(null);
    const buttonRef = useRef(null);

    // Close chat when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                chatRef.current &&
                !chatRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
                setActiveChat(null);
                setChatMessages([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Chat options configuration
    const chatOptions = [
        {
            id: 'support',
            name: 'Customer Support',
            icon: FaHeadset,
            gradient: 'from-blue-500 to-cyan-500',
            description: 'Get help with orders, billing, and technical issues',
            responseTime: '< 2 min',
            availability: '24/7',
            color: 'blue'
        },
        {
            id: 'ai',
            name: 'AI Assistant',
            icon: FaRobot,
            gradient: 'from-purple-500 to-pink-500',
            description: 'Instant answers about services, pricing, and solutions',
            responseTime: 'Instant',
            availability: '24/7',
            color: 'purple'
        },
        {
            id: 'whatsapp',
            name: 'WhatsApp',
            icon: FaWhatsapp,
            gradient: 'from-green-500 to-emerald-500',
            description: 'Chat with us on WhatsApp for quick support',
            responseTime: '< 5 min',
            availability: '24/7',
            color: 'green',
            link: 'https://wa.me/923134385885?text=Hello%20Websterwork%2C%20I%20need%20assistance'
        },
        {
            id: 'telegram',
            name: 'Telegram',
            icon: FaTelegram,
            gradient: 'from-sky-500 to-blue-500',
            description: 'Connect with us on Telegram for instant messaging',
            responseTime: '< 5 min',
            availability: '24/7',
            color: 'sky',
            link: 'https://t.me/websterwork'
        }
    ];

    // Handle chat option selection
    const handleChatSelect = (option) => {
        if (option.link) {
            // External links (WhatsApp, Telegram)
            window.open(option.link, '_blank');
            setIsOpen(false);
        } else {
            // Internal chats (Support, AI)
            setActiveChat(option);
            setChatMessages([
                {
                    id: 1,
                    type: 'bot',
                    message: `👋 Hello! I'm the ${option.name}. How can I help you today?`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ]);
        }
    };

    // Handle sending message in chat
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        // Add user message
        const userMessage = {
            id: chatMessages.length + 1,
            type: 'user',
            message: inputMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatMessages(prev => [...prev, userMessage]);
        setInputMessage('');

        // Simulate bot response
        setTimeout(() => {
            const botResponse = {
                id: chatMessages.length + 2,
                type: 'bot',
                message: activeChat.id === 'support'
                    ? "Thank you for reaching out to our support team. A representative will be with you shortly. In the meantime, please check our FAQ section for immediate answers."
                    : "I'm analyzing your query. Based on our services, I can help you with information about our AI models, web development, mobile apps, or cybersecurity solutions. What specific area are you interested in?",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setChatMessages(prev => [...prev, botResponse]);
        }, 1000);
    };

    // Handle back to options
    const handleBackToOptions = () => {
        setActiveChat(null);
        setChatMessages([]);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={chatRef}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-20 right-0 w-[380px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                        {/* Chat Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                        {activeChat ? (
                                            <activeChat.icon className="w-5 h-5" />
                                        ) : (
                                            <BsChatDotsFill className="w-5 h-5" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            {activeChat ? activeChat.name : 'Websterwork Chat'}
                                        </h3>
                                        <p className="text-xs text-blue-100">
                                            {activeChat ? activeChat.availability : 'How can we help you?'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        setActiveChat(null);
                                        setChatMessages([]);
                                    }}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Chat Body */}
                        <div className="h-[500px] flex flex-col bg-gray-50 dark:bg-gray-800">
                            {!activeChat ? (
                                /* Options Grid */
                                <div className="flex-1 p-4 overflow-y-auto">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
                                        Choose how you'd like to connect with us
                                    </p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {chatOptions.map((option) => {
                                            const Icon = option.icon;
                                            return (
                                                <motion.button
                                                    key={option.id}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => handleChatSelect(option)}
                                                    className={`flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 text-left group`}
                                                >
                                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center flex-shrink-0`}>
                                                        <Icon className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h4 className="font-semibold text-gray-900 dark:text-white">
                                                                {option.name}
                                                            </h4>
                                                            <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                                                                {option.responseTime}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                                            {option.description}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-500">
                                                            {option.availability} • Online
                                                        </p>
                                                    </div>
                                                    <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                                </motion.button>
                                            );
                                        })}
                                    </div>

                                    {/* Quick FAQs */}
                                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                        <div className="flex items-start gap-3">
                                            <FiHelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h5 className="font-medium text-gray-900 dark:text-white text-sm mb-2">
                                                    Quick Answers
                                                </h5>
                                                <div className="space-y-2">
                                                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline block">
                                                        📦 What are your delivery times?
                                                    </button>
                                                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline block">
                                                        💳 What payment methods do you accept?
                                                    </button>
                                                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline block">
                                                        🔧 Do you provide ongoing support?
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* Active Chat */
                                <div className="flex-1 flex flex-col h-full">
                                    {/* Chat Messages */}
                                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                                        {chatMessages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                {msg.type === 'bot' && (
                                                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${activeChat.gradient} flex items-center justify-center flex-shrink-0 mr-2`}>
                                                        <activeChat.icon className="w-4 h-4 text-white" />
                                                    </div>
                                                )}
                                                <div
                                                    className={`max-w-[70%] p-3 rounded-2xl ${msg.type === 'user'
                                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tr-none'
                                                            : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-tl-none'
                                                        }`}
                                                >
                                                    <p className="text-sm">{msg.message}</p>
                                                    <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                                                        {msg.timestamp}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Chat Input */}
                                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                                        <form onSubmit={handleSendMessage} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={inputMessage}
                                                onChange={(e) => setInputMessage(e.target.value)}
                                                placeholder="Type your message..."
                                                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                            />
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
                                            >
                                                <FiSend className="w-4 h-4" />
                                            </button>
                                        </form>
                                        <button
                                            onClick={handleBackToOptions}
                                            className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                        >
                                            <FiMessageCircle className="w-3 h-3" />
                                            Back to chat options
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Chat Footer */}
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-center">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                ⚡ Typically replies instantly • 24/7 Support
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`relative w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${isOpen ? 'rotate-90' : ''
                    }`}
            >
                {isOpen ? (
                    <FiX className="w-6 h-6" />
                ) : (
                    <>
                        <BsChatDotsFill className="w-6 h-6" />

                        {/* Notification Dot */}
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full animate-pulse" />

                        {/* Hover Tooltip */}
                        <AnimatePresence>
                            {isHovered && !isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="absolute right-16 px-3 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg whitespace-nowrap"
                                >
                                    Chat with us
                                    <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-y-6 border-l-6 border-y-transparent border-l-gray-900 dark:border-l-white" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </motion.button>
        </div>
    );
};

export default FloatingChat;