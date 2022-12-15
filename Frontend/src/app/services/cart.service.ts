import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { CartModel } from "../models/cart-model.model";
import { CartItemModel } from "../models/cartItem-model.model";
import { OrderModel } from "../models/order-model.model";
import { ProductModel } from "../models/product-model.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor(private http: HttpClient) {}

  async getCart(): Promise<CartModel> {
    const observable = this.http.get<CartModel>(environment.cartUrl);
    return await firstValueFrom(observable);
  }

  async addCart(cart: CartModel): Promise<CartModel> {
    const observable = this.http.post<CartModel>(environment.cartUrl, cart);
    return await firstValueFrom(observable);
  }

  async updateCart(cart: CartModel): Promise<CartModel> {
    const observable = this.http.put<CartModel>(
      environment.cartUrl + cart._id,
      cart
    );
    return await firstValueFrom(observable);
  }

  async addCartItem(product: ProductModel): Promise<CartItemModel> {
    const observable = this.http.post<CartItemModel>(
      environment.cartUrl,
      product
    );
    return await firstValueFrom(observable);
  }

  async updateCartItem(cartItem: CartItemModel): Promise<CartItemModel> {
    const observable = this.http.put<CartItemModel>(
      environment.cartUrl + cartItem._id,
      cartItem
    );
    return await firstValueFrom(observable);
  }

  async deleteCartItem(_id: string): Promise<void> {
    const observable = this.http.delete<CartItemModel>(
      environment.cartUrl + _id
    );
    await firstValueFrom(observable);
  }

  async addOrder(order: OrderModel): Promise<OrderModel> {
    const observable = this.http.post<OrderModel>(environment.cartUrl, order);
    return await firstValueFrom(observable);
  }
}
