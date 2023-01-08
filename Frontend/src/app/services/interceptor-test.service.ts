import { Injectable } from "@angular/core";
import axios from "axios";
import { authStore } from "../redux/AuthState";

@Injectable({
  providedIn: "root",
})
export class InterceptorService {
  constructor() {}

  public createInterceptor() {
    // On each request:
    axios.interceptors.request.use((request) => {
      // If we have token:
      if (authStore.getState().token) {
        // Attach it to the headers:
        request.headers = {
          authorization: "Bearer " + authStore.getState().token, // Must be that format
        };
      }

      // Return the new request:
      return request;
    });
  }
}
