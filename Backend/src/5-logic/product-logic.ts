import { CategoryModel, ICategoryModel } from "../4-models/category-model";
import { IdNotFoundError, ValidationError } from "../4-models/client-errors";
import { IProductModel, ProductModel } from "../4-models/product-model";
import { v4 as uuid } from "uuid";
import config from "../2-utils/config";
import safeDelete from "../2-utils/safe-delete";

// Get all categories:
async function getAllCategories(): Promise<ICategoryModel[]> {
  return await CategoryModel.find().exec();
}

// Get all products:
async function getAllProducts(): Promise<IProductModel[]> {
  return await ProductModel.find().populate("category").exec();
}

// Used to get old imageName for update product:
async function getOneProduct(_id: string): Promise<IProductModel> {
  const product = await ProductModel.findById(_id).populate("category").exec();
  if (!product) throw new IdNotFoundError(_id);
  return product;
}

// Count products:
async function countProducts(): Promise<number> {
  return ProductModel.find().count().exec();
}

// Add product By Admin:
async function addProduct(product: IProductModel): Promise<IProductModel> {
  const errors = product.validateSync();
  if (errors) throw new ValidationError(errors.message);

  // Add the new image:
  if (product?.image) {
    // save the file extension
    const extension = product.image.name.substring(
      product.image.name.lastIndexOf(".")
    ); // .gif / .png / .jpg / .jpeg
    // generate a universally unique name for the file
    product.imageName = uuid() + extension;
    //move the file to assets
    await product.image.mv(`${config.imagesFolder}/${product.imageName}`);
    // Delete File before saving.
    delete product.image;
  }

  return await product.save();
}

// Update product by Admin:
async function updateProduct(product: IProductModel): Promise<IProductModel> {
  const errors = product.validateSync();
  if (errors) throw new ValidationError(errors.message);

  // Handle image:
  //If there is no update to the image
  const productFromDataBase = await getOneProduct(product._id);
  product.imageName = productFromDataBase.imageName;

  if (product.image) {
    // delete the file
    await safeDelete(`${config.imagesFolder}/${product.imageName}`);
    // save the file extension
    const extension = product.image.name.substring(
      product.image.name.lastIndexOf(".")
    ); // .gif / .png / .jpg / .jpeg
    // generate a universally unique name for the file
    product.imageName = uuid() + extension;
    //move the file to assets
    await product.image.mv(`${config.imagesFolder}/${product.imageName}`); // mv = move = copy image.
    // Delete File before saving.
    delete product.image;
  }

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
  getAllProducts,
  getOneProduct,
  countProducts,
  addProduct,
  updateProduct,
};
