'use client';

/**
 * Message bubble component with modern dark green styling
 * Displays individual messages with sender info and timestamp
 * Aligns left for received messages, right for sent messages
 */

import { Message } from '@/types/chat';
import { MOCK_CURRENT_USER } from '@/lib/mock-data';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isOwn = message.senderId === MOCK_CURRENT_USER.id;

  const formatTime = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs px-4 py-3 rounded-xl shadow-md transition-all duration-200 ${
          isOwn
            ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-br-none'
            : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700 hover:border-emerald-500/30'
        }`}
      >
        {!isOwn && (
          <p className="text-xs font-bold text-emerald-300 mb-1.5 opacity-90">
            {message.senderName}
          </p>
        )}
        <p className="text-sm break-words leading-relaxed">{message.content}</p>
        <p
          className={`text-xs mt-2 font-medium ${
            isOwn ? 'text-emerald-100' : 'text-emerald-300/60'
          }`}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}
