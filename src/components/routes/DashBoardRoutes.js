import { Routes, Route } from "react-router-dom";
import DashBoardHome from "../pages/DashBoardHome";
import EmployeeRegister from '../dashBoard/dashBoardContent/employee/EmployeeRegister'
import EmployeeList from '../dashBoard/dashBoardContent/employee/EmployeeList'


export default function DashBoardRoutes() {


  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<DashBoardHome />} />
        <Route path="/dashboard/employee/new" element={<EmployeeRegister />} />
        <Route path="/dashboard/employee/list" element={<EmployeeList />} />
      </Routes>
    </>
  );
}
