import React, { createContext, useContext, useState } from "react";

// Auth context for global state management
const AuthContext = createContext();

// Hook for easy context usage
export const useAuth = () => useContext(AuthContext);

// Provides auth state to child components
export const AuthProvider = ({ children }) => {
  // Set initial auth state based on token presence
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );

  // Stores token and updates auth state to logged in
  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  // Clears token and updates auth state to logged out
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  // Auth context provider
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
