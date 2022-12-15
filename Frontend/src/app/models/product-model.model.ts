import { CategoryModel } from "./category-model.model";

export class ProductModel {
  public _id: string;
  public productName: string;
  public categoryId: string;
  public categoryName: CategoryModel;
  public price: number;
  public image: File;
  public imageName: string;
}
