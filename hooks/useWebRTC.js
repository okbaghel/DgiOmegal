'use client';

import { useState, useEffect, useRef } from 'react';
import { useSocket } from './useSocket';
import Peer from 'peerjs';

export function useWebRTC() {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerId, setPeerId] = useState('');
  const [remotePeerId, setRemotePeerId] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  
  const peerInstance = useRef(null);
  const connectionRef = useRef(null);
  const { socket } = useSocket();

  // Initialize peer connection
  useEffect(() => {
    if (!socket) return;
    
    // Create new Peer instance
    const peer = new Peer({
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:global.stun.twilio.com:3478' }
        ]
      }
    });
    
    peer.on('open', (id) => {
      console.log('My peer ID is:', id);
      setPeerId(id);
      
      // Emit peer ID to the server for matching
      socket.emit('ready', { peerId: id });
    });
    
    peer.on('call', async (call) => {
      connectionRef.current = call;
      setConnectionStatus('connecting');
      
      try {
        // Answer the call with our local stream
        if (localStream) {
          call.answer(localStream);
        } else {
          const stream = await getLocalStream();
          setLocalStream(stream);
          call.answer(stream);
        }
        
        // Handle incoming stream
        call.on('stream', (stream) => {
          setRemoteStream(stream);
          setConnectionStatus('connected');
        });
        
        call.on('close', () => {
          console.log('Call closed');
          setConnectionStatus('disconnected');
          setRemoteStream(null);
        });
        
        call.on('error', (err) => {
          console.error('Call error:', err);
          setConnectionStatus('disconnected');
        });
      } catch (err) {
        console.error('Error answering call:', err);
        setConnectionStatus('disconnected');
      }
    });
    
    peer.on('error', (err) => {
      console.error('Peer error:', err);
      setConnectionStatus('disconnected');
    });
    
    peerInstance.current = peer;
    
    // Clean up on unmount
    return () => {
      if (connectionRef.current) {
        connectionRef.current.close();
      }
      
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      
      peer.destroy();
    };
  }, [socket]);
  
  // Handle peer matching from server
  useEffect(() => {
    if (!socket || !peerInstance.current) return;
    
    const handleMatch = async ({ peerId: remotePeer }) => {
      console.log('Matched with peer:', remotePeer);
      setRemotePeerId(remotePeer);
      
      if (peerInstance.current && remotePeer !== peerId) {
        try {
          setConnectionStatus('connecting');
          
          // Get local media stream if not already available
          let stream = localStream;
          if (!stream) {
            stream = await getLocalStream();
            setLocalStream(stream);
          }
          
          // Call the remote peer
          const call = peerInstance.current.call(remotePeer, stream);
          connectionRef.current = call;
          
          call.on('stream', (remoteStream) => {
            setRemoteStream(remoteStream);
            setConnectionStatus('connected');
          });
          
          call.on('close', () => {
            console.log('Call closed');
            setConnectionStatus('disconnected');
            setRemoteStream(null);
          });
          
          call.on('error', (err) => {
            console.error('Call error:', err);
            setConnectionStatus('disconnected');
          });
        } catch (err) {
          console.error('Error initiating call:', err);
          setConnectionStatus('disconnected');
        }
      }
    };
    
    socket.on('matched', handleMatch);
    
    return () => {
      socket.off('matched', handleMatch);
    };
  }, [socket, peerId, localStream]);
  
  // Function to get local media stream
  const getLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      return stream;
    } catch (err) {
      console.error('Error accessing media devices:', err);
      throw err;
    }
  };
  
  // Function to find a new match
  const findNewMatch = () => {
    if (!socket) return;
    
    // Close current connection
    if (connectionRef.current) {
      connectionRef.current.close();
      connectionRef.current = null;
    }
    
    setRemoteStream(null);
    setRemotePeerId('');
    setConnectionStatus('disconnected');
    
    // Request a new match
    socket.emit('ready', { peerId });
  };
  
  // Toggle camera
  const toggleCamera = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
      }
    }
  };
  
  // Toggle microphone
  const toggleMic = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };
  
  return {
    localStream,
    remoteStream,
    connectionStatus,
    isCameraOn,
    isMicOn,
    findNewMatch,
    toggleCamera,
    toggleMic
  };
}