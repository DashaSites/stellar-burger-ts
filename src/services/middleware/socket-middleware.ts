import { Middleware } from "redux";
import { RootState } from "../store/store";

export type WsActionTypes = {
  wsConnect: string,
  wsDisconnect: string,
  onOpen: string,
  onClose: string
  onError: string,
  onMessage: string
};
// с типом middleware какая-то проблемка
export const socketMiddleware = (
  wsUrl: string, 
  wsActions: WsActionTypes, 
  isAuthRequired: boolean
  ): Middleware<{}, RootState> => {
  return store => {

    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;

      const { 
        wsConnect,
        wsDisconnect,
        onOpen, 
        onClose, 
        onError, 
        onMessage
      } = wsActions;


      if (type === wsConnect) {
        if (isAuthRequired) {

          const accessToken = localStorage.getItem('accessToken') || "";
          const tokenNumber = accessToken.split(" ")[1];
          socket = new WebSocket(`${wsUrl}?token=${tokenNumber}`);
        } else {
          socket = new WebSocket(wsUrl);
        }
      }

      if (type === wsDisconnect) {
        
        // в случае, если вдруг сокет равен нулю, не выполняем дисконнект
        if (!socket) {
          return;
        }

        socket.close();
      }




      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = () => {
          dispatch({ type: onError, payload: "Прозошла какая-то ошибка" });
        };

        socket.onmessage = event => {

          const parsedData = JSON.parse(event.data);
  
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };



        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        /*
        if (type === wsSendMessage) {
          const message = { ...payload, token: user.token };
          socket.send(JSON.stringify(message));
        }
        */

      }

      next(action);
    };
  };
};