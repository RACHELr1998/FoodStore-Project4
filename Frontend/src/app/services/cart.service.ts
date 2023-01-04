import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { CartModel } from "../models/cart-model.model";
import { CartItemModel } from "../models/cartItem-model.model";
import { OrderModel } from "../models/order-model.model";
import { CartsAction, CartsActionType, cartsStore } from "../redux/carts.state";
import { CartAction, CartActionType, cartStore } from "../redux/Test-cartState";

@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor(private http: HttpClient) {}

  //Get cart by customerId:
  async getCart(): Promise<CartModel> {
    // // Take carts resides in redux global state:
    // let carts = cartStore.getState().carts;

    // // If we have no carts in global state - fetch them from server:
    // if (carts.length === 0) {
    //   // Fetch all carts from backend:
    //   const observable = this.http.get<CartModel[]>(environment.cartUrl);
    //   // Extract carts from axios response:
    //   carts = await firstValueFrom(observable);

    //   // Save fetched carts in global state:
    //   const action: CartAction = {
    //     type: CartActionType.FetchCarts,
    //     payload: carts,
    //   };
    //   cartStore.dispatch(action); // Redux will call cartReducer to perform this action.
    // }

    // //Return cart:
    // return carts;

    const observable = this.http.get<CartModel>(environment.customerCartUrl);
    const customerCart = await firstValueFrom(observable);

    const action: CartsAction = {
      type: CartsActionType.GetCart,
      payload: customerCart,
    };
    cartsStore.dispatch(action);

    return customerCart;
  }

  //Add cart:
  //   async addCart(cart: CartModel): Promise<void> {
  //     // Convert CartModel into FormData:
  //     const formData = new FormData();
  //     formData.append("customerId", cart.customerId);
  //     formData.append("cartProdDate", cart.cartProdDate.toDateString());
  //     formData.append("cartItems", cart.cartItems.toString());

  //     // Send cart to backend:
  //     const observable = this.http.post<CartModel>(environment.cartUrl, cart);
  //     const addedCart: CartModel = await firstValueFrom(observable);

  //     // Send added cart to redux global state:
  //     const action: CartAction = {
  //       type: CartActionType.AddCart,
  //       payload: addedCart,
  //     };
  //     cartStore.dispatch(action);
  //   }

  //Edit cart:
  //   async updateCart(cart: CartModel): Promise<void> {
  //     // Convert CartModel into FormData:
  //     const formData = new FormData();
  //     formData.append("_id", cart._id);
  //     formData.append("customerId", cart.customerId);
  //     formData.append("cartProdDate", cart.cartProdDate.toDateString());
  //     formData.append("cartItems", cart.cartItems.toString());

  //     // Send cart to backend:
  //     const observable = this.http.put<CartModel>(
  //       environment.cartUrl + cart._id,
  //       cart
  //     );
  //     const updatedCart: CartModel = await firstValueFrom(observable);

  //     // Send update cart to redux global state:
  //     const action: CartAction = {
  //       type: CartActionType.UpdateCart,
  //       payload: updatedCart,
  //     };
  //     cartStore.dispatch(action);
  //   }

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

  //Add cartItem to cart
  //   async addCartItemToCart(cartItem: CartItemModel): Promise<void> {
  //     // Convert CartItemModel into FormData:
  //     const formData = new FormData();
  //     formData.append("productId", cartItem.productId);
  //     formData.append("cartId", cartItem.cartId);
  //     formData.append("quantity", cartItem.quantity.toString());
  //     formData.append("finalPrice", cartItem.totalPrice.toString());

  //     // Send cartItem to backend:
  //     const observable = this.http.post<CartItemModel>(
  //       `${environment.cartUrl}cartItemItem`,
  //       cartItem
  //     );
  //     const addedCartItem: CartItemModel = await firstValueFrom(observable);

  //     // Send added cartItem to redux global state:
  //     const action: CartAction = {
  //       type: CartActionType.AddCartItem,
  //       payload: addedCartItem,
  //     };
  //     cartStore.dispatch(action);

  //     await firstValueFrom(observable);
  //   }

  //Edit cartItem
  //   async updateCartItem(cartItem: CartItemModel): Promise<void> {
  //     // Convert CartItemModel into FormData:
  //     const formData = new FormData();
  //     formData.append("_id", cartItem._id);
  //     formData.append("productId", cartItem.productId);
  //     formData.append("cartId", cartItem.cartId);
  //     formData.append("quantity", cartItem.quantity.toString());
  //     formData.append("finalPrice", cartItem.totalPrice.toString());

  //     // Send cartItem to backend:
  //     const observable = this.http.put<CartItemModel>(
  //       `${environment.cartUrl}cartItem` + cartItem._id,
  //       cartItem
  //     );
  //     const updatedCartItem: CartItemModel = await firstValueFrom(observable);

  //     // Send update cartItem to redux global state:
  //     const action: CartAction = {
  //       type: CartActionType.AddCartItem,
  //       payload: updatedCartItem,
  //     };
  //     cartStore.dispatch(action);

  //     await firstValueFrom(observable);
  //   }

  //Delete cartItem
  async deleteCartItemFromCart(
    cartId: string,
    productId: string
  ): Promise<void> {
    // Delete this cartItem in backend:
    const observable = this.http.delete(
      `${environment.cartUrl}cartItem/+${cartId}/+${productId}`
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
    const observable = this.http.delete(environment.cartUrl + cartId);
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

  //   async addOrder(order: OrderModel): Promise<OrderModel> {
  //     const observable = this.http.post<OrderModel>(environment.orderUrl, order);
  //     return await firstValueFrom(observable);
  //   }
}
