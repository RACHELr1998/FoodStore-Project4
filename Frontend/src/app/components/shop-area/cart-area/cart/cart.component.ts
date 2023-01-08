import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Unsubscribe } from "redux";
import { MatDialog } from "@angular/material/dialog";
import { CartItemModel } from "src/app/models/cartItem-model.model";
import { cartsStore } from "src/app/redux/carts.state";
import { CartService } from "src/app/services/cart.service";
import { NotifyService } from "src/app/services/notify.service";
import { CartItemDeleteComponent } from "../cart-item-delete/cart-item-delete.component";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit, OnDestroy {
  public isThisCart = true;
  public allCartItemsOfCart: CartItemModel[];
  public totalPrice: number;
  private unsubscribe: Unsubscribe;

  constructor(
    private cartService: CartService,
    private notify: NotifyService,
    public dialog: MatDialog
  ) {}

  @Input() openedTrigger!: boolean | string;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() allCartItemsOfCartEvent = new EventEmitter<CartItemModel[]>();

  async ngOnInit(): Promise<void> {
    try {
      const cart = await this.cartService.getCart();
      this.allCartItemsOfCart = await this.cartService.getAllItemsByCart(
        cart?._id
      );
      this.totalPrice = this.cartService.getTotalPriceCart();

      this.allCartItemsOfCartEvent.emit(this.allCartItemsOfCart);

      if (cartsStore.getState().cartItems.length > 0) {
        this.openedTrigger = true;
        this.openedChange.emit(this.openedTrigger);
      }

      if (cart?.isClosed) {
        this.totalPrice = this.cartService.getTotalPriceCart();
      }

      this.unsubscribe = cartsStore.subscribe(() => {
        this.allCartItemsOfCart = cartsStore.getState().cartItems;
        this.totalPrice = this.cartService.getTotalPriceCart();
      });
    } catch (err: any) {
      this.notify.error(err.message);
    }
  }

  async deleteCurrentCartItem(arrId: string[]) {
    try {
      let dialogRef = this.dialog.open(CartItemDeleteComponent, {
        data: { action: "delete" },
      });

      dialogRef.afterClosed().subscribe(async (result) => {
        if (result === false || result === undefined) return;

        await this.cartService.deleteCartItemFromCart(arrId[0], arrId[1]);

        this.notify.success("Item has been deleted");
      });
    } catch (err: any) {
      this.notify.error(err);
    }
  }

  async deleteAllCartItems() {
    try {
      if (this.allCartItemsOfCart.length === 0) return;

      let dialogRef = this.dialog.open(CartItemDeleteComponent, {
        data: { action: "deleteAll" },
      });

      dialogRef.afterClosed().subscribe(async (result) => {
        if (result === false || result === undefined) return;

        await this.cartService.deleteAllCartItemsFromCart(
          this.allCartItemsOfCart[0].cartId
        );
        this.notify.success("All items in your cart have been deleted!");
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
