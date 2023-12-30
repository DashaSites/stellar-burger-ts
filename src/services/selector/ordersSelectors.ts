import { RootState } from "../store/store";

// Заказ целиком, найденный по номеру 
// через ordersFeedReducer (редьюсер ленты заказов)
export function orderSelector(someNumber: number) {
  return function (state: RootState) {
    const allOrdersFromFeed = state.ordersFeedState.allOrders;

    const orderFromFeed = allOrdersFromFeed.find((order) => order.number == someNumber);

    return orderFromFeed;
  };

}