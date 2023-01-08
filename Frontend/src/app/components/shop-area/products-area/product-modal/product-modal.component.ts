import { Component, Input, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CartModel } from "src/app/models/cart-model.model";
import { CartItemModel } from "src/app/models/cartItem-model.model";
import { ProductModel } from "src/app/models/product-model.model";
import { cartsStore } from "src/app/redux/carts.state";
import { AuthService } from "src/app/services/auth.service";
import { CartService } from "src/app/services/cart.service";
import { NotifyService } from "src/app/services/notify.service";

@Component({
  selector: "app-product-modal",
  templateUrl: "./product-modal.component.html",
  styleUrls: ["./product-modal.component.css"],
})
export class ProductModalComponent implements OnInit {
  public closeResult = "";
  public quantityProd: number;
  public cartItem: CartItemModel;
  @Input() public product: ProductModel;
  public cart: CartModel;

  public admin = this.authService.isAdmin();

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private cartsService: CartService,
    private notify: NotifyService
  ) {}

  ngOnInit(): void {}

  public open(content: any, args: Event) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.addToCart(args);
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  public async addToCart(args: Event) {
    try {
      if (!this.quantityProd) return;

      // if (cartsStore.getState().cartItems.length === 0) {
      //     this.opened = true;
      // }

      //Create new Cart Item:
      const cartItemAddedToCart = new CartItemModel(
        this.quantityProd,
        this.product._id,
        cartsStore.getState().currentCart?._id,
        this.quantityProd * this.product.price
      );
      await this.cartsService.addCartItemToCart(cartItemAddedToCart);
      this.notify.success("The item has been added to the cart successfully !");

      //Update the cartsStore (through backend):
      const cart = await this.cartsService.getCart();
      await this.cartsService.getAllItemsByCart(cart?._id);
    } catch (err: any) {
      this.notify.error(err.message);
    }
  }
}

// import { Component, Inject } from "@angular/core";
// import {
//   MatDialog,
//   MAT_DIALOG_DATA,
//   MatDialogRef,
// } from "@angular/material/dialog";

// export interface DialogData {
//   animal: string;
//   name: string;
// }

// /**
//  * @title Dialog Overview
//  */
// @Component({
//   selector: "dialog-overview-example",
//   templateUrl: "dialog-overview-example.html",
// })
// export class DialogOverviewExample {
//   animal: string;
//   name: string;

//   constructor(public dialog: MatDialog) {}

//   openDialog(): void {
//     const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
//       data: { name: this.name, animal: this.animal },
//     });

//     dialogRef.afterClosed().subscribe((result) => {
//       console.log("The dialog was closed");
//       this.animal = result;
//     });
//   }
// }

// @Component({
//   selector: "dialog-overview-example-dialog",
//   templateUrl: "dialog-overview-example-dialog.html",
// })
// export class DialogOverviewExampleDialog {
//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData
//   ) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }
