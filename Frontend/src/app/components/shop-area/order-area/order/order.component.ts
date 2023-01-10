import { Component, OnInit } from "@angular/core";
import { Unsubscribe } from "redux";
import { CartModel } from "src/app/models/cart-model.model";
import { CartItemModel } from "src/app/models/cartItem-model.model";
import { authStore } from "src/app/redux/auth.state";
import { cartsStore } from "src/app/redux/carts.state";
import { CartService } from "src/app/services/cart.service";
import { NotifyService } from "src/app/services/notify.service";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit {
  public allCartItemsOfCart: CartItemModel[];
  public cartByCustomer: CartModel;
  public totalPrice: number = 0;
  public unsubscribe: Unsubscribe;

  constructor(
    private cartService: CartService,
    private notify: NotifyService
  ) {}

  async ngOnInit() {
    try {
      const cart = await this.cartService.getCart();
      this.allCartItemsOfCart = await this.cartService.getAllItemsByCart(
        cart?._id
      );
      this.totalPrice = this.cartService.getTotalPriceCart();
    } catch (err: any) {
      this.notify.error(err);
    }
  }
}
