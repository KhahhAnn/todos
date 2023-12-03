import axios from "axios";

const request = axios.create({
   baseURL: "https://656c1107e1e03bfd572df9f4.mockapi.io/api/todo/",
})

export default request;