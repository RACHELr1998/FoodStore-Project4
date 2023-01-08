import { ObjectId } from "mongoose";
import auth from "../2-utils/auth";
import { CartModel, ICartModel } from "../4-models/cart-model";
import { CartItemModel, ICartItemModel } from "../4-models/cartItem-model";
import {
  IdNotFoundError,
  ObjectIdNotFoundError,
  OneOfIdsNotFoundError,
  ValidationError,
} from "../4-models/client-errors";

// Get cart of customer:
function getCart(authHeader: string, isClosed: boolean): Promise<ICartModel> {
  //get the customer from the provided Token:
  const customerId = auth.getCustomerIdFromToken(authHeader);
  if (!customerId) throw new ObjectIdNotFoundError(customerId);
  return CartModel.findOne({ customerId, isClosed })
    .populate("customer")
    .exec();
}

// function getCart(customerId: string): Promise<ICartModel> {
//   //get the customer from the provided Token:
//   // const customerId = auth.getCustomerIdFromToken(authHeader);
//   if (!customerId) throw new IdNotFoundError(customerId);
//   return CartModel.findOne({ customerId }).populate("customer").exec();
// }

//Add cart by customer
async function addCart(cart: ICartModel): Promise<ICartModel> {
  const errors = cart.validateSync();
  if (errors) throw new ValidationError(errors.message);
  return await cart.save();
}

// Update cart by customer:
// async function updateCart(cart: ICartModel): Promise<ICartModel> {
//   const errors = cart.validateSync();
//   if (errors) throw new ValidationError(errors.message);
//   const updatedCart = await CartModel.findByIdAndUpdate(cart._id, cart, {
//     returnOriginal: false,
//   }).exec(); // { returnOriginal: false } --> return back db cart and not argument cart.
//   if (!updatedCart) throw new ObjectIdNotFoundError(cart._id);
//   return updatedCart;
// }

//Close the cart after the customer has finished ordering:
async function closeCart(_id: string): Promise<ICartModel> {
  await CartModel.updateOne({ _id }, { $set: { isClosed: true } }).exec();

  const cart = await CartModel.findOne({ _id }).exec();

  return cart;
}

//Get all items that in the cart by caryId:
async function getAllCartItemsByCart(
  cartId: string
): Promise<ICartItemModel[]> {
  return CartItemModel.find({ cartId })
    .populate("cart")
    .populate("product")
    .exec();
}

//Add cartItem by customer:
async function addCartItemToCart(
  cartItem: ICartItemModel,
  customerId: ObjectId
): Promise<ICartItemModel> {
  //Validation:
  const errorsItem = cartItem.validateSync();
  if (errorsItem) throw new ValidationError(errorsItem.message);

  //If there is no cart for this customer:
  if (!cartItem.cartId) {
    //Add new cart to the customerId:
    const date = new Date();
    const newCart = await addCart(
      new CartModel({ customerId, cartProdDate: date, isClosed: false })
    );

    //Update the cartId:
    cartItem.cartId = newCart._id;

    //Add new cartItem to the cart:
    return await cartItem.save();
  }

  //If there is existing cart:
  if (cartItem.cartId) {
    //Find if the cartItem is in the cart and update him:
    await CartItemModel.updateOne(
      { cartId: cartItem.cartId, productId: cartItem.productId },
      { $set: { quantity: cartItem.quantity, totalPrice: cartItem.totalPrice } }
    ).exec();

    //Add cartItem that doesn't exist in cart:
    let found = await CartItemModel.findOne({
      cartId: cartItem.cartId,
      productId: cartItem.productId,
    }).exec();

    if (!found) {
      return cartItem.save();
    } else {
      return found;
    }
  }
}

// Update cartItem by customer:
// async function updateCartItem(
//   cartItem: ICartItemModel
// ): Promise<ICartItemModel> {
//   const errors = cartItem.validateSync();
//   if (errors) throw new ValidationError(errors.message);
//   const updatedCartItem = await CartItemModel.findByIdAndUpdate(
//     cartItem._id,
//     cartItem,
//     { returnOriginal: false }
//   ).exec(); // { returnOriginal: false } --> return back db cartItem and not argument cartItem.
//   if (!updatedCartItem) throw new IdNotFoundError(cartItem._id);
//   return updatedCartItem;
// }

//Delete cartItem from cart by Customer:
async function deleteCartItemFromCart(
  cartId: string,
  productId: string
): Promise<void> {
  const deletedItem = await CartItemModel.deleteOne({
    cartId,
    productId,
  }).exec();
  if (!deletedItem) throw new OneOfIdsNotFoundError(cartId, productId);
}

//Delete all the Items from the cart by Customer:
async function deleteAllCartItemsFromCart(cartId: string): Promise<void> {
  const deletedCartItems = await CartItemModel.deleteMany({ cartId });
  if (!deletedCartItems) throw new IdNotFoundError(cartId);
}

//Add order:
// async function addOrder(order: IOrderModel): Promise<IOrderModel> {
//   const errors = order.validateSync();
//   if (errors) throw new ValidationError(errors.message);
//   return await order.save();
// }

export default {
  getCart,
  addCart,
  //   updateCart,
  closeCart,
  getAllCartItemsByCart,
  addCartItemToCart,
  //   updateCartItem,
  deleteCartItemFromCart,
  deleteAllCartItemsFromCart,
  //   addOrder,
};
