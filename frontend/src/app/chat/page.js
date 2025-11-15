"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { withProtectedRoute } from "@/components/ProtectedRoute";

function ChatPage ()
{
    const { user } = useAuth();
    const [ conversations, setConversations ] = useState( [
        {
            id: 1,
            name: "John Smith",
            avatar: "JS",
            lastMessage: "Sure, I'll review the design tomorrow",
            timestamp: "10:30 AM",
            unread: 0,
            online: true,
        },
        {
            id: 2,
            name: "Sarah Johnson",
            avatar: "SJ",
            lastMessage: "Thanks for the update!",
            timestamp: "9:15 AM",
            unread: 2,
            online: true,
        },
        {
            id: 3,
            name: "Mike Chen",
            avatar: "MC",
            lastMessage: "Let's meet next week to discuss the project",
            timestamp: "Yesterday",
            unread: 0,
            online: false,
        },
        {
            id: 4,
            name: "Emma Davis",
            avatar: "ED",
            lastMessage: "I sent you the final files",
            timestamp: "2 days ago",
            unread: 0,
            online: false,
        },
    ] );

    const [ selectedConversation, setSelectedConversation ] = useState( conversations[ 0 ] );
    const [ messages, setMessages ] = useState( [
        {
            id: 1,
            conversationId: 1,
            sender: "John Smith",
            senderId: "john-123",
            content: "Hey, how's the project coming along?",
            timestamp: "10:20 AM",
            isOwn: false,
        },
        {
            id: 2,
            conversationId: 1,
            sender: "You",
            senderId: "user",
            content: "Going great! Just finished the first phase",
            timestamp: "10:25 AM",
            isOwn: true,
        },
        {
            id: 3,
            conversationId: 1,
            sender: "John Smith",
            senderId: "john-123",
            content: "Sure, I'll review the design tomorrow",
            timestamp: "10:30 AM",
            isOwn: false,
        },
    ] );

    const [ messageInput, setMessageInput ] = useState( "" );
    const [ searchQuery, setSearchQuery ] = useState( "" );
    const messagesEndRef = useRef( null );

    const scrollToBottom = () =>
    {
        messagesEndRef.current?.scrollIntoView( { behavior: "smooth" } );
    };

    useEffect( () =>
    {
        scrollToBottom();
    }, [ messages, selectedConversation ] );

    const handleSendMessage = () =>
    {
        if ( messageInput.trim() === "" ) return;

        const newMessage = {
            id: messages.length + 1,
            conversationId: selectedConversation.id,
            sender: "You",
            senderId: "user",
            content: messageInput,
            timestamp: new Date().toLocaleTimeString( [], { hour: "2-digit", minute: "2-digit" } ),
            isOwn: true,
        };

        setMessages( [ ...messages, newMessage ] );
        setMessageInput( "" );

        // Update last message in conversation
        setConversations(
            conversations.map( ( conv ) =>
                conv.id === selectedConversation.id
                    ? { ...conv, lastMessage: messageInput, timestamp: "now" }
                    : conv
            )
        );
    };

    const handleSelectConversation = ( conversation ) =>
    {
        setSelectedConversation( conversation );
        // Mark as read
        setConversations(
            conversations.map( ( conv ) =>
                conv.id === conversation.id ? { ...conv, unread: 0 } : conv
            )
        );
    };

    const filteredConversations = conversations.filter( ( conv ) =>
        conv.name.toLowerCase().includes( searchQuery.toLowerCase() )
    );

    const conversationMessages = messages.filter(
        ( msg ) => msg.conversationId === selectedConversation.id
    );

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
            {/* Header */ }
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Chat with your team</p>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - Conversations */ }
                <div className="w-full md:w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
                    {/* Search */ }
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={ searchQuery }
                            onChange={ ( e ) => setSearchQuery( e.target.value ) }
                            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Conversations List */ }
                    <div className="flex-1 overflow-y-auto">
                        { filteredConversations.map( ( conversation ) => (
                            <button
                                key={ conversation.id }
                                onClick={ () => handleSelectConversation( conversation ) }
                                className={ `w-full px-4 py-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left ${ selectedConversation.id === conversation.id
                                        ? "bg-purple-50 dark:bg-purple-900/20"
                                        : ""
                                    }` }
                            >
                                <div className="flex items-start gap-3">
                                    {/* Avatar */ }
                                    <div className="relative flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                                            { conversation.avatar }
                                        </div>
                                        { conversation.online && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                                        ) }
                                    </div>

                                    {/* Content */ }
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                                { conversation.name }
                                            </h3>
                                            { conversation.unread > 0 && (
                                                <span className="bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                                                    { conversation.unread }
                                                </span>
                                            ) }
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            { conversation.lastMessage }
                                        </p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                            { conversation.timestamp }
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ) ) }
                    </div>
                </div>

                {/* Main Chat Area */ }
                <div className="hidden md:flex flex-1 flex-col">
                    {/* Chat Header */ }
                    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold">
                                { selectedConversation?.avatar }
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    { selectedConversation?.name }
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    { selectedConversation?.online ? "Active now" : "Active 2h ago" }
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                                📞
                            </button>
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                                📹
                            </button>
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                                ℹ️
                            </button>
                        </div>
                    </div>

                    {/* Messages Container */ }
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white dark:bg-gray-900">
                        { conversationMessages.map( ( message ) => (
                            <div
                                key={ message.id }
                                className={ `flex ${ message.isOwn ? "justify-end" : "justify-start" }` }
                            >
                                <div
                                    className={ `max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${ message.isOwn
                                            ? "bg-purple-600 text-white rounded-br-none"
                                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none"
                                        }` }
                                >
                                    <p className="text-sm">{ message.content }</p>
                                    <p
                                        className={ `text-xs mt-1 ${ message.isOwn ? "text-purple-100" : "text-gray-500 dark:text-gray-400"
                                            }` }
                                    >
                                        { message.timestamp }
                                    </p>
                                </div>
                            </div>
                        ) ) }
                        <div ref={ messagesEndRef } />
                    </div>

                    {/* Message Input */ }
                    <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
                        <div className="flex items-center gap-3">
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition text-gray-600 dark:text-gray-400">
                                📎
                            </button>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={ messageInput }
                                    onChange={ ( e ) => setMessageInput( e.target.value ) }
                                    onKeyPress={ ( e ) => e.key === "Enter" && handleSendMessage() }
                                    placeholder="Type a message..."
                                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <button
                                onClick={ handleSendMessage }
                                className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                            >
                                ➤
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Message Display */ }
                <div className="md:hidden flex-1 flex flex-col w-full">
                    { selectedConversation && (
                        <>
                            {/* Chat Header */ }
                            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
                                <button
                                    onClick={ () => setSelectedConversation( null ) }
                                    className="text-gray-600 dark:text-gray-400"
                                >
                                    ←
                                </button>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                                    { selectedConversation?.avatar }
                                </div>
                                <div>
                                    <h2 className="font-semibold text-gray-900 dark:text-white">
                                        { selectedConversation?.name }
                                    </h2>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        { selectedConversation?.online ? "Active now" : "Active 2h ago" }
                                    </p>
                                </div>
                            </div>

                            {/* Messages */ }
                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                { conversationMessages.map( ( message ) => (
                                    <div
                                        key={ message.id }
                                        className={ `flex ${ message.isOwn ? "justify-end" : "justify-start" }` }
                                    >
                                        <div
                                            className={ `max-w-xs px-4 py-2 rounded-lg ${ message.isOwn
                                                    ? "bg-purple-600 text-white rounded-br-none"
                                                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none"
                                                }` }
                                        >
                                            <p className="text-sm">{ message.content }</p>
                                            <p
                                                className={ `text-xs mt-1 ${ message.isOwn ? "text-purple-100" : "text-gray-500 dark:text-gray-400"
                                                    }` }
                                            >
                                                { message.timestamp }
                                            </p>
                                        </div>
                                    </div>
                                ) ) }
                                <div ref={ messagesEndRef } />
                            </div>

                            {/* Input */ }
                            <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={ messageInput }
                                            onChange={ ( e ) => setMessageInput( e.target.value ) }
                                            onKeyPress={ ( e ) => e.key === "Enter" && handleSendMessage() }
                                            placeholder="Message..."
                                            className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                                        />
                                    </div>
                                    <button
                                        onClick={ handleSendMessage }
                                        className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                                    >
                                        ➤
                                    </button>
                                </div>
                            </div>
                        </>
                    ) }
                </div>
            </div>
        </div>
    );
}

export default withProtectedRoute( ChatPage );
