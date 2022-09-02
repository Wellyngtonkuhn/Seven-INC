import axios from "axios";
import { errorMiddleWare } from "../middlewares/ErrorMiddleWare";

const API = axios.create({
  baseURL: "http://localhost:3333/",
});

API.interceptors.response.use((error) => {
  errorMiddleWare(error);
});

export { API };
