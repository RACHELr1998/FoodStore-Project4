import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { LayoutComponent } from "./components/layout-area/layout/layout.component";
import { HeaderComponent } from "./components/layout-area/header/header.component";
import { HomeComponent } from "./components/home-area/home/home.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ProductCardComponent } from "./components/shop-area/products-area/product-card/product-card.component";
import { AddProductComponent } from "./components/admin-area/add-product/add-product.component";
import { EditProductComponent } from "./components/admin-area/edit-product/edit-product.component";
import { CartComponent } from "./components/shop-area/cart-area/cart/cart.component";
import { NgbDatepickerModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProductModalComponent } from "./components/shop-area/products-area/product-modal/product-modal.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProductsListComponent } from "./components/shop-area/products-area/products-list/products-list.component";
import { LoginComponent } from "./components/auth-area/login/login.component";
import { AuthMenuComponent } from "./components/auth-area/auth-menu/auth-menu.component";
import { FooterComponent } from "./components/layout-area/footer/footer.component";
import { JwtModule } from "@auth0/angular-jwt";
import { LogoutComponent } from "./components/auth-area/logout/logout.component";
import { Interceptor } from "./services/interceptor";
import { RegisterStepOneComponent } from "./components/auth-area/register/register-step-one/register-step-one.component";
import { RegisterStepTwoComponent } from "./components/auth-area/register/register-step-two/register-step-two.component";
import { RegisterBothStepsComponent } from "./components/auth-area/register/register-both-steps/register-both-steps.component";
import { CategoriesListComponent } from "./components/shop-area/products-area/categories-list/categories-list.component";
import { SearchProductsComponent } from "./components/shop-area/products-area/search-products/search-products.component";
import { PageNotFoundComponent } from "./components/layout-area/page-not-found/page-not-found.component";
import { CartItemComponent } from "./components/shop-area/cart-area/cart-item/cart-item.component";
import { CartItemDeleteComponent } from "./components/shop-area/cart-area/cart-item-delete/cart-item-delete.component";
import { OrderComponent } from "./components/shop-area/order-area/order/order.component";
import { AddOrderComponent } from "./components/shop-area/order-area/add-order/add-order.component";
import { EndOrderMessageComponent } from "./components/shop-area/order-area/end-order-message/end-order-message.component";
import { InvoicePDFComponent } from "./components/shop-area/order-area/invoice-pdf/invoice-pdf.component";
import { MainShoppingPageComponent } from "./components/shop-area/main-shopping-page/main-shopping-page.component";
import { HighlighterPipe } from "./highlighter.pipe";
import { AdminHomeComponent } from "./components/admin-area/admin-home/admin-home.component";
import { AdminActionsComponent } from "./components/admin-area/admin-actions/admin-actions.component";
import { AboutComponent } from "./components/home-area/about/about.component";
import { CustomerMessageComponent } from "./components/home-area/customer-message/customer-message.component";
import { MaterialModule } from "./material.module";

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    HomeComponent,
    ProductCardComponent,
    AddProductComponent,
    EditProductComponent,
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
    MainShoppingPageComponent,
    HighlighterPipe,
    AdminHomeComponent,
    AdminActionsComponent,
    AboutComponent,
    CustomerMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbDatepickerModule,
    BrowserAnimationsModule,
    JwtModule,
    ReactiveFormsModule,
    MaterialModule,
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
