'use client';

/**
 * Login page with modern dark green design
 * Simple email + password form that redirects to /chat on submit
 * No real authentication - mock login for UI demo
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
      router.push('/chat');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-linear-to-brrom-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-8 border border-emerald-500/20">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="text-4xl font-bold text-transparent bg-linear-to-r from-emerald-400 to-emerald-300 bg-clip-text mb-2">
              KeyChat
            </div>
            <p className="text-emerald-300/70 font-medium">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />

            <Button
              type="submit"
              disabled={isLoading || !email || !password}
              isLoading={isLoading}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
            <p className="text-sm text-emerald-300">
              <span className="font-bold">Demo Mode:</span> Enter any email and password to sign in.
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-emerald-300/50 text-sm mt-8">
          A modern, beautiful chat application
        </p>
      </div>
    </div>
  );
}
