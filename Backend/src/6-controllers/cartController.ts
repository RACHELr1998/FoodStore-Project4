import express, { NextFunction, Request, Response } from "express";
import auth from "../2-utils/auth";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import { CartModel } from "../4-models/cart-model";
import { CartItemModel } from "../4-models/cartItem-model";
import { OrderModel } from "../4-models/order-model";
import cartLogic from "../5-logic/cart-logic";

const router = express.Router();

// GET http://localhost:3001/api/cart
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

// router.get(
//   "/cart/:customerId",
//   //   verifyLoggedIn,
//   async (request: Request, response: Response, next: NextFunction) => {
//     try {
//       const customerId = request.params.customerId;
//       const cart = await cartLogic.getCart(customerId);
//       response.json(cart); // status: 200 - OK
//     } catch (err: any) {
//       next(err); // Jumping to catchAll middleware.
//     }
//   }
// );

// POST http://localhost:3001/api/cart
// router.post(
//   "/cart",
//   verifyLoggedIn,
//   async (request: Request, response: Response, next: NextFunction) => {
//     try {
//       const authHeader = request.header("authorization");
//       const customerId = auth.getCustomerIdFromToken(authHeader);
//       request.body.customerId = customerId;
//       const cart = new CartModel(request.body);
//       const addedCart = await cartLogic.addCart(cart);
//       response.status(201).json(addedCart); // status: 201 - Created
//     } catch (err: any) {
//       next(err); // Jumping to catchAll middleware.
//     }
//   }
// );

// router.post(
//   "/cart/:customerId",
//   verifyLoggedIn,
//   async (request: Request, response: Response, next: NextFunction) => {
//     try {
//       const customerId = request.params.customerId;
//       request.body.customerId = customerId;
//       const cart = new CartModel(request.body);
//       const addedCart = await cartLogic.addCart(cart);
//       response.status(201).json(addedCart); // status: 201 - Created
//     } catch (err: any) {
//       next(err); // Jumping to catchAll middleware.
//     }
//   }
// );

// PUT http://localhost:3001/api/cart/:_id
// router.put(
//   "/cart/:_id/:customerId",
//   verifyLoggedIn,
//   async (request: Request, response: Response, next: NextFunction) => {
//     try {
//       const customerId = request.params.customerId;
//       const _id = request.params._id;
//       request.body._id = _id; // Set the route cartId into the body
//       request.body.customerId = customerId;
//       const cart = new CartModel(request.body);
//       console.log(cart);
//       const updatedCart = await cartLogic.updateCart(cart);
//       response.json(updatedCart); // status: 200 - OK
//     } catch (err: any) {
//       next(err); // Jumping to catchAll middleware.
//     }
//   }
// );

// GET http://localhost:3001/api/cart/:cartId
router.get(
  "/cart/:cartId",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const cartId = request.params.cartId;
      const items = await cartLogic.getAllCartItemsByCart(cartId);
      response.json(items);
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

// PUT http://localhost:3001/api/cart/cartItem/:_id
// router.put(
//   "/cart/cartItem/:_id",
//   verifyLoggedIn,
//   async (request: Request, response: Response, next: NextFunction) => {
//     try {
//       const _id = +request.params._id;
//       request.body._id = _id; // Set the route _id into the body
//       const cartItem = new CartItemModel(request.body);
//       const updatedCartItem = await cartLogic.updateCartItem(cartItem);
//       response.json(updatedCartItem); // status: 200 - OK
//     } catch (err: any) {
//       next(err); // Jumping to catchAll middleware.
//     }
//   }
// );

// DELETE http://localhost:3001/api/cart/cartItem/:_id
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

// DELETE http://localhost:3001/api/items/:cartId
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

// POST http://localhost:3001/api/order
// router.post(
//   "/order",
//   verifyLoggedIn,
//   async (request: Request, response: Response, next: NextFunction) => {
//     try {
//       const order = new OrderModel(request.body);
//       console.log(order);

//       const addedOrder = await cartLogic.addOrder(order);
//       console.log(addedOrder);

//       response.status(201).json(addedOrder); // status: 201 - Created
//     } catch (err: any) {
//       next(err); // Jumping to catchAll middleware.
//     }
//   }
// );

export default router;
