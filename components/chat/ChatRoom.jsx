'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { VideoChatArea } from './VideoChatArea';
import { TextChatArea } from './TextChatArea';
import { ChatControls } from './ChatControls';
import { ConnectionStatus } from './ConnectionStatus';
import { useWebRTC } from '@/hooks/useWebRTC';
import { useSocket } from '@/hooks/useSocket';

export function ChatRoom({ username }) {
  const [messages, setMessages] = useState([]);
  const [isTextOnly, setIsTextOnly] = useState(false);
  const { socket } = useSocket();
  
  const {
    localStream,
    remoteStream,
    connectionStatus,
    isCameraOn,
    isMicOn,
    findNewMatch,
    toggleCamera,
    toggleMic
  } = useWebRTC();

  useEffect(() => {
    if (!socket) return;
    
    // Handle incoming chat messages
    const handleChatMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };
    
    socket.on('chat-message', handleChatMessage);
    
    // Notify when peer disconnects
    socket.on('peer-disconnected', () => {
      toast.info('Your chat partner disconnected', {
        description: 'Click "Next" to find someone new'
      });
    });
    
    return () => {
      socket.off('chat-message', handleChatMessage);
      socket.off('peer-disconnected');
    };
  }, [socket]);
  
  // Clear messages when finding a new match
  useEffect(() => {
    if (connectionStatus === 'disconnected') {
      setMessages([]);
    }
  }, [connectionStatus]);
  
  // Send a chat message
  const sendMessage = (text) => {
    if (!socket || !text.trim()) return;
    
    const message = {
      text,
      sender: 'self',
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, message]);
    
    // Send message to server
    socket.emit('chat-message', {
      text,
      username,
    });
  };
  
  // Report user
  const reportUser = () => {
    if (!socket) return;
    
    socket.emit('report-user');
    
    toast.success('Report submitted', {
      description: 'Thank you for helping keep our platform safe.'
    });
    
    // Automatically find new match after reporting
    findNewMatch();
  };
  
  // Toggle text-only mode
  const toggleTextOnly = () => {
    setIsTextOnly(!isTextOnly);
  };
  
  return (
    <div className="relative min-h-screen bg-background flex flex-col">
      <ConnectionStatus status={connectionStatus} />
      
      <div className="flex flex-col md:flex-row h-[calc(100vh-70px)]">
        {/* Video chat area */}
        {!isTextOnly && (
          <div className="w-full md:w-2/3 h-1/2 md:h-full p-4">
            <VideoChatArea 
              localStream={localStream}
              remoteStream={remoteStream}
              connectionStatus={connectionStatus}
            />
          </div>
        )}
        
        {/* Text chat area */}
        <div className={`w-full ${isTextOnly ? '' : 'md:w-1/3'} h-1/2 md:h-full p-4`}>
          <TextChatArea 
            messages={messages}
            onSendMessage={sendMessage}
            username={username}
            isFullWidth={isTextOnly}
          />
        </div>
      </div>
      
      {/* Controls */}
      <ChatControls 
        onNextClick={findNewMatch}
        onReportClick={reportUser}
        onToggleCamera={toggleCamera}
        onToggleMic={toggleMic}
        onToggleTextOnly={toggleTextOnly}
        isCameraOn={isCameraOn}
        isMicOn={isMicOn}
        isTextOnly={isTextOnly}
      />
    </div>
  );
}