import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  graduationYear?: number;
  degreeProgram?: string;
  role?: string;
  membershipType?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    graduationYear?: number;
    degreeProgram?: string;
  }) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Demo credentials for hardcoded authentication
  const demoUsers = [
    {
      _id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'demo@namal.edu.pk',
      password: 'demo123',
      graduationYear: 2020,
      degreeProgram: 'Computer Science',
      membershipType: 'Premium'
    },
    {
      _id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'admin@namal.edu.pk',
      password: 'admin123',
      graduationYear: 2019,
      degreeProgram: 'Business Administration',
      membershipType: 'Lifetime'
    }
  ];

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check demo credentials
      const foundUser = demoUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Create user object without password
      const { password: _, ...userWithoutPassword } = foundUser;
      const mockToken = 'demo-token-' + Date.now();
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      setToken(mockToken);
      setUser(userWithoutPassword);
      setError(null);
      
      // Show success message
      alert('Login successful! Welcome back to Namal Alumni Network.');
      
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    graduationYear?: number;
    degreeProgram?: string;
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if email already exists
      const existingUser = demoUsers.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('Email already registered. Please use a different email.');
      }

      // Create new user
      const newUser = {
        _id: (demoUsers.length + 1).toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        graduationYear: userData.graduationYear,
        degreeProgram: userData.degreeProgram,
        membershipType: 'Basic'
      };
      
      const mockToken = 'demo-token-' + Date.now();
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      setToken(mockToken);
      setUser(newUser);
      setError(null);
      
      // Show success message
      alert('Registration successful! Welcome to Namal Alumni Network. You can now access all features.');
      
    } catch (error) {
      console.error('Registration error:', error);
      setError(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setError(null);
    alert('You have been logged out successfully.');
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isAuthenticated, 
      login, 
      register, 
      logout,
      loading,
      error
    }}>
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