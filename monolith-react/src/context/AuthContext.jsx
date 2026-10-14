import React, { useState, useEffect } from 'react';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../service/axios';
import { AuthContext } from './AuthContextObject';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch {
      // If unauthorized (no cookie), setUser to null
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * SESSION RE-ESTABLISHMENT (HttpOnly Cookie Based)
   * On mount, we always try to fetch the current user.
   * The browser automatically sends the secure cookie if present.
   */
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    if (data?.user) {
      setUser(data.user);
    } else {
      await fetchCurrentUser();
    }
    return data;
  };

  const signUp = async (registrationData) => {
    await registerUser(registrationData);
    // After successful registration, auto-login (handled by backend setting cookies)
    return await login({
      email: registrationData.email,
      password: registrationData.password
    });
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      setUser(null);
      // No local storage to clear! Cookies handled by backend on this call.
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
