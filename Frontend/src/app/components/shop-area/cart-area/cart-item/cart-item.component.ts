import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Router } from "@angular/router";
import { Unsubscribe } from "redux";
import { CartItemModel } from "src/app/models/cartItem-model.model";
import { productsStore } from "src/app/redux/product.state";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-cart-item",
  templateUrl: "./cart-item.component.html",
  styleUrls: ["./cart-item.component.css"],
})
export class CartItemComponent implements OnInit, OnDestroy {
  private unsubscribe: Unsubscribe;
  public search: string;
  public imageSource: string;

  @Input() public onlyInTheCart: boolean;
  @Input() public cartItem: CartItemModel;
  @Output() public cartItemDelete = new EventEmitter<string[]>();

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.imageSource = environment.imagesUrl + this.cartItem.product.imageName;

    this.unsubscribe = productsStore.subscribe(() => {
      this.search = productsStore.getState().searchProducts;
    });
  }

  public deleteCurrentCartItem(cartId: string, _id: string): void {
    this.cartItemDelete.emit([cartId, _id]);
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
