import { useAppSelector } from "../Hooks/hook";
import axios from "axios";
import { userSelector } from "../feature/user.slice";

const axiosConfig = () => {
  const token = useAppSelector((state) => userSelector(state).userToken);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api/v1",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return axiosInstance;
};

export default axiosConfig;
