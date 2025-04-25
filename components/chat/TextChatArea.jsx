'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SendHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export function TextChatArea({ messages, onSendMessage, username, isFullWidth }) {
  const [messageText, setMessageText] = useState('');
  const scrollAreaRef = useRef(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };
  
  return (
    <div className={`h-full flex flex-col bg-secondary/20 rounded-xl ${isFullWidth ? 'max-w-3xl mx-auto' : ''}`}>
      <div className="px-4 py-3 border-b border-border">
        <h2 className="font-semibold">Chat</h2>
      </div>
      
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4 text-muted-foreground">
            <p className="mb-2">No messages yet</p>
            <p className="text-sm">Say hello to start the conversation!</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            <div className="flex flex-col space-y-3">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`max-w-[80%] ${message.sender === 'self' ? 'ml-auto' : 'mr-auto'}`}
                >
                  <div className={`p-3 ${message.sender === 'self' ? 'chat-bubble-self' : 'chat-bubble-other'}`}>
                    {message.sender !== 'self' && (
                      <p className="text-xs font-medium mb-1 opacity-70">
                        {message.username || 'Stranger'}
                      </p>
                    )}
                    <p>{message.text}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 px-1">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </ScrollArea>
      
      <form onSubmit={handleSendMessage} className="p-3 border-t border-border flex gap-2">
        <Input
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="flex-1"
        />
        <Button 
          type="submit" 
          size="icon" 
          className="bg-primary hover:bg-primary/90"
        >
          <SendHorizontal className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}