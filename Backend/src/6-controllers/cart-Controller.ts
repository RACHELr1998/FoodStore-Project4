import express, { NextFunction, Request, Response } from "express";
import auth from "../2-utils/auth";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import { CartItemModel } from "../4-models/cartItem-model";
import cartLogic from "../5-logic/cart-logic";

const router = express.Router();

// GET http://localhost:3001/api/cart-by-customer
router.get(
  "/cart-by-customer",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const authHeader = request.header("authorization");
      const cart = await cartLogic.getCart(authHeader, false);
      response.json(cart); // status: 200 - OK
    } catch (err: any) {
      next(err); // Jumping to catchAll middleware.
    }
  }
);

// GET http://localhost:3001/api/cart/:cartId
router.get(
  "/cart/:cartId",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const cartId = request.params.cartId;
      const cartItems = await cartLogic.getAllCartItemsByCart(cartId);
      response.json(cartItems);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST http://localhost:3001/api/cart/cartItem
router.post(
  "/cart/cartItem",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const authHeader = request.header("authorization");
      const customerId = auth.getCustomerIdFromToken(authHeader);
      const cartItem = new CartItemModel(request.body);
      const addedCartItem = await cartLogic.addCartItemToCart(
        cartItem,
        customerId
      );
      response.status(201).json(addedCartItem); // status: 201 - Created
    } catch (err: any) {
      next(err); // Jumping to catchAll middleware.
    }
  }
);

// DELETE http://localhost:3001/api/cart/cartItem/:cartId/:productId
router.delete(
  "/cart/cartItem/:cartId/:productId",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const cartId = request.params.cartId;
      const productId = request.params.productId;
      await cartLogic.deleteCartItemFromCart(cartId, productId);
      response.sendStatus(204); // status: 204 - No Content
    } catch (err: any) {
      next(err); // Jumping to catchAll middleware.
    }
  }
);

// DELETE http://localhost:3001/api/cart/cartItem/:cartId
router.delete(
  "/cart/cartItem/:cartId",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const cartId = request.params.cartId;
      await cartLogic.deleteAllCartItemsFromCart(cartId);
      response.sendStatus(204);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
