import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import CityEnum from "src/app/models/city-enum";
import { CustomerModel } from "src/app/models/customer-model.model";
import { NotifyService } from "src/app/services/notify.service";

@Component({
  selector: "app-register-step-two",
  templateUrl: "./register-step-two.component.html",
  styleUrls: ["./register-step-two.component.css"],
})
export class RegisterStepTwoComponent implements OnInit {
  public customer = new CustomerModel();
  public CityEnum = CityEnum;

  @Output()
  public registerStepTwo = new EventEmitter<CustomerModel>();

  public registerStepTwoForm: FormGroup;
  public firstName: FormControl;
  public lastName: FormControl;
  public city: FormControl;
  public street: FormControl;

  constructor(private notify: NotifyService) {}

  ngOnInit() {
    this.registerStepTwoForm = new FormGroup({
      firstName: (this.firstName = new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ])),

      lastName: (this.lastName = new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ])),

      city: (this.city = new FormControl("", [Validators.required])),

      street: (this.street = new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ])),
    });
  }

  async sendLastStep() {
    try {
      this.customer.firstName = this.firstName.value;
      this.customer.lastName = this.lastName.value;
      this.customer.city = this.city.value;
      this.customer.street = this.street.value;

      this.registerStepTwo.emit(this.customer);
    } catch (err: any) {
      this.notify.error(err);
    }
  }
}
