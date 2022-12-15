import { RoleModel } from "./role-model.model";

export class CustomerModel {
  public _id: string;
  public firstName: string;
  public lastName: string;
  public IDCustomer: number;
  public username: string;
  public password: string;
  public city: string;
  public street: string;
  public roleId: string;
  public role: RoleModel;
}
