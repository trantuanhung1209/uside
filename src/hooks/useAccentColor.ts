import { useContext } from 'react';
import { AccentColorContext } from '../contexts/AccentColorContextCore';

export const useAccentColor = () => {
  const context = useContext(AccentColorContext);
  if (!context) {
    throw new Error('useAccentColor must be used within an AccentColorProvider');
  }
  return context;
};
