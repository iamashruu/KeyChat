'use client';

/**
 * Individual conversation page
 * Displays messages for a specific conversation
 * Dynamic route: /chat/[conversationId]
 */

import React from 'react';
import { useEffect } from 'react';
import { useChatStore } from '@/store/chat.store';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { MessageList } from '@/components/chat/MessageList';
import { MessageInput } from '@/components/chat/MessageInput';

interface ConversationPageProps {
  params: Promise<{
    conversationId: string;
  }>;
}

export default function ConversationPage({ params }: ConversationPageProps) {
  const conversations = useChatStore((state) => state.conversations);
  const messagesByConversationId = useChatStore((state) => state.messagesByConversationId);
  const setActiveConversation = useChatStore((state) => state.setActiveConversation);

  // Unwrap params since it's a Promise in Next.js 15+
  const [conversationId, setConversationId] = React.useState<string>('');

  React.useEffect(() => {
    params.then((p) => setConversationId(p.conversationId));
  }, [params]);

  useEffect(() => {
    if (conversationId) {
      setActiveConversation(conversationId);
    }
  }, [conversationId, setActiveConversation]);

  const conversation = conversations.find((c) => c.id === conversationId);
  const messages = messagesByConversationId[conversationId] || [];

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-950 to-emerald-950">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-slate-700 border-t-emerald-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-emerald-300/70">Loading conversation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-screen">
      {/* Chat header */}
      <ChatHeader
        conversationName={conversation.name}
        participantCount={conversation.participantIds.length}
      />

      {/* Messages */}
      <MessageList messages={messages} />

      {/* Input */}
      <MessageInput conversationId={conversationId} />
    </div>
  );
}
