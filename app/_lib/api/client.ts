import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "/api";

export const apiClient = axios.create({
  baseURL,
  timeout: 15000,
});
