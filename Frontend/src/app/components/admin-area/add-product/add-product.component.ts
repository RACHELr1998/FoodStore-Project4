import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CategoryModel } from "src/app/models/category-model.model";
import { ProductModel } from "src/app/models/product-model.model";
import { NotifyService } from "src/app/services/notify.service";

import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"],
})
export class AddProductComponent implements OnInit {
  public categories: CategoryModel[];
  public product = new ProductModel();

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private notify: NotifyService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.categories = await this.productsService.getAllCategories();
    } catch (err: any) {
      this.notify.error(err.message);
    }
  }

  public async send() {
    try {
      await this.productsService.addProduct(this.product);
      this.notify.success("The product has been added!");
      this.router.navigateByUrl("/home");
    } catch (err: any) {
      this.notify.error(err.message);
    }
  }
}
