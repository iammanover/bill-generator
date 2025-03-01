import { createContext, useState } from "react";
import { AuthProviderProps } from "../utils/interface/AuthProvider.interface";

const defaultValues = {
  isLoggedIn: false,
  login: (token: boolean | string) => {},
  logout: () => {},
};

export const AuthContext = createContext(defaultValues);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsloggedIn] = useState<boolean>(
    Boolean(localStorage.getItem("token"))
  );

  const login = (token: boolean | string) => {
    localStorage.setItem("token", token as string);
    setIsloggedIn(token as boolean);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsloggedIn(false);
  };

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
