import React, { createContext, useState, useEffect, useContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import api from "@/services/api.service";

export interface IUser {
  _id: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export type IUserWithoutPass = Omit<IUser, "password">;

export interface AuthContextType {
  loggedInUser: IUserWithoutPass | null | undefined;
  login: (user: Pick<IUser, "username" | "password">) => Promise<void>;
  register: (user: IUser) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<
    IUserWithoutPass | null | undefined
  >(undefined);
  const [token, setToken] = useLocalStorage("jwt-taskify", null);

  useEffect(() => {
    if (!token) {
      setLoggedInUser(null);
      return;
    }

    async function fetchUser() {
      try {
        const response = await api.get("/auth/loggedInUser");
        setLoggedInUser(response.data);
      } catch (error: any) {
        if (error.response?.status === 401) {
          console.error("Invalid token, logging out");
          logout();
        } else if (error.response?.status === 404) {
          console.error("User not found, logging out");
          logout();
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    }

    fetchUser();
  }, [token]);

  function logout() {
    setToken(null);
    setLoggedInUser(null);
  }

  async function login(userData: Pick<IUser, "username" | "password">) {
    try {
      const response = await api.post("/auth/login", userData);
      setToken(response.data.token);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  async function register(userData: IUser) {
    try {
      const response = await api.post("/auth/register", userData);
    } catch (error) {
      console.error("Error registering:", error);
    }
  }

  return (
    <AuthContext.Provider value={{ loggedInUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
}
