import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Sample user credentials - you can move this to a separate config file later
export const SAMPLE_USERS = [
  { 
    email: 'student@hostel.com', 
    password: 'student123', 
    name: 'John Student',
    role: 'student'
  },
  { 
    email: 'warden@hostel.com', 
    password: 'warden123', 
    name: 'David Warden',
    role: 'warden'
  },
  { 
    email: 'watchman@hostel.com', 
    password: 'watchman123', 
    name: 'Tom Guard',
    role: 'watchman'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      // Check if user data exists in localStorage
      const savedUser = localStorage.getItem('user');
      if (!savedUser) return null;

      const userData = JSON.parse(savedUser);
      console.log('Loading saved user data:', { ...userData, password: '[REDACTED]' });

      // Validate required fields
      if (!userData.id || !userData.email || !userData.role) {
        console.error('Invalid user data in localStorage:', userData);
        localStorage.removeItem('user');
        return null;
      }

      // Normalize role
      userData.role = userData.role.toLowerCase();

      // Validate role
      if (!['student', 'warden', 'watchman'].includes(userData.role)) {
        console.error('Invalid role in stored user data:', userData.role);
        localStorage.removeItem('user');
        return null;
      }

      return userData;
    } catch (error) {
      console.error('Error loading user data:', error);
      localStorage.removeItem('user');
      return null;
    }
  });

  const login = (userData) => {
    if (!userData || !userData.role) {
      console.error('Invalid user data in login:', userData);
      return;
    }

    // Normalize role
    const normalizedData = {
      ...userData,
      role: userData.role.toLowerCase()
    };

    console.log('Setting user data in context:', normalizedData);
    setUser(normalizedData);
    localStorage.setItem('user', JSON.stringify(normalizedData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 