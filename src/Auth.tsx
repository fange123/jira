import { Button, Dropdown, Menu } from "antd";
import { useAuth } from "context/auth-context";
import React from "react";
import ProjectListScreen from "./screens/project-list";
import styled from "styled-components";
import { ReactComponent as SoftWearLogo } from "assets/software-logo.svg";
import { ButtonNoPadding, Row } from "components/lib";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import ProjectScreen from "./screens/project";
import { resetRoute } from "utils";
import ProjectModal from "./screens/project-list/ProjectModal";
import ProjectPopover from "./components/ProjectPopover";

interface IProps {}

const Auth: React.FC<IProps> = () => {
  const PageHeader = () => {
    return (
      <Header between>
        <HeaderLeft gap>
          <ButtonNoPadding type="link" onClick={resetRoute}>
            <SoftWearLogo width="18rem" color="rgb(38,132,255)" />
          </ButtonNoPadding>
          <ProjectPopover />
        </HeaderLeft>
        <HeaderRight>
          <User />
        </HeaderRight>
      </Header>
    );
  };

  const User = () => {
    const { logout, user } = useAuth();
    return (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="logout">
              <Button onClick={logout} type="link">
                登出
              </Button>
            </Menu.Item>
          </Menu>
        }
      >
        <Button type="link">hi,{user?.name}</Button>
      </Dropdown>
    );
  };
  return (
    <Container>
      <Router>
        <PageHeader />
        <Main>
          <Routes>
            <Route path="/projects" element={<ProjectListScreen />} />
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
            <Route path="/" element={<Navigate to="/projects" />} />
          </Routes>
        </Main>
        <ProjectModal />
      </Router>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;

export default Auth;
