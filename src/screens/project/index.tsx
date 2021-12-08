import { Routes, Route, Navigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import KanBanScreen from "../kanban";
import EpicScreen from "../epic";
import styled from "styled-components";
import { Menu } from "antd";

interface IProps {}
const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

const Index: React.FC<IProps> = (props) => {
  const units = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode="inline" selectedKeys={[units]}>
          <Menu.Item key="kanban">
            <Link to="kanban">看板</Link>
          </Menu.Item>
          <Menu.Item key="epic">
            <Link to="epic">任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path="/kanban" element={<KanBanScreen />} />
          <Route path="/epic" element={<EpicScreen />} />
          <Route path="/*" element={<Navigate to="kanban" replace={true} />} />
        </Routes>
      </Main>
    </Container>
  );
};

export default Index;

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`;
