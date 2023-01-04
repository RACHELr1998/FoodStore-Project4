import CityEnum from "./city-enum";
import RoleEnum from "./role-enum.model";

export class CustomerModel {
  public _id: string;
  public firstName: string;
  public lastName: string;
  public IDCustomer: string;
  public username: string;
  public password: string;
  public city: CityEnum;
  public street: string;
  public roleId: string;
  public role: RoleEnum;
}
