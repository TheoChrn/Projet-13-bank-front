import { useDispatch, useSelector } from "react-redux";
import {
  setUserToken,
  setErrorMessage,
  setIsEditing,
  setIsLoading,
  setUserNames,
} from "../feature/user.slice";
import axiosCongig from "../API/axiosConfig";

const useAuth = () => {
  const axiosInstance = axiosCongig();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.userToken);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  /**
   * Send a HTTP POST request to API and retrieve userNames
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const getData = async () => {
    await axiosInstance
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
   * @param {string} newUserFirstName
   * @param {string} newUserLastName
   * @returns {<void>}
   */
  const updateUser = (newUserFirstName, newUserLastName) => {
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
        });
    }
  };

  /**
   * Send a request to API and update state with the recieved token
   * @param {Object} formData The data from the connexion form
   * @returns {void}
   */
  const login = (formData) => {
    axiosInstance
      .post("/user/login", formData)
      .then((res) => {
        dispatch(setUserToken(res.data.body.token));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setErrorMessage(error.response.data.message));
      });
  };

  return { getData, updateUser, login, isAuthenticated, token };
};

export default useAuth;
