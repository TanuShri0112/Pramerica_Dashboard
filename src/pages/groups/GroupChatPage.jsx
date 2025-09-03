import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Mic, Paperclip, Users, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const GroupChatPage = () => {
  const { groupId } = useParams();
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: "Evan Scott",
      content: "Recently I saw properties in a great location that I did not pay attention to before 😊",
      timestamp: "10:26 AM",
      isOwnMessage: false
    },
    {
      id: 2,
      author: "Evan Scott", 
      content: "Ops, why don't you say something more",
      timestamp: "10:26 AM",
      isOwnMessage: false
    },
    {
      id: 3,
      author: "Sarah Adams",
      content: "@kate 😊",
      timestamp: "10:27 AM", 
      isOwnMessage: false
    },
    {
      id: 4,
      author: "You",
      content: "She creates an atmosphere of mystery 😊",
      timestamp: "11:26 AM",
      isOwnMessage: true
    },
    {
      id: 5,
      author: "You",
      content: "😊😊",
      timestamp: "11:26 AM",
      isOwnMessage: true
    },
    {
      id: 6,
      author: "Evan Scott",
      content: "Kate, don't be like that and say something more :) 😊",
      timestamp: "11:34 AM",
      isOwnMessage: false
    }
  ]);

  const [participants] = useState([
    { id: 1, name: "Evan Scott", isOnline: true },
    { id: 2, name: "Sarah Adams", avatar: "/lovable-uploads/99489061-8ed9-41d2-84f2-9f76fec2a9a0.png", isOnline: true },
    { id: 3, name: "Kate Wilson", isOnline: false },
    { id: 4, name: "Admin Graham", avatar: "/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png", isOnline: true },
    { id: 5, name: "You", isOnline: true }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      author: "You",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwnMessage: true
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-lg shadow-sm border animate-fade-in">
      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-blue-50">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-gray-900">Group Chat</h1>
            <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
              Active
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowParticipants(!showParticipants)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-100"
            >
              <Users className="h-4 w-4 mr-1" />
              {participants.length} participants
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-3 max-w-[70%] ${msg.isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                  {!msg.isOwnMessage && (
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
                      {getInitials(msg.author)}
                    </div>
                  )}
                  <div className={`space-y-1 ${msg.isOwnMessage ? 'text-right' : 'text-left'}`}>
                    {!msg.isOwnMessage && (
                      <div className="text-xs text-gray-600 font-medium">{msg.author}</div>
                    )}
                    <div className={`inline-block px-3 py-2 rounded-lg text-sm ${
                      msg.isOwnMessage 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {msg.content}
                    </div>
                    <div className="text-xs text-gray-500">{msg.timestamp}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
              <Paperclip className="h-4 w-4" />
            </Button>
            
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write your message..."
                className="pr-12 bg-white"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className={`text-gray-500 hover:text-gray-700 ${isRecording ? 'bg-red-100 text-red-600' : ''}`}
              onClick={handleVoiceRecord}
            >
              <Mic className="h-4 w-4" />
            </Button>

            <Button 
              onClick={handleSendMessage}
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={!message.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {isRecording && (
            <div className="mt-2 text-center">
              <span className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full">
                🎤 Recording... Click mic to stop
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Participants Sidebar */}
      {showParticipants && (
        <div className="w-64 border-l bg-gray-50">
          <div className="p-4 border-b bg-white flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Participants ({participants.length})</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowParticipants(false)}
              className="h-6 w-6 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="h-full">
            <div className="p-3 space-y-2">
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={participant.avatar} alt={participant.name} />
                    <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                      {getInitials(participant.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{participant.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default GroupChatPage;