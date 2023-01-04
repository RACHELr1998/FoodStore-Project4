import { Injectable } from "@angular/core";
import { Notyf } from "notyf";

@Injectable({
  providedIn: "root",
})
export class NotifyService {
  // Private field for displaying cool messages (notifications)
  private notify = new Notyf({
    duration: 4000,
    position: { x: "right", y: "top" },
    ripple: true,
    dismissible: true,
  });

  // Display success message:
  public success(message: string): void {
    this.notify.success(message);
  }

  // Display error message:
  public error(err: any): void {
    const message = this.extractErrorMessage(err);
    this.notify.error(message);
  }

  private extractErrorMessage(err: any): string {
    // 1. If the err is the string message:
    if (typeof err === "string") return err;

    // 2. If server response with error message to axios:
    if (typeof err.error === "string") return err.error;

    // 3. If server response with array of error messages to axios:
    if (Array.isArray(err.error)) return err.error[0];

    // 4. If frontend throw new Error("something bad happened...")
    if (typeof err.message === "string") return err.message;

    // 5. On any other case:
    console.log(err); // Check and update this code...
    return "Some error occurred, please try again";
  }
}
