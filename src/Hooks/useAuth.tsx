import {
  setUserToken,
  setErrorMessage,
  setIsEditing,
  setIsLoading,
  setUserNames,
} from "../feature/user.slice";
import { useAppDispatch, useAppSelector } from "./hook";
import { userSelector } from "../feature/user.slice";
import axiosCongig from "../API/axiosConfig";

export interface FormDataParams {
  email: string;
  password: string;
}

interface NewUserNamesParams {
  newUserFirstName: string;
  newUserLastName: string;
}

const useAuth = () => {
  const axiosInstance = axiosCongig();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => userSelector(state).userToken);
  const isAuthenticated = useAppSelector(
    (state) => userSelector(state).isAuthenticated
  );

  /**
   * Send a HTTP POST request to API and retrieve userNames
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const getUserProfile = () => {
    axiosInstance
      .post("/user/profile", null)
      .then((res) => {
        dispatch(setIsLoading(false));
        dispatch(
          setUserNames({
            userFirstName: res.data.body.firstName,
            userLastName: res.data.body.lastName,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Send a HTTP PUT request to API and update user data in redux store and API
   * @param {NewUserNamesParams} newUserNames 
   * @returns {<void>}
   */
  const updateUser = ({
    newUserFirstName,
    newUserLastName,
  }: NewUserNamesParams) => {
    if (
      newUserFirstName.trim().length === 0 ||
      newUserLastName.trim().length === 0
    ) {
      console.log("Wrong format");
    } else {
      axiosInstance
        .put("/user/profile", {
          firstName: newUserFirstName,
          lastName: newUserLastName,
        })
        .then((res) => {
          dispatch(setIsEditing(false));
          dispatch(
            setUserNames({
              userFirstName: res.data.body.firstName,
              userLastName: res.data.body.lastName,
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  /**
   * Send a request to API and update state with the recieved token
   * @param {FormDataParams} formData The data from the connexion form
   * @returns {void}
   */
  const login = (formData: FormDataParams) => {
    axiosInstance
      .post("/user/login", formData)
      .then((res) => {
        dispatch(setUserToken(res.data.body.token));
        dispatch(setErrorMessage(null));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setErrorMessage(error.response.data.message));
      });
  };

  return { getUserProfile, updateUser, login, isAuthenticated, token };
};

export default useAuth;
