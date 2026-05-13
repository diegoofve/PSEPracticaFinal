import { createContext, useContext, useState } from "react";
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
    sub: string;
    role: 'CLIENTE' | 'EMPRESA' | 'ADMIN';
}

interface AuthContextType {
    token: string | null;
    user: JwtPayload | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider =  ({children }: {children: React.ReactNode}) => {
    const [token, setToken] = useState<string | null>
    (localStorage.getItem('token'));

    //quitar cache que se peta si no
    const [user, setUser] = useState<JwtPayload | null>(() => {
        try {
            return token ? jwtDecode(token) : null
        } catch {
            localStorage.removeItem('token')
            return null
        }
    })

const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(jwtDecode<JwtPayload>(newToken));
};

const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
};

return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
        {children}
    </AuthContext.Provider>
);
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) 
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    return context;
};