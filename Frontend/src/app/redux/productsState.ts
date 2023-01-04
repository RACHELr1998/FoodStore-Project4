import { createStore } from "redux";
import { ProductModel } from "../models/product-model.model";

//1. State - This is the data:
export class ProductState {
  public products: ProductModel[] = []; // Our global data.
  public searchProducts: string = ""; //Our global data for search.
}

//2. enum Action Type - List of actions we can do on the above state
export enum ProductsActionType {
  FetchProducts = "FetchProducts", // Fetch all products from backend
  AddProduct = "AddProduct", // Add new product
  UpdateProduct = "UpdateProduct", // Update existing product
  ResetProducts = "ResetProducts", //Reset all the products
  searchProducts = "searchProducts", //Search product
}

//3. interface Actin - Object for describing a single operation on the state:
export interface ProductsAction {
  type: ProductsActionType; // Which operation we're going to do
  payload: any; // Which data we're sending
}

//4. Reducer function - function which performs the needed operation:
export function productReducer(
  currentState = new ProductState(),
  action: ProductsAction
): ProductState {
  const newState = { ...currentState }; // We must duplicate the original object
  // Do the change on the newState:
  switch (action.type) {
    case ProductsActionType.FetchProducts: // Here payload must be all Products fetched from the server
      newState.products = action.payload; // Set all fetched Products to the state
      break;

    case ProductsActionType.AddProduct: // Here payload must be the product to add
      newState.products.push(action.payload); // Add the new product to the state
      break;

    case ProductsActionType.UpdateProduct: // Here payload must be the product to update
      const indexToUpdate = newState.products.findIndex(
        (p) => p._id === action.payload._id
      ); // -1 if not exist
      if (indexToUpdate >= 0) {
        newState.products[indexToUpdate] = action.payload; // Update the product to the state
      }
      break;

    case ProductsActionType.ResetProducts: //Here payload must be the products to reset
      newState.products = []; // Reset all the products from the state
      break;

    case ProductsActionType.searchProducts: //Here payload must be the product to search
      newState.searchProducts = action.payload; // Set the search of product to the state
      break;
  }

  return newState; // return the new state
}

//5. Store  redux object for managing the global state:
export const productsStore = createStore(productReducer);
