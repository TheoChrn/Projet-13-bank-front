import axios from "axios";
import { useSelector } from "react-redux";

const axiosConfig = () => {
  const token = useSelector((state) => state.user.userToken);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api/v1",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return axiosInstance;
};

export default axiosConfig;
