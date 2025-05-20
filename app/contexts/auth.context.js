import React, { createContext, useState, useContext } from 'react';
import { Platform } from 'react-native';
import { socket } from './socket.context';

const API_URL = Platform.OS === "web" 
  ? "http://localhost:3000" 
  : "http://172.20.10.5:3000";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const register = (username, password) => {
    return new Promise((resolve, reject) => {
      socket.emit('register', { username, password }, (response) => {
        if (response.success) {
          setUser(response.user);
          setIsAuthenticated(true);
          resolve(response);
        } else {
          reject(response.error);
        }
      });
    });
  };

  const login = (username, password) => {
    return new Promise((resolve, reject) => {
      console.log('Attempting to emit login event for username:', username);
      socket.emit('login', { username, password }, (response) => {
        console.log('Received response for login event:', response);
        if (response.success) {
          setUser(response.user);
          setIsAuthenticated(true);
          resolve(response);
        } else {
          reject(response.error);
        }
      });
    });
  };

  const logout = () => {
    socket.emit('logout');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 