import { jwtDecode } from "jwt-decode";
import { getToken } from "../service/AuthService";

export const getUser = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const getRole = () => {
  const user = getUser();
  return user?.role;
};