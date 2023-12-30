// Экшены для двух редьюсеров: общей ленты заказов и истории заказов пользователя

// ЛЕНТА ВСЕХ ЗАКАЗОВ —> ordersFeedReducer
// Типы для экшенов ordersFeedReducer
export type LoadAllOrdersWsConnectType = 'LOAD_ALL_ORDERS_CONNECT';
export type LoadAllOrdersWsDisconnectType = 'LOAD_ALL_ORDERS_DISCONNECT';
export type LoadAllOrdersWsConnectingType = 'LOAD_ALL_ORDERS_WS_CONNECTING';
export type LoadAllOrdersWsOpenType = 'LOAD_ALL_ORDERS_WS_OPEN';
export type LoadAllOrdersWsCloseType = 'LOAD_ALL_ORDERS_WS_CLOSE';
export type LoadAllOrdersWsMessageType = 'LOAD_ALL_ORDERS_WS_MESSAGE';
export type LoadAllOrdersWsErrorType = 'LOAD_ALL_ORDERS_WS_ERROR';


// Экшен для подключения к серверу (послать из компонентов) - идет в мидлвар
export const LOAD_ALL_ORDERS_WS_CONNECT: LoadAllOrdersWsConnectType = 'LOAD_ALL_ORDERS_CONNECT';
// Экшен для отключения от сервера (послать из компонентов) - идет в мидлвар
export const LOAD_ALL_ORDERS_WS_DISCONNECT: LoadAllOrdersWsDisconnectType = 'LOAD_ALL_ORDERS_DISCONNECT'; 

// А эти экшены мидлвар сам берет и посылает в стор
export const LOAD_ALL_ORDERS_WS_CONNECTING: LoadAllOrdersWsConnectingType = 'LOAD_ALL_ORDERS_WS_CONNECTING';
export const LOAD_ALL_ORDERS_WS_OPEN: LoadAllOrdersWsOpenType = 'LOAD_ALL_ORDERS_WS_OPEN';
export const LOAD_ALL_ORDERS_WS_CLOSE: LoadAllOrdersWsCloseType = 'LOAD_ALL_ORDERS_WS_CLOSE';
export const LOAD_ALL_ORDERS_WS_MESSAGE: LoadAllOrdersWsMessageType = 'LOAD_ALL_ORDERS_WS_MESSAGE';
export const LOAD_ALL_ORDERS_WS_ERROR: LoadAllOrdersWsErrorType = 'LOAD_ALL_ORDERS_WS_ERROR';


// Описания типов экшенов для ordersFeedReducer
export type LoadAllOrdersWsConnectAction = {
  type: LoadAllOrdersWsConnectType
};

export type LoadAllOrdersWsDisconnectAction = {
  type: LoadAllOrdersWsDisconnectType,
  payload: ???
};

export type LoadAllOrdersWsConnectingAction = {
  type: LoadAllOrdersWsConnectingType
};

export type LoadAllOrdersWsOpenAction = {
  type: LoadAllOrdersWsOpenType
};

export type LoadAllOrdersWsCloseAction = {
  type: LoadAllOrdersWsCloseType
};

export type LoadAllOrdersWsMessageAction = {
  type: LoadAllOrdersWsMessageType,
  payload: ???
};

export type LoadAllOrdersWsErrorAction = {
  type: LoadAllOrdersWsErrorType,
  payload: ???
};


// Объединяю все экшены в union-тип для передачи в ordersFeedReducer
export type LoadAllOrdersWsActions = 
  | LoadAllOrdersWsConnectAction
  | LoadAllOrdersWsDisconnectAction
  | LoadAllOrdersWsConnectingAction
  | LoadAllOrdersWsOpenAction
  | LoadAllOrdersWsCloseAction
  | LoadAllOrdersWsMessageAction
  | LoadAllOrdersWsErrorAction;



// ИСТОРИЯ ЗАКАЗОВ ПОЛЬЗОВАТЕЛЯ -> ordersHistoryReducer
// Типы для экшенов ordersFeedReducer
export type LoadUsersOrdersWsConnectType = 'LOAD_USERS_ORDERS_WS_CONNECT';
export type LoadUsersOrdersWsDisconnectType = 'LOAD_USERS_ORDERS_WS_DISCONNECT';
export type LoadUsersOrdersWsConnectingType = 'LOAD_USERS_ORDERS_WS_CONNECTING';
export type LoadUsersOrdersWsOpenType = 'LOAD_USERS_ORDERS_WS_OPEN';
export type LoadUsersOrdersWsCloseType = 'LOAD_USERS_ORDERS_WS_CLOSE';
export type LoadUsersOrdersWsMessageType = 'LOAD_USERS_ORDERS_WS_MESSAGE';
export type LoadUsersOrdersWsErrorType = 'LOAD_USERS_ORDERS_WS_ERROR';


// для подключения к серверу (послать из компонентов) - идет в мидлвар
export const LOAD_USERS_ORDERS_WS_CONNECT: LoadUsersOrdersWsConnectType = 'LOAD_USERS_ORDERS_WS_CONNECT';
// для отключения от сервера (послать из компонентов) - идет в мидлвар
export const LOAD_USERS_ORDERS_WS_DISCONNECT: LoadUsersOrdersWsDisconnectType = 'LOAD_USERS_ORDERS_WS_DISCONNECT'; 

// а эти экшены мидлвар сам мидлвар посылает в стор
export const LOAD_USERS_ORDERS_WS_CONNECTING: LoadUsersOrdersWsConnectingType = 'LOAD_USERS_ORDERS_WS_CONNECTING';
export const LOAD_USERS_ORDERS_WS_OPEN: LoadUsersOrdersWsOpenType = 'LOAD_USERS_ORDERS_WS_OPEN';
export const LOAD_USERS_ORDERS_WS_CLOSE: LoadUsersOrdersWsCloseType = 'LOAD_USERS_ORDERS_WS_CLOSE';
export const LOAD_USERS_ORDERS_WS_MESSAGE: LoadUsersOrdersWsMessageType = 'LOAD_USERS_ORDERS_WS_MESSAGE';
export const LOAD_USERS_ORDERS_WS_ERROR: LoadUsersOrdersWsErrorType = 'LOAD_USERS_ORDERS_WS_ERROR';


// Описания типов экшенов для ordersFeedReducer
export type LoadUsersOrdersWsConnectAction = {
  type: LoadUsersOrdersWsConnectType
};

export type LoadUsersOrdersWsDisconnectAction = {
  type: LoadUsersOrdersWsDisconnectType,
  payload: ???
};

export type LoadUsersOrdersWsConnectingAction = {
  type: LoadUsersOrdersWsConnectingType
};

export type LoadUsersOrdersWsOpenAction = {
  type: LoadUsersOrdersWsOpenType
};

export type LoadUsersOrdersWsCloseAction = {
  type: LoadUsersOrdersWsCloseType
};

export type LoadUsersOrdersWsMessageAction = {
  type: LoadUsersOrdersWsMessageType,
  payload: ???
};

export type LoadUsersOrdersWsErrorAction = {
  type: LoadUsersOrdersWsErrorType,
  payload: ???
};


// Объединяю все экшены в union-тип для передачи в ordersHistoryReducer
export type LoadUsersOrdersWsActions = 
  | LoadUsersOrdersWsConnectAction
  | LoadUsersOrdersWsDisconnectAction
  | LoadUsersOrdersWsConnectingAction
  | LoadUsersOrdersWsOpenAction
  | LoadUsersOrdersWsCloseAction
  | LoadUsersOrdersWsMessageAction
  | LoadUsersOrdersWsErrorAction;