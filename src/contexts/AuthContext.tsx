import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'customer@bookhushly.com',
    name: 'John Customer',
    role: 'customer',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    phone: '+1234567890',
    createdAt: new Date(),
    isVerified: true,
  },
  {
    id: '2',
    email: 'vendor@bookhushly.com',
    name: 'Sarah Vendor',
    role: 'vendor',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    phone: '+1234567891',
    createdAt: new Date(),
    isVerified: true,
  },
  {
    id: '3',
    email: 'admin@bookhushly.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    phone: '+1234567892',
    createdAt: new Date(),
    isVerified: true,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('bookhushly_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string) => {
    setIsLoading(true);
    // Mock authentication
    const foundUser = mockUsers.find(u => u.email === email && u.role === role);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('bookhushly_user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bookhushly_user');
  };

  const signup = async (userData: Partial<User>) => {
    setIsLoading(true);
    // Mock signup
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email!,
      name: userData.name!,
      role: userData.role!,
      phone: userData.phone,
      createdAt: new Date(),
      isVerified: false,
    };
    setUser(newUser);
    localStorage.setItem('bookhushly_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};