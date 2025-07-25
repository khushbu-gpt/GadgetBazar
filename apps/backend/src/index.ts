import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./shared/config/db";
import { authRouter } from "./features/auth/auth.routes";
import { uploadRouter } from "./features/uploader/cloudinary.routes";
import { productRouter } from "./features/product/products.routes";
import { categoryRouter } from "./features/category/category.routes";
import { errorHandler } from "./shared/middleware/errorHandler";
import { addressRouter } from "./features/address/address.routes";
import { cartRouter } from "./features/cart/cart.routes";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: ["http://localhost:3000", "https://mybazzzar.vercel.app"] }));
app.use(express.json());
app.use("/auth", authRouter);
app.use("/", uploadRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/address", addressRouter)
app.use("/cart", cartRouter)
app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`SERVER IS RUNNING AT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Server connection failed", error.message);
  });

