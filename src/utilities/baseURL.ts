import axios from "axios";

export const BASE_URL = "/api/v1";

export const clientURL = import.meta.env.PROD ? "" : "http://localhost:3000";
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosBase = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
