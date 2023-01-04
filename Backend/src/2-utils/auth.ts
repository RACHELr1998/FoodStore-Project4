import { ICustomerModel } from "../4-models/customer-model";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

const secretKey = "myProducts";

function generateNewToken(customer: ICustomerModel): string {
  // Create object to insert inside the token:
  const container = { customer };
  // Generate new token:
  const token = jwt.sign(container, secretKey, { expiresIn: "2h" });

  return token;
}

// function generateNewTokenForCredentials(customer: ICredentialsModel): string {
//   // Create object to insert inside the token:
//   const container = { customer };
//   // Generate new token:
//   const token = jwt.sign(container, secretKey, { expiresIn: "2h" });

//   return token;
// }

function verifyToken(authHeader: string): Promise<Boolean> {
  return new Promise<boolean>((resolve, reject) => {
    try {
      // If there is no header:
      if (!authHeader) {
        resolve(false);
        return;
      }
      // Extract the token, format: "Bearer token"
      const token = authHeader.substring(7);

      // If there is no token:
      if (!token) {
        resolve(false);
        return;
      }

      // Verify the token:
      jwt.verify(token, secretKey, (err) => {
        // If token expired or illegal:
        if (err) {
          resolve(false);
          return;
        }
        // Here the token is valid:
        resolve(true);
        return;
      });
    } catch (err: any) {
      reject(err);
    }
  });
}

function getCustomerRoleFromToken(authHeader: string): number {
  // Extract the token, format: "Bearer token"
  const token = authHeader.substring(7);
  // Get container which contains the customer:
  const container = jwt.decode(token) as { customer: ICustomerModel };
  // Get the Customer:
  const customer = container.customer;
  // Get Customer role:
  const role = customer.role

  return role;
}

function getCustomerIdFromToken(authHeader: string): ObjectId {
  // Extract the token, format: "Bearer token"
  const token = authHeader.substring(7);
  // Get container which contains the Customer:
  const container = jwt.decode(token) as { customer: ICustomerModel };
  // Get the Customer:
  const customer = container.customer;
  // Get CustomerId:
  const _id = customer._id;

  return _id;
}

export default {
  generateNewToken,
  //   generateNewTokenForCredentials,
  verifyToken,
  getCustomerRoleFromToken,
  getCustomerIdFromToken,
};
