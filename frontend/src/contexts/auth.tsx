import { ReactNode, createContext, useContext, useState } from "react";
import { api } from "../lib/axios";

// Define the shape of the authentication context
export interface AuthContextType {
  isAuthenticated: boolean;
  login: ({email, password}: AuthRequest) => Promise<void>
  logout: () => void;
}

export interface AuthResponse  {
  access_token: string;
  refresh_token: string;
  user: {
      email: string;
      name: string;
      id: string;
  };
}

interface AuthRequest {
  email: string;
  password: string;
} 

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a custom hook to use the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Create the authentication provider component
export const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async({ email, password }: AuthRequest) => {
    const { data } = await api.post<AuthResponse>("/auth/login", { email, password })

    localStorage.setItem("dashweather@token", data.access_token);
    localStorage.setItem("dashweather@refreshToken", data.refresh_token);
    localStorage.setItem("dashweather@user", JSON.stringify(data.user));

    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("dashweather@token");
    localStorage.removeItem("dashweather@refreshToken");
    localStorage.removeItem("dashweather@user");
    
    setIsAuthenticated(false);
  };

  const authContextValue: AuthContextType = {
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};