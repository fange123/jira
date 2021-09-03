import { Button, Card, Divider, Typography } from "antd";
import React, { useState } from "react";
import Login from "./login";
import Register from "./register";
import styled from "styled-components";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";
import { useDocumentTitle } from "utils";

interface IProps {}

const Index: React.FC<IProps> = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  useDocumentTitle("注册或登录", false);

  return (
    <Container>
      <BackGround />
      <Header />
      <BoxShadowCard>
        <Title>{isRegister ? "请登录" : "请注册"}</Title>
        <Typography.Text type="danger">
          {error ? error.message : null}
        </Typography.Text>
        {isRegister ? (
          <Login onError={setError} />
        ) : (
          <Register onError={setError} />
        )}
        <Divider />
        <Button
          onClick={() => {
            setError(null);
            setIsRegister(!isRegister);
          }}
          type="link"
        >
          {isRegister ? "没有账号？注册新账号" : "已有账号了，直接登录"}
        </Button>
      </BoxShadowCard>
    </Container>
  );
};
const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const BackGround = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-repeat: no-repeat;
  background-size: calc((100vw - 40rem) / 2 - 3.2rem),
    calc((100vw - 40rem) / 2 - 3.2rem);
  background-image: url(${left}), url(${right});
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100vh;
`;

const BoxShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

export default Index;
