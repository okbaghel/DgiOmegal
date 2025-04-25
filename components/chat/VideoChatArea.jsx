'use client';

import { useEffect, useRef } from 'react';
import { Video, UserX } from 'lucide-react';

export function VideoChatArea({ localStream, remoteStream, connectionStatus }) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  
  // Set local video stream
  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);
  
  // Set remote video stream
  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);
  
  return (
    <div className="video-container bg-black/40 h-full w-full rounded-xl flex items-center justify-center relative overflow-hidden">
      {/* Remote video (main video) */}
      {remoteStream ? (
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-4">
          {connectionStatus === 'connecting' ? (
            <>
              <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center mb-4 pulse">
                <Video className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-xl font-medium mb-1">Connecting...</p>
              <p className="text-sm text-muted-foreground">Finding a chat partner</p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                <UserX className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-xl font-medium mb-1">No one connected</p>
              <p className="text-sm text-muted-foreground">Click "Next" to find someone to chat with</p>
            </>
          )}
        </div>
      )}
      
      {/* Local video (small overlay) */}
      {localStream && (
        <div className="video-self">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}