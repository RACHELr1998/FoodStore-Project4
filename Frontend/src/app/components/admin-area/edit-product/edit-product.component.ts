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

  public editForm: FormGroup;
  public productName: FormControl;
  public price: FormControl;
  public categoryId: FormControl;
  public image: FormControl;

  @ViewChild("imageFile")
  public imageFileRef: ElementRef<HTMLInputElement>;

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
      this.productName = new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        this.isUniqueName(),
      ]);
      this.price = new FormControl("", [
        Validators.required,
        Validators.min(0),
        Validators.max(10000),
      ]);
      this.categoryId = new FormControl("", [Validators.required]);
      this.image = new FormControl("", []);

      this.editForm = new FormGroup({
        productNameBox: this.productName,
        priceBox: this.price,
        categoryIdBox: this.categoryId,
        imageBox: this.image,
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
      this.productToEdit.productName = this.productName.value;
      this.productToEdit.price = this.price.value;
      this.productToEdit.categoryId = this.categoryId.value;
      this.productToEdit.image = this.imageFileRef.nativeElement.files[0];

      await this.productsService.updateProduct(this.productToEdit);
      this.notify.success("Product has been updated");
    } catch (err: any) {
      this.notify.error(err);
    }
  }

  getProductDetails() {
    this.editForm.patchValue({
      productNameBox: this.productToEdit.productName,
      priceBox: this.productToEdit.price,
      categoryIdBox: this.productToEdit.categoryId,
      imageBox: null,
    });
  }

  isUniqueName(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!this.products || this.products.length === 0) {
        return null;
      }

      const nameTaken = this.products.filter(
        (p) =>
          p.productName.toLowerCase() ===
            this.productName.value.toLowerCase() &&
          p._id != this.productToEdit._id
      );

      if (nameTaken.length > 0) {
        return { uniqueProductName: false };
      } else {
        return null;
      }
    };
  }
}
