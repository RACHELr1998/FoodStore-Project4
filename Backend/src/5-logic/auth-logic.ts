import auth from "../2-utils/auth";
import hash from "../2-utils/cyber";
import { UnauthorizeError, ValidationError } from "../4-models/client-errors";
import {
  CredentialsModel,
  ICredentialsModel,
} from "../4-models/credentials-model";
import { CustomerModel, ICustomerModel } from "../4-models/customer-model";

async function register(customer: ICustomerModel): Promise<string> {
  // Returning a new token
  // Validate:
  const error = customer.validateSync();
  if (error) throw new ValidationError(error.message);

  // hash password
  customer.password = hash(customer.password);

  //assign roleId of customer
  customer.roleId = Object("63823dbeeffd176c197cb9cc");

  // insert the new customer to the DB
  await customer.save();

  // Delete customer password before return:
  delete customer.password;

  // Generate new token:
  const token = auth.generateNewToken(customer);

  return token;
}

async function login(credentials: ICredentialsModel): Promise<string> {
  // Validate:
  const error = credentials.validateSync();
  if (error) throw new ValidationError(error.message);

  // hash password
  credentials.password = hash(credentials.password);

  // Get the customer by his credentials
  const customer = await CustomerModel.findOne({
    username: `${credentials.username}`,
    password: `${credentials.password}`,
  }).exec();

  // If no such customer exists:
  if (!customer) throw new UnauthorizeError("Incorrect username or password!");

  // Delete customer password before return:
  delete customer.password;

  // Generate new token:
  const token = auth.generateNewTokenForCredentials(customer);

  return token;
}

async function usernameExists(username: string): Promise<boolean> {
  // Get amount of customers with 'username'
  const usernameExists = await CustomerModel.findOne(
    {
      username: username,
    },
    ["username"]
  ).exec();
  // if there are more than 0, the username exists.
  if (!usernameExists) {
    return true;
  } else {
    return false;
  }
}

export default {
  register,
  login,
  usernameExists,
};
