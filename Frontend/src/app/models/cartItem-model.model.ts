import { CartModel } from "./cart-model.model";
import { ProductModel } from "./product-model.model";

export class CartItemModel {
  public _id: string;
  public productId: string;
  public product: ProductModel;
  public quantity: number;
  public totalPrice: number;
  public cartId: string;
  public cart: CartModel;

  constructor(
    quantity: number,
    productId: string,
    cartId: string,
    totalPrice: number
  ) {
    (this.quantity = quantity),
      (this.productId = productId),
      (this.cartId = cartId),
      (this.totalPrice = totalPrice);
  }
}
