import express, { NextFunction, Request, Response } from "express";
import auth from "../2-utils/auth";
import { CartModel } from "../4-models/cart-model";
import { CartItemModel } from "../4-models/cartItem-model";
import { OrderModel } from "../4-models/order-model";
import cartLogic from "../5-logic/cart-logic";

const router = express.Router();

// GET http://localhost:3001/api/cart
// router.get(
//   "/api/cart",
//   //verifyLoggedIn,
//   async (request: Request, response: Response, next: NextFunction) => {
//     try {
//       const authHeader = request.header("authorization");
//       const cart = await cartLogic.getCart(authHeader);
//       response.json(cart); // status: 200 - OK
//     } catch (err: any) {
//       next(err); // Jumping to catchAll middleware.
//     }
//   }
// );

router.get(
  "/cart",
  //verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      //   const _id = request.params.customerId;
      const cart = await cartLogic.getCart();
      response.json(cart); // status: 200 - OK
    } catch (err: any) {
      next(err); // Jumping to catchAll middleware.
    }
  }
);

// POST http://localhost:3001/api/cart
// router.post(
//   "/api/cart",
//   //verifyLoggedIn,
//   async (request: Request, response: Response, next: NextFunction) => {
//     try {
//       const authHeader = request.header("authorization");
//       const customerId = auth.getCustomerIdFromToken(authHeader);
//       const cart = new CartModel(customerId, request.body);
//       const addedCart = await cartLogic.addCart(cart);
//       response.status(201).json(addedCart); // status: 201 - Created
//     } catch (err: any) {
//       next(err); // Jumping to catchAll middleware.
//     }
//   }
// );

// POST http://localhost:3001/api/cart
router.post(
  "/cart",
  //verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const cart = new CartModel(request.body);
      const addedCart = await cartLogic.addCart(cart);
      response.status(201).json(addedCart); // status: 201 - Created
    } catch (err: any) {
      next(err); // Jumping to catchAll middleware.
    }
  }
);

// PUT http://localhost:3001/api/cart
router.put(
  "/cart",
  //verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const cartId = +request.params.cartId;
      request.body.cartId = cartId; // Set the route cartId into the body
      const cart = new CartModel(request.body);
      const updatedCart = await cartLogic.updateCart(cart);
      response.json(updatedCart); // status: 200 - OK
    } catch (err: any) {
      next(err); // Jumping to catchAll middleware.
    }
  }
);

// POST http://localhost:3001/api/cart/cartItem
router.post(
  "/cart/cartItem",
  //verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const cartItem = new CartItemModel(request.body);
      const addedCartItem = await cartLogic.addCartItem(cartItem);
      response.status(201).json(addedCartItem); // status: 201 - Created
    } catch (err: any) {
      next(err); // Jumping to catchAll middleware.
    }
  }
);

// PUT http://localhost:3001/api/cart/cartItem/:_id
router.put(
  "/cart/cartItem/:_id",
  //verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const _id = +request.params._id;
      request.body._id = _id; // Set the route _id into the body
      const cartItem = new CartItemModel(request.body);
      const updatedCartItem = await cartLogic.updateCartItem(cartItem);
      response.json(updatedCartItem); // status: 200 - OK
    } catch (err: any) {
      next(err); // Jumping to catchAll middleware.
    }
  }
);

// DELETE http://localhost:3001/api/cart/cartItem/:_id
router.delete(
  "/cart/cartItem/:_id",
  //verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const _id = request.params._id;
      await cartLogic.deleteCartItem(_id);
      response.sendStatus(204); // status: 204 - No Content
    } catch (err: any) {
      next(err); // Jumping to catchAll middleware.
    }
  }
);

// POST http://localhost:3001/api/order
router.post(
  "/order",
  //verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const order = new OrderModel(request.body);
      const addedOrder = await cartLogic.addOrder(order);
      response.status(201).json(addedOrder); // status: 201 - Created
    } catch (err: any) {
      next(err); // Jumping to catchAll middleware.
    }
  }
);

export default router;
