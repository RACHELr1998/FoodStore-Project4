import { Component, ViewChild } from "@angular/core";
import { MatStepper } from "@angular/material/stepper";
import { Router } from "@angular/router";
import { CustomerModel } from "src/app/models/customer-model.model";
import { AuthService } from "src/app/services/auth.service";
import { NotifyService } from "src/app/services/notify.service";

@Component({
  selector: "app-register-both-steps",
  templateUrl: "./register-both-steps.component.html",
  styleUrls: ["./register-both-steps.component.css"],
})
export class RegisterBothStepsComponent {
  public customer = new CustomerModel();
  constructor(
    private notify: NotifyService,
    private authService: AuthService,
    private router: Router
  ) {}

  @ViewChild("stepper") private stepper: MatStepper;

  registerDetailsStepOne(registerStepOne: CustomerModel) {
    this.customer.IDCustomer = registerStepOne.IDCustomer;
    this.customer.username = registerStepOne.username;
    this.customer.password = registerStepOne.password;
    this.stepper.next();
  }

  async registerDetailsStepTwo(registerStepTwo: CustomerModel) {
    this.customer.firstName = registerStepTwo.firstName;
    this.customer.lastName = registerStepTwo.lastName;
    this.customer.city = registerStepTwo.city;
    this.customer.street = registerStepTwo.street;

    try {
      await this.authService.register(this.customer);
      this.notify.success("You have been registered");
      this.router.navigateByUrl("/home");
    } catch (err: any) {
      this.notify.error(err);
    }
  }
}
