import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import { CustomerModel } from "../models/customer-model.model";

// 1. State
export class AuthState {
  public token: string = null;
  public customer: CustomerModel = null;

  public constructor() {
    this.token = localStorage.getItem("token");
    if (this.token) {
      const container: { customer: CustomerModel } = jwtDecode(this.token);
      this.customer = container.customer;
    }
  }
}

// 2. enum Action Type
export enum AuthActionType {
  Register,
  Login,
  Logout,
}

// 3. interface Action
export interface AuthAction {
  type: AuthActionType;
  payload?: string;
}

// 4. Reducer function
export function authReducer(
  currentState = new AuthState(),
  action: AuthAction
): AuthState {
  const newState = { ...currentState };

  switch (action.type) {
    case AuthActionType.Register: // Here the payload is a token string
    case AuthActionType.Login: // Here the payload is a token string
      newState.token = action.payload;
      const container: { customer: CustomerModel } = jwtDecode(newState.token); // container is a wrapper object containing the customer.
      newState.customer = container.customer; // customer object hidden inside the token
      localStorage.setItem("token", newState.token); // Save token to storage.
      break;

    case AuthActionType.Logout: // Here we have no payload
      newState.token = null;
      newState.customer = null;
      localStorage.removeItem("token");
      break;
  }

  return newState;
}

// 5. Store
export const authStore = createStore(authReducer);
