import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import CityEnum from "src/app/models/city-enum";
import { CustomerModel } from "src/app/models/customer-model.model";
import { NotifyService } from "src/app/services/notify.service";

@Component({
  selector: "app-register-step-two",
  templateUrl: "./register-step-two.component.html",
  styleUrls: ["./register-step-two.component.css"],
})
export class RegisterStepTwoComponent {
  public customer = new CustomerModel();
  public CityEnum = CityEnum;

  @Output()
  public registerStepTwo = new EventEmitter<CustomerModel>();

  constructor(private notify: NotifyService) {}

  async sendLastStep() {
    try {
      this.registerStepTwo.emit(this.customer);
    } catch (err: any) {
      this.notify.error(err);
    }
  }
}
