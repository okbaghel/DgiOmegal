'use client';

import { useContext } from 'react';
import { useSocketContext } from '@/app/context/SocketContext';

export function useSocket() {
  const context = useSocketContext();

  // const context = useContext(SocketContext);
  
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  
  return context;
}