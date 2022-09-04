import { Routes, Route } from "react-router-dom";

import DashBoardHome from "../pages/DashBoardHome";
import EmployeeRegister from "../dashBoard/employee/EmployeeRegister";
import EmployeeList from "../dashBoard/employee/EmployeeList";
import EmployeeEdit from "../dashBoard/employee/EmployeeEdit";
import EmployeeListSingle from "../dashBoard/employee/EmployeeListSingle";

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
