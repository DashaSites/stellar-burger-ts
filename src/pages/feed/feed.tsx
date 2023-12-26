import React, { useEffect } from 'react';
import ordersFeedStyles from './feed.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Orders from '../../components/orders/orders.jsx';
import {
  LOAD_ALL_ORDERS_WS_CONNECT,
  LOAD_ALL_ORDERS_WS_DISCONNECT
} from '../../services/actions/socketActions.js';
import OrderPreloader from '../../components/order-preloader/order-preloader.jsx';



// Страница ленты заказов
export const OrdersFeed = () => { 

  const dispatch = useDispatch();

  // Достаю из стора заказы всех покупателей (ленту заказов)
  const { allOrders, total, totalToday } = useSelector(
    (state) => state.ordersFeedState
  );


  // При открытии страницы feed подключаюсь к серверу, отправляя экшен в мидлвар
  useEffect(() => {

    dispatch({
      type: LOAD_ALL_ORDERS_WS_CONNECT
    }) // а при закрытии страницы — закрываю соединенение
    return () => {
      dispatch({
        type: LOAD_ALL_ORDERS_WS_DISCONNECT
      })
    }

  }, []);


  // Делаю проверки полученной с сервера ленты заказов
  const checkAllOrdersValidity = (ordersFromServer) => {
    
    if (
      ordersFromServer === null ||
      ordersFromServer === undefined ||
      ordersFromServer.length === 0 
    ) {
      return (
        <OrderPreloader />
      )
    }

  }

  checkAllOrdersValidity(allOrders);


  // Отбираю все заказы со статусом "готово"
  const readyOrderNumbersArray = [];

  const getReadyOrderNumbersArray = (allOrders) => {
    allOrders.map((order) => {
      if (order.status === "done") {
        readyOrderNumbersArray.push(order.number);
      }
    })
    return readyOrderNumbersArray;
  }

  const readyOrderNumbers = getReadyOrderNumbersArray(allOrders);



// Получаю все заказы со статусом "в работе"
  const pendingOrderNumbersArray = [];
  
  const getPendingOrderNumbersArray = (allOrders) => {
    allOrders.map((order) => {
      if (order.status === "pending") {
        pendingOrderNumbersArray.push(order.number);
      }
    })
    return pendingOrderNumbersArray;
  }

  const pendingOrderNumbers = getPendingOrderNumbersArray(allOrders);



  return (
    <div className={ordersFeedStyles.container}>
      <h1 className={`${ordersFeedStyles.heading} text text_type_main-large`}>Лента заказов</h1>
      <div className={ordersFeedStyles.feedContainer}>
        <section className={ordersFeedStyles.orderCardsContainer}>
           <Orders orders={allOrders} />
        </section>
        <section className={ordersFeedStyles.feedStatistic}>
          <div className={ordersFeedStyles.currentCountContainer}>
            <div className={`${ordersFeedStyles.listOrdersReady} custom-scroll`}>
              <h2 className={`${ordersFeedStyles.feedStatisticTitle} text text_type_main-medium`}>Готовы:</h2>
              <div className={`${ordersFeedStyles.numbersBox} mt-6`}>
              { // Беру массив всех номеров готовых заказов
                readyOrderNumbers.map((oneReadyOrderNumber, index) => {
                // прохожу по нему в цикле, по очереди беру каждый номер заказа,
                // чтобы отрендерить его в строке
                  return (
                    <p key={index} className={`${ordersFeedStyles.numbersReady} text text_type_digits-default mb-2`}>{oneReadyOrderNumber}</p>
                  )            
                })
              }
              </div>
            </div>
            <div className={ordersFeedStyles.listOrdersInProgress}>
              <h2 className={`${ordersFeedStyles.feedStatisticTitle} text text_type_main-medium`}>В работе:</h2>
              <div className={`${ordersFeedStyles.numbersBox} mt-6`}>
              { // Беру массив всех номеров заказов "в работе"
                pendingOrderNumbers.map((onePendingOrderNumber, index) => {
                // прохожу по нему в цикле, по очереди беру каждый номер заказа,
                // чтобы отрендерить его в строке
                  return (
                    <p key={index} className={`${ordersFeedStyles.numbersPending} text text_type_digits-default mb-2`}>{onePendingOrderNumber}</p>
                  )            
                })
              }
              </div>
            </div>
          </div>
          <div className={ordersFeedStyles.ordersCounts}>
            <div className={ordersFeedStyles.ordersCountTotal}>
              <h2 className={`${ordersFeedStyles.feedStatisticTitle} text text_type_main-medium`}>Выполнено за все время:</h2>
              <p className="text text_type_digits-large">{total}</p>
            </div>
            <div className={ordersFeedStyles.ordersCountToday}>
              <h2 className={`${ordersFeedStyles.feedStatisticTitle} text text_type_main-medium`}>Выполнено за сегодня:</h2>
              <p className="text text_type_digits-large">{totalToday}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default OrdersFeed;