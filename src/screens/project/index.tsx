import { Routes, Route, Navigate } from "react-router";
import { Link } from "react-router-dom";
import KanBanScreen from "../kanban";
import EpicScreen from "../epic";

interface IProps {}

const Index: React.FC<IProps> = (props) => {
  return (
    <>
      <h1>project</h1>
      <Link to="kanban">看板</Link>
      <Link to="epic">任务组</Link>
      <Routes>
        <Route path="/kanban" element={<KanBanScreen />} />
        <Route path="/epic" element={<EpicScreen />} />
        <Route path="/*" element={<Navigate to="kanban" replace={true} />} />
      </Routes>
    </>
  );
};

export default Index;
