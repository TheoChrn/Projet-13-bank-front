import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { setIsEditing } from "../../../../feature/user.slice";
import EditForm from "../EditForm";

const Header = () => {
  // Retrieve data from the redux state
  const userNames = useSelector((state) => state.user.userNames);
  const { isEditing } = useSelector((state) => state.user);
  const { userFirstName, userLastName } = userNames;

  // Initialize state variables
  const dispatch = useDispatch();

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
      {!isEditing ? (
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
        <EditForm userFirstName={userFirstName} userLastName={userLastName} />
      )}
    </div>
  );
};

export default Header;
