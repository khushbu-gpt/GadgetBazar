"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = createProduct;
exports.getAllProducts = getAllProducts;
exports.getProductBySKU = getProductBySKU;
exports.deleteProductBySKU = deleteProductBySKU;
exports.updateProduct = updateProduct;
exports.createListOfProduct = createListOfProduct;
const sendResponse_1 = require("../../shared/utils/sendResponse");
const AppError_1 = require("../../shared/utils/AppError");
const ProductService = __importStar(require("./products.service"));
async function createProduct(req, res, next) {
    try {
        const products = await ProductService.createProductService(req.body);
        if (!products)
            next(new AppError_1.AppError("products not found", 404));
        (0, sendResponse_1.sendResponse)(res, {
            message: "New product created",
            data: products,
            status_code: 201,
        });
    }
    catch (error) {
        next(error);
    }
}
async function getAllProducts(req, res, next) {
    try {
        const products = await ProductService.getProductService();
        if (!products)
            next(new AppError_1.AppError("products not found", 404));
        (0, sendResponse_1.sendResponse)(res, { message: "products retrieved", data: products });
    }
    catch (error) {
        next(new AppError_1.AppError("retrieve failed"));
    }
}
async function getProductBySKU(req, res, next) {
    try {
        const { sku } = req.params;
        const product = await ProductService.getProductBySKUService(sku);
        if (!product)
            throw new AppError_1.AppError("products not found", 404);
        (0, sendResponse_1.sendResponse)(res, { message: "products retrieved", data: product });
    }
    catch (error) {
        next(error);
    }
}
async function deleteProductBySKU(req, res, next) {
    try {
        const { sku } = req.params;
        const products = await ProductService.deleteProductServiceBySKU(sku);
        if (!products)
            next(new AppError_1.AppError("products not found", 404));
        (0, sendResponse_1.sendResponse)(res, {
            message: "products deleted success!",
            data: products
        });
    }
    catch (error) {
        next(error);
    }
}
async function updateProduct(req, res, next) {
    try {
        const data = req.body;
        const { sku } = req.params;
        const updatedProducts = await ProductService.updateProductService(sku, data);
        // if (!updatedProducts) return next(new AppError("products not found", 404));
        (0, sendResponse_1.sendResponse)(res, {
            message: "Product Updated",
            data: updatedProducts,
        });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
}
async function createListOfProduct(req, res, next) {
    try {
        const listOfProduct = await ProductService.createListOfProductService(req.body);
        if (!listOfProduct)
            next(new AppError_1.AppError("products not found", 404));
        (0, sendResponse_1.sendResponse)(res, {
            message: "New productList  created",
            data: listOfProduct,
            status_code: 201,
        });
    }
    catch (error) {
        next(error);
    }
}
