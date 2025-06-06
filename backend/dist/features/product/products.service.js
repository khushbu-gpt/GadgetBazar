"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createListOfProductService = exports.deleteProductServiceBySKU = exports.updateProductService = exports.createProductService = exports.getProductBySKUService = exports.getProductService = void 0;
const AppError_1 = require("../../shared/utils/AppError");
const product_model_1 = require("./product.model");
const getProductService = async () => {
    return await product_model_1.ProductModel.find({}).lean();
};
exports.getProductService = getProductService;
const getProductBySKUService = async (sku) => {
    const products = await product_model_1.ProductModel.findOne({ sku });
    if (!products)
        throw new AppError_1.AppError("sku not found", 404);
    return products;
};
exports.getProductBySKUService = getProductBySKUService;
const createProductService = async (data) => {
    return await product_model_1.ProductModel.create(data);
};
exports.createProductService = createProductService;
const updateProductService = async (sku, data) => {
    const updatedProducts = await product_model_1.ProductModel.findOneAndUpdate({ sku }, data, { new: true });
    return updatedProducts;
};
exports.updateProductService = updateProductService;
const deleteProductServiceBySKU = async (sku) => {
    return await product_model_1.ProductModel.findByIdAndDelete(sku);
};
exports.deleteProductServiceBySKU = deleteProductServiceBySKU;
const createListOfProductService = async (data) => {
    return await product_model_1.ProductModel.insertMany(data);
};
exports.createListOfProductService = createListOfProductService;
