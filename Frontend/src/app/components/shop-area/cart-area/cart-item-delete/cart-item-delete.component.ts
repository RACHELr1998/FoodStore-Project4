import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CartComponent } from "../cart/cart.component";

export interface DialogData {
  action: "deleteAll" | "delete";
}

@Component({
  selector: "app-cart-item-delete",
  templateUrl: "./cart-item-delete.component.html",
})
export class CartItemDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
