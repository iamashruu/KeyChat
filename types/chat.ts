/**
 * Core type definitions for the chat application
 */

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  // Extension point for future features (read receipts, etc.)
  isOptimistic?: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  participantIds: string[];
  participantNames: string[];
  lastMessage?: Message;
  lastMessageAt?: Date;
  unreadCount?: number;
}

export interface ChatState {
  conversations: Conversation[];
  messagesByConversationId: Record<string, Message[]>;
  activeConversationId: string | null;
  isLoading: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}
