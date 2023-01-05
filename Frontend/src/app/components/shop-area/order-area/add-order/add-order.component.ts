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
import { CartService } from "src/app/services/cart.service";
import { NotifyService } from "src/app/services/notify.service";
import { OrdersService } from "src/app/services/orders.service";
import { EndOrderMessageComponent } from "../end-order-message/end-order-message.component";

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
    private cartService: CartService,
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

  filterDate(date: any) {
    //Prevents Fridays and Saturday:
    const day = date?.getDay();
    if (day === 5 || day === 6) {
      return false;
    }

    //Get all the orders:
    const orders: OrderModel[] = ordersStore.getState().orders;
    //Get array of delivery-dates only:
    const arrDates: any[] = orders.map((o) => o.deliveryDate);

    //Returns an object with dates-delivery of orders and number of times they were selected:
    const objDates = arrDates.reduce((obj, b) => {
      obj[b] = ++obj[b] || 1;
      return obj;
    }, {});

    let arrFullDateKey: any[] = [];
    //Check if dates-delivery are of the same value more than three times:
    Object.entries(objDates).forEach(([key, value]) => {
      if (value >= 3) {
        let dayKey = new Date(key).getDate();
        let monthKey = new Date(key).getMonth();
        let fullDateKey = { dayKey, monthKey };
        arrFullDateKey.push(fullDateKey);
      }
    });

    let daySelect = date?.getDate();
    let monthSelect = date?.getMonth();

    //Prevents dates-delivery being selected more than three times:
    if (arrFullDateKey) {
      return !arrFullDateKey.find((d) => {
        if (d.monthKey == monthSelect) {
          return d.dayKey == daySelect;
        }
        return !d.dayKey;
      });
    }

    return true;
  }

  async addNewOrder() {
    try {
      this.cartId = cartsStore.getState().currentCart._id;
      this.order.cartId = this.cartId;
      this.order.customerId = this.customer._id;
      const date = new Date();
      this.order.orderDate = date;
      this.order.finalPrice = this.cartService.getTotalPriceCart();

      await this.ordersService.addOrder(this.order);
      this.notify.success("Order has been added");

      let dialogRef = this.dialog.open(EndOrderMessageComponent);

      dialogRef.afterClosed().subscribe((result) => {
        if (result === undefined) {
          this.router.navigateByUrl("/shop");
        }
      });
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
