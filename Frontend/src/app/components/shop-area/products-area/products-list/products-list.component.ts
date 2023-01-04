import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Unsubscribe } from "redux";
import { ProductModel } from "src/app/models/product-model.model";
import { categoriesStore } from "src/app/redux/categories.state";
import { productsStore } from "src/app/redux/productsState";
import { NotifyService } from "src/app/services/notify.service";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "app-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.css"],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  public products: ProductModel[];
  //   public role: RoleEnum;
  private productsUnsubscribe: Unsubscribe;
  private categoriesUnsubscribe: Unsubscribe;

  constructor(
    private productsService: ProductsService,
    private notify: NotifyService
  ) {}

  async ngOnInit() {
    try {
      //   this.role = authStore.getState().customer.role;

      this.products = await this.productsService.getAllProducts();

      this.categoriesUnsubscribe = categoriesStore.subscribe(() => {
        this.filterProductsByCategoryId();
      });

      this.productsUnsubscribe = productsStore.subscribe(() => {
        this.filterProductsByCategoryId();
      });
    } catch (err: any) {
      this.notify.error(err);
    }
  }

  //Filter products by selected categoryId:
  filterProductsByCategoryId(): void {
    const selectedCategoryId = categoriesStore.getState().selectedCategory;

    if (selectedCategoryId != "all") {
      this.products = productsStore
        .getState()
        .products.filter((p) => p.categoryId === selectedCategoryId);
    } else {
      this.products = productsStore
        .getState()
        .products.filter((p) =>
          p.productName
            .toLowerCase()
            .startsWith(productsStore.getState().searchText.toLowerCase())
        );
    }
  }

  ngOnDestroy(): void {
    if (this.categoriesUnsubscribe) {
      this.categoriesUnsubscribe();
    }

    if (this.productsUnsubscribe) {
      this.productsUnsubscribe();
    }
  }

  // Edit product by admin only:
  @Output()
  public editProductEmit = new EventEmitter<ProductModel>();

  public editProductByAdmin(product: ProductModel) {
    this.editProductEmit.emit(product);
  }

  //--------------------------------------------------------

  // Add product to cart by customer only:
  @Output()
  public addProductEmit = new EventEmitter<ProductModel>();

  public addProductToCart(product: ProductModel) {
    this.addProductEmit.emit(product);
  }
}
