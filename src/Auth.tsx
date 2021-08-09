import { Button, Card } from "antd";
import { useAuth } from "context/auth-context";
import React from "react";
import ProjectListScreen from "./screens/project-list";

interface IProps {}

const Auth: React.FC<IProps> = (props) => {
  const { logout } = useAuth();
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        <ProjectListScreen />
        <Button onClick={logout}>登出</Button>
      </Card>
    </div>
  );
};

export default Auth;
