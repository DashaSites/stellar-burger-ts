import React from "react";
import ReactDOM from "react-dom";
import orderPreloaderStyles from "./order-preloader.module.css";
import orderPreloader from "../../images/order-spinner.svg";


const OrderPreloader = (): React.JSX.Element => {
  return (
    <div className={orderPreloaderStyles.container}>
      <img src={orderPreloader} className={orderPreloaderStyles.spinner} />
    </div>
  );
};


export default OrderPreloader;