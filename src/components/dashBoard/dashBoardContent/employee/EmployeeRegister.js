import { useFormik } from "formik";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";

import { Box } from "@mui/system";
import { TextField, useTheme, useMediaQuery, Button } from "@mui/material";
import { EmployeeService } from "../../../services/employees";

const formValidation = yup.object({
  id: yup.number(),
  nomeCompleto: yup.string().required("Campo Obrigatório"),
  email: yup.string().email().required("Campo Obrigatório"),
  telefone: yup.string().required("Campo Obrigatório"),
  salario: yup.string().required("Campo Obrigatório"),
  dataDeContratacao: yup.string().required("Campo Obrigatório"),
});

export default function EmployeeRegister() {
  const navigate = useNavigate();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));

  const formik = useFormik({
    initialValues: {
      id: "",
      nomeCompleto: "",
      email: "",
      telefone: "",
      salario: "",
      dataDeContratacao: "",
    },
    onSubmit: (values) => {
      formik.values.id = idGenerator();
      EmployeeService.create(values).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Funcionário Criado");
        }
      });
    },
    validationSchema: formValidation,
  });

  const idGenerator = () => {
    const newId = Math.floor(Math.random() * (1000 - 1) + 1);
    return newId;
  };

  return (
    <>
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
              formik.touched.nomeCompleto && Boolean(formik.errors.nomeCompleto)
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
    </>
  );
}
