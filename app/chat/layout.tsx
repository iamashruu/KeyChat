'use client';

/**
 * Chat layout - persistent shell for all chat routes
 * Contains the sidebar and message panel
 * Sidebar persists while conversation pages change
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useChatStore } from '@/store/chat.store';
import { ConversationList } from '@/components/sidebar/ConversationList';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const conversations = useChatStore((state) => state.conversations);
  const initializeChat = useChatStore((state) => state.initializeChat);

  // Initialize chat on mount and redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Initialize chat store with mock data
    initializeChat();
  }, [isAuthenticated, router, initializeChat]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar - persists across navigation */}
      <ConversationList conversations={conversations} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
