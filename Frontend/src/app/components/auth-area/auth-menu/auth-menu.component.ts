import { Component, OnDestroy, OnInit } from "@angular/core";
import { Unsubscribe } from "redux";
import { CustomerModel } from "src/app/models/customer-model.model";
import { authStore } from "src/app/redux/auth.state";

@Component({
  selector: "app-auth-menu",
  templateUrl: "./auth-menu.component.html",
  styleUrls: ["./auth-menu.component.css"],
})
export class AuthMenuComponent implements OnInit, OnDestroy {
  public customer: CustomerModel;
  public unsubscribe: Unsubscribe;

  constructor() {}

  ngOnInit(): void {
    this.customer = authStore.getState().customer;
    this.unsubscribe = authStore.subscribe(() => {
      this.customer = authStore.getState().customer;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
