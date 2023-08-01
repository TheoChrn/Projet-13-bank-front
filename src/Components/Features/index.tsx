import styles from "./styles.module.css";
import ChatIcon from "../../designs/img/icon-chat.png";
import MoneyIcon from "../../designs/img/icon-money.png";
import SecurityIcon from "../../designs/img/icon-security.png";

const icons = [
  {
    name: "chat",
    src: ChatIcon,
    title: "You are our #1 priority",
    description:
      "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    alt: "Chat Icon",
  },
  {
    name: "money",
    src: MoneyIcon,
    title: "More savings means higher rates",
    description:
      "The more you save with us, the higher your interest rate will be!",
    alt: "Money Icon",
  },
  {
    name: "security",
    src: SecurityIcon,
    title: "Security you can trust",
    description:
      "We use top of the line encryption to make sure your data and money is always safe.",
    alt: "Security Icon",
  },
];

const Features = () => {
  return (
    <section className={styles["features"]}>
      <h2 className={"sr-only"}>Features</h2>
      {icons.map((i, index) => {
        return (
          <div key={index} className={styles["feature-item"]}>
            <img src={i.src} alt={i.alt} className={styles["feature-icon"]} />
            <h3 className={styles["feature-item-title"]}>{i.title}</h3>
            <p>{i.description}</p>
          </div>
        );
      })}
    </section>
  );
};

export default Features;
