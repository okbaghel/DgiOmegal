import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background via-background/95 to-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360] 
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="w-16 h-16 rounded-full bg-primary/40 flex items-center justify-center"
            >
              <div className="w-10 h-10 rounded-full bg-primary" />
            </motion.div>
          </div>
          
          <motion.div
            animate={{ 
              rotate: [0, 360],
              opacity: [0.5, 1, 0.5] 
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "linear" 
            }}
            className="absolute inset-0 w-24 h-24 rounded-full border-t-2 border-r-2 border-primary"
          />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Connecting</h2>
        <p className="text-muted-foreground mb-4">Looking for someone to chat with...</p>
        
        <div className="loading-dots flex space-x-2">
          <span className="w-3 h-3 bg-primary rounded-full"></span>
          <span className="w-3 h-3 bg-primary rounded-full"></span>
          <span className="w-3 h-3 bg-primary rounded-full"></span>
        </div>
      </motion.div>
    </div>
  );
}