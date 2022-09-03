import { useParams } from "react-router-dom";

import BaseLayOut from "../../layout/BaseLayOut";
import EmployeeRegister from "./employee/EmployeeRegister";
import EmployeeEdit from "./employee/EmployeeEdit";

export default function EmployeeDetails() {
  const { id = "new" } = useParams();

  return (
    <>
      <BaseLayOut titulo={id === "new" ? "Novo Funcionário" : "Editar Funcionário"}>
        {id === "new" && <EmployeeRegister />}

        {id !== "new" && <EmployeeEdit id={id} />}
      </BaseLayOut>
    </>
  );
}
