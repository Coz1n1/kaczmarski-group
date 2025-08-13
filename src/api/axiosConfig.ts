import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://rekrutacja-webhosting-it.krd.pl/api/Recruitment",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log("Error API: ", error);
    return Promise.reject(error);
  }
);
