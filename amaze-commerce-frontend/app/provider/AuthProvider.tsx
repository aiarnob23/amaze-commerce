"use client";
import { loginUser } from "@/lib/user";
import { deleteCookie } from "@/lib/utils/cookies";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: any;
  setLoading: any;
}

// AuthContext
const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    }
  }, []);


  // login
  const login = async (userData : any, token : any) => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      setUser(userData);
      console.log('user set up successfull');
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // logout
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    deleteCookie({ name: "refreshToken" });
    setUser(null);
    window.location.replace('/auth/login');
  };

  // Auth info return and return body
  const authInfo: AuthContextType = {
    user,
    login,
    logout,
    loading,
    setLoading,

  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
