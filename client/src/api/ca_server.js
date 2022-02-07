import axios from "axios";

const caServer = axios.create({
  baseURL: "http://localhost:3001/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
export default caServer;
