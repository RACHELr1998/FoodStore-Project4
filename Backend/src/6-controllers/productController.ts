import express, { NextFunction, Request, Response } from "express";
import { ProductModel } from "../4-models/product-model";
import productLogic from "../5-logic/product-logic";

const router = express.Router();

// GET http://localhost:3001/api/products/categories
router.get(
  "/products/categories",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const categories = await productLogic.getAllCategories();
      response.json(categories);
    } catch (err: any) {
      next(err);
    }
  }
);

// GET http://localhost:3001/api/products/:categoryId
router.get(
  "/products/:categoryId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const categoryId = request.params.categoryId;
      const products = await productLogic.getAllProductsByCategoryId(
        categoryId
      );
      response.json(products);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST http://localhost:3001/api/products
router.post(
  "/products",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const product = new ProductModel(request.body);
      const addedProduct = await productLogic.addProduct(product);
      response.status(201).json(addedProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

// PUT http://localhost:3001/api/products/:_id
router.put(
  "/products/:_id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const _id = request.params._id;
      request.body._id = _id;
      const product = new ProductModel(request.body);
      const updatedProduct = await productLogic.updateProduct(product);
      response.json(updatedProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
