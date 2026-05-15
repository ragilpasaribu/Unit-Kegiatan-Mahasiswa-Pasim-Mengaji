import axios from "axios";

const API = "http://localhost:8080/api/auth";

export const login = async (data) => {
  const res = await axios.post(`${API}/login`, data);
  return res.data;
};

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const register = async (data) => {
  const res = await axios.post("http://localhost:8080/api/auth/register", data);
  return res.data;
};