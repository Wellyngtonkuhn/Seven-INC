import { Routes, Route } from "react-router-dom";

import DashBoardHome from "../pages/DashBoardHome";
import EmployeeRegister from "../dashBoard/dashBoardContent/employee/EmployeeRegister";
import EmployeeList from "../dashBoard/dashBoardContent/employee/EmployeeList";
import EmployeeEdit from "../dashBoard/dashBoardContent/employee/EmployeeEdit";
import EmployeeListSingle from "../dashBoard/dashBoardContent/employee/EmployeeListSingle";

export default function DashBoardRoutes() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<DashBoardHome />} />

        <Route path="/dashboard/employee/list" element={<EmployeeList />} />

        <Route path="/dashboard/employee/new" element={<EmployeeRegister />} />

        <Route
          path="/dashboard/employee/list/:id"
          element={<EmployeeListSingle />}
        />

        <Route path="/dashboard/employee/edit/:id" element={<EmployeeEdit />} />
      </Routes>
    </>
  );
}
