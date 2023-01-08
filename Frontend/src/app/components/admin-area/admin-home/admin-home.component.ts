import { Component, OnDestroy, OnInit } from "@angular/core";
import { Unsubscribe } from "redux";
import { CategoryModel } from "src/app/models/category-model.model";
import { CustomerModel } from "src/app/models/customer-model.model";
import { ProductModel } from "src/app/models/product-model.model";
import { NotifyService } from "src/app/services/notify.service";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "app-admin-home",
  templateUrl: "./admin-home.component.html",
  styleUrls: ["./admin-home.component.css"],
})
export class AdminHomeComponent implements OnInit, OnDestroy {
  public customer: CustomerModel;
  private unsubscribe: Unsubscribe;
  public opened = false;

  public products: ProductModel[];
  public categories: CategoryModel[];
  public editedProduct: ProductModel;
  public isAdminAction: boolean;

  constructor(
    private productsService: ProductsService,
    private notify: NotifyService
  ) {}

  async ngOnInit() {
    try {
      //if we have the products already will get from store instead of backend:
      this.products = await this.productsService.getAllProducts();
      this.categories = await this.productsService.getAllCategories();
    } catch (err: any) {
      this.notify.error(err);
    }
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  productToEdit(product: ProductModel) {
    this.isAdminAction = false;
    this.editedProduct = null;
    this.editedProduct = product;
    this.opened = true;
  }
}
