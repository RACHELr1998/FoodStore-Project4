import { createStore } from "redux";
import { OrderModel } from "../models/order-model.model";

//1. State - This is the data:
export class OrdersState {
  public orders: OrderModel[] = [];
  public lastOrder: OrderModel;
}

//2. enum Action Type - List of actions we can do on the above state
export enum OrdersActionType {
  FetchOrders = "FetchOrders", //Fetch all orders from backend
  AddOrder = "AddOrder", // Add new order
}

//3. interface Actin - Object for describing a single operation on the state:
export interface OrdersAction {
  type: OrdersActionType; // Which operation we're going to do
  payload?: any; // Which data we're sending
}

//4. Reducer function - function which performs the needed operation:
export function ordersReducer(
  currentState = new OrdersState(),
  action: OrdersAction
): OrdersState {
  const newState = { ...currentState }; // We must duplicate the original object
  // Do the change on the newState:
  switch (action.type) {
    case OrdersActionType.FetchOrders: // Here payload must be all corders fetched from the server
      newState.orders = action.payload; // Set all fetched orders to the state
      break;

    case OrdersActionType.AddOrder: // Here payload must be the order to add
      newState.lastOrder = action.payload;//Set the new order in the last order
      newState.orders.push(action.payload); // Add the new order to the state
      break;
  }

  return newState;
}

export const ordersStore = createStore(ordersReducer);
