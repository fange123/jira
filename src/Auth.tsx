import { Button } from "antd";
import { useAuth } from "context/auth-context";
import React from "react";
import ProjectListScreen from "./screens/project-list";
import styled from "styled-components";

interface IProps {}

const Auth: React.FC<IProps> = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <p>logo</p>
          <p>项目1</p>
          <p>项目2</p>
        </HeaderLeft>
        <HeaderRight>
          <Button onClick={logout}>登出</Button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-areas: "header" "main";
  height: 100vh;
`;

const Header = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const HeaderRight = styled.div``;

const Main = styled.main`
  grid-area: main;
`;

export default Auth;
