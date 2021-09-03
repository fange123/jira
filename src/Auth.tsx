import { Button, Dropdown, Menu } from "antd";
import { useAuth } from "context/auth-context";
import React from "react";
import ProjectListScreen from "./screens/project-list";
import styled from "styled-components";
import { ReactComponent as SoftWearLogo } from "assets/software-logo.svg";
import { Row } from "components/lib";

interface IProps {}

const Auth: React.FC<IProps> = () => {
  const { logout, user } = useAuth();
  // const value: any = undefined;
  return (
    <Container>
      {/* {value.notExist} */}
      <Header between>
        <HeaderLeft gap>
          <SoftWearLogo width="18rem" color="rgb(38,132,255)" />
          <p>项目1</p>
          <p>项目2</p>
        </HeaderLeft>
        <HeaderRight>
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

const Main = styled.main``;

export default Auth;
