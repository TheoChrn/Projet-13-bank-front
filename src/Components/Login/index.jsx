import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { setErrorMessage } from "../../feature/user.slice";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  // Retrieve error state from redux store
  const errorMessage = useSelector((state) => state.user.errorMessage);

  // Retrieve function from custom hook
  const { login } = useAuth();

  // Initialize state variable
  const dispacth = useDispatch();
  const [hasError, setHasError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  /**
   * Handles the changes in the input elements
   * Set the input's values in the formData
   * @param {object} e
   * @returns {<void>}
   */
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * Handles the submission of the login form.
   * Verify if email and password are valid
   * Retrieves a token after posting Data using HTTP POST request
   * @param {object} e
   * @returns {<void>}
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!regex.test(email)) {
      setHasError(true);
      dispacth(setErrorMessage("Error: The email format is incorrect"));
    } else if (password.length === 0) {
      setHasError(true);
      dispacth(setErrorMessage("Error: Password cannot be blank"));
    } else {
      setHasError(false);
      login(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={hasError ? styles["error"] : ""}>
      <div className={styles["input-wrapper"]}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={onChange}
        />
      </div>
      <div className={styles["input-wrapper"]}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          placeholder="Enter your password"
          onChange={onChange}
        />
      </div>
      <div className={styles["input-remember"]}>
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button className={styles["sign-in-button"]}>Sign In</button>
      {hasError ? <small>{errorMessage}</small> : ""}
    </form>
  );
};

export default Login;
