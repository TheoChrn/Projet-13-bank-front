import styles from "./styles.module.css";
import Navigation from "../../Components/Navigation/index";
import Features from "../../Components/Features";
import Footer from "../../Components/Footer";

const Home = () => {
  return (
    <div className={"container"}>
      <Navigation />
      <main className={"main"}>
        <div className={styles["hero"]}>
          <section className={styles["hero-content"]}>
            <h2 className={"sr-only"}>Promoted Content</h2>
            <p className={styles["subtitle"]}>No fees.</p>
            <p className={styles["subtitle"]}>No minimum deposit.</p>
            <p className={styles["subtitle"]}>High interest rates.</p>
            <p className={styles["text"]}>
              Open a savings account with Argent Bank today!
            </p>
          </section>
        </div>
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
