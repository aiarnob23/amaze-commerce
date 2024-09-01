"use client";
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

//AuthContext
const AuthContext = createContext<AuthContextType | null>(null);

//AuthProvider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);
  // login
  const login = async (email: string, password: string) => {
    try {
      const res = await loginUser(email, password);
      const token = res?.data?.data?.refreshToken;
      const userData = res?.data?.data?.result;

      if (!userData) {
        throw new Error("Login failed");
        }
      setUser(userData);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.log(error);
    }
  };
  // logout
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
  };
  //auth info return and return body
  const authInfo = {
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
