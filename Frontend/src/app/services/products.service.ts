import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { CategoryModel } from "../models/category-model.model";
import { ProductModel } from "../models/product-model.model";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  async getAllCategories(): Promise<CategoryModel[]> {
    const observable = this.http.get<CategoryModel[]>(
      `${environment.productsUrl}categories`
    );
    return await firstValueFrom(observable);
  }

  async getAllProductsByCategoryId(
    categoryId: string
  ): Promise<ProductModel[]> {
    const observable = this.http.get<ProductModel[]>(
      environment.productsUrl + categoryId
    );
    return await firstValueFrom(observable);
  }

  async addProduct(product: ProductModel): Promise<ProductModel> {
    const observable = this.http.post<ProductModel>(
      environment.productsUrl,
      product
    );
    return await firstValueFrom(observable);
  }

  async updateProduct(product: ProductModel): Promise<ProductModel> {
    const observable = this.http.put<ProductModel>(
      environment.productsUrl + product._id,
      product
    );
    return await firstValueFrom(observable);
  }
}
