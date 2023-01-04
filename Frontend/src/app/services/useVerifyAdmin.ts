import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { NotifyService } from "./notify.service";

@Injectable({
  providedIn: "root",
})
export class UseVerifyAdmin {
  public constructor(
    private notify: NotifyService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    if (!this.authService.isLoggedIn) {
      this.router.navigateByUrl("/login");
    }

    if (!this.authService.isAdmin()) {
      this.router.navigateByUrl("/");
      this.notify.error("Access denied");
    }
  }
}
