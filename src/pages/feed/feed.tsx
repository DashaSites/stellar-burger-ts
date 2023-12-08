import React, { useEffect } from 'react';
import ordersFeedStyles from './feed.module.css';
import { useDispatch, useSelector } from 'react-redux';
//import Orders from '../../components/orders/orders.jsx';
//import {
//  LOAD_ALL_ORDERS_WS_CONNECT,
//  LOAD_ALL_ORDERS_WS_DISCONNECT
//} from '../../services/actions/socketActions.js';
//import OrderPreloader from '../../components/order-preloader/order-preloader.jsx';



// Страница ленты заказов
export const OrdersFeed = () => { 

  const dispatch = useDispatch();



  return (
    <div className={ordersFeedStyles.container}>
      <h1 className={`${ordersFeedStyles.heading} text text_type_main-large`}>Лента заказов</h1>
      <div className={ordersFeedStyles.feedContainer}>
        <section className={ordersFeedStyles.orderCardsContainer}>
          <p>ORDERS TO BE ADDED</p>
        
        </section>
        <section className={ordersFeedStyles.feedStatistic}>
          <div className={ordersFeedStyles.currentCountContainer}>
            <div className={`${ordersFeedStyles.listOrdersReady} custom-scroll`}>
              <h2 className={`${ordersFeedStyles.feedStatisticTitle} text text_type_main-medium`}>Готовы:</h2>
              <div className={`${ordersFeedStyles.numbersBox} mt-6`}>
              <p>Order Numbers To Be Added</p>


              </div>
            </div>
            <div className={ordersFeedStyles.listOrdersInProgress}>
              <h2 className={`${ordersFeedStyles.feedStatisticTitle} text text_type_main-medium`}>В работе:</h2>
              <div className={`${ordersFeedStyles.numbersBox} mt-6`}>
                <p>Order Numbers To Be Added</p>
      
              </div>
            </div>
          </div>
          <div className={ordersFeedStyles.ordersCounts}>
            <div className={ordersFeedStyles.ordersCountTotal}>
              <h2 className={`${ordersFeedStyles.feedStatisticTitle} text text_type_main-medium`}>Выполнено за все время:</h2>
              <p className="text text_type_digits-large">WILL ADD</p>
            </div>
            <div className={ordersFeedStyles.ordersCountToday}>
              <h2 className={`${ordersFeedStyles.feedStatisticTitle} text text_type_main-medium`}>Выполнено за сегодня:</h2>
              <p className="text text_type_digits-large">WILL ADD</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default OrdersFeed;