'use client';

/**
 * Single conversation item in the conversation list
 * Shows conversation name, last message preview, and timestamp
 */

import Link from 'next/link';
import { Conversation } from '@/types/chat';
import { usePathname } from 'next/navigation';

interface ConversationItemProps {
  conversation: Conversation;
}

export function ConversationItem({ conversation }: ConversationItemProps) {
  const pathname = usePathname();
  const isActive = pathname.includes(conversation.id);

  const formatTime = (date?: Date) => {
    if (!date) return '';
    const d = new Date(date);
    const now = new Date();

    // Same day: show time
    if (d.toDateString() === now.toDateString()) {
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    }

    // Different day: show date
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const lastMessagePreview = conversation.lastMessage?.content.slice(0, 50) || 'No messages yet';

  return (
    <Link href={`/chat/${conversation.id}`}>
      <div
        className={`p-4 border-b border-slate-800 cursor-pointer transition-all duration-200 ${
          isActive
            ? 'bg-emerald-500/10 border-l-4 border-l-emerald-500 shadow-lg shadow-emerald-500/20'
            : 'hover:bg-slate-800/50 hover:border-l-4 hover:border-l-emerald-500/30'
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-emerald-100 truncate hover:text-emerald-300 transition-colors">
            {conversation.name}
          </h3>
          {conversation.lastMessageAt && (
            <span className="text-xs text-emerald-300/60 ml-2 flex-shrink-0">
              {formatTime(conversation.lastMessageAt)}
            </span>
          )}
        </div>
        <p className="text-sm text-slate-400 truncate hover:text-slate-300 transition-colors">
          {lastMessagePreview}
        </p>
        {conversation.unreadCount ? (
          <div className="mt-3 inline-block bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-xs rounded-full px-2.5 py-1 font-bold shadow-lg">
            {conversation.unreadCount} new
          </div>
        ) : null}
      </div>
    </Link>
  );
}
