import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import RoleEnum from "../models/role-enum";
import { authStore } from "../redux/auth.state";
import { NotifyService } from "./notify.service";

@Injectable({
  providedIn: "root",
})
export class UseVerifyAdmin implements CanActivate {
  public constructor(private notify: NotifyService, private router: Router) {}

  canActivate(): boolean {
    if (!authStore.getState().token) {
      this.router.navigateByUrl("/home");
      this.notify.error("You are not logged in!");
      return false;
    }

    if (authStore.getState().customer?.role === RoleEnum.Customer) {
      this.router.navigateByUrl("/home");
      this.notify.error("Access denied");
      return false;
    }

    return true;
  }
}
