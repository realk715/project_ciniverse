'use client'
import { useState, useEffect, useContext, createContext, ReactNode } from "react";

const AuthContext = createContext<{ token: string  ; setToken: (value: string) => void } | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState('');

  return (
    <AuthContext.Provider value={{token,setToken}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
