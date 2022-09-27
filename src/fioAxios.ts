import axios from "axios";

export const fioAxios = axios.create({
  baseURL: "https://www.fio.cz/ib_api/rest",
});
