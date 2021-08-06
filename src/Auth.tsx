import { useAuth } from "context/auth-context";
import React from "react";
import ProjectListScreen from "./screens/project-list";

interface IProps {}

const Auth: React.FC<IProps> = (props) => {
  const { logout } = useAuth();
  return (
    <>
      <ProjectListScreen />
      <button onClick={logout}>登出</button>
    </>
  );
};

export default Auth;
