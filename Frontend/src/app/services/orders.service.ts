import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { OrderModel } from "../models/order-model.model";
import { authStore } from "../redux/auth.state";

import {
  OrdersAction,
  OrdersActionType,
  ordersStore,
} from "../redux/orders.state";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  //For login page to display number of orders:
  async getAllOrders(): Promise<OrderModel[]> {
    // Take corders resides in redux global state:
    let orders = ordersStore.getState().orders;

    // If we have no categories in global state - fetch them from server:
    if (orders.length === 0) {
      const observable = this.http.get<OrderModel[]>(environment.orderUrl);
      // Extract orders from axios response:
      orders = await firstValueFrom(observable);
      // Save fetched orders in global state:
      const action: OrdersAction = {
        type: OrdersActionType.FetchOrders,
        payload: orders,
      };
      ordersStore.dispatch(action);
    }
    //Return orders:
    return orders;
  }

  //Adding new order:
  async addOrder(order: OrderModel): Promise<OrderModel> {
    const observable = this.http.post<OrderModel>(environment.orderUrl, order);
    const addedOrder = await firstValueFrom(observable);

    const action: OrdersAction = {
      type: OrdersActionType.AddOrder,
      payload: addedOrder,
    };
    ordersStore.dispatch(action);

    return addedOrder;
  }

  //Count orders:
  async countOrders(): Promise<number> {
    const observable = this.http.get<number>(environment.orderUrl + "count");
    return await firstValueFrom(observable);
  }

  //Get the latest order by customer:
  getLatestOrder(): OrderModel {
    let lastOrder: OrderModel;

    const customer = authStore.getState().customer;

    if (customer !== null) {
      ordersStore.getState().orders.forEach((o) => {
        //if the order is not of the current user:
        if (o.customer && o.customer._id !== customer._id) {
          return;
        }

        //if the order is not of the current user:
        if (o.customerId && o.customerId !== customer._id) {
          return;
        }

        if (!lastOrder) {
          lastOrder = o;
          return;
        }

        if (o.orderDate > lastOrder.orderDate) {
          lastOrder = o;
        }
      });
    }

    return lastOrder;
  }
}
