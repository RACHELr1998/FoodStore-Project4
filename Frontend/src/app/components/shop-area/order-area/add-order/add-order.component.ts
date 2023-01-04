import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Unsubscribe } from "redux";
import CityEnum from "src/app/models/city-enum";
import { CustomerModel } from "src/app/models/customer-model.model";
import { OrderModel } from "src/app/models/order-model.model";
import { authStore } from "src/app/redux/AuthState";
import { cartsStore } from "src/app/redux/carts.state";
import { ordersStore } from "src/app/redux/orders.state";
import { NotifyService } from "src/app/services/notify.service";
import { OrdersService } from "src/app/services/orders.service";

@Component({
  selector: "app-add-order",
  templateUrl: "./add-order.component.html",
  styleUrls: ["./add-order.component.css"],
})
export class AddOrderComponent implements OnInit {
  public order = new OrderModel();
  public orders: OrderModel[];
  public customer: CustomerModel;
  public CityEnum = CityEnum;
  public cartId: string;
  private unsubscribe: Unsubscribe;

  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  public minDate: Date = new Date(
    this.currentYear,
    this.currentMonth,
    this.currentDay
  );
  public maxDate: Date = new Date(
    this.currentYear,
    this.currentMonth + 1,
    this.currentDay
  );

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private notify: NotifyService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.customer = authStore.getState().customer;

    this.orders = await this.ordersService.getAllOrders();

    this.unsubscribe = ordersStore.subscribe(() => {
      this.orders = ordersStore.getState().orders;
    });
  }

  filterDate(date: any) {}

  async addNewOrder() {
    try {
      this.cartId = cartsStore.getState().currentCart._id;
      this.order.cartId = this.cartId;
      this.order.customerId = this.customer._id;

      await this.ordersService.addOrder(this.order);
      this.notify.success("Order has been added");

      //   let dialogRef = this.dialog.open(OrderDialogComponent);

      //   dialogRef.afterClosed().subscribe((result) => {
      //     if (result === undefined) {
      //       this.router.navigateByUrl("/shopping");
      //     }
      //   });
    } catch (err: any) {
      this.notify.error(err);
    }
  }

  doubleClickInfoShipping() {
    this.order.deliveryCity = this.customer.city;
    this.order.deliveryStreet = this.customer.street;
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
