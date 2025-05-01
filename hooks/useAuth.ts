import { useState, useEffect, createContext, useContext } from 'react';

type User = {
  id: string;
  email: string;
  name: string;
} | null;

type AuthContextType = {
  user: User;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  isLoading: boolean;
  error: string | null;
};

// Mock user data for demonstration purposes
const MOCK_USER = {
  id: '1',
  email: 'user@example.com',
  name: 'Demo User',
};

// Mock credentials for demonstration
const VALID_EMAIL = 'user@example.com';
const VALID_PASSWORD = 'password';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => false,
  signOut: () => {},
  isLoading: false,
  error: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on load
  useEffect(() => {
    // In a real app, this would check for a stored token or session
    // For this demo, we'll just simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simple validation for demo purposes
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        setUser(MOCK_USER);
        setIsLoading(false);
        return true;
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      setError('An error occurred during sign in');
      setIsLoading(false);
      return false;
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return {
    user,
    signIn,
    signOut,
    isLoading,
    error,
  };
}