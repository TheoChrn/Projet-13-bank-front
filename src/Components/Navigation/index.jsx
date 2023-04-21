import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import Logo from "../../designs/img/argentBankLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../feature/user.slice";

const Navigation = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userFirstName = useSelector(
    (state) => state.user.userNames.userFirstName
  );

  return (
    <nav className={styles["main-nav"]}>
      <NavLink to="/" className={styles["main-nav-logo"]}>
        <img
          className={styles["main-nav-logo-image"]}
          src={Logo}
          alt="Argent Bank Logo"
        />
        <h1 className={"sr-only"}>Argent Bank</h1>
      </NavLink>
      {isAuthenticated ? (
        <div>
          <NavLink to="/profile" className={styles["main-nav-item"]}>
            <i className={"fa fa-user-circle"}></i>
            {userFirstName}
          </NavLink>
          <NavLink
            to="/connexion"
            className={styles["main-nav-item"]}
            onClick={() => {
              dispatch(setLogout());
            }}
          >
            <i className={"fa fa-sign-out"}></i>
            Sign Out
          </NavLink>
        </div>
      ) : (
        <div>
          <NavLink to="/connexion" className={styles["main-nav-item"]}>
            <i className={"fa fa-user-circle"}></i>
            Sign In
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
