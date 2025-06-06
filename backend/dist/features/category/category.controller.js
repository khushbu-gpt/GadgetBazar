"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategory = getCategory;
exports.addCategory = addCategory;
const category_model_1 = require("./category.model");
const sendResponse_1 = require("../../shared/utils/sendResponse");
const AppError_1 = require("../../shared/utils/AppError");
function getCategory(req, res) {
}
async function addCategory(req, res, next) {
    try {
        const { name, slug } = req.body;
        console.log("1");
        const category = await category_model_1.CategoryModel.create({ name, slug });
        if (!category)
            next(new AppError_1.AppError("name and slug is required"));
        console.log(category);
        (0, sendResponse_1.sendResponse)(res, { data: category, message: "category created successful!", status_code: 201 });
    }
    catch (error) {
        next(error);
    }
}
