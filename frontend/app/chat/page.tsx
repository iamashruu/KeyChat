'use client';

/**
 * Chat index page with modern dark green styling
 * Displayed when no conversation is selected
 * Shows welcome message
 */

export default function ChatPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 to-emerald-950">
      <div className="text-center">
        <div className="text-6xl mb-6">💬</div>
        <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text mb-3">
          Welcome to KeyChat
        </h1>
        <p className="text-emerald-300/70 max-w-md">
          Select a conversation from the sidebar to start messaging
        </p>
      </div>
    </div>
  );
}
