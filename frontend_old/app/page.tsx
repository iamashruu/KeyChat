'use client';

/**
 * Root page - redirects to login or chat
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function Page() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/chat');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-3 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin"></div>
    </div>
  );
}

