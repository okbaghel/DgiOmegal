'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  MessageSquare, 
  VideoIcon, 
  SkipForward, 
  Flag 
} from 'lucide-react';

export function ChatControls({ 
  onNextClick, 
  onReportClick, 
  onToggleCamera, 
  onToggleMic, 
  onToggleTextOnly,
  isCameraOn, 
  isMicOn,
  isTextOnly
}) {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border p-3 flex justify-center"
    >
      <div className="flex items-center justify-center gap-2 md:gap-4 max-w-3xl w-full">
        {/* Media controls */}
        {!isTextOnly && (
          <>
            <Button
              onClick={onToggleCamera}
              variant="outline"
              size="icon"
              className={`transition-colors ${!isCameraOn ? 'bg-destructive/10 border-destructive/50 text-destructive' : ''}`}
            >
              {isCameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>
            
            <Button
              onClick={onToggleMic}
              variant="outline"
              size="icon" 
              className={`transition-colors ${!isMicOn ? 'bg-destructive/10 border-destructive/50 text-destructive' : ''}`}
            >
              {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>
          </>
        )}
        
        {/* Toggle text-only mode */}
        <Button
          onClick={onToggleTextOnly}
          variant="outline"
          size="icon"
          className={`transition-colors ${isTextOnly ? 'bg-primary/10 border-primary/50 text-primary' : ''}`}
        >
          {isTextOnly ? <VideoIcon className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
        </Button>
        
        {/* Next button */}
        <Button
          onClick={onNextClick}
          className="bg-primary hover:bg-primary/90 text-white px-6"
        >
          <SkipForward className="h-5 w-5 mr-2" />
          Next
        </Button>
        
        {/* Report button */}
        <Button
          onClick={onReportClick}
          variant="outline"
          size="icon"
          className="text-destructive hover:text-destructive"
        >
          <Flag className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
}