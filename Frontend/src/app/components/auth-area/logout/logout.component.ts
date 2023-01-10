import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { NotifyService } from "src/app/services/notify.service";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "app-logout",
  template: "",
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private productsService: ProductsService,
    private notify: NotifyService,
    private route: Router
  ) {}

  ngOnInit(): void {
    try {
      this.authService.logout();
      this.productsService.resetProducts();
      this.notify.success("Bye bye");
      this.route.navigateByUrl("/home");
    } catch (err: any) {
      this.notify.error(err);
    }
  }
}
