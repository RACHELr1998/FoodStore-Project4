import { createStore } from "redux";
import { CartModel } from "../models/cart-model.model";
import { CartItemModel } from "../models/cartItem-model.model";

//1. State - This is the data:
export class CartsState {
  public currentCart: CartModel;
  public cartItems: CartItemModel[] = [];
}

//2. enum Action Type - List of actions we can do on the above state
export enum CartsActionType {
  FetchCartsItems = "FetchCartsItems", // Fetch all cartItems from backend
  DeleteCartItemFromCart = "DeleteCartItemFromCart", // Delete one item
  DeleteAllCartItemsFromCart = "DeleteAllCartItemsFromCart", // Delete all the items in cart
  GetCart = "GetCart", // Get active cart
}

//3. interface Actin - Object for describing a single operation on the state:
export interface CartsAction {
  type: CartsActionType; // Which operation we're going to do
  payload?: any; // Which data we're sending
}

//4. Reducer function - function which performs the needed operation:
export function cartsReducer(
  currentState = new CartsState(),
  action: CartsAction
): CartsState {
  const newState = { ...currentState }; // We must duplicate the original object

  // Do the change on the newState:
  switch (action.type) {
    case CartsActionType.FetchCartsItems: // Here payload must be all cartItems fetched from the server
      newState.cartItems = action.payload; // Set all fetched cartItems to the state
      break;

    case CartsActionType.DeleteCartItemFromCart: // Here payload must be cartItem to delete
      const indexToDelete = newState.cartItems.findIndex(
        (c) => c.productId === action.payload
      );
      if (indexToDelete >= 0) {
        newState.cartItems.splice(indexToDelete, 1); //Delete
      }
      break;

    case CartsActionType.DeleteAllCartItemsFromCart: // Here payload must be all cartItems to delete
      newState.cartItems.length = 0; //Delete all
      break;

    case CartsActionType.GetCart: // Here payload must be all cart to get
      newState.currentCart = action.payload; //Get active cart
      break;
  }

  return newState;
}

export const cartsStore = createStore(cartsReducer);
