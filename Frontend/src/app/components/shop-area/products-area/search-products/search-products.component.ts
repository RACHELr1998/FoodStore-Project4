import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductModel } from "src/app/models/product-model.model";
import { NotifyService } from "src/app/services/notify.service";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "app-search-products",
  templateUrl: "./search-products.component.html",
})
export class SearchProductsComponent implements OnInit {
  public search: string = "";
  public products: ProductModel[];

  constructor(
    private productsService: ProductsService,
    private notify: NotifyService,
    public router: Router
  ) {
    //If navigate to one page then empty the input:
    router.events.subscribe(() => (this.search = ""));
    router.events.subscribe(() => this.productsService.setSearchProducts(""));
  }

  async ngOnInit() {
    //get all the products in the state by the service
    try {
      this.products = await this.productsService.getAllProducts();
    } catch (err: any) {
      this.notify.error(err);
    }
  }

  public searchProducts(event: Event) {
    const inputText = (event.target as HTMLInputElement).value;

    if (inputText !== "") {
      //Clear the category and display all the products:
      this.productsService.setSelectedCategory("all");
    }
    this.productsService.setSearchProducts(inputText);
  }

  public clearSearch() {
    this.search = "";
    this.productsService.setSearchProducts("");
  }
}
