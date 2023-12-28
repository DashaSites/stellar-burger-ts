import React from "react";
import ordersStyles from "./orders.module.css";
import OrderCard from "../order-card/order-card.jsx";
import OrderPreloader from "../../components/order-preloader/order-preloader.jsx";



const Orders = ({ orders }): JSX.Element => {


  return (
      !orders ? <OrderPreloader /> : (
        <section className={`${ordersStyles.ordersWrapper} custom-scroll`}>
        { 
          orders.map((order, index) => {
            return <OrderCard key={index} orderNumber={order.number} title={order.name} time={order.createdAt} ingredientsIds={order.ingredients} />
          })
        }
        </section>
      )
  );
};

export default Orders;