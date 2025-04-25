'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Video, MessageSquare, Users } from 'lucide-react';

export function LandingHero() {
  const [username, setUsername] = useState('');
  const router = useRouter();
  
  const handleStart = () => {
    // Set a default username if none provided
    const displayName = username.trim() || `Guest${Math.floor(Math.random() * 10000)}`;
    
    // Store username in session storage
    sessionStorage.setItem('username', displayName);
    
    // Navigate to chat page
    router.push('/chat');
  };
  
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-background z-0" />
      
      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -30, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl"
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 40, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 10,
            ease: "easeInOut" 
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl p-5 md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-500 mb-4">
            DgiOmegal
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Connect randomly with strangers worldwide through video and text chat
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full">
            <Video className="h-5 w-5 text-primary" />
            <span>Video Chat</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span>Text Chat</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full">
            <Users className="h-5 w-5 text-primary" />
            <span>100% Anonymous</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-md mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-2 mb-4">
            <Input
              placeholder="Enter a display name (optional)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="md:flex-1"
            />
            <Button 
              onClick={handleStart}
              className="bg-primary hover:bg-primary/90 text-white font-medium"
              size="lg"
            >
              Start Chatting
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            No login required. Just click and connect instantly.
          </p>
        </motion.div>
      </div>
    </div>
  );
}