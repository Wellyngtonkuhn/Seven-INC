import { useFormik } from "formik";
import * as yup from "yup";

import { Box } from "@mui/system";
import { TextField, useTheme, useMediaQuery, Button } from "@mui/material";

import BaseLayOut from "../../../layout/BaseLayOut";

const formValidation = yup.object({
  nomeCompleto: yup.string().required("Campo Obrigatório"),
  email: yup.string().required("Campo Obrigatório"),
  telefone: yup.string().required("Campo Obrigatório"),
  salario: yup.string().required("Campo Obrigatório"),
  dataDeContratacaoRef: yup.string().required("Campo Obrigatório"),
});

export default function EmployeeRegister() {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));

  const formik = useFormik({
    initialValues: {
      nomeCompleto: "",
      email: "",
      telefone: "",
      salario: "",
      dataDeContratacaoRef: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: formValidation,
  });

  return (
    <>
      <BaseLayOut titulo={"Novo Funcionário"}>
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
              type="text"
              id="nomeCompleto"
              name="nomeCompleto"
              label="Nome Completo"
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
              type="email"
              id="email"
              name="email"
              label="Email"
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
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              values={formik.values.salario}
              error={formik.touched.salario && Boolean(formik.errors.salario)}
              helperText={formik.touched.salario && formik.errors.salario}
            />
            <TextField
              label="Data de Contratação"
              InputLabelProps={{ shrink: true }}
              type="date"
              id="dataDeContratacaoRef"
              name="dataDeContratacaoRef"
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              values={formik.values.dataDeContratacaoRef}
              error={
                formik.touched.dataDeContratacaoRef &&
                Boolean(formik.errors.dataDeContratacaoRef)
              }
              helperText={
                formik.touched.dataDeContratacaoRef &&
                formik.errors.dataDeContratacaoRef
              }
            />
            <Button type="submit">Salvar</Button>
          </form>
        </Box>
      </BaseLayOut>
    </>
  );
}
