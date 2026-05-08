import { createContext, useContext } from 'react';

export const TOKEN_KEY = 'hotel_guest_token';
export const USER_KEY = 'hotel_guest_user';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  isActive: boolean;
  createdAt: string;
};

export type AuthContextType = {
  user: User | null;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
