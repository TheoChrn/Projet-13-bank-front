import { useState } from "react";
import styles from "./styles.module.css";
import { userSelector, setErrorMessage } from "../../feature/user.slice";
import useAuth, { FormDataParams } from "../../Hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../../Hooks/hook";

const Login = () => {
  // Retrieve error state from redux store
  const errorMessage = useAppSelector(
    (state) => userSelector(state).errorMessage
  );

  // Retrieve function from custom hook
  const { login } = useAuth();

  // Initialize state variable
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormDataParams>({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  /**
   * Handles the changes in the input elements
   * Set the input's values in the formData
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @returns {<void>}
   */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * Handles the submission of the login form.
   * Verify if email and password are valid
   * Retrieves a token after posting Data using HTTP POST request
   * @param {React.FormEvent<HTMLFormElement>} e
   * @returns {<void>}
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (formData.email.length === 0) {
      dispatch(setErrorMessage("Error: email cannot be blank"));
    } else if (!regex.test(formData.email)) {
      dispatch(
        setErrorMessage(
          "Error: email doesn't respect username@domain.extension"
        )
      );
    } else if (formData.password.length === 0) {
      dispatch(setErrorMessage("Error: password cannot be blank"));
    } else {
      login(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={errorMessage ? styles["error"] : ""}
    >
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
      {errorMessage ? <small>{errorMessage}</small> : ""}
    </form>
  );
};

export default Login;
