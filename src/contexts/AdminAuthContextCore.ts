import { createContext } from 'react';
import type { User } from '@supabase/supabase-js';

export interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
  hasAdminRole: boolean;
  showUnauthorized: boolean;
}

export const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);
