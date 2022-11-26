import { CartModel, ICartModel } from "../4-models/cart-model";
import { CartItemModel, ICartItemModel } from "../4-models/cartItem-model";
import { IdNotFoundError, ValidationError } from "../4-models/client-errors";
import { IOrderModel } from "../4-models/order-model";

// Get cart of customer:
function getCart(customerId: string): Promise<ICartModel> {
    if (!customerId) throw new IdNotFoundError(customerId);
    return CartModel.findOne({customerId}).populate("customer").exec(); 
}

//Add cart by customer
function addCart(cart: ICartModel): Promise<ICartModel> {
    const errors = cart.validateSync();
    if (errors) throw new ValidationError(errors.message);
    return cart.save(); 
}

// Update cart by customer:
async function updateCart(cart: ICartModel): Promise<ICartModel> {
    const errors = cart.validateSync();
    if (errors) throw new ValidationError(errors.message);
    const updatedCart = await CartModel.findByIdAndUpdate(cart._id, cart, { returnOriginal: false }).exec(); // { returnOriginal: false } --> return back db cart and not argument cart.
    if (!updatedCart) throw new IdNotFoundError(cart._id);
    return updatedCart;
}

//Add cartItem by Customer: 
function addCartItem(cartItem: ICartItemModel): Promise<ICartItemModel> {
    const errors = cartItem.validateSync();
    if (errors) throw new ValidationError(errors.message);
    return cartItem.save(); 
}

// Update cartItem by customer:
async function updateCartItem(cartItem: ICartItemModel): Promise<ICartItemModel> {
    const errors = cartItem.validateSync();
    if (errors) throw new ValidationError(errors.message);
    const updatedCartItem = await CartItemModel.findByIdAndUpdate(cartItem._id, cartItem, { returnOriginal: false }).exec(); // { returnOriginal: false } --> return back db cartItem and not argument cartItem.
    if (!updatedCartItem) throw new IdNotFoundError(cartItem._id);
    return updatedCartItem;
}

//Delete cartItem by Customer: 
async function deleteCartItem(_id: string): Promise<void> {
    const deletedProduct = await CartItemModel.findByIdAndDelete(_id).exec();
    if (!deletedProduct) throw new IdNotFoundError(_id);
}

//Add order:
function addOrder(order: IOrderModel): Promise<IOrderModel> {
    const errors = order.validateSync();
    if (errors) throw new ValidationError(errors.message);
    return order.save(); 
}

export default {
    getCart,
    addCart,
    updateCart,
    addCartItem,
    updateCartItem,
    deleteCartItem,
    addOrder
};