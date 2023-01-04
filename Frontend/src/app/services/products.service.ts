import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { CategoryModel } from "../models/category-model.model";
import { ProductModel } from "../models/product-model.model";
import {
  CategoriesAction,
  CategoriesActionType,
  categoriesStore,
} from "../redux/categories.state";
import {
  ProductsAction,
  ProductsActionType,
  productsStore,
} from "../redux/productsState";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  isAction = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

  //Get all categories from backend:
  async getAllCategories(): Promise<CategoryModel[]> {
    // Take categories resides in redux global state:
    let categories = categoriesStore.getState().categories;

    // If we have no categories in global state - fetch them from server:
    if (categories.length === 0) {
      // Fetch all categories from backend:
      const observable = this.http.get<CategoryModel[]>(
        environment.categoriesUrl
      );
      // Extract categories from axios response:
      categories = await firstValueFrom(observable);
      // Save fetched categories in global state:
      const action: CategoriesAction = {
        type: CategoriesActionType.FetchCategories,
        payload: categories,
      };
      categoriesStore.dispatch(action); // Redux will call productsReducer to perform this action.
    }

    //Return categories:
    return categories;
  }

  //Get all products:
  async getAllProducts(): Promise<ProductModel[]> {
    // Take products resides in redux global state:
    let products = productsStore.getState().products;

    // If we have no products in global state - fetch them from server:
    if (products.length === 0) {
      // Fetch all products from backend:
      const observable = this.http.get<ProductModel[]>(environment.productsUrl);
      // Extract products from axios response:
      products = await firstValueFrom(observable);

      // Save fetched products in global state:
      const action: ProductsAction = {
        type: ProductsActionType.FetchProducts,
        payload: products,
      };
      productsStore.dispatch(action); // Redux will call productsReducer to perform this action.
    }

    // Return products:
    return products;
  }

  //Count products:
  async countProducts(): Promise<number> {
    const observable = this.http.get<number>(environment.productsUrl + "count");
    return await firstValueFrom(observable);
  }

  //Add product
  async addProduct(product: ProductModel): Promise<ProductModel> {
    // Convert ProductModel into FormData because we need to send text + image:
    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("categoryId", product.categoryId);
    formData.append("price", product.price.toString());
    formData.append("image", product.image);

    // Send product to backend:
    const observable = this.http.post<ProductModel>(
      environment.productsUrl,
      formData
    );
    const addedProduct: ProductModel = await firstValueFrom(observable);

    // Send added product to redux global state:
    const action: ProductsAction = {
      type: ProductsActionType.AddProduct,
      payload: addedProduct,
    };
    productsStore.dispatch(action);

    return addedProduct;
  }

  async updateProduct(product: ProductModel): Promise<ProductModel> {
    // Convert ProductModel into FormData because we need to send text + image:
    const formData = new FormData();
    formData.append("_id", product._id);
    formData.append("productName", product.productName);
    formData.append("categoryId", product.categoryId);
    formData.append("price", product.price.toString());
    formData.append("image", product.image);
    // formData.append("imageName", product.imageName);

    // Send product to backend:
    const observable = this.http.put<ProductModel>(
      environment.productsUrl + product._id,
      formData
    );
    const updatedProduct: ProductModel = await firstValueFrom(observable);

    // Send added product to redux global state:
    const action: ProductsAction = {
      type: ProductsActionType.UpdateProduct,
      payload: updatedProduct,
    };
    productsStore.dispatch(action);

    return updatedProduct;
  }

  //Reset products
  public resetProducts() {
    // Reset all products in redux global state:
    const action: ProductsAction = {
      type: ProductsActionType.ResetProducts,
      payload: "",
    };
    productsStore.dispatch(action);
  }

  //Set selected category when customer move from one to anther and set it in redux:
  setSelectedCategory(categoryId: string) {
    const action: CategoriesAction = {
      type: CategoriesActionType.SelectedCategory,
      payload: categoryId,
    };
    categoriesStore.dispatch(action);
  }

  //Set search text when customer enter text to the search input and set it in redux:
  setSearchProducts(text: string) {
    const action: ProductsAction = {
      type: ProductsActionType.searchProducts,
      payload: text,
    };
    productsStore.dispatch(action);
  }
}
