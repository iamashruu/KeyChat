'use client';

/**
 * Chat header component with modern dark green styling
 * Displays the active conversation name and participant info
 */

interface ChatHeaderProps {
  conversationName: string;
  participantCount?: number;
}

export function ChatHeader({ conversationName, participantCount }: ChatHeaderProps) {
  return (
    <div className="h-16 border-b border-emerald-500/20 bg-gradient-to-r from-slate-900 to-slate-800 flex items-center px-6 shadow-lg">
      <div>
        <h2 className="text-lg font-bold text-transparent bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text">
          {conversationName}
        </h2>
        {participantCount && participantCount > 1 && (
          <p className="text-sm text-emerald-300/70">
            {participantCount} participants
          </p>
        )}
      </div>
    </div>
  );
}
