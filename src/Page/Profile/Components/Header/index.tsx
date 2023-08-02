import styles from "./styles.module.css";
import { setIsEditing } from "../../../../feature/user.slice";
import EditForm from "../EditForm";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/hook";
import { userSelector } from "../../../../feature/user.slice";

interface UserNames {
  userFirstName: string | null;
  userLastName: string | null;
}

const Header = () => {
  // Retrieve data from the redux state
  const isAuthenticated = useAppSelector(
    (state) => userSelector(state).isAuthenticated
  );
  const isEditing = useAppSelector((state) => userSelector(state).isEditing);
  const { userFirstName, userLastName }: UserNames = useAppSelector((state) => {
    const userNames = userSelector(state).userNames;
    return isAuthenticated
      ? userNames
      : { userFirstName: null, userLastName: null };
  });

  // Initialize state variables
  const dispatch = useAppDispatch();

  /**
   * Show the edit inputs and reset them before typing
   * @function
   * @returns {<void>}
   */
  const editInputs = () => {
    dispatch(setIsEditing(true));
  };

  return (
    <div>
      {!isEditing && userFirstName !== null && userLastName !== null ? (
        <div className={"header"}>
          <h1>
            Welcome back
            <br /> {`${userFirstName} ${userLastName}`} !
          </h1>
          <button
            className={styles["edit-button"]}
            onClick={() => {
              editInputs();
            }}
          >
            Edit Name
          </button>
        </div>
      ) : (
        userFirstName !== null &&
        userLastName !== null && (
          <EditForm userFirstName={userFirstName} userLastName={userLastName} />
        )
      )}
    </div>
  );
};

export default Header;
