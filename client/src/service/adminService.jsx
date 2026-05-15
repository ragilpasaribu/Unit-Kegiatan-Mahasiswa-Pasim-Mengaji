import axios from "axios";
import { getToken } from "./AuthService";

const API = "http://localhost:8080/api/admin";

export const getPendingUsers = async () => {
  return axios.get(`${API}/users/pending`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const approveUser = async (id) => {
  return axios.put(`${API}/users/${id}/approve`, {}, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const rejectUser = async (id) => {
  return axios.put(`${API}/users/${id}/reject`, {}, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};