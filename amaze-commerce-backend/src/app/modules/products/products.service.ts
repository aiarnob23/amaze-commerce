
import QueryBuilder from "../../builder/queryBuilder";
import { productsSearchableFields } from "./products.constant";
import { Product } from "./products.model";

//get products
const getProducts = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(productsSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await productQuery.modelQuery;
  const totalCounts = await Product.countDocuments();
  return {
    data,
    totalCounts,
  };
};
//add new product
const addProduct = async (newProduct: any) => {
  const result = await Product.create(newProduct);
  return result;
};
//get product by id
const getSingleProduct = async (id: any) => {
  const result = await Product.findById(id);
  return result;
};
//update a product
const updateProduct = async (id: any, updatedData: any) => {
  const result = await Product.findByIdAndUpdate(id, updatedData, {new:true});
  return result;
}
//delete a product
const deleteProduct = async (id: any) => {
  const result = await Product.findByIdAndDelete(id);
  console.log(result);
  return result;
}


//exports
export const productsServices = {
  getProducts,
  addProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
