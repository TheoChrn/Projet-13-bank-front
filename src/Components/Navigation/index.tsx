import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import Logo from "../../designs/img/argentBankLogo.png";
import { setLogout, userSelector } from "../../feature/user.slice";
import { useAppDispatch, useAppSelector } from "../../Hooks/hook";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state) => userSelector(state).isAuthenticated
  );
  const userFirstName = useAppSelector((state) => {
    const userNames = userSelector(state).userNames;
    return isAuthenticated ? userNames.userFirstName : null;
  });

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
