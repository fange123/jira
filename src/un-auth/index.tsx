import { Button, Card } from "antd";
import React, { useState } from "react";
import Login from "./login";
import Register from "./register";

interface IProps {}

const Index: React.FC<IProps> = (pops) => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {isRegister ? <Login /> : <Register />}
        <Button onClick={() => setIsRegister(!isRegister)}>
          切换到{isRegister ? "注册" : "登录"}
        </Button>
      </Card>
    </div>
  );
};

export default Index;
