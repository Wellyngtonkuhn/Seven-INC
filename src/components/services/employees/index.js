import API from "../api/axiosConfig";

const getAll = async (filter = "") => {
  try {
    const url = `/employee?_page=16_limit=10&nomeCompleto_like=${filter}`;
    const { data, headers } = await API.get(url);

    if (data) {
      return {
        data,
        totalCount: Number(headers["x-total-count"]),
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
    const { data } = await API.get(url);

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
    const { data } = await API.post(url, dados);

    if (data) {
      return data.id;
    }

    return new Error("Erro ao salvar o registro");
  } catch (error) {
    console.log(error);
    return new Error(error || "Erro ao salvar o registro");
  }
};

const upDateById = async (id, dados) => {
  try {
    const url = `/employee/${id}`;
    const { data } = await API.put(url, dados);
  } catch (error) {
    console.log(error);
    return new Error(error || "Erro ao atualizar o registro");
  }
};

const deleteById = async (id) => {
  try {
    const url = `/employee/${id}`;
    await API.delete(url);
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
