import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LogoutComponent } from "./components/auth-area/logout/logout.component";
import { RegisterBothStepsComponent } from "./components/auth-area/register/register-both-steps/register-both-steps.component";
import { HomeComponent } from "./components/home-area/home/home.component";
import { AddProductComponent } from "./components/admin-area/add-product/add-product.component";
import { EditProductComponent } from "./components/admin-area/edit-product/edit-product.component";
import { PageNotFoundComponent } from "./components/layout-area/page-not-found/page-not-found.component";
import { MainShoppingPageComponent } from "./components/shop-area/main-shopping-page/main-shopping-page.component";
import { OrderComponent } from "./components/shop-area/order-area/order/order.component";

const routes: Routes = [
  { path: "register", component: RegisterBothStepsComponent },
  { path: "logout", component: LogoutComponent },
  { path: "home", component: HomeComponent },
  { path: "shop", component: MainShoppingPageComponent },
  { path: "order", component: OrderComponent },
  { path: "new", component: AddProductComponent },
  { path: "edit/:_id", component: EditProductComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
