import React, { createContext, useState, useEffect, useContext } from "react";
import { getToken, removeToken } from "../utils/token";
import { getMe } from "../api/user";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      getMe().then(data => {
        if (data.user) setUser(data.user);
        else logout();
      });
    }
  }, []);

  function logout() {
    removeToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
