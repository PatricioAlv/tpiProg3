import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { authService } from '../services/apiService';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    const userData = Cookies.get('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        Cookies.remove('token');
        Cookies.remove('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      
      // Store token and user data
      Cookies.set('token', response.token, { expires: 1 }); // 1 day
      Cookies.set('user', JSON.stringify(response.user), { expires: 1 });
      
      setUser(response.user);
      toast.success('¡Inicio de sesión exitoso!');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Error al iniciar sesión';
      toast.error(message);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      
      // Store token and user data
      Cookies.set('token', response.token, { expires: 1 });
      Cookies.set('user', JSON.stringify(response.user), { expires: 1 });
      
      setUser(response.user);
      toast.success('¡Registro exitoso! Bienvenido a TaskManager');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Error al registrarse';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    setUser(null);
    toast.success('Sesión cerrada exitosamente');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
