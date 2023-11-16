import axios from "axios";
import { useHistory } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:50001/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      const history = useHistory();
      history.push("/signin");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      const history = useHistory();
      history.push("/signin");
    }
    return Promise.reject(error);
  }
);

export default api;