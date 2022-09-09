import { Routes, Route } from "react-router-dom";

import BaseLayOut from "../components/layout/BaseLayOut";

import DashBoardHome from "../pages/DashBoardHome";

import EmployeeRegister from "../components/dashBoard/employee/EmployeeRegister";
import EmployeeList from "../components/dashBoard/employee/EmployeeList";
import EmployeeEdit from "../components/dashBoard/employee/EmployeeEdit";
import EmployeeListSingle from "../components/dashBoard/employee/EmployeeListSingle";

export default function DashBoardRoutes() {
  return (
    <>
      <Routes>
        <Route path ='/' element={<BaseLayOut />}>

       
        <Route path="dashboard" element={<DashBoardHome />} />

        <Route path="dashboard/employee/list" element={<EmployeeList />}>
          <Route
            path="dashboard/employee/list/:id"
            element={<EmployeeListSingle />}
          />
        </Route>


        <Route path="dashboard/employee/new" element={<EmployeeRegister />} />

        <Route
          path="dashboard/employee/list/:id"
          element={<EmployeeListSingle />}
        />

        <Route path="dashboard/employee/edit/:id" element={<EmployeeEdit />} />
        </Route>
      </Routes>
    </>
  );
}
