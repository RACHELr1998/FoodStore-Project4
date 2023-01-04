import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { CustomerModel } from "src/app/models/customer-model.model";
import { AuthService } from "src/app/services/auth.service";
import { NotifyService } from "src/app/services/notify.service";

@Component({
  selector: "app-register-step-one",
  templateUrl: "./register-step-one.component.html",
  styleUrls: ["./register-step-one.component.css"],
})
export class RegisterStepOneComponent implements OnInit {
  public customer = new CustomerModel();
  public errorMessage = "";
  public confirmPassword: string;

  @Output()
  public registerStepOne = new EventEmitter<CustomerModel>();

  constructor(
    private authService: AuthService,
    private notify: NotifyService
  ) {}

  ngOnInit(): void {}

  async sendNextStep() {
    try {
      const isUnique = await this.authService.checkValidEmailAndIdNumber(
        this.customer
      );

      if (isUnique) {
        if (this.customer.password !== this.confirmPassword) {
          this.errorMessage = "Password's don't match";
        } else {
          this.registerStepOne.emit(this.customer);
          this.errorMessage = "";
        }
      } else {
        this.errorMessage = "Either ID number or email is already taken";
      }
    } catch (err: any) {
      this.notify.error(err);
    }
  }
}
