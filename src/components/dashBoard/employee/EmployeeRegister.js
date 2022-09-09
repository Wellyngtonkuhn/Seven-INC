import { useFormik } from "formik";
import { formValidation } from "../../../yup";

import { Box } from "@mui/system";
import { TextField, useTheme, useMediaQuery, Button } from "@mui/material";

import { EmployeeService } from "../../../services/employees";

export default function EmployeeRegister() {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      document: "",
      email: "",
      phone: "",
      birth_date: "",
      salary: "",
      created_at: "",
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
      <h1>Resgistro de Funcionário</h1>
      <Box
        sx={{ marginTop: 1 }}
        maxWidth={desktop ? "30%" : "75%"}
        margin="auto"
      >
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
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            values={formik.values.document}
            error={formik.touched.document && Boolean(formik.errors.document)}
            helperText={formik.touched.document && formik.errors.document}
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
            id="phone"
            name="phone"
            label="Telefone"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            values={formik.values.phone}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />

          <TextField
            type="date"
            InputLabelProps={{ shrink: true }}
            id="birth_date"
            name="birth_date"
            label="Data De Nascimento"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            values={formik.values.birth_date}
            error={
              formik.touched.birth_date && Boolean(formik.errors.birth_date)
            }
            helperText={formik.touched.birth_date && formik.errors.birth_date}
          />
          <TextField
            type="text"
            id="salary"
            name="salary"
            label="Salário"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            values={formik.values.salary}
            error={formik.touched.salary && Boolean(formik.errors.salary)}
            helperText={formik.touched.salary && formik.errors.salary}
          />
          <TextField
            label="Data de Contratação"
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
            helperText={formik.touched.created_at && formik.errors.created_at}
          />
          <Button type="submit">Salvar</Button>
        </form>
      </Box>
    </>
  );
}
