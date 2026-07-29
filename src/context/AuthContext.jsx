import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user || res.data.data || res.data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  const login = (jwt, userData) => {
    localStorage.setItem("token", jwt);
    setUser(userData);
  };
 const updateUser = (userData) => {
  setUser(userData);
};
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}