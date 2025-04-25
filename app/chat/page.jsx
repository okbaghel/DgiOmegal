'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChatRoom } from '@/components/chat/ChatRoom';
import { LoadingScreen } from '@/components/chat/LoadingScreen';
import { useSocket } from '@/hooks/useSocket';
import { SocketProvider } from '@/app/context/SocketContext'; // ✅ Import the provider

function ChatPageContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const router = useRouter();
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');

    if (!storedUsername) {
      router.push('/');
      return;
    }

    setUsername(storedUsername);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  if (isLoading || !isConnected) {
    return <LoadingScreen />;
  }

  return <ChatRoom username={username} />;
}

export default function ChatPage() {
  return (
    <SocketProvider>
      <ChatPageContent />
    </SocketProvider>
  );
}
