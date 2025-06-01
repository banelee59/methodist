import React, { createContext, useContext, useState, ReactNode } from 'react';
import axiosInstance from '../lib/axiosConfig';


interface User {
  // Define the user properties based on your API response
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Add loading state

// ... existing code ...

const login = async (email: string, password: string) => {
  console.log('Attempting to log in with email:', email); // Log the email
  setIsLoading(true); // Set loading to true
  try {
    const response = await axiosInstance.post('/api/auth/login', { email, password });
    console.log('Login response:', response.data); // Log the response
    setUser(response.data.user);
  } catch (error) {
    console.error('Login error:', error); // Log any errors
  } finally {
    setIsLoading(false); // Set loading to false after request
  }
};

// ... existing code ...

  const register = async (email: string, password: string) => {
    const response = await axiosInstance.post('/api/auth/register', { email, password });
    setUser(response.data.user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};