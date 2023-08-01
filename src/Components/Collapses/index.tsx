import { useState } from "react";
import styles from "./styles.module.css";
import Chevron from "../Chevron";

interface CollapsesProps {
  transaction:
    | {
        accountId: number;
        id: number;
        date: string;
        description: string;
        amount: string;
        balance: number;
        type?: undefined;
      }
    | {
        accountId: number;
        id: number;
        type: string;
        date: string;
        description: string;
        amount: string;
        balance: number;
      };
  key: number;
  infos: {
    transactionId: number;
    type: string;
    category: string;
    note: string;
  }[];
}

const Collapses = ({ transaction, key, infos }: CollapsesProps) => {
  // Initialize state variable
  const [isOpen, setIsOpen] = useState(false);
  console.log(infos);
  const info = infos[0];
  console.log(info);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <tbody key={key}>
      <tr>
        <td className={styles.collapseBtn}>
          <button onClick={toggle}>
            {isOpen ? <Chevron rotate={"rotate(-180)"} /> : <Chevron />}
          </button>
        </td>
        <td>{transaction.date}</td>
        <td>{transaction.description}</td>
        <td>{`$${transaction.amount}`}</td>
        <td>{`$${transaction.balance}`}</td>
      </tr>
      {isOpen && (
        <tr className={styles.collapse}>
          <td className={styles.empty}>
            <span>Empty</span>
          </td>
          <td className={styles.info}>
            <ul>
              <li>{`Transaction Type:`}</li>
              <li>
                {`Category: ${info.category} `}
                <span className={styles.pencil}>&#9999;</span>
              </li>
              <li>
                {`Note: ${info.note} `}
                <span className={styles.pencil}>&#9999;</span>
              </li>
            </ul>
          </td>
          <td className={styles.empty}>
            <span>Empty</span>
          </td>
          <td className={styles.empty}>
            <span>Empty</span>
          </td>
          <td className={styles.empty}>
            <span>Empty</span>
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default Collapses;
