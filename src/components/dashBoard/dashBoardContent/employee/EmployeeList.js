import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

import BaseLayOut from "../../../layout/BaseLayOut";
import { EmployeeService } from "../../../services/employees";

export default function EmployeeList() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      EmployeeService.getAll()
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
            return;
          }
          setRows(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  }, []);

  const handleDelete = (id, nomeCompleto) => {
    if (window.confirm("Deseja realmente remover " + nomeCompleto + "?")) {
      EmployeeService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows((oldRows) => {
            return [...oldRows.filter((oldRow) => oldRow.id !== id)];
          });
        }
      });
    }
  };

  return (
    <>
      <BaseLayOut titulo={"EmployeeList"}>
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
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows &&
                rows.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.nomeCompleto}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>
                        <Tooltip title="Editar">
                          <IconButton
                            onClick={() =>
                              navigate(`/dashboard/employee/${item.id}`)
                            }
                          >
                            <Icon>create</Icon>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Deletar">
                          <IconButton
                            onClick={() =>
                              handleDelete(item.id, item.nomeCompleto)
                            }
                          >
                            <Icon>delete</Icon>
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>

            {rows.length === 0 && !isLoading && (
              <caption>Nenhum Registro Econtrado</caption>
            )}
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
