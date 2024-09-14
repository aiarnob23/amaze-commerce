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
  const login = async (email: string, password: string) => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      const res = await loginUser(email, password);
      const token = res?.data?.data?.accessToken;
      const userData = res?.data?.data?.result;
      setUser(userData);


      if (!userData || !token) {
        throw new Error("Login failed: No user data or token received.");
      }

      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(userData));

      return userData;
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
