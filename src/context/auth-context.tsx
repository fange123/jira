import { FullPageError, FullPageLoading } from "components/lib";
import React, { ReactNode } from "react";
import { useQueryClient } from "react-query";
import { useMount } from "utils";
import { initialUser } from "utils/http";
import useAsync from "utils/http-async";
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
  const {
    setData: setUser,
    run,
    isError,
    data: user,
    error,
    isIdle,
    isLoading,
  } = useAsync<IUsers | null>();

  const queryClient = useQueryClient();

  const login = (form: User) => auth.login(form).then(setUser);
  const register = (form: User) => auth.register(form).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      queryClient.clear();
    });

  useMount(() => {
    run(initialUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }
  if (isError) {
    return <FullPageError error={error} />;
  }

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
