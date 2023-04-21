import React from "react";
import Navigation from "../../Components/Navigation";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import Footer from "../../Components/Footer";

const ErrorPage = () => {
  return (
    <div className={"container"}>
      <Navigation />
      <main className="main bg-dark">
        <h1>ERROR 401</h1>
        <span>Authorization required</span>
        <NavLink className={styles.btn} to={"/connexion"}>
          Return to connexion
        </NavLink>
      </main>
      <Footer />
    </div>
  );
};

export default ErrorPage;
