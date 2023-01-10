import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NgForm,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { CategoryModel } from "src/app/models/category-model.model";
import { ProductModel } from "src/app/models/product-model.model";
import { NotifyService } from "src/app/services/notify.service";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"],
})
export class AddProductComponent implements OnInit {
  @Input()
  public clickAddProduct: boolean;

  public selectedImageFile: any = null;
  public errorMessageImg = false;

  public product = new ProductModel();
  public categories: CategoryModel[];
  public products: ProductModel[]; //In order to check unique name only

  public addForm: FormGroup;
  public productName: FormControl;
  public price: FormControl;
  public categoryId: FormControl;
  public image: FormControl;

  @ViewChild("imageFile")
  private imageFileRef: ElementRef<HTMLInputElement>;

  public isDisabled: boolean = false;

  constructor(
    private productsService: ProductsService,
    private notify: NotifyService
  ) {}

  async ngOnInit() {
    try {
      this.addForm = new FormGroup({
        categoryId: (this.categoryId = new FormControl("", [
          Validators.required,
        ])),
        productName: (this.productName = new FormControl("", [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          this.isUnique(),
        ])),
        price: (this.price = new FormControl("", [
          Validators.required,
          Validators.min(0),
          Validators.max(10000),
        ])),
        image: (this.image = new FormControl("", [Validators.required])),
      });

      //Must be after above because await doesn't let formControl get initialized
      this.categories = await this.productsService.getAllCategories();
      this.products = await this.productsService.getAllProducts();
    } catch (err: any) {
      this.notify.error(err);
    }
  }

  fileImageSelected(event: Event): void {
    const imageFileElement = event.target as HTMLInputElement;
    this.selectedImageFile = imageFileElement.files[0] ?? null;
  }

  async addNewProduct() {
    const errorMsg = "Please fill out all fields properly";
    try {
      //These 4 if's is for second time you try to add a product - it won't let you without filling out all fields:
      if (this.productName.value === null) {
        this.notify.error(errorMsg);
        return;
      }

      if (this.price.value === null) {
        this.notify.error(errorMsg);
        return;
      }

      if (this.categoryId.value === null) {
        this.notify.error(errorMsg);
        return;
      }

      if (this.imageFileRef.nativeElement.files[0] === undefined) {
        this.notify.error(errorMsg);
        return;
      }

      this.product.categoryId = this.categoryId.value;
      this.product.productName = this.productName.value;
      this.product.price = this.price.value;
      this.product.image = this.imageFileRef.nativeElement.files[0];

      await this.productsService.addProduct(this.product);
      this.notify.success("Product has been added");

      //reset selected file message:
      this.selectedImageFile = null;

      this.addForm.reset();

      //Reset validation error:
      Object.keys(this.addForm.controls).forEach((key) => {
        this.addForm.get(key).setErrors(null);
      });
    } catch (err: any) {
      this.notify.error(err);
    }
  }

  isUnique(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!this.products || this.products.length === 0) {
        return null;
      }

      const productNameTaken = this.products.filter(
        (p) =>
          p.productName?.toLowerCase() ===
            this.productName.value?.toLowerCase() && p._id != this.product._id
      );

      if (productNameTaken.length > 0) {
        return { uniqueProductName: false };
      } else {
        return null;
      }
    };
  }
}
