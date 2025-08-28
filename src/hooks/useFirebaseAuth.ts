import { useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

interface UseFirebaseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useFirebaseAuth = (): UseFirebaseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (mounted) {
          setUser(user);
          setLoading(false);
          setError(null);
        }
      },
      (error) => {
        if (mounted) {
          console.error('Auth error:', error);
          setError(error.message);
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return { user, loading, error };
};
