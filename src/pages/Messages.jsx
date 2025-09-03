import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  Send, 
  Smile, 
  MessageCircle,
  ArrowLeft,
  Check,
  CheckCheck,
  X,
  Plus,
  UserPlus,
  Mic,
  Square,
  Paperclip,
  Image,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUserFilter } from '@/contexts/UserFilterContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showContactSelector, setShowContactSelector] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [contacts, setContacts] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const messagesEndRef = useRef(null);
  const recordingIntervalRef = useRef(null);
  const isMobile = useIsMobile();
  const { users } = useUserFilter();
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initialize contacts
  useEffect(() => {
    const initialContacts = [
      {
        id: '1',
        name: 'Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150',
        lastMessage: 'Hey there!',
        timestamp: '12:30 PM',
        unreadCount: 0
      },
      {
        id: '2',
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd722b5bc?w=150',
        lastMessage: "Let's catch up later",
        timestamp: '11:45 AM',
        unreadCount: 0
      },
      {
        id: '3',
        name: 'Emily Brown',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        lastMessage: 'Did you see the new course?',
        timestamp: '10:20 AM',
        unreadCount: 1
      },
      {
        id: '4',
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        lastMessage: 'Thanks for your help!',
        timestamp: 'Yesterday',
        unreadCount: 0
      },
      {
        id: '5',
        name: 'Jessica Taylor',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        lastMessage: 'Are you free tomorrow?',
        timestamp: 'Yesterday',
        unreadCount: 2
      },
      {
        id: '6',
        name: 'Robert Johnson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        lastMessage: "I'll get back to you",
        timestamp: '2 days ago',
        unreadCount: 0
      }
    ];
    setContacts(initialContacts);
  }, []);

  const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) &&
    !contacts.find(contact => contact.id === user.id.toString())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedContact) {
      // Load messages for selected contact
      setMessages([
        {
          id: '1',
          senderId: selectedContact.id,
          content: 'Hey there!',
          timestamp: '10:30 AM',
          isRead: true,
          isDelivered: true
        },
        {
          id: '2',
          senderId: 'me',
          content: 'Hi! How are you?',
          timestamp: '10:31 AM',
          isRead: true,
          isDelivered: true
        },
        {
          id: '3',
          senderId: selectedContact.id,
          content: "I'm doing great! Just finished the React module.",
          timestamp: '10:33 AM',
          isRead: true,
          isDelivered: true
        },
        {
          id: '4',
          senderId: 'me',
          content: "That's awesome! I'm still working on it.",
          timestamp: '10:34 AM',
          isRead: false,
          isDelivered: true
        },
        {
          id: '5',
          senderId: selectedContact.id,
          content: 'Let me know if you need any help with it.',
          timestamp: '10:36 AM',
          isRead: true,
          isDelivered: true
        }
      ]);
    }
  }, [selectedContact]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      const message = {
        id: Date.now().toString(),
        senderId: 'me',
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false,
        isDelivered: true
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate message being read after 2 seconds
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === message.id ? { ...msg, isRead: true } : msg
        ));
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start recording timer
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      recorder.start();
      
      recorder.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0 && selectedContact) {
          // Create voice message
          const message = {
            id: Date.now().toString(),
            senderId: 'me',
            content: 'Voice message',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isRead: false,
            isDelivered: true,
            type: 'voice',
            duration: recordingTime
          };
          
          setMessages(prev => [...prev, message]);
        }
      });
      
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setRecordingTime(0);
      
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleUserSelect = (user) => {
    const newContact = {
      id: user.id.toString(),
      name: user.name,
      avatar: user.avatar,
      lastMessage: 'Start a conversation...',
      timestamp: 'now',
      unreadCount: 0
    };
    
    setContacts(prev => [newContact, ...prev]);
    setSelectedContact(newContact);
    setShowContactSelector(false);
    setUserSearchQuery('');
    
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleBackToContacts = () => {
    setShowSidebar(true);
    setSelectedContact(null);
  };

  const getRoleColor = (roles) => {
    if (roles.includes('administrator')) return 'bg-red-100 text-red-700';
    if (roles.includes('instructor')) return 'bg-blue-100 text-blue-700';
    if (roles.includes('manager')) return 'bg-blue-100 text-blue-700';
    return 'bg-gray-100 text-gray-700';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleImageUpload = () => {
    imageInputRef.current?.click();
    setShowAttachmentMenu(false);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
    setShowAttachmentMenu(false);
  };

  const handleImageFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0 && selectedContact) {
      Array.from(files).forEach((file) => {
        const imageUrl = URL.createObjectURL(file);
        const message = {
          id: Date.now().toString() + Math.random(),
          senderId: 'me',
          content: file.name,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: false,
          isDelivered: true,
          type: 'image',
          imageUrl: imageUrl
        };
        
        setMessages(prev => [...prev, message]);
      });
    }
  };

  const handlePdfFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0 && selectedContact) {
      Array.from(files).forEach((file) => {
        const fileUrl = URL.createObjectURL(file);
        const message = {
          id: Date.now().toString() + Math.random(),
          senderId: 'me',
          content: file.name,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: false,
          isDelivered: true,
          type: 'file',
          fileUrl: fileUrl,
          fileName: file.name
        };
        
        setMessages(prev => [...prev, message]);
      });
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
      {/* Contacts Sidebar */}
      <div className={cn(
        "w-80 border-r border-gray-200 bg-white flex flex-col transition-all duration-300",
        isMobile && !showSidebar && "hidden",
        isMobile && showSidebar && "w-full"
      )}>
        {/* Header */}
        <div className="p-4 border-b border-gray-100 bg-white">
          <h1 className="text-xl font-semibold text-gray-800 mb-3">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Contacts List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={cn(
                  "flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 group",
                  selectedContact?.id === contact.id && "bg-blue-50 hover:bg-blue-100 border border-blue-200"
                )}
                onClick={() => handleContactSelect(contact)}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white font-semibold">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 truncate group-hover:text-blue-700 transition-colors">
                      {contact.name}
                    </p>
                    <span className="text-xs text-gray-500">{contact.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm truncate text-gray-500">
                      {contact.lastMessage}
                    </p>
                    {contact.unreadCount > 0 && (
                      <Badge className="bg-blue-600 text-white rounded-full h-5 w-5 text-xs flex items-center justify-center ml-2">
                        {contact.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Add Contact Button */}
        <div className="p-4 border-t border-gray-100">
          <Dialog open={showContactSelector} onOpenChange={setShowContactSelector}>
            <DialogTrigger asChild>
              <Button 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                size="lg"
              >
                <Plus className="h-5 w-5" />
                <span>New Chat</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Select Contact
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search users..."
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <ScrollArea className="max-h-80">
                  <div className="space-y-2">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleUserSelect(user)}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <Badge className={cn("text-xs", getRoleColor(user.role))}>
                              {user.role[0]}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredUsers.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <UserPlus className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No users found</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Chat Area */}
      <div className={cn(
        "flex-1 flex flex-col bg-white",
        isMobile && showSidebar && "hidden"
      )}>
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {isMobile && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleBackToContacts}
                      className="mr-2"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                  )}
                  <div className="relative">
                    <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                      <AvatarImage src={selectedContact.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white font-semibold">
                        {selectedContact.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="ml-3">
                    <h2 className="font-semibold text-gray-900">{selectedContact.name}</h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-gray-50 to-white">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.senderId === 'me' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm relative group",
                        message.senderId === 'me' 
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-12" 
                          : "bg-white text-gray-900 border border-gray-100 mr-12"
                      )}
                    >
                      {message.type === 'voice' ? (
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "p-2 rounded-full",
                            message.senderId === 'me' ? "bg-blue-400" : "bg-gray-200"
                          )}>
                            <Mic className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className={cn(
                              "text-xs mb-1",
                              message.senderId === 'me' ? "text-blue-100" : "text-gray-500"
                            )}>
                              Voice message
                            </div>
                            <div className="text-sm font-medium">
                              {formatTime(message.duration || 0)}
                            </div>
                          </div>
                        </div>
                      ) : message.type === 'image' ? (
                        <div className="space-y-2">
                          <img 
                            src={message.imageUrl} 
                            alt={message.content}
                            className="max-w-full h-auto rounded-lg"
                            style={{ maxHeight: '200px' }}
                          />
                          <p className="text-xs opacity-75">{message.content}</p>
                        </div>
                      ) : message.type === 'file' ? (
                        <div className="flex items-center gap-3 p-2 bg-white/10 rounded-lg">
                          <div className={cn(
                            "p-2 rounded-full",
                            message.senderId === 'me' ? "bg-blue-400" : "bg-gray-200"
                          )}>
                            <FileText className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{message.fileName}</p>
                            <p className="text-xs opacity-75">PDF Document</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      )}
                      <div className={cn(
                        "flex items-center justify-end mt-2 space-x-1",
                        message.senderId === 'me' ? "text-blue-100" : "text-gray-400"
                      )}>
                        <span className="text-xs">{message.timestamp}</span>
                        {message.senderId === 'me' && (
                          <div className="flex">
                            {message.isDelivered ? (
                              message.isRead ? (
                                <CheckCheck className="h-3 w-3 text-blue-300" />
                              ) : (
                                <CheckCheck className="h-3 w-3" />
                              )
                            ) : (
                              <Check className="h-3 w-3" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex items-end space-x-2">
                {/* Attachment Button */}
                <Popover open={showAttachmentMenu} onOpenChange={setShowAttachmentMenu}>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="hover:bg-gray-100 shrink-0"
                      disabled={isRecording}
                    >
                      <Paperclip className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-2" align="start" side="top">
                    <div className="grid grid-cols-1 gap-2">
                      <Button
                        variant="ghost"
                        className="justify-start h-auto p-3 hover:bg-blue-50"
                        onClick={handleImageUpload}
                      >
                        <Image className="h-5 w-5 text-blue-600 mr-3" />
                        <div className="text-left">
                          <div className="font-medium text-gray-900">Add Images</div>
                        </div>
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start h-auto p-3 hover:bg-blue-50"
                        onClick={handleFileUpload}
                      >
                        <FileText className="h-5 w-5 text-blue-600 mr-3" />
                        <div className="text-left">
                          <div className="font-medium text-gray-900">Add Files</div>
                        </div>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="pr-12 py-3 rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                    disabled={isRecording}
                  />
                  <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                    <PopoverTrigger asChild>
                      <div className="absolute right-1 top-1/2 -translate-y-1/2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="w-8 h-8 flex items-center justify-center p-0 hover:bg-gray-100 rounded-full hover:translate-y-0"
                          disabled={isRecording}
                        >
                          <Smile className="h-4 w-4" />
                        </Button>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4" align="end">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Emojis</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowEmojiPicker(false)}
                          className="h-6 w-6"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-8 gap-1 max-h-48 overflow-y-auto">
                        {emojis.map((emoji, index) => (
                          <button
                            key={index}
                            onClick={() => handleEmojiClick(emoji)}
                            className="p-2 hover:bg-gray-100 rounded text-lg transition-colors"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                
                {/* Voice Recording */}
                {isRecording ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-xl border border-red-200">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-red-600 font-medium">
                      {formatTime(recordingTime)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={stopRecording}
                      className="text-red-600 hover:bg-red-100"
                    >
                      <Square className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={startRecording}
                    className="hover:bg-gray-100 shrink-0"
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                )}
                
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isRecording}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 shrink-0"
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Hidden file inputs */}
              <input
                ref={imageInputRef}
                type="file"
                accept=".png,.jpg,.jpeg"
                multiple
                className="hidden"
                onChange={handleImageFileChange}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                multiple
                className="hidden"
                onChange={handlePdfFileChange}
              />
            </div>
          </>
        ) : (
          /* No Contact Selected */
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
            <div className="text-center max-w-md mx-auto p-8">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <MessageCircle className="h-12 w-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Select a conversation to start messaging</h3>
              <p className="text-gray-500 leading-relaxed">Choose from your existing conversations or start a new one to connect with your learning community</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;