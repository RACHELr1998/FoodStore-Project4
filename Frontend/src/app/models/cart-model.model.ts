import { CustomerModel } from "./customer-model.model";

export class CartModel {
  public _id: string;
  public customerId: string;
  public customer: CustomerModel;
  public cartProdDate: Date;
  public isClosed: boolean;
}
