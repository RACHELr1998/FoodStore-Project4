import { createStore } from "redux";
import { CartModel } from "../models/cart-model.model";
import { CartItemModel } from "../models/cartItem-model.model";
import { OrderModel } from "../models/order-model.model";

//1. State - This is the data:
export class CartState {
  public carts: CartModel[] = []; // Our global data.
  public cartItems: CartItemModel[] = []; // Our global data.
  public orders: OrderModel[] = [];
}

//2. enum Action Type - List of actions we can do on the above state
export enum CartActionType {
  FetchCarts = "FetchCarts", // Fetch all carts from backend
  AddCart = "AddCart", // Add new Cart
  UpdateCart = "UpdateCart", // Update existing Cart
  AddCartItem = "AddCartItem", // Add new CartItem
  UpdateCartItem = "UpdateCartItem", // Update existing CartItem
  DeleteCartItem = "DeleteCartItem", // Delete existing CartItem
  AddOrder = "AddOrder", // Add new Order
  ResetCarts = "ResetCarts", //Reset all the Carts
}

//3. interface Actin - Object for describing a single operation on the state:
export interface CartAction {
  type: CartActionType; // Which operation we're going to do
  payload: any; // Which data we're sending
}

//4. Reducer function - function which performs the needed operation:
export function cartReducer(
  currentState = new CartState(),
  action: CartAction
): CartState {
  const newState = { ...currentState }; // We must duplicate the original object
  // Do the change on the newState:
  switch (action.type) {
    case CartActionType.FetchCarts: // Here payload must be all Cart fetched from the server
      newState.carts = action.payload; // Set all fetched carts to the state
      break;

    case CartActionType.AddCart: // Here payload must be the cart to add
      newState.carts.push(action.payload); // Add the new cart to the state
      break;

    case CartActionType.UpdateCart: // Here payload must be the cart to update
      const indexToUpdate = newState.carts.findIndex(
        (c) => c._id === action.payload._id
      ); // -1 if not exist
      if (indexToUpdate >= 0) {
        newState.carts[indexToUpdate] = action.payload; // Update
      }
      break;

    case CartActionType.AddCartItem: // Here payload must be the cartItem to add
      newState.carts.push(action.payload); // Add the new cartItem to the state
      break;

    case CartActionType.UpdateCartItem: // Here payload must be the cartItem to update
      const indexItemToUpdate = newState.cartItems.findIndex(
        (c) => c._id === action.payload._id
      ); // -1 if not exist
      if (indexToUpdate >= 0) {
        newState.cartItems[indexItemToUpdate] = action.payload; // Update
      }
      break;

    case CartActionType.DeleteCartItem: // Here payload must be id to delete
      const indexToDelete = newState.cartItems.findIndex(
        (c) => c._id === action.payload
      ); // -1 if not exist
      if (indexToDelete >= 0) {
        newState.cartItems.splice(indexToDelete, 1); //Delete
      }
      break;

    case CartActionType.AddOrder: // Here payload must be the order to add
      newState.orders.push(action.payload); // Add the new order to the state
      break;

    case CartActionType.ResetCarts:
      newState.carts = [];
      break;
  }

  return newState; // return the new state
}

//5. Store  redux object for managing the global state:
export const cartStore = createStore(cartReducer);
