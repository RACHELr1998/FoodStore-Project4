import { Component, Input, OnInit } from "@angular/core";
import { ProductModel } from "src/app/models/product-model.model";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "app-admin-actions",
  templateUrl: "./admin-actions.component.html",
  styleUrls: ["./admin-actions.component.css"],
})
export class AdminActionsComponent implements OnInit {
  public product: ProductModel;
  public isAdminAction = true;
  public clickEditProduct = false;

  @Input("productToBeEdited") set productToBeEdited(product: ProductModel) {
    if (product) {
      this.product = product;
      this.isAdminAction = false;
      this.clickEditProduct = true;
    }
  }

  //it's order to edit button can be clicked more than once - (see productsService file line 22 for reference)
  @Input("isAdminActionInput") set isAdminActionInput(isAdd: boolean) {}

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.isAdminAction.subscribe((isOpen) => {
      this.isAdminAction = isOpen;
    });
  }

  addNewProduct() {
    this.isAdminAction = true;
    this.product = null;
    this.productsService.isAdminAction.emit(true);
  }
}
