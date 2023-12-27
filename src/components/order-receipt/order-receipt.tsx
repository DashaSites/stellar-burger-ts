import React from "react";
import orderDetailsStyles from "./order-receipt.module.css";
import iconDone from "../../images/done.svg";
import { useSelector } from "../../services/store/store";
import { RootState } from "../../services/store/store";

const OrderReceipt = (): React.JSX.Element => {
  
  const orderNumber = useSelector(
    (state: RootState) => state.orderDetailsState.orderNumber
  );

  return (
    <article className={orderDetailsStyles.container}>
      <h2
        className={`${orderDetailsStyles.number} text text_type_digits-large mb-8`}
      >
        {orderNumber}
      </h2>
      <h3 className="text text_type_main-medium mb-15">идентификатор заказа</h3>
      <img src={iconDone} className="mb-15" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p
        className={`${orderDetailsStyles.recommendation} text text_type_main-default`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </article>
  );
};

export default OrderReceipt;