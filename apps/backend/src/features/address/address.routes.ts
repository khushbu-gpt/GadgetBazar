import { Router } from "express";
import {
  createAddressController,
  deleteAddressController,
  getAddressByIdController,
  getAddressController,
  updateAddressController,
} from "./address.controller";
import { zodValidation } from "../../shared/middleware/validation";
import { getAddressById } from "./address.service";
import { updateProductSchema } from "../product/product.validation";
import { createAddressSchema} from "./address.validation";

export const addressRouter = Router();
addressRouter.post(
    "/",
    zodValidation({ body: createAddressSchema}),
    createAddressController
);
addressRouter.get("/:uid", getAddressController);
addressRouter.get(
    "/:id",
    zodValidation({ params: getAddressById }),
    getAddressByIdController
);
addressRouter.put(
    "/:id",
    zodValidation({
        params: getAddressById,
        body: updateProductSchema
    }),
    updateAddressController
);
addressRouter.delete(
    "/:id",
    zodValidation({ params: getAddressById }),
    deleteAddressController
);
