import React from "react";
import Home from "./Page/Home";
import Connexion from "./Page/Connexion";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Profile from "./Page/Profile";
import ErrorPage from "./Page/ErrorPage";
import Transactions from "./Page/Transactions";
import { useSelector } from "react-redux";

const PrivateRoute = ({ auth, routeRedirect }) => {
  return auth ? <Outlet /> : <Navigate to={routeRedirect} />;
};

const App = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const ROUTE_HOME = "/";
  const ROUTE_CONNEXION = "/connexion";
  const ROUTE_PROFILE = "/profile";
  const ROUTE_TRANSACTIONS = "/profile/account/:id/transactions";
  const ROUTE_401 = "/401";

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_HOME} element={<Home />} />
        <Route
          path={ROUTE_CONNEXION}
          element={
            <PrivateRoute
              auth={!isAuthenticated}
              routeRedirect={ROUTE_PROFILE}
            />
          }
        >
          <Route exact path={ROUTE_CONNEXION} element={<Connexion />} />
        </Route>
        <Route
          path={ROUTE_PROFILE}
          element={
            <PrivateRoute auth={isAuthenticated} routeRedirect={ROUTE_401} />
          }
        >
          <Route exact path={ROUTE_PROFILE} element={<Profile />} />
        </Route>
        <Route
          path={ROUTE_TRANSACTIONS}
          element={
            <PrivateRoute auth={isAuthenticated} routeRedirect={ROUTE_401} />
          }
        >
          <Route exact path={ROUTE_TRANSACTIONS} element={<Transactions />} />
        </Route>
        <Route
          path={ROUTE_401}
          element={
            <PrivateRoute
              auth={!isAuthenticated}
              routeRedirect={ROUTE_PROFILE}
            />
          }
        >
          <Route exact path={ROUTE_401} element={<ErrorPage />} />
        </Route>
        <Route path="*" element={<Navigate to={ROUTE_HOME} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
