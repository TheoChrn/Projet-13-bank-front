import React, { useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { setIsEditing } from "../../../../feature/user.slice";

const EditForm = ({ userFirstName, userLastName }) => {
  // Retrieve function from custom hook
  const { updateUser } = useAuth();

  // Initialize state variable
  const dispatch = useDispatch();
  const [newUserNames, setNewUserNames] = useState({
    newUserFirstName: "",
    newUserLastName: "",
  });
  const { newUserFirstName, newUserLastName } = newUserNames;

  /**
   * Update newUserNames' state with the new inputs values
   * @param {Event} input
   * @returns {void}
   */
  const handleChange = (input) => {
    setNewUserNames((prevState) => ({
      ...prevState,
      [input.target.name]:
        input.target.value
          .replace(/[^a-z]/gi, "")
          .charAt(0)
          .toUpperCase() + input.target.value.slice(1),
    }));
  };

  return (
    <div className={"header"}>
      <h1>
        Welcome back
        <br /> {""}
      </h1>
      <div className={styles["edit-name"]}>
        <input
          type="text"
          className={styles["name-input"]}
          name={"newUserFirstName"}
          placeholder={userFirstName}
          onChange={handleChange}
        />
        <input
          type="text"
          className={styles["lastName-input"]}
          name={"newUserLastName"}
          placeholder={userLastName}
          onChange={handleChange}
        />
        <button
          className={styles["save-btn"]}
          onClick={() => {
            updateUser(newUserFirstName, newUserLastName);
          }}
        >
          Save
        </button>
        <button
          className={styles["cancel-btn"]}
          onClick={() => dispatch(setIsEditing(false))}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditForm;
