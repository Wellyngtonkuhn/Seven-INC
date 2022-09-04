import * as yup from "yup";


export const formValidation = yup.object({
    id: yup.number(),
    name: yup.string().required("Campo Obrigatório"),
    document: yup.string().required("Campo Obrigatório"),
    email: yup.string().email().required("Campo Obrigatório"),
    phone: yup.string().required("Campo Obrigatório"),
    birth_date: yup.string().required("Campo Obrigatório"),
    salary: yup.string().required("Campo Obrigatório"),
    created_at: yup.string().required("Campo Obrigatório"),
  });