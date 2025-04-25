import { Server } from 'socket.io';

// Queue of users waiting to be matched
let waitingQueue = [];

// Creating a socket.io server
const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
    });
    
    // Socket server event handlers
    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);
      
      // Handle user ready to be matched
      socket.on('ready', ({ peerId }) => {
        console.log(`User ${socket.id} ready with peer ID: ${peerId}`);
        
        // Add user to waiting queue with their peer ID
        const user = { socketId: socket.id, peerId };
        
        // Check if someone else is waiting
        if (waitingQueue.length > 0) {
          // Get the first waiting user
          const matchedUser = waitingQueue.shift();
          
          // Connect the two users
          socket.emit('matched', { peerId: matchedUser.peerId });
          io.to(matchedUser.socketId).emit('matched', { peerId });
          
          console.log(`Matched ${socket.id} with ${matchedUser.socketId}`);
        } else {
          // Add user to waiting queue
          waitingQueue.push(user);
          console.log(`User ${socket.id} added to waiting queue`);
        }
      });
      
      // Handle chat messages
      socket.on('chat-message', (message) => {
        // Find who this socket is connected to
        // This is a simplified version, in production you'd need a more robust pairing system
        // to track which sockets are connected to each other
        socket.broadcast.emit('chat-message', {
          ...message,
          sender: 'other',
          timestamp: new Date().toISOString(),
        });
      });
      
      // Handle user reports
      socket.on('report-user', () => {
        console.log(`User reported by ${socket.id}`);
        // In a real app, this would log to a database or trigger moderation actions
      });
      
      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        
        // Remove from waiting queue if present
        waitingQueue = waitingQueue.filter(user => user.socketId !== socket.id);
        
        // Notify peers about disconnection
        socket.broadcast.emit('peer-disconnected');
      });
    });
    
    // Attach the io server to the response object
    res.socket.server.io = io;
  }
  
  // Return empty response to acknowledge the request
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;