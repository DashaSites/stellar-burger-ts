import React, { useEffect } from 'react';
import orderInfoStyles from './order-full-info.module.css';
import { useParams } from 'react-router-dom';
import { orderSelector } from '../../services/selector/ordersSelectors';
import { RootState, store } from '../../services/store/store';
import { ingredientSelector, orderPriceSelector } from '../../services/selector/ingredientsSelectors';
import { useDispatch, useSelector } from '../../services/store/store';
import {
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderPreloader from '../order-preloader/order-preloader';
import { LOAD_ALL_ORDERS_WS_CONNECT, LOAD_ALL_ORDERS_WS_DISCONNECT } from '../../services/actions/socketActions';
import { getFetchedFullOrderDetails } from '../../services/actions/orderDetailsActions';
import { OrderData } from '../../utils/burger-api-types';
import { Ingredient as IngredientModel } from '../../utils/burger-api-types';



const OrderFullInfo = () => {

  const dispatch = useDispatch();

  const { orderNumber } = useParams();

  // if (!orderNumber) {
  //   return <OrderPreloader />
  // }

  // КЛИКНУТЫЙ ЗАКАЗ
  const orderFromFeed = useSelector(orderSelector(Number(orderNumber))); 
  const orderFromApi = useSelector(
    (state: RootState) => state.fullOrderFoundByNumberState.order
  );

  const order = orderFromFeed || orderFromApi;
  
  if (!order) {
    dispatch(getFetchedFullOrderDetails(Number(orderNumber)));
  }
     

  // получаю массив ингредиентов (со всеми их свойствами) заказа
  const orderIngredients = order?.ingredients.map((ingredientId) => {

    const selector = ingredientSelector(ingredientId);
    const state = store.getState();
    // по айдишнику нашла все свойства данного ингредиента
    const orderIngredient = selector(state);


    return orderIngredient!;
  }) ?? []



  const orderIngredientsIds =  orderIngredients.map((item) => {
    return item!._id;
  })


  const selector = orderPriceSelector(orderIngredientsIds);
  const state = store.getState();
  // по айдишникам ингредиентов заказа высчитала через 
  // специальный селектор стоимость данного заказа
  const orderPrice = selector(state);




    // Диспатчу с сервера заказы из ordersFeed и конкретный кликнутый заказ
    useEffect(() => {

      dispatch({
        type: LOAD_ALL_ORDERS_WS_CONNECT
      })
      return () => {
        dispatch({
          type: LOAD_ALL_ORDERS_WS_DISCONNECT
        })
      }
 
    }, []);



  const setOrderStatus = (order: OrderData) => {
    
    let orderStatus;
    
    if (order.status === "done") {
      orderStatus = "Готово";
    } else if (order.status === "pending") {
      orderStatus = "В работе";
    } else if (order.status === "created") {
      orderStatus = "Создан";
    } else {
      orderStatus = order.status;
    }

    return orderStatus;
  }



  // Получаю массив ингредиентов заказа, выкинув из изначального массива все повторения
  const getOrderIngredientsWithoutDuplicates = (orderIngredients: IngredientModel[]) => {
    let orderIngredientsWithoutDuplicates: IngredientModel[] = []; 

    orderIngredients.filter((ingredient) => {
      if (!orderIngredientsWithoutDuplicates.includes(ingredient)) {
        orderIngredientsWithoutDuplicates.push(ingredient);
      }
      return orderIngredientsWithoutDuplicates;
    })
    return orderIngredientsWithoutDuplicates;
  }

  // "Чистый" (без повторений) массив ингредиентов в заказе
  const cleanIngredientsArray = getOrderIngredientsWithoutDuplicates(orderIngredients);


  
  // Выявляю, сколько раз данный ингредиент встречается в заказе:
    const countIngredient = (ingredient: IngredientModel) => {
      const ingredientIdCountInOrder = orderIngredientsIds.filter((id) => {
        return ingredient._id === id;
      })
      return ingredientIdCountInOrder.length;
    }
  


   

  return (
    <>
      {!order ? (
        <OrderPreloader />
      ) : (
        <>
          <article className={orderInfoStyles.container}>
            <p className={`${orderInfoStyles.orderNumber} text text_type_digits-default`}>{`#${orderNumber}`}</p>
            <h2 className={`${orderInfoStyles.orderName} text text_type_main-medium mb-3`}>
              {order.name}
            </h2>
            <p className={`${orderInfoStyles.orderStatus} text text_type_main-default mb-15`}>{setOrderStatus(order)}</p>
            <h2 className="text text_type_main-medium mb-6">
              Состав
            </h2>
            <ul className={`${orderInfoStyles.orderIngredientsList} custom-scroll`}>
              {
                cleanIngredientsArray.map((ingredient, index) => {
                  return (
                    <li key={index}>
                      <div className={orderInfoStyles.orderIngredient}>
                        <img className={orderInfoStyles.ingredientPreview} src={ingredient.image} />
                        <p className={`${orderInfoStyles.ingredientName} text text_type_main-default`}>{ingredient.name}</p>
                          <div className={orderInfoStyles.ingredientCountContainer}>
                            <p className="text text_type_digits-default mr-2"> {countIngredient(ingredient)} x {ingredient.price}</p>
                            <CurrencyIcon type="primary" />
                          </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>

            <div className={orderInfoStyles.timeAndTotalPriceContainer}>
              <p className={`${orderInfoStyles.orderTime} text text_type_main-default text_color_inactive`}>{order.createdAt}</p>
              <div className={orderInfoStyles.totalPriceContainer}>
                <p className={`${orderInfoStyles.totalPrice} text text_type_digits-default`}>{orderPrice}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </article>
        </>
      )
      }
    </>
  );
};

export default OrderFullInfo;