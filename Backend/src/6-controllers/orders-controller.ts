import express, { NextFunction, Request, Response } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import { OrderModel } from "../4-models/order-model";
import ordersLogic from "../5-logic/orders-logic";

const router = express.Router();

// GET http://localhost:3001/api/order/
router.get(
  "/order",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const orders = await ordersLogic.getAllOrders();
      response.json(orders);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST http://localhost:3001/api/order/
router.post(
  "/order",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const order = new OrderModel(request.body);
      const addedOrder = await ordersLogic.addOrder(order);
      response.status(201).json(addedOrder);
    } catch (err: any) {
      next(err);
    }
  }
);

// GET http://localhost:3001/api/order/count
router.get(
  "/order/count",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const count = await ordersLogic.countOrders();
      response.json(count);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
