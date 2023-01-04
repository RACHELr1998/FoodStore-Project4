import { createStore } from "redux";
import { CategoryModel } from "../models/category-model.model";

//1. State - This is the data:
export class CategoriesState {
  public categories: CategoryModel[] = []; // Our global data.
  public selectedCategory: string = "all"; // Our global data of selected.
}

//2. enum Action Type - List of actions we can do on the above state
export enum CategoriesActionType {
  FetchCategories = "FetchCategories", // Fetch all categories from the backend
  SelectedCategory = "SelectedCategory", // Select category
}

//3. interface Actin - Object for describing a single operation on the state:
export interface CategoriesAction {
  type: CategoriesActionType; // Which operation we're going to do
  payload?: any; // Which data we're sending
}

//4. Reducer function - function which performs the needed operation:
export function categoriesReducer(
  currentState = new CategoriesState(),
  action: CategoriesAction
): CategoriesState {
  const newState = { ...currentState }; // We must duplicate the original object
  // Do the change on the newState:
  switch (action.type) {
    case CategoriesActionType.FetchCategories: // Here payload must be all categories fetched from the server
      newState.categories = action.payload; // Set all fetched categories to the state
      break;

    case CategoriesActionType.SelectedCategory: // Here payload must be the selected category
      newState.selectedCategory = action.payload; // Set the selected category to the state
      break;
  }

  return newState; // return the new state
}

//5. Store  redux object for managing the global state:
export const categoriesStore = createStore(categoriesReducer);
