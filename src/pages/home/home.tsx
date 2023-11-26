import React from "react";
import styles from "./home.module.css";
import { useSelector, useDispatch } from "react-redux";

export const HomePage = () => {
  return (
    <div>
      <main className={styles.main}>
      <p>HOME PAGE</p>
      </main>
    </div>
  )
}