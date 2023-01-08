import { Component, OnDestroy, OnInit } from "@angular/core";
import { Unsubscribe } from "redux";
import { CartModel } from "src/app/models/cart-model.model";
import { CustomerModel } from "src/app/models/customer-model.model";
import { OrderModel } from "src/app/models/order-model.model";
import { authStore } from "src/app/redux/AuthState";
import { cartsStore } from "src/app/redux/carts.state";
import { CartService } from "src/app/services/cart.service";
import { NotifyService } from "src/app/services/notify.service";
import { OrdersService } from "src/app/services/orders.service";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "app-customer-message",
  templateUrl: "./customer-message.component.html",
  styleUrls: ["./customer-message.component.css"],
})
export class CustomerMessageComponent implements OnInit, OnDestroy {
  public productsNumber: number;
  public ordersNumber: number;
  public customer: CustomerModel;
  public authUnsubscribe: Unsubscribe;
  public cartUnsubscribe: Unsubscribe;
  public activeCart: CartModel;
  public totalPrice: number = 0;
  public lastOrder: OrderModel;

  constructor(
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private cartService: CartService,
    private notify: NotifyService
  ) {}

  async ngOnInit() {
    try {
      this.productsNumber = await this.productsService.countProducts();
      this.ordersNumber = await this.ordersService.countOrders();

      this.authUnsubscribe = authStore.subscribe(() => {
        this.customer = authStore.getState().customer;
        this.activeCart = cartsStore.getState().currentCart;
      });

      this.cartUnsubscribe = cartsStore.subscribe(() => {
        this.customer = authStore.getState().customer;
        this.activeCart = cartsStore.getState().currentCart;

        this.totalPrice = this.cartService.getTotalPriceCart();
        this.lastOrder = this.ordersService.getLatestOrder();
      });
    } catch (err: any) {
      this.notify.error(err);
    }
  }

  displayOrdersMessage() {
    if (this.ordersNumber > 1) {
      return `${this.ordersNumber} orders submitted in our store!`;
    }

    if (this.ordersNumber === 1) {
      return "One order currently submitted in our store.";
    }

    return "No orders have been submit in our store yet.";
  }

  ngOnDestroy(): void {
    if (this.authUnsubscribe) {
      this.authUnsubscribe();
    }

    if (this.cartUnsubscribe) {
      this.cartUnsubscribe();
    }
  }
}
