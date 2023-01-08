import { Component, OnDestroy, OnInit } from "@angular/core";
import { Unsubscribe } from "redux";
import { CustomerModel } from "src/app/models/customer-model.model";
import { authStore } from "src/app/redux/AuthState";
import { CartService } from "src/app/services/cart.service";
import { NotifyService } from "src/app/services/notify.service";
import { OrdersService } from "src/app/services/orders.service";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  public customer: CustomerModel;
  private unsubscribe: Unsubscribe;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private ordersService: OrdersService,
    private notify: NotifyService
  ) {}

  ngOnInit(): void {
    try {
      this.unsubscribe = authStore.subscribe(async () => {
        if (authStore.getState().customer !== this.customer) {
          this.customer = authStore.getState().customer;

          if (this.customer) {
            await this.productsService.getAllProducts();
            await this.ordersService.getAllOrders();
            await this.productsService.getAllCategories();

            const cart = await this.cartService.getCart();
            await this.cartService.getAllItemsByCart(cart?._id);
          }
        }
      });
    } catch (err: any) {
      this.notify.error(err);
    }
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
