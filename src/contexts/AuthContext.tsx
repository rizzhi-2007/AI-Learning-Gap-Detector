import { createContext, useContext, useState, ReactNode } from 'react';

// Mock user type for demonstration
interface User {
  id: string;
  name: string;
  email: string;
  grade: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, grade: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@student.edu',
  grade: '10th Grade',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation - accepts any valid email format
    if (email && password.length >= 6) {
      setUser({ ...mockUser, email });
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string, grade: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (name && email && password.length >= 6) {
      setUser({
        id: Date.now().toString(),
        name,
        email,
        grade,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
