import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Navigation from "../../Components/Navigation";
import Account from "../../Components/Account";
import Footer from "../../Components/Footer";
import { useSelector } from "react-redux";
import useAuth from "../../Hooks/useAuth";
import Header from "./Components/Header";

const Profile = () => {
  // Retrieve user Data from the redux state
  const { isLoading } = useSelector((state) => state.user);

  // Retrieve function from custom hook
  const { getData } = useAuth();

  useEffect(() => {
    getData();
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
