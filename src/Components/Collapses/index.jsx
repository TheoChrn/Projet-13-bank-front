import React, { useState } from "react";
import styles from "./styles.module.css";
import Chevron from "../Chevron";

const Collapses = ({ transaction, index, infos }) => {
  // Initialize state variable
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <tbody key={index}>
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
                {`Category: ${infos.category} `}
                <span className={styles.pencil}>&#9999;</span>
              </li>
              <li>
                {`Note: ${infos.note} `}
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
