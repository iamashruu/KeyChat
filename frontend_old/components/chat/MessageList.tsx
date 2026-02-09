'use client';

/**
 * Message list component with modern dark green styling
 * Displays all messages for a conversation
 * Auto-scrolls to latest message
 */

import { useEffect, useRef } from 'react';
import { Message } from '@/types/chat';
import { MessageBubble } from './MessageBubble';

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export function MessageList({ messages, isLoading = false }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-slate-700 border-t-emerald-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-emerald-300/70">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-950 to-slate-900 p-6 space-y-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-4xl mb-4">💬</div>
            <p className="text-emerald-300/60 font-medium">
              No messages yet. Start the conversation!
            </p>
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))
      )}
      <div ref={endRef} />
    </div>
  );
}
