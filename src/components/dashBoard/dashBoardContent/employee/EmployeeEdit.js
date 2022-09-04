import { useState, useEffect } from "react";
import BaseLayOut from "../../../layout/BaseLayOut";
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
import { useParams } from "react-router-dom";

const formValidation = yup.object({
  name: yup.string().required("Campo Obrigatório"),
  document: yup.string().required("Campo Obrigatório"),
  email: yup.string().email("Email Inválido").required("Campo Obrigatório"),
  phone: yup.string().required("Campo Obrigatório"),
  birth_date: yup.string().required("Campo Obrigatório"),
  salary: yup.string().required("Campo Obrigatório"),
  created_at: yup.string().required("Campo Obrigatório"),
});

export default function EmployeeEdit() {
  const [detailsEmployee, setDetailsEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [atualizarPage, setAtualizarPage] = useState(false);

  const { id } = useParams();
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
      name: detailsEmployee.name,
      document: detailsEmployee.document,
      email: detailsEmployee.email,
      phone: detailsEmployee.phone,
      birth_date: detailsEmployee.birth_date,
      salary: detailsEmployee.salary,
      created_at: detailsEmployee.created_at,
    },
    onSubmit: (values) => {
      setIsLoading(true);
      EmployeeService.upDateById(Number(id), values).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setDetailsEmployee(values);
          setAtualizarPage(true);
          alert("Funcionário Editado");
        }
      });
    },
    validationSchema: formValidation,
  });

  return (
    <>
      <BaseLayOut titulo={detailsEmployee.name}>
        {isLoading ? (
          <Box maxWidth={desktop ? "30%" : "75%"} margin="auto">
            <Skeleton widht="100%" height={80} />
            <Skeleton widht="100%" height={80} />
            <Skeleton widht="100%" height={80} />
            <Skeleton widht="100%" height={80} />
            <Skeleton widht="100%" height={80} />
          </Box>
        ) : (
          <Box maxWidth={desktop ? "30%" : "75%"} margin="auto">
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
                type="text"
                id="name"
                name="name"
                label="Nome Completo"
                defaultValue={detailsEmployee.name}
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                values={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                type="text"
                id="document"
                name="document"
                label="CPF"
                defaultValue={detailsEmployee.document}
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                values={formik.values.document}
                error={
                  formik.touched.document && Boolean(formik.errors.document)
                }
                helperText={formik.touched.document && formik.errors.document}
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
                id="phone"
                name="phone"
                label="Telefone"
                defaultValue={detailsEmployee.phone}
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                values={formik.values.phone}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
              <TextField
                label="Data De Nascimento"
                defaultValue={detailsEmployee.birth_date}
                InputLabelProps={{ shrink: true }}
                type="date"
                id="birth_date"
                name="birth_date"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                values={formik.values.birth_date}
                error={
                  formik.touched.birth_date && Boolean(formik.errors.birth_date)
                }
                helperText={
                  formik.touched.birth_date && formik.errors.birth_date
                }
              />
              <TextField
                type="text"
                id="salary"
                name="salary"
                label="Salário"
                defaultValue={detailsEmployee.salary}
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                values={formik.values.salary}
                error={formik.touched.salary && Boolean(formik.errors.salary)}
                helperText={formik.touched.salary && formik.errors.salary}
              />
              <TextField
                label="Data De Contratação"
                defaultValue={detailsEmployee.created_at}
                InputLabelProps={{ shrink: true }}
                type="date"
                id="created_at"
                name="created_at"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                values={formik.values.created_at}
                error={
                  formik.touched.created_at && Boolean(formik.errors.created_at)
                }
                helperText={
                  formik.touched.created_at && formik.errors.created_at
                }
              />
              <Button type="submit">Salvar</Button>
            </form>
          </Box>
        )}
      </BaseLayOut>
    </>
  );
}
