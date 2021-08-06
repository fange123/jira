import { useAuth } from "../context/auth-context";
import React, { FormEvent } from "react";

const Register = () => {
  const { register } = useAuth();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    //要阻止表单提交的默认行为
    evt.preventDefault();
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
    register({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" name="username" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" name="password" id="password" />
      </div>
      <div>
        <button type="submit">注册</button>
      </div>
    </form>
  );
};

export default Register;
