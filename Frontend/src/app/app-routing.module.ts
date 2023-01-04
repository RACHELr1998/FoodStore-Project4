import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LogoutComponent } from "./components/auth-area/logout/logout.component";
import { RegisterBothStepsComponent } from "./components/auth-area/register/register-both-steps/register-both-steps.component";
import { CartComponent } from "./components/shop-area/cart-area/cart/cart.component";
import { HomeComponent } from "./components/home-area/home/home.component";
import { AddProductComponent } from "./components/admin-area/add-product/add-product.component";
import { EditProductComponent } from "./components/admin-area/edit-product/edit-product.component";
import { ProductsListComponent } from "./components/shop-area/products-area/products-list/products-list.component";
import { PageNotFoundComponent } from "./components/layout-area/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "register", component: RegisterBothStepsComponent },
  { path: "logout", component: LogoutComponent },
  { path: "home", component: HomeComponent },
  { path: "shop", component: ProductsListComponent },
  { path: "new", component: AddProductComponent },
  { path: "edit/:_id", component: EditProductComponent },
  { path: "cart", component: CartComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
