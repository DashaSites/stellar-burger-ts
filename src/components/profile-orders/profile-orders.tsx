import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Orders from "../orders/orders";
import { RootState, useDispatch, useSelector } from "../../services/store/store";
import {
  LOAD_USERS_ORDERS_WS_CONNECT,
  LOAD_USERS_ORDERS_WS_DISCONNECT
} from '../../services/actions/socketActions';
import { useNavigate } from "react-router-dom";


const ProfileOrders = (): React.JSX.Element => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

    // Достаю из стора заказы всех покупателей (ленту заказов) с флагами
  const { userOrders } = useSelector(
      (state: RootState) => state.ordersHistoryState
  );


    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        dispatch({
          type: LOAD_USERS_ORDERS_WS_CONNECT
        })
        return () => {
          dispatch({
            type: LOAD_USERS_ORDERS_WS_DISCONNECT
          })
        }
      } else {
        navigate('/login');
      }
    }, []);

  return (
    <Orders orders={userOrders} />
  )
};


export default ProfileOrders;