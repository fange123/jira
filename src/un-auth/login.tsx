import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";
import useAsync from "utils/http-async";

interface IProps {
  onError: (error: Error) => void;
}

const Login = (props: IProps) => {
  const { login } = useAuth();
  const { onError } = props;
  const { isLoading, run } = useAsync(undefined, {
    throwOnError: true,
  });

  const handleSubmit = (values: { username: string; password: string }) => {
    run(login(values).catch(onError));
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" name="username" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" name="password" id="password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
