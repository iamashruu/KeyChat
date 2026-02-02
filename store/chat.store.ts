/**
 * Chat state management with Zustand
 * Manages conversations, messages, and active conversation state
 */

import { create } from 'zustand';
import { ChatState, Message, Conversation } from '@/types/chat';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from '@/lib/mock-data';

interface ChatStoreActions {
  // Setters
  setActiveConversation: (conversationId: string | null) => void;
  setConversations: (conversations: Conversation[]) => void;
  setMessages: (conversationId: string, messages: Message[]) => void;

  // Message operations
  addMessage: (message: Message) => void;
  addOptimisticMessage: (message: Omit<Message, 'id' | 'timestamp'> & { id?: string }) => void;
  removeOptimisticMessage: (messageId: string) => void;

  // Initialization
  initializeChat: () => void;
}

export const useChatStore = create<ChatState & ChatStoreActions>((set, get) => ({
  conversations: [],
  messagesByConversationId: {},
  activeConversationId: null,
  isLoading: false,

  setActiveConversation: (conversationId: string | null) => {
    set({ activeConversationId: conversationId });
  },

  setConversations: (conversations: Conversation[]) => {
    set({ conversations });
  },

  setMessages: (conversationId: string, messages: Message[]) => {
    set((state) => ({
      messagesByConversationId: {
        ...state.messagesByConversationId,
        [conversationId]: messages,
      },
    }));
  },

  addMessage: (message: Message) => {
    set((state) => {
      const existingMessages = state.messagesByConversationId[message.conversationId] || [];
      const updatedMessages = existingMessages.map((msg) =>
        msg.id === message.id && msg.isOptimistic ? { ...message, isOptimistic: false } : msg
      );

      // If this is a new message (not replacing an optimistic one), add it
      if (!updatedMessages.some((msg) => msg.id === message.id)) {
        updatedMessages.push(message);
      }

      return {
        messagesByConversationId: {
          ...state.messagesByConversationId,
          [message.conversationId]: updatedMessages,
        },
      };
    });
  },

  addOptimisticMessage: (message) => {
    const id = message.id || `optimistic-${Date.now()}`;
    const optimisticMessage: Message = {
      ...message,
      id,
      isOptimistic: true,
      timestamp: new Date(),
    };

    set((state) => {
      const existingMessages = state.messagesByConversationId[optimisticMessage.conversationId] || [];
      return {
        messagesByConversationId: {
          ...state.messagesByConversationId,
          [optimisticMessage.conversationId]: [...existingMessages, optimisticMessage],
        },
      };
    });

    return id;
  },

  removeOptimisticMessage: (messageId: string) => {
    set((state) => {
      const updated = { ...state.messagesByConversationId };
      for (const conversationId in updated) {
        updated[conversationId] = updated[conversationId].filter((msg) => msg.id !== messageId);
      }
      return { messagesByConversationId: updated };
    });
  },

  initializeChat: () => {
    // Initialize with mock data
    set({
      conversations: MOCK_CONVERSATIONS,
      messagesByConversationId: {
        'conv-1': MOCK_MESSAGES.filter((msg) => msg.conversationId === 'conv-1'),
        'conv-2': MOCK_MESSAGES.filter((msg) => msg.conversationId === 'conv-2'),
        'conv-3': MOCK_MESSAGES.filter((msg) => msg.conversationId === 'conv-3'),
        'conv-4': MOCK_MESSAGES.filter((msg) => msg.conversationId === 'conv-4'),
      },
      activeConversationId: null,
      isLoading: false,
    });
  },
}));
