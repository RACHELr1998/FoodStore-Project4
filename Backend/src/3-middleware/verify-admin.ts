import { NextFunction, Request, Response } from "express";
import auth from "../2-utils/auth";
import { ForbiddenError, UnauthorizeError } from "../4-models/client-errors";

async function verifyAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  // Extract authorization header's value (suppose to be "Bearer token");
  const authHeader = request.header("authorization");

  // Verify token:
  const isValid = await auth.verifyToken(authHeader);

  // If token is not valid:
  if (!isValid) {
    next(new UnauthorizeError("You are not logged-in !")); // Catch all middleware.
    return;
  }

  // Get role from token:
  const role = auth.getCustomerRoleFromToken(authHeader);

  // If role is not admin:
  if (role != 2) {
    next(new ForbiddenError("You are not authorized!"));
    return;
  }

  // All ok:
  next(); // Continue to next middleware or to desired route.
}

export default verifyAdmin;
