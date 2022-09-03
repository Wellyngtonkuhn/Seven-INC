import { Routes, Route } from "react-router-dom";

import DashBoardHome from "../pages/DashBoardHome";
import EmployeeList from "../dashBoard/dashBoardContent/employee/EmployeeList";
import EmployeeDetails from "../dashBoard/dashBoardContent/EmployeeDetails";

export default function DashBoardRoutes() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<DashBoardHome />} />

        <Route path="/dashboard/employee/list" element={<EmployeeList />} />

        <Route path="/dashboard/employee/:id" element={<EmployeeDetails />} />
      </Routes>
    </>
  );
}
