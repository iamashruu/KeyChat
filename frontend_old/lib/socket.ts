/**
 * Socket.IO client initialization
 * Provides a configured Socket.IO instance for real-time communication
 * 
 * Note: The socket is NOT auto-connected. Call socket.connect() when needed.
 * This allows for proper initialization timing and authentication.
 */

import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

/**
 * Get or create the Socket.IO instance
 * Does not auto-connect
 */
export function getSocket(url: string = 'http://localhost:3001'): Socket {
  if (!socket) {
    socket = io(url, {
      autoConnect: false,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    // Register event handlers
    setupSocketListeners();
  }

  return socket;
}

/**
 * Setup placeholder event listeners
 * These are extension points for handling real-time events
 */
function setupSocketListeners() {
  if (!socket) return;

  // Handle new messages from other users
  socket.on('message:new', (message) => {
    console.log('New message received:', message);
  });

  // Handle message send confirmation
  socket.on('message:send', (message) => {
    console.log('Message sent confirmation:', message);
  });

  // Handle typing indicator (future feature)
  socket.on('typing:start', (data) => {
    console.log('User is typing:', data);
  });

  socket.on('typing:stop', (data) => {
    console.log('User stopped typing:', data);
  });

  // Handle errors
  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from socket server');
  });

  socket.on('connect', () => {
    console.log('Connected to socket server');
  });
}

/**
 * Connect the socket to the server
 */
export function connectSocket() {
  const socketInstance = getSocket();
  if (!socketInstance.connected) {
    socketInstance.connect();
  }
}

/**
 * Disconnect the socket
 */
export function disconnectSocket() {
  const socketInstance = getSocket();
  if (socketInstance.connected) {
    socketInstance.disconnect();
  }
}

/**
 * Emit a message to the server
 */
export function emitMessage(conversationId: string, content: string, userId: string) {
  const socketInstance = getSocket();
  socketInstance.emit('message:send', {
    conversationId,
    content,
    userId,
    timestamp: new Date(),
  });
}
