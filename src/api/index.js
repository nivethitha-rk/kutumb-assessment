import axios from "axios";

export const quoteAPIInstance = axios.create({
  baseURL: "https://assignment.stage.crafto.app/",
  responseType: "json",
});

quoteAPIInstance.interceptors.request.use((reqPayload) => {
  const token = localStorage.getItem("token");
  if (token) {
    reqPayload.headers.Authorization = token;
  }
  return reqPayload;
});
