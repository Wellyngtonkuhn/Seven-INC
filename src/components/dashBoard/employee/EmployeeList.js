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
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { EmployeeService } from "../../../services/employees";

export default function EmployeeList() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));

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

  const handleDelete = (id, name) => {
    if (window.confirm("Deseja realmente remover " + name + "?")) {
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
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 2, width: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {desktop ? (
                <>
                  <TableCell>Funcionário</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell>Telefone</TableCell>
                  <TableCell>Salário</TableCell>
                  <TableCell>Data de Contratação</TableCell>
                  <TableCell>Ações</TableCell>
                </>
              ) : (
                <>
                  <TableCell>Funcionário</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell>Ações</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows &&
              rows.map((item) => {
                return (
                  <TableRow hover key={item.id}>
                    {desktop ? (
                      <>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.salary}</TableCell>
                        <TableCell>{item.created_at}</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                      </>
                    )}

                    <TableCell>
                      <Tooltip title="Editar">
                        <IconButton
                          onClick={() =>
                            navigate(`/dashboard/employee/edit/${item.id}`)
                          }
                        >
                          <Icon>create</Icon>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Ver mais">
                        <IconButton
                          onClick={() =>
                            navigate(`/dashboard/employee/list/${item.id}`)
                          }
                        >
                          <Icon>preview</Icon>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Deletar">
                        <IconButton
                          onClick={() => handleDelete(item.id, item.name)}
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

          {desktop && isLoading && (
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

          {tablet && isLoading && (
            <TableFooter>
              <TableRow>
                <TableCell>
                  <Skeleton width="auto" height={30} />
                </TableCell>
                <TableCell>
                  <Skeleton width="auto" height={30} />
                </TableCell>
                <TableCell>
                  <Skeleton width={30} height={80} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton width="auto" height={30} />
                </TableCell>
                <TableCell>
                  <Skeleton width="auto" height={30} />
                </TableCell>
                <TableCell>
                  <Skeleton width={30} height={80} />
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
