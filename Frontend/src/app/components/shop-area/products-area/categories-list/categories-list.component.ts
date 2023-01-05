import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatTabGroup } from "@angular/material/tabs";
import { Unsubscribe } from "redux";
import { CategoryModel } from "src/app/models/category-model.model";
import { ProductModel } from "src/app/models/product-model.model";
import { productsStore } from "src/app/redux/productsState";
import { NotifyService } from "src/app/services/notify.service";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.component.html",
  styleUrls: ["./categories-list.component.css"],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  public categories: CategoryModel[];
  public products: ProductModel[];
  private unsubscribe: Unsubscribe;
  public searchText = "";

  constructor(
    private productsService: ProductsService,
    private notify: NotifyService
  ) {}

  @ViewChild(MatTabGroup) public tabGroup: MatTabGroup;

  async ngOnInit() {
    try {
      this.categories = await this.productsService.getAllCategories();

      this.unsubscribe = productsStore.subscribe(() => {
        this.searchText = productsStore.getState().searchText;

        if (this.searchText !== "") {
          //* select "All" products
          this.tabGroup.selectedIndex = 0;
        }
      });
    } catch (err: any) {
      this.notify.error(err);
    }
  }

  async selectCategoryByIndex(index: number) {
    try {
      if (index === 0) {
        this.productsService.setSelectedCategory("all");
      } else {
        //Displaying the products based on a categoryId saved to redux.
        this.productsService.setSelectedCategory(
          this.categories[index - 1]._id
        );
      }
    } catch (err: any) {
      this.notify.error(err);
    }
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}