import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn,
} from "@angular/forms";
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

  @Output()
  public registerStepOne = new EventEmitter<CustomerModel>();

  public registerForm: FormGroup;
  public IDCustomer: FormControl;
  public username: FormControl;
  public password: FormControl;
  public confirmPassword: FormControl;

  constructor(
    private authService: AuthService,
    private notify: NotifyService
  ) {}

  ngOnInit(): void {
    (this.IDCustomer = new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(128),
    ])),
      (this.username = new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        this.regexValidator("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
      ])),
      (this.password = new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(128),
      ])),
      (this.confirmPassword = new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(128),
        this.ConfirmPassword(),
      ])),
      (this.registerForm = new FormGroup({
        idCustomerBox: this.IDCustomer,
        usernameBox: this.username,
        passwordBox: this.password,
        passwordConfirmBox: this.confirmPassword,
      }));
  }

  regexValidator(regexEmail: string): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null;
      }

      const regex = new RegExp(regexEmail);
      const valid = regex.test(control.value);
      this.errorMessage = "";
      return valid ? null : { invalidRegex: true };
    };
  }

  ConfirmPassword(): ValidatorFn {
    return () => {
      const passwordControl = this.password;
      const confirmPasswordControl = this.confirmPassword;

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        return { matchPassword: true };
      } else {
        return null;
      }
    };
  }

  async sendNextStep() {
    try {
      this.customer.IDCustomer = this.IDCustomer.value;
      this.customer.username = this.username.value;
      this.customer.password = this.password.value;

      const isUnique = await this.authService.areEmailOrIDCustomerExist(
        this.customer
      );

      if (isUnique) {
        this.registerStepOne.emit(this.customer);
        this.errorMessage = "";
      } else {
        this.errorMessage =
          "The ID or email has already been taken by another customer";
      }
    } catch (err: any) {
      this.notify.error(err);
    }
  }
}
