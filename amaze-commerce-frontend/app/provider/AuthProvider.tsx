import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

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
    const router = useRouter();

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);
// login 
    const login = async (email: string, password: string) => {
        try {
            const res = true;
            if (!res) {
                throw new Error('Login failed');
            }
            const data = res;
            const { token, user } = data;

            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(user));

            setUser(user);
        }
        catch (error) {
            console.log(error);
        }
    }
// logout
    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        setUser(null);
        router.push('/');
    }
//auth info return and return body
    const authInfo = {
        user,
        login,
        logout,
    }
  return (
      <AuthContext.Provider value={authInfo}> 
         {children}
      </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);