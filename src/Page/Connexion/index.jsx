import React from "react";
import Navigation from "../../Components/Navigation";
import Footer from "../../Components/Footer";
import Login from "../../Components/Login";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Connexion = () => {
  // Retrieve token from redux state
  const token = useSelector((state) => state.user.userToken);

  return (
    <div className={"container"}>
      <Navigation />
      {!token ? (
        <main className={"main bg-dark"}>
          <section className={styles["sign-in-content"]}>
            <i className={`fa fa-user-circle ${styles["sign-in-icon"]} `}></i>
            <h1>Sign In</h1>
            <Login />
          </section>
        </main>
      ) : (
        <main>
          You are already connected
          <br />
          <NavLink to="/profile">Go to your profile</NavLink>
        </main>
      )}
      <Footer />
    </div>
  );
};

export default Connexion;
