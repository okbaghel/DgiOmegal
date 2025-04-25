'use client';

import { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Determine the socket URL based on environment
    const socketUrl = process.env.NODE_ENV === 'production' 
      ? window.location.origin 
      : 'http://localhost:3000';
    
    // Create socket connection
    const socketConnection = io(socketUrl, {
      path: '/api/socket',
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Socket event handlers
    socketConnection.on('connect', () => {
      console.log('Socket connected');
      setIsConnected(true);
    });

    socketConnection.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    socketConnection.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
      setIsConnected(false);
    });

    // Set socket state
    setSocket(socketConnection);

    // Cleanup on unmount
    return () => {
      socketConnection.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}