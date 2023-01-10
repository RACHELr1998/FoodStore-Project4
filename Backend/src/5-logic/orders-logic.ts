import hash from "../2-utils/cyber";
import { ValidationError } from "../4-models/client-errors";
import { IOrderModel, OrderModel } from "../4-models/order-model";
import cartLogic from "./cart-logic";

//Adding a new order:
async function addOrder(order: IOrderModel): Promise<IOrderModel> {
  //Validation:
  const errors = order.validateSync();
  if (errors) throw new ValidationError(errors.message);

  //hash credit-card
  order.creditCard = hash(order.creditCard);

  //set closed the cart
  await cartLogic.closeCart(order.cartId.toString());

  //Add an order:
  return order.save();
}

//Get all orders:
async function getAllOrders(): Promise<IOrderModel[]> {
  return OrderModel.find().populate("cart").populate("customer").exec();
}

//Count the number of orders:
async function countOrders(): Promise<number> {
  return OrderModel.find().count().exec();
}

export default {
  addOrder,
  getAllOrders,
  countOrders,
};
