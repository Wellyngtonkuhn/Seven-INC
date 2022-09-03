import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import {
  TextField,
  useTheme,
  useMediaQuery,
  Button,
  Skeleton,
} from "@mui/material";

import { useFormik } from "formik";
import * as yup from "yup";

import { EmployeeService } from "../../../services/employees";

const formValidation = yup.object({
  nomeCompleto: yup.string().required("Campo Obrigatório"),
  email: yup.string().email('Email Inválido').required("Campo Obrigatório"),
  telefone: yup.string().required("Campo Obrigatório"),
  salario: yup.string().required("Campo Obrigatório"),
  dataDeContratacao: yup.string().required("Campo Obrigatório"),
});


export default function EmployeeEdit({ id }) {

  const [detailsEmployee, setDetailsEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [atualizarPage, setAtualizarPage] = useState(false);

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    if (id !== "new") {
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
    }
  }, [atualizarPage]);

  const formik = useFormik({
    initialValues: {
      nomeCompleto: detailsEmployee.nomeCompleto,
      email: detailsEmployee.email,
      telefone: detailsEmployee.telefone,
      salario: detailsEmployee.salario,
      dataDeContratacao: detailsEmployee.dataDeContratacao,
    },
    onSubmit: (values) => {
      setIsLoading(true);
      EmployeeService.upDateById(Number(id), values).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setDetailsEmployee(values)
          setAtualizarPage(true)
          alert("Funcionário Editado");
        }
      });
    },
    validationSchema: formValidation,
  });

  return (
    <>
      {isLoading ? (
        <Box maxWidth={desktop ? "25%" : "75%"} margin="auto">
          <Skeleton widht="100%" height={80} />
          <Skeleton widht="100%" height={80} />
          <Skeleton widht="100%" height={80} />
          <Skeleton widht="100%" height={80} />
          <Skeleton widht="100%" height={80} />
        </Box>
      ) : (
        <Box maxWidth={desktop ? "25%" : "75%"} margin="auto">
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
            onSubmit={formik.handleSubmit}
          >
            <TextField
              autoFocus
              InputLabelProps={{ shrink: true }}
              type="text"
              id="nomeCompleto"
              name="nomeCompleto"
              label="Nome Completo"
              defaultValue={detailsEmployee.nomeCompleto}
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              values={formik.values.nomeCompleto}
              error={
                formik.touched.nomeCompleto &&
                Boolean(formik.errors.nomeCompleto)
              }
              helperText={
                formik.touched.nomeCompleto && formik.errors.nomeCompleto
              }
            />
            <TextField
              type="text"
              id="email"
              name="email"
              label="Email"
              defaultValue={detailsEmployee.email}
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              values={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              type="text"
              id="telefone"
              name="telefone"
              label="Telefone"
              defaultValue={detailsEmployee.telefone}
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              values={formik.values.telefone}
              error={formik.touched.telefone && Boolean(formik.errors.telefone)}
              helperText={formik.touched.telefone && formik.errors.telefone}
            />
            <TextField
              type="text"
              id="salario"
              name="salario"
              label="Salário"
              defaultValue={detailsEmployee.salario}
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              values={formik.values.salario}
              error={formik.touched.salario && Boolean(formik.errors.salario)}
              helperText={formik.touched.salario && formik.errors.salario}
            />
            <TextField
              label="Data de Contratação"
              defaultValue={detailsEmployee.dataDeContratacao}
              InputLabelProps={{ shrink: true }}
              type="date"
              id="dataDeContratacao"
              name="dataDeContratacao"
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              values={formik.values.dataDeContratacao}
              error={
                formik.touched.dataDeContratacao &&
                Boolean(formik.errors.dataDeContratacao)
              }
              helperText={
                formik.touched.dataDeContratacao &&
                formik.errors.dataDeContratacao
              }
            />
            <Button type="submit">Salvar</Button>
          </form>
        </Box>
      )}
    </>
  );
}
