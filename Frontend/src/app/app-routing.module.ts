import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartComponent } from "./components/cart-area/cart/cart.component";
import { AddDataComponent } from "./components/data-area/add-data/add-data.component";
import { ListDataComponent } from "./components/data-area/list-data/list-data.component";
import { HomeComponent } from "./components/home-area/home/home.component";
import { EditProductComponent } from "./components/products-area/edit-product/edit-product.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "edit/:_id", component: EditProductComponent },
  { path: "add", component: AddDataComponent },
  { path: "cart", component: CartComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  // { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
