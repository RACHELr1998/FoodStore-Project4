import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Unsubscribe } from "redux";
import { CartItemModel } from "src/app/models/cartItem-model.model";
import { CustomerModel } from "src/app/models/customer-model.model";
import { cartsStore } from "src/app/redux/carts.state";
import { AuthService } from "src/app/services/auth.service";
import { CartService } from "src/app/services/cart.service";
import { NotifyService } from "src/app/services/notify.service";

@Component({
  selector: "app-main-shopping-page",
  templateUrl: "./main-shopping-page.component.html",
  styleUrls: ["./main-shopping-page.component.css"],
})
export class MainShoppingPageComponent implements OnInit {
  public customer: CustomerModel;
  public opened: boolean = true;
  public allCartItemsOfCart: CartItemModel[] = [];
  public totalPrice: number;
  private unsubscribe: Unsubscribe;

  constructor(
    public cartService: CartService,
    public authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    public notify: NotifyService
  ) {}

  async ngOnInit() {
    //Check if admin -> navigate to admin-area:
    if (this.authService.isAdmin()) {
      this.router.navigateByUrl("/admin-home");
    }

    const cart = await this.cartService.getCart();
    this.allCartItemsOfCart = await this.cartService.getAllItemsByCart(
      cart?._id
    );
    this.totalPrice = this.cartService.getTotalPriceCart();

    this.unsubscribe = cartsStore.subscribe(() => {
      this.allCartItemsOfCart = cartsStore.getState().cartItems;
      this.totalPrice = this.cartService.getTotalPriceCart();
    });
  }
}
