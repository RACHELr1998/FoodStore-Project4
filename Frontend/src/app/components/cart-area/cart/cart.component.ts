import { Component, Input, OnInit } from "@angular/core";
import { CartModel } from "src/app/models/cart-model.model";
import { CartItemModel } from "src/app/models/cartItem-model.model";
import { ProductModel } from "src/app/models/product-model.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  @Input()
  public cart: CartModel;
  public items: CartItemModel[];
  public cartItem: CartItemModel;
  public product: ProductModel;

  constructor(private cartService: CartService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.cart = await this.cartService.getCart();
      this.cartItem.totalPrice = this.cartItem.quantity * this.product.price;
    } catch (err: any) {
      alert(err.message);
    }
  }
}
