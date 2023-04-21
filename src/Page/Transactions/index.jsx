import React from "react";
import styles from "./styles.module.css";
import Navigation from "../../Components/Navigation";
import Footer from "../../Components/Footer";
import mockedTransactions from "../../API/MockData/MockedData.json";
import { useParams } from "react-router-dom";
import Collapses from "../../Components/Collapses";

const Transactions = () => {
  // Récupération de l'id dans l'URL
  const { id } = useParams();

  // Récupération des données mockés
  const transactions = mockedTransactions.transactions.filter(
    (transaction) => `${transaction.accountId}` === id
  );
  const transactionHeader = mockedTransactions.account.find(
    (account) => `${account.id}` === id
  );
  const transactionInfos = mockedTransactions.infos.filter(
    (info) => `${info.transactionId}` === id
  );

  return (
    <div className={"container"}>
      <Navigation />
      <main className={"main bg-dark"}>
        <section className={styles["account"]}>
          <div className={styles["account-content-wrapper"]}>
            <h3
              className={styles["account-title"]}
            >{`Argent Bank ${transactionHeader.type} x(${transactionHeader.number})`}</h3>
            <p
              className={styles["account-amount"]}
            >{`$${transactionHeader.amount}`}</p>
            <p className={styles["account-amount-description"]}>
              {`${transactionHeader.description} Balance`}
            </p>
          </div>
          <div
            className={`${styles["account-content-wrapper"]} ${styles["cta"]}`}
          ></div>
        </section>
        <section className={styles.transactions}>
          <table>
            <thead>
              <tr>
                <th className={styles.chevronCol}></th>
                <th>DATE</th>
                <th>DESCRIPTION</th>
                <th>AMOUNT</th>
                <th>BALANCE</th>
              </tr>
            </thead>
            {transactions.map((bill, index) => (
              <Collapses
                transaction={bill}
                key={index}
                infos={transactionInfos[0]}
              />
            ))}
          </table>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Transactions;
