import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { CredentialsModel } from "../models/credentials-model.model";
import { CustomerModel } from "../models/customer-model.model";
import jwtDecode from "jwt-decode";
import { AuthAction, AuthActionType, authStore } from "../redux/auth.state";
import { HttpClient } from "@angular/common/http";
import RoleEnum from "../models/role-enum";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // Register:
  public async register(customer: CustomerModel): Promise<void> {
    customer.firstName =
      customer.firstName.charAt(0).toUpperCase() + customer.firstName.slice(1);
    customer.lastName =
      customer.lastName.charAt(0).toUpperCase() + customer.lastName.slice(1);

    // Send user object to backend, get back token:
    const observable = this.http.post<string>(
      `${environment.authUrl}register`,
      customer
    );

    // Extract token:
    const token = await firstValueFrom(observable);

    // Save token in redux global state:
    const action: AuthAction = {
      type: AuthActionType.Register,
      payload: token,
    };
    authStore.dispatch(action);
  }

  // Login:
  public async login(credentials: CredentialsModel): Promise<void> {
    // Send credentials to backend:
    const observable = this.http.post<string>(
      `${environment.authUrl}login`,
      credentials
    );

    // Extract token:
    const token = await firstValueFrom(observable);

    // Save token in redux global state:
    const action: AuthAction = {
      type: AuthActionType.Login,
      payload: token,
    };
    authStore.dispatch(action);
  }

  // Logout:
  public logout(): void {
    // Logout in redux global state:
    const action: AuthAction = { type: AuthActionType.Logout };
    authStore.dispatch(action);
  }

  async areEmailOrIDCustomerExist(customer: CustomerModel): Promise<boolean> {
    const observable = this.http.post<boolean>(
      `${environment.authUrl}check-unique`,
      customer
    );
    return await firstValueFrom(observable);
  }

  // Check if customer has admin privileges
  public isAdmin(customer: CustomerModel = null): boolean {
    if (!customer) {
      customer = authStore.getState().customer;
      if (!customer) return false;
    }
    return customer.role === RoleEnum.Admin;
  }
}
