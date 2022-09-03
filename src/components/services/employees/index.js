import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:3333",
});

const getAll = async () => {
  try {
    const url = `/employee`;
    const { data } = await Api.get(url);

    if (data) {
      return {
        data,
      };
    }

    return new Error("Erro ao listar os registros");
  } catch (error) {
    console.log(error);
    return new Error(error || "Erro ao listar os registros");
  }
};

const getById = async (id) => {
  try {
    const url = `/employee/${id}`;
    const { data } = await Api.get(url);

    if (data) {
      return {
        data,
      };
    }

    return new Error("Erro ao consultar o registro");
  } catch (error) {
    console.log(error);
    return new Error(error || "Erro ao consultar o registro");
  }
};

const create = async (dados) => {
  try {
    const url = "/employee";
    const { data } = await Api.post(url, dados);

    if (data) {
      return data.id;
    }

    return new Error("Erro ao salvar o registro");
  } catch (error) {
    console.log(error);
    return new Error(error || "Erro ao salvar o registro");
  }
};

const upDateById = async (id, values) => {
  try {
    const url = `/employee/${id}`;
    await Api.put(url, values);
  } catch (error) {
    console.log(error);
    return new Error(error || "Erro ao atualizar o registro");
  }
};

const deleteById = async (id) => {
  try {
    const url = `/employee/${id}`;
    await Api.delete(url);
  } catch (error) {
    console.log(error);
    return new Error(error || "Erro ao excluir o registro");
  }
};

export const EmployeeService = {
  getAll,
  getById,
  create,
  upDateById,
  deleteById,
};
