import { Component, OnInit } from "@angular/core";
import { CartItemModel } from "src/app/models/cartItem-model.model";
import { CategoryModel } from "src/app/models/category-model.model";
import { ProductModel } from "src/app/models/product-model.model";
import { CartService } from "src/app/services/cart.service";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent implements OnInit {
  public categories: CategoryModel[];
  public products: ProductModel[];
  public cartItem: CartItemModel;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.categories = await this.productsService.getAllCategories();
    } catch (err: any) {
      alert(err.message);
    }
  }

  public async getProductsByCategory(categoryId: string): Promise<void> {
    try {
      this.products = await this.productsService.getAllProductsByCategoryId(
        categoryId
      );
    } catch (err: any) {
      alert(err.message);
    }
  }

  public async addProductToCart(product: ProductModel) {
    try {
      this.cartItem = await this.cartService.addCartItem(product);
    } catch (err: any) {
      alert(err.message);
    }
  }
}
