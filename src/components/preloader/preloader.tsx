import React from "react";
import ReactDOM from "react-dom";
import preloaderStyles from "./preloader.module.css";
import preloader from "../../images/spinner.svg";


const Preloader = () => {
  return (
    <div className={preloaderStyles.container}>
      <img src={preloader} className={preloaderStyles.spinner} />
    </div>
  );
};


export default Preloader;