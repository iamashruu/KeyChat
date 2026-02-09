'use client';

/**
 * Message input component with modern dark green styling
 * Provides textarea for composing messages
 * Enter key to send, Shift+Enter for new line
 * Adds optimistic message to state and clears input
 */

import { useRef, useState } from 'react';
import { useChatStore } from '@/store/chat.store';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { emitMessage } from '@/lib/socket';

interface MessageInputProps {
  conversationId: string;
}

export function MessageInput({ conversationId }: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);

  const addOptimisticMessage = useChatStore((state) => state.addOptimisticMessage);
  const user = useAuthStore((state) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || !user) return;

    setIsSending(true);

    // Add optimistic message immediately
    const messageId = addOptimisticMessage({
      conversationId,
      senderId: user.id,
      senderName: user.name,
      content: content.trim(),
    });

    // Clear input
    setContent('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      // Emit to socket server
      emitMessage(conversationId, content.trim(), user.id);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter, but allow Shift+Enter for new lines
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-emerald-500/20 bg-gradient-to-r from-slate-900 to-slate-800 p-4 shadow-lg"
    >
      <div className="flex gap-3">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message... (Shift+Enter for new line)"
          disabled={isSending}
          className="flex-1 px-4 py-3 bg-slate-800 text-slate-100 placeholder-slate-500 border border-slate-700 hover:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent resize-none max-h-30 transition-all duration-200"
          rows={1}
        />
        <Button
          type="submit"
          disabled={isSending || !content.trim()}
          isLoading={isSending}
          className="flex-shrink-0 self-end"
        >
          Send
        </Button>
      </div>
    </form>
  );
}
