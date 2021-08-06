import React, { ReactNode, useState } from "react";
import { useMount } from "utils";
import { initialUser } from "utils/http";
import * as auth from "../auth-provider";
import { IUsers } from "../screens/project-list/List";

interface User {
  password: string;
  username: string;
}

const AuthContext = React.createContext<
  | {
      user: IUsers | null;
      login: (form: User) => Promise<void>;
      register: (form: User) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUsers | null>(null);

  const login = (form: User) => auth.login(form).then(setUser);
  const register = (form: User) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    initialUser().then(setUser);
  });

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register }}
      children={children}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
