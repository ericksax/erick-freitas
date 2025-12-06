import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { api } from "../lib/axios";

// Define the shape of the authentication context
export interface AuthContextType {
  isAuthenticated: boolean;
  login: ({ email, password }: AuthRequest) => Promise<void>
  logout: () => void;
  getUserInfo: () => User | null;
  user: User | null
  isLoading: boolean;
}

export interface AuthResponse  {
  access_token: string;
  refresh_token: string;
  user: User
}

export interface User {
  email: string;
  name: string;
  id: string;
}

interface AuthRequest {
  email: string;
  password: string;
} 

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the authentication provider component
export const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem("dashweather@token");
      const storedUser = localStorage.getItem("dashweather@user");
      if (token && storedUser) {
        setIsAuthenticated(true);
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async({ email, password }: AuthRequest) => {
    const { data } = await api.post<AuthResponse>("/auth/login", { email, password })

    localStorage.setItem("dashweather@token", data.access_token);
    localStorage.setItem(
      "dashweather@refreshToken",
      data.refresh_token
    );

    localStorage.setItem(
      "dashweather@user",
      JSON.stringify(data.user)
    );
    setUser(data.user)
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("dashweather@token");
    localStorage.removeItem("dashweather@refreshToken");
    localStorage.removeItem("dashweather@user");
    
    setUser(null)
    setIsAuthenticated(false);
  };

  function getUserInfo(): User | null {
    const user = localStorage.getItem("dashweather@user")

    if(!user) {
      return null
    }

    return JSON.parse(user);
  }

  const authContextValue: AuthContextType = {
    isAuthenticated,
    login,
    logout,
    user,
    getUserInfo,
    isLoading
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};