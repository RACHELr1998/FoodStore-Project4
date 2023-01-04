import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { LayoutComponent } from "./components/layout-area/layout/layout.component";
import { HeaderComponent } from "./components/layout-area/header/header.component";
import { MenuComponent } from "./components/layout-area/menu/menu.component";
import { HomeComponent } from "./components/home-area/home/home.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ProductCardComponent } from "./components/shop-area/products-area/product-card/product-card.component";
import { AddProductComponent } from "./components/admin-area/add-product/add-product.component";
import { EditProductComponent } from "./components/admin-area/edit-product/edit-product.component";
import { CartComponent } from "./components/shop-area/cart-area/cart/cart.component";
import { NgbDatepickerModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProductModalComponent } from "./components/shop-area/products-area/product-modal/product-modal.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProductsListComponent } from "./components/shop-area/products-area/products-list/products-list.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatCardModule } from "@angular/material/card";
import { LoginComponent } from "./components/auth-area/login/login.component";
import { AuthMenuComponent } from "./components/auth-area/auth-menu/auth-menu.component";
import { FooterComponent } from "./components/layout-area/footer/footer.component";
import { JwtModule } from "@auth0/angular-jwt";
import { LogoutComponent } from "./components/auth-area/logout/logout.component";
import { Interceptor } from "./services/interceptor";
import { RegisterStepOneComponent } from "./components/auth-area/register/register-step-one/register-step-one.component";
import { RegisterStepTwoComponent } from "./components/auth-area/register/register-step-two/register-step-two.component";
import { RegisterBothStepsComponent } from "./components/auth-area/register/register-both-steps/register-both-steps.component";
import { MatStepperModule } from "@angular/material/stepper";
import { CategoriesListComponent } from "./components/shop-area/products-area/categories-list/categories-list.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { SearchProductsComponent } from "./components/shop-area/products-area/search-products/search-products.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { PageNotFoundComponent } from "./components/layout-area/page-not-found/page-not-found.component";
import { CartItemComponent } from "./components/shop-area/cart-area/cart-item/cart-item.component";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { CartItemDeleteComponent } from "./components/shop-area/cart-area/cart-item-delete/cart-item-delete.component";
import { MatDialogModule } from "@angular/material/dialog";
import { OrderComponent } from "./components/shop-area/order-area/order/order.component";
import { AddOrderComponent } from "./components/shop-area/order-area/add-order/add-order.component";
import { EndOrderMessageComponent } from "./components/shop-area/order-area/end-order-message/end-order-message.component";
import { InvoicePDFComponent } from "./components/shop-area/order-area/invoice-pdf/invoice-pdf.component";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    MenuComponent,
    HomeComponent,
    ProductCardComponent,
    // AddProductComponent,
    // EditProductComponent,
    CartComponent,
    ProductModalComponent,
    ProductsListComponent,
    LoginComponent,
    AuthMenuComponent,
    FooterComponent,
    LogoutComponent,
    RegisterStepOneComponent,
    RegisterStepTwoComponent,
    RegisterBothStepsComponent,
    CategoriesListComponent,
    SearchProductsComponent,
    PageNotFoundComponent,
    CartItemComponent,
    CartItemDeleteComponent,
    OrderComponent,
    AddOrderComponent,
    EndOrderMessageComponent,
    InvoicePDFComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbDatepickerModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatCardModule,
    JwtModule,
    MatStepperModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ],
  bootstrap: [LayoutComponent],
})
export class AppModule {}
