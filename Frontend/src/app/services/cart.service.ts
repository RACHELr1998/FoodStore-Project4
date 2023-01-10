import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { CartModel } from "../models/cart-model.model";
import { CartItemModel } from "../models/cartItem-model.model";
import { CartsAction, CartsActionType, cartsStore } from "../redux/carts.state";

@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor(private http: HttpClient) {}

  //Get cart by customerId:
  async getCart(): Promise<CartModel> {
    const observable = this.http.get<CartModel>(environment.customerCartUrl);
    const customerCart = await firstValueFrom(observable);

    const action: CartsAction = {
      type: CartsActionType.GetCart,
      payload: customerCart,
    };
    cartsStore.dispatch(action);

    return customerCart;
  }

  //Get all items that in the cart by caryId:
  async getAllItemsByCart(cartId: string): Promise<CartItemModel[]> {
    if (cartId) {
      const observable = this.http.get<CartItemModel[]>(
        environment.cartUrl + cartId
      );
      const cartItemsOfCart = await firstValueFrom(observable);

      const action: CartsAction = {
        type: CartsActionType.FetchCartsItems,
        payload: cartItemsOfCart,
      };
      cartsStore.dispatch(action);
      return cartItemsOfCart;
    }
    return [];
  }

  //Add cartItem to cart:
  async addCartItemToCart(cartItem: CartItemModel): Promise<CartItemModel> {
    const observable = this.http.post<CartItemModel>(
      `${environment.cartUrl}cartItem`,
      cartItem
    );
    return await firstValueFrom(observable);
  }

  //Delete cartItem
  async deleteCartItemFromCart(
    cartId: string,
    productId: string
  ): Promise<void> {
    // Delete this cartItem in backend:
    const observable = this.http.delete(
      `${environment.cartUrl}cartItem/` + cartId + "/" + productId
    );
    await firstValueFrom(observable);

    // Delete this vacation also in redux global state:
    const action: CartsAction = {
      type: CartsActionType.DeleteCartItemFromCart,
      payload: productId,
    };
    cartsStore.dispatch(action);
  }

  //Delete all the Items from the cart:
  async deleteAllCartItemsFromCart(cartId: string): Promise<void> {
    const observable = this.http.delete(
      `${environment.cartUrl}cartItem/` + cartId
    );
    await firstValueFrom(observable);

    const action: CartsAction = {
      type: CartsActionType.DeleteAllCartItemsFromCart,
    };
    cartsStore.dispatch(action);
  }

  //Get the calculation of the total price of the cart for all cartItems:
  getTotalPriceCart() {
    const cartItems = cartsStore.getState().cartItems;
    const totalPrice = cartItems.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.totalPrice;
    }, 0);
    return totalPrice;
  }
}
