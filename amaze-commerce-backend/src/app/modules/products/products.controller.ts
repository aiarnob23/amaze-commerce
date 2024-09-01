import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { productsServices } from "./products.service";

//get products
const getProducts = catchAsync(async (req, res) => {
    const { data, totalCounts } = await productsServices.getProducts(req.query);
    const result = {
        data,
        totalCounts,
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Products retrieved successfully",
      data: result,
    });
})

//add new product
const addNewProduct = catchAsync(async (req, res) => {
    const result = await productsServices.addProduct(req.body);
})

//find by id
const getProductById = catchAsync(async (req, res) => {
  const id: any = req.params.id;
    const result = await productsServices.getSingleProduct(id);
      sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product retrieved successfully",
      data: result,
    });
})

export const productsControllers = {
  getProducts,
  addNewProduct,
  getProductById,
};