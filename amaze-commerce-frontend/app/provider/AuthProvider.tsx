"use client";
import { SERVER_BASE_URL } from "@/lib/config";
import { loginUser } from "@/lib/user";
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
}

// AuthContext
const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
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
      
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // logout
  const logout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Auth info return and return body
  const authInfo: AuthContextType = {
    user,
    login,
    logout,
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
