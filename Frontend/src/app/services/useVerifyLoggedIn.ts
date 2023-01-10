import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { authStore } from "../redux/auth.state";
import { NotifyService } from "./notify.service";

@Injectable({
  providedIn: "root",
})
export class UseVerifyLoggedIn implements CanActivate {
  public constructor(private notify: NotifyService, private router: Router) {}

  canActivate(): boolean {
    if (authStore.getState().token) {
      return true;
    }
    this.router.navigateByUrl("/home");
    this.notify.error("You are not logged in!");
    return false;
  }
}
