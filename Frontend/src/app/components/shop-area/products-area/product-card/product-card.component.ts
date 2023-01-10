import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ProductModel } from "src/app/models/product-model.model";
import RoleEnum from "src/app/models/role-enum";
import { AuthService } from "src/app/services/auth.service";
import { ProductsService } from "src/app/services/products.service";
import { environment } from "src/environments/environment";
import { authStore } from "../../../../redux/auth.state";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent {
  @Input() public product: ProductModel;

  public customer = authStore.getState().customer?.role === RoleEnum.Customer;
  public admin = this.authService.isAdmin();

  public imagesUrl = environment.imagesUrl;

  constructor(
    private productsService: ProductsService,
    private authService: AuthService
  ) {}

  //Edit product by admin only:
  @Output()
  public editProduct = new EventEmitter<ProductModel>();

  public editProductByAdmin(product: ProductModel) {
    this.productsService.isAdminAction.emit(false);
    this.editProduct.emit(product);
  }

  //---------------------------------------------------

  //Add product to cart by customer only:
  @Output()
  public addProduct = new EventEmitter<ProductModel>();

  public addProductToCart(product: ProductModel) {
    this.addProduct.emit(product);
  }
}
