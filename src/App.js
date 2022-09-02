import { BrowserRouter } from "react-router-dom";

import DashBoardContex from "./components/context/DashboardContext";

import MenuLateral from "./components/dashBoard/dashBoardMenu/MenuLateral";
import DashBoardRoutes from "./components/routes/DashBoardRoutes";

export default function App() {
  return (
    <>
      <DashBoardContex>
        <BrowserRouter>
          <MenuLateral>
            <DashBoardRoutes />
          </MenuLateral>
        </BrowserRouter>
      </DashBoardContex>
    </>
  );
}
