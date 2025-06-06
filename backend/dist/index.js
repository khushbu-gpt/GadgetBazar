"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("./types/express");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./shared/config/db");
const auth_routes_1 = require("./features/auth/auth.routes");
const cloudinary_routes_1 = require("./features/uploader/cloudinary.routes");
const products_routes_1 = require("./features/product/products.routes");
const category_routes_1 = require("./features/category/category.routes");
const errorHandler_1 = require("./shared/middleware/errorHandler");
const address_routes_1 = require("./features/address/address.routes");
const cart_routes_1 = require("./features/cart/cart.routes");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({ origin: ["http://localhost:3000"] }));
app.use(express_1.default.json());
app.use("/auth", auth_routes_1.authRouter);
app.use("/", cloudinary_routes_1.uploadRouter);
app.use("/products", products_routes_1.productRouter);
app.use("/categories", category_routes_1.categoryRouter);
app.use("/address", address_routes_1.addressRouter);
app.use("/cart", cart_routes_1.cartRouter);
app.use(errorHandler_1.errorHandler);
(0, db_1.connectDB)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`SERVER IS RUNNING AT ${PORT}`);
    });
})
    .catch((error) => {
    console.error("Server connection failed", error);
});
app.get("/", function (req, res) {
    res.json({ message: "Hello! Welcome to my page" });
});
