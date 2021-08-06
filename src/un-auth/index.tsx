import React, { useState } from "react";
import Login from "./login";
import Register from "./register";

interface IProps {}

const Index: React.FC<IProps> = (props) => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  return (
    <>
      {isRegister ? <Login /> : <Register />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? "注册" : "登录"}
      </button>
    </>
  );
};

export default Index;
