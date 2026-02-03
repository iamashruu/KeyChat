/**
 * Authentication state management with Zustand
 * Tracks user authentication status and profile
 */

import { create } from 'zustand';
import { AuthState, User } from '@/types/chat';
import { MOCK_CURRENT_USER } from '@/lib/mock-data';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,

  login: (email: string, password: string) => {
    // Mock login logic - no real authentication
    // In production, this would call an API endpoint
    set({
      isAuthenticated: true,
      user: {
        ...MOCK_CURRENT_USER,
        email,
      },
    });
  },

  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
    });
  },

  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: !!user,
    });
  },
}));
