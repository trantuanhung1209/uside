import { createContext } from 'react';

export interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);
