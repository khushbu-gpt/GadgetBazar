import { Router } from "express";
import {
  createListOfProduct,
  createProduct,
  deleteProductBySKU,
  getProductBySKU,
  getProductsByCategory,
  updateProduct,
} from "./products.controller";
import {
  createListOfProductScema,
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./product.validation";
import { zodValidation } from "../../shared/middleware/validation";

export const productRouter = Router();

productRouter.post(
  "/",
  zodValidation({ body: createProductSchema }),
  createProduct
);
productRouter.get(
  "/:sku",
  zodValidation({ params: getProductSchema }),
  getProductBySKU
);
productRouter.delete(
  "/:sku",
  zodValidation({ params: deleteProductSchema }),
  deleteProductBySKU
);
productRouter.put(
  "/:sku",
  zodValidation({body: updateProductSchema, params: getProductSchema }),
  updateProduct
);
productRouter.post(
  "/bulk",
  zodValidation({ body: createListOfProductScema }),
  createListOfProduct
);

productRouter.get("/",getProductsByCategory)