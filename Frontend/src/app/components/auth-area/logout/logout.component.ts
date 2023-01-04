import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { NotifyService } from "src/app/services/notify.service";

@Component({
  selector: "app-logout",
  template: "",
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private notify: NotifyService,
    private route: Router
  ) {}

  ngOnInit(): void {
    try {
      this.authService.logout();
      //   vacationService.resetVacations();
      this.notify.success("Bye bye");
      this.route.navigateByUrl("/home");
    } catch (err: any) {
      this.notify.error(err);
    }
  }
}
