import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ProductModel } from "src/app/models/product-model.model";
import RoleEnum from "src/app/models/role-enum.model";
import { AuthService } from "src/app/services/auth.service";
import { ProductsService } from "src/app/services/products.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent implements OnInit {
  @Input() public product: ProductModel;

  public customer = this.authService.isLoggedIn();
  public admin = this.authService.isAdmin();

  public imageSource: string;

  //   public imagesUrl = environment.imagesUrl;

  constructor(
    private productsService: ProductsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.imageSource = environment.imagesUrl + this.product.imageName;
  }

  //Edit product by admin only:
  @Output()
  public editProduct = new EventEmitter<ProductModel>();

  public editProductByAdmin(product: ProductModel) {
    this.productsService.isAction.emit(false);
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
