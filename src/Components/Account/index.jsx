import React from "react";
import styles from "./styles.module.css";
import mockedTransactions from "../../API/MockData/MockedData.json";
import { useNavigate } from "react-router-dom";

const Account = () => {
  // Initialize mocked data
  const account = mockedTransactions.account;

  // Initialize navigate variable
  const navigate = useNavigate();

  const handleClick = (e, accountId) => {
    e.preventDefault();
    navigate(`./account/${accountId}/transactions`);
  };

  return (
    <div>
      {account.map((bill, index) => {
        return (
          <section key={index} className={styles["account"]}>
            <div className={styles["account-content-wrapper"]}>
              <h3
                className={styles["account-title"]}
              >{`Argent Bank ${bill.type} x(${bill.number})`}</h3>
              <p className={styles["account-amount"]}>{`$${bill.amount}`}</p>
              <p className={styles["account-amount-description"]}>
                {`${bill.description} Balance`}
              </p>
            </div>
            <div
              className={`${styles["account-content-wrapper"]} ${styles["cta"]}`}
            >
              <button
                className={styles["transaction-button"]}
                onClick={(e) => {;
                  handleClick(e, bill.id);
                }}
              >
                View transactions
              </button>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Account;
