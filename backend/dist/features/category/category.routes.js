"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
exports.categoryRouter = (0, express_1.Router)();
exports.categoryRouter.post("/", category_controller_1.addCategory);
