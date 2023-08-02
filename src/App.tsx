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
import { useAppSelector } from "./Hooks/hook";
import { userSelector } from "./feature/user.slice";

type PrivateRouteProps = {
  auth: boolean;
  routeRedirect: string;
};

const PrivateRoute = ({ auth, routeRedirect }: PrivateRouteProps) => {
  return auth ? <Outlet /> : <Navigate to={routeRedirect} />;
};

const App = () => {
  const isAuthenticated = useAppSelector(
    (state) => userSelector(state).isAuthenticated
  );

  const ROUTE_HOME = "/";
  const ROUTE_CONNEXION = "/connexion";
  const ROUTE_PROFILE = "/profile";
  const ROUTE_TRANSACTIONS = "/profile/account/:accountId/transactions";
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
          <Route path={ROUTE_CONNEXION} element={<Connexion />} />
        </Route>
        <Route
          path={ROUTE_PROFILE}
          element={
            <PrivateRoute auth={isAuthenticated} routeRedirect={ROUTE_401} />
          }
        >
          <Route path={ROUTE_PROFILE} element={<Profile />} />
        </Route>
        <Route
          path={ROUTE_TRANSACTIONS}
          element={
            <PrivateRoute auth={isAuthenticated} routeRedirect={ROUTE_401} />
          }
        >
          <Route path={ROUTE_TRANSACTIONS} element={<Transactions />} />
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
          <Route path={ROUTE_401} element={<ErrorPage />} />
        </Route>
        <Route path="*" element={<Navigate to={ROUTE_HOME} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
