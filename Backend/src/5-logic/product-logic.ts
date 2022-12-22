import { CategoryModel, ICategoryModel } from "../4-models/category-model";
import { IdNotFoundError, ValidationError } from "../4-models/client-errors";
import { IProductModel, ProductModel } from "../4-models/product-model";

// Get all categories:
async function getAllCategories(): Promise<ICategoryModel[]> {
  return await CategoryModel.find().exec();
}

// Get all products by categoryId:
async function getAllProductsByCategoryId(
  categoryId: string
): Promise<IProductModel[]> {
  if (!categoryId) throw new IdNotFoundError(categoryId);
  return await ProductModel.find({ categoryId }).populate("category").exec();
}

// Add product By Admin:
async function addProduct(product: IProductModel): Promise<IProductModel> {
  const errors = product.validateSync();
  if (errors) throw new ValidationError(errors.message);
  return await product.save();
}

// Update product by Admin:
async function updateProduct(product: IProductModel): Promise<IProductModel> {
  const errors = product.validateSync();
  if (errors) throw new ValidationError(errors.message);
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    product._id,
    product,
    { returnOriginal: false }
  ).exec(); // { returnOriginal: false } --> return back db product and not argument product.
  if (!updatedProduct) throw new IdNotFoundError(product._id);
  return updatedProduct;
}

export default {
  getAllCategories,
  getAllProductsByCategoryId,
  addProduct,
  updateProduct,
};
