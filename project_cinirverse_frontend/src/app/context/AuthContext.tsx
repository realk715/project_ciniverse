'use client'
import axios from "axios";
import { useState, useEffect, useContext, createContext, ReactNode } from "react";
import Navbar from "../Header_Navbar";

const AuthContext = createContext<{ loggedIn: true | false ; setLoggedIn: (value: boolean) => void } | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
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
