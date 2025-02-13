"use client";
import { createContext, useContext, useEffect, useState } from "react";
// import { useRouter } from "next/router";

import { AuthContextProps } from "@/types";

export const Context = createContext<AuthContextProps>({
  isLoading: false,
  isAuthenticated: false,
  token: null,
  setToken: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    setIsAuthenticated(true);
    // router.push("/");
  }, []);
  
  return (
    <Context.Provider value={{ isLoading, isAuthenticated, token, setToken }}>
      {children}
    </Context.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
