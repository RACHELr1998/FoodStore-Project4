import { CartModel } from "./cart-model.model";
import { CustomerModel } from "./customer-model.model";

export class OrderModel {
  public _id: string;
  public customerId: string;
  public customer: CustomerModel;
  public cartId: string;
  public cart: CartModel;
  public finalPrice: number;
  public deliveryCity: string;
  public deliveryStreet: string;
  public deliveryDate: Date;
  public orderDate: Date;
  public creditCard: string;
  public creditCard4Charts: string;
}
