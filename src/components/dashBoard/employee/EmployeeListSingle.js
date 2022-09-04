import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Icon,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";

import BaseLayOut from "../../layout/BaseLayOut";
import { EmployeeService } from "../../../services/employees";

export default function EmployeeListSingle() {
  const [detailsEmployee, setDetailsEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setIsLoading(true);
    setTimeout(() => {
      EmployeeService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setDetailsEmployee(result.data);
        }
      });
    }, 1000);
  }, []);

  const handleDelete = (id, name) => {
    if (window.confirm("Deseja realmente remover " + name + "?")) {
      EmployeeService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Funcionário excluído");
          navigate("/dashboard/employee/list");
        }
      });
    }
  };

  return (
    <>
      <BaseLayOut titulo={detailsEmployee.name}>
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ m: 2, width: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Funcionário</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Salário</TableCell>
                <TableCell>Data de Nascimento</TableCell>
                <TableCell>Data de Contratação</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>{detailsEmployee.name}</TableCell>
                <TableCell>{detailsEmployee.email}</TableCell>
                <TableCell>{detailsEmployee.phone}</TableCell>
                <TableCell>{detailsEmployee.salary}</TableCell>
                <TableCell>{detailsEmployee.birth_date}</TableCell>
                <TableCell>{detailsEmployee.created_at}</TableCell>
                <TableCell>
                  <Tooltip title="Editar">
                    <IconButton
                      onClick={() =>
                        navigate(
                          `/dashboard/employee/edit/${detailsEmployee.id}`
                        )
                      }
                    >
                      <Icon>create</Icon>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Deletar">
                    <IconButton
                      onClick={() =>
                        handleDelete(detailsEmployee.id, detailsEmployee.name)
                      }
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableBody>

            {isLoading && (
              <TableFooter>
                <TableRow>
                  <TableCell>
                    <Skeleton width="auto" height={30} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width="auto" height={30} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width="auto" height={30} />
                  </TableCell>
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </TableContainer>
      </BaseLayOut>
    </>
  );
}
