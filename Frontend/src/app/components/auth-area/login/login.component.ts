import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Unsubscribe } from "redux";
import { CartModel } from "src/app/models/cart-model.model";
import { CredentialsModel } from "src/app/models/credentials-model.model";
import { CustomerModel } from "src/app/models/customer-model.model";
import { OrderModel } from "src/app/models/order-model.model";
import RoleEnum from "src/app/models/role-enum.model";
import { authStore } from "src/app/redux/AuthState";
import { cartsStore } from "src/app/redux/carts.state";
import { AuthService } from "src/app/services/auth.service";
import { NotifyService } from "src/app/services/notify.service";
import { OrdersService } from "src/app/services/orders.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  public credentials = new CredentialsModel();
  public customer: CustomerModel;
  public authUnsubscribe: Unsubscribe;
  public cartsUnsubscribe: Unsubscribe;
  public currentCart: CartModel;
  public lastOrder: OrderModel;

  constructor(
    private authService: AuthService,
    private ordersService: OrdersService,
    private notify: NotifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customer = authStore.getState().customer;

    this.cartsUnsubscribe = cartsStore.subscribe(() => {
      if (this.customer !== null) {
        this.currentCart = cartsStore.getState().currentCart;
        this.lastOrder = this.ordersService.getLatestOrder();
      }
    });

    this.authUnsubscribe = authStore.subscribe(() => {
      this.customer = authStore.getState().customer;

      if (this.customer !== null) {
        this.currentCart = cartsStore.getState().currentCart;
        this.lastOrder = this.ordersService.getLatestOrder();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authUnsubscribe) {
      this.authUnsubscribe();
    }

    if (this.cartsUnsubscribe) {
      this.cartsUnsubscribe();
    }
  }

  public async send() {
    try {
      await this.authService.login(this.credentials);
      this.notify.success(`Welcome back!`);

      if (this.customer.role === RoleEnum.Admin) {
        this.router.navigateByUrl("/admin-home");
      }
    } catch (err: any) {
      this.notify.error(err);
    }
  }

  showLoggedInState() {
    if (!this.currentCart && !this.lastOrder && this.customer) {
      return "Start Shopping";
    }
    return "Resume Shopping";
  }
}
