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
   sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: "Product added successfully",
     data: result,
   });
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

//update a product 
const updateProduct = catchAsync(async (req, res) => {
  const id: any = req.params.id;
  const updatedData = req.body;
  const result = await productsServices.updateProduct(id, updatedData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "prodcut updated successfully",
    data:result,
  })
})

//delete a product
const deleteProduct = catchAsync(async (req, res) => {
  const id: any = req.params.id;
  const result = await productsServices.deleteProduct(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "prodcut deleted successfully",
    data: result,
  });
});

export const productsControllers = {
  getProducts,
  addNewProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};