import Navigation from "../../Components/Navigation";
import Account from "../../Components/Account";
import Footer from "../../Components/Footer";
import useAuth from "../../Hooks/useAuth";
import Header from "./Components/Header";
import { useEffect } from "react";
import { useAppSelector } from "../../Hooks/hook";
import { userSelector } from "../../feature/user.slice";

const Profile = () => {
  // Retrieve user Data from the redux state
  const isLoading = useAppSelector((state) => userSelector(state).isLoading);

  // Retrieve function from custom hook
  const { getUserProfile } = useAuth();

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div className={"container"}>
      <Navigation />
      {!isLoading ? (
        <main className={"main bg-dark"}>
          <Header />
          <h2 className={"sr-only"}></h2>
          <Account />
        </main>
      ) : (
        <div>CA CHARGE</div>
      )}
      <Footer />
    </div>
  );
};

export default Profile;
