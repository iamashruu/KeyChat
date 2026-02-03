'use client';

/**
 * Conversation list component with modern dark green styling
 * Displays all conversations with active state highlighting
 */

import { Conversation } from '@/types/chat';
import { ConversationItem } from './ConversationItem';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface ConversationListProps {
  conversations: Conversation[];
}

export function ConversationList({ conversations }: ConversationListProps) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-emerald-500/20 flex flex-col h-screen shadow-xl">
      {/* Header */}
      <div className="p-5 border-b border-emerald-500/20">
        <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text mb-2">
          KeyChat
        </h1>
        {user && (
          <p className="text-sm text-emerald-300/70 break-words font-medium">
            {user.email}
          </p>
        )}
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500/30 scrollbar-track-slate-800">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-emerald-300/60 text-sm">
            <p>No conversations yet</p>
          </div>
        ) : (
          conversations.map((conversation) => (
            <ConversationItem key={conversation.id} conversation={conversation} />
          ))
        )}
      </div>

      {/* Footer with logout button */}
      <div className="p-4 border-t border-emerald-500/20">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleLogout}
          className="w-full"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
