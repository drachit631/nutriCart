import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("nutriCart_token");
    const storedUser = localStorage.getItem("nutriCart_user");

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);

        // For demo purposes, tokens are valid for a long time (7 days)
        // In production, you'd validate with the server
        const tokenParts = storedToken.split("-");
        if (tokenParts.length >= 3) {
          const tokenTimestamp = parseInt(tokenParts[tokenParts.length - 1]);
          const tokenAge = Date.now() - tokenTimestamp;
          const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days (much longer for better UX)

          if (tokenAge > maxAge) {
            console.log("Token expired, clearing authentication");
            localStorage.removeItem("nutriCart_token");
            localStorage.removeItem("nutriCart_user");
            setLoading(false);
            return;
          }
        }

        console.log("Restoring authentication from localStorage");
        setToken(storedToken);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("nutriCart_token");
        localStorage.removeItem("nutriCart_user");
      }
    } else {
      console.log("No stored authentication found");
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authAPI.login(email, password);

      const { user: userData, token: authToken } = response;

      // Store in localStorage
      localStorage.setItem("nutriCart_token", authToken);
      localStorage.setItem("nutriCart_user", JSON.stringify(userData));

      // Update state
      setToken(authToken);
      setUser(userData);
      setIsAuthenticated(true);

      return { success: true, user: userData };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);

      const { user: newUser, token: authToken } = response;

      // Store in localStorage
      localStorage.setItem("nutriCart_token", authToken);
      localStorage.setItem("nutriCart_user", JSON.stringify(newUser));

      // Update state
      setToken(authToken);
      setUser(newUser);
      setIsAuthenticated(true);

      return { success: true, user: newUser };
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);

      if (!user?.id) {
        throw new Error("User ID not found. Please login again.");
      }

      const updatedUser = await authAPI.updateProfile(user.id, profileData);

      // Update stored user data
      const newUserData = { ...user, ...updatedUser };
      localStorage.setItem("nutriCart_user", JSON.stringify(newUserData));

      // Update state
      setUser(newUserData);

      return { success: true, user: newUserData };
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem("nutriCart_token");
    localStorage.removeItem("nutriCart_user");

    // Clear state
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshUser = async () => {
    if (!user?.id) return;

    try {
      const userData = await authAPI.getUser(user.id);
      const newUserData = { ...user, ...userData };

      localStorage.setItem("nutriCart_user", JSON.stringify(newUserData));
      setUser(newUserData);
    } catch (error) {
      console.error("Error refreshing user data:", error);
      // If refresh fails, logout user
      logout();
    }
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
