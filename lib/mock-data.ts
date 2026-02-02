/**
 * Mock data for development and testing
 * This provides static conversation and message data
 */

import { Conversation, Message, User } from '@/types/chat';

export const MOCK_CURRENT_USER: User = {
  id: 'user-1',
  email: 'you@example.com',
  name: 'You',
  avatar: '👤',
};

export const MOCK_USERS: User[] = [
  MOCK_CURRENT_USER,
  {
    id: 'user-2',
    email: 'alice@example.com',
    name: 'Alice Johnson',
    avatar: '👩',
  },
  {
    id: 'user-3',
    email: 'bob@example.com',
    name: 'Bob Smith',
    avatar: '👨',
  },
  {
    id: 'user-4',
    email: 'carol@example.com',
    name: 'Carol Davis',
    avatar: '👩‍🦱',
  },
  {
    id: 'user-5',
    email: 'dave@example.com',
    name: 'Dave Wilson',
    avatar: '👨‍💼',
  },
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'user-2',
    senderName: 'Alice Johnson',
    content: 'Hey! How are you doing?',
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    senderId: 'user-1',
    senderName: 'You',
    content: 'I\'m doing great, thanks for asking! How about you?',
    timestamp: new Date(Date.now() - 3500000),
  },
  {
    id: 'msg-3',
    conversationId: 'conv-1',
    senderId: 'user-2',
    senderName: 'Alice Johnson',
    content: 'Pretty good! Just finished a project.',
    timestamp: new Date(Date.now() - 3400000),
  },
  {
    id: 'msg-4',
    conversationId: 'conv-2',
    senderId: 'user-3',
    senderName: 'Bob Smith',
    content: 'Did you get the update I sent?',
    timestamp: new Date(Date.now() - 7200000),
  },
  {
    id: 'msg-5',
    conversationId: 'conv-2',
    senderId: 'user-1',
    senderName: 'You',
    content: 'Yes, I reviewed it. Looks good to me.',
    timestamp: new Date(Date.now() - 7100000),
  },
  {
    id: 'msg-6',
    conversationId: 'conv-3',
    senderId: 'user-4',
    senderName: 'Carol Davis',
    content: 'Let\'s schedule a meeting next week',
    timestamp: new Date(Date.now() - 86400000),
  },
  {
    id: 'msg-7',
    conversationId: 'conv-4',
    senderId: 'user-5',
    senderName: 'Dave Wilson',
    content: 'Thanks for the help yesterday!',
    timestamp: new Date(Date.now() - 172800000),
  },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    name: 'Alice Johnson',
    participantIds: ['user-1', 'user-2'],
    participantNames: ['You', 'Alice Johnson'],
    lastMessage: MOCK_MESSAGES[2],
    lastMessageAt: MOCK_MESSAGES[2].timestamp,
    unreadCount: 0,
  },
  {
    id: 'conv-2',
    name: 'Bob Smith',
    participantIds: ['user-1', 'user-3'],
    participantNames: ['You', 'Bob Smith'],
    lastMessage: MOCK_MESSAGES[4],
    lastMessageAt: MOCK_MESSAGES[4].timestamp,
    unreadCount: 0,
  },
  {
    id: 'conv-3',
    name: 'Carol Davis',
    participantIds: ['user-1', 'user-4'],
    participantNames: ['You', 'Carol Davis'],
    lastMessage: MOCK_MESSAGES[5],
    lastMessageAt: MOCK_MESSAGES[5].timestamp,
    unreadCount: 1,
  },
  {
    id: 'conv-4',
    name: 'Dave Wilson',
    participantIds: ['user-1', 'user-5'],
    participantNames: ['You', 'Dave Wilson'],
    lastMessage: MOCK_MESSAGES[6],
    lastMessageAt: MOCK_MESSAGES[6].timestamp,
    unreadCount: 0,
  },
];
