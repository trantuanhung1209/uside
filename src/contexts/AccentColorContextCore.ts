import { createContext } from 'react';

export interface AccentColorContextType {
  currentAccentColor: string;
  changeAccentColor: (color: string) => void;
  resetToDefault: () => void;
}

export const AccentColorContext = createContext<AccentColorContextType | undefined>(undefined);
