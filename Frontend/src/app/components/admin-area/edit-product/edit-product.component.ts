import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { CategoryModel } from "src/app/models/category-model.model";
import { ProductModel } from "src/app/models/product-model.model";
import { NotifyService } from "src/app/services/notify.service";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.css"],
})
export class EditProductComponent implements OnInit {
  public categories: CategoryModel[];
  public products: ProductModel[];
  public productToEdit: ProductModel;

  public selectedImageFile: any = null;
  public selectedImageName: string;

  public dynamicClass: string = "";

  public displayError = false;

  public editForm: FormGroup;
  public nameInput: FormControl;
  public priceInput: FormControl;
  public categoryIdInput: FormControl;
  public imageInput: FormControl;

  @ViewChild("imageBox")
  public imageProductRef: ElementRef<HTMLInputElement>;

  @Input("editProduct") set editProduct(product: ProductModel) {
    if (product) {
      this.productToEdit = product;
      this.getProductDetails();
    }
  }

  constructor(
    private productsService: ProductsService,
    private notify: NotifyService
  ) {}

  async ngOnInit() {
    try {
      this.nameInput = new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        this.isUnique(),
      ]);
      this.priceInput = new FormControl("", [
        Validators.required,
        Validators.min(0),
        Validators.max(10000),
      ]);
      this.categoryIdInput = new FormControl("", [Validators.required]);
      this.imageInput = new FormControl("", []);

      this.editForm = new FormGroup({
        nameBox: this.nameInput,
        priceBox: this.priceInput,
        categoryIdBox: this.categoryIdInput,
        imageBox: this.imageInput,
      });

      this.categories = await this.productsService.getAllCategories();
      this.products = await this.productsService.getAllProducts();
    } catch (err: any) {
      this.notify.error(err);
    }
  }

  fileImageSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedImageFile = inputElement.files[0] ?? null;
  }

  public async sendEditProduct() {
    try {
      this.productToEdit.productName = this.nameInput.value;
      this.productToEdit.price = this.priceInput.value;
      this.productToEdit.categoryId = this.categoryIdInput.value;
      this.productToEdit.image = this.imageProductRef.nativeElement.files[0];

      await this.productsService.updateProduct(this.productToEdit);
      this.notify.success("Product has been updated");

      this.dynamicClass = "hide-hint";
    } catch (err: any) {
      this.notify.error(err);
    }
  }

  getProductDetails() {
    this.editForm.patchValue({
      nameBox: this.productToEdit.productName,
      priceBox: this.productToEdit.price,
      categoryIdBox: this.productToEdit.categoryId,
      imageBox: null,
    });
  }

  isUnique(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!this.products || this.products.length === 0) {
        return null;
      }

      const nameTaken = this.products.filter(
        (p) =>
          p.productName.toLowerCase() === this.nameInput.value.toLowerCase() &&
          p._id != this.productToEdit._id
      );

      if (nameTaken.length > 0) {
        return { uniqueName: false };
      } else {
        return null;
      }
    };
  }
}
