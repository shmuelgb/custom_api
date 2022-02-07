import axios from "axios";

export default axios.create({
  baseURL: process.env.API_URL || "http://localhost:3001/api/",
});

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export { getAuthHeader };
