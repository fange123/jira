import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";

interface IProps {
  onError: (error: Error) => void;
}

const Register = (props: IProps) => {
  const { onError } = props;
  const { register } = useAuth();

  const handleSubmit = ({
    c_password,
    ...values
  }: {
    username: string;
    password: string;
    c_password: string;
  }) => {
    if (c_password !== values.password) {
      onError(new Error("请输入相同的密码"));
      return;
    }
    register(values).catch(onError);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" name="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" name="password" />
      </Form.Item>
      <Form.Item
        name="c_password"
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input type="password" name="c_password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
