"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRouter = void 0;
const express_1 = require("express");
const address_controller_1 = require("./address.controller");
const validation_1 = require("../../shared/middleware/validation");
const address_validation_1 = require("./address.validation");
exports.addressRouter = (0, express_1.Router)();
exports.addressRouter.post("/", (0, validation_1.zodValidation)({ body: address_validation_1.createAddressSchema }), address_controller_1.createAddressController);
// addressRouter.get("/:uid",zodValidation({ params: getAddressByUid}), getAddressController);
// addressRouter.get(
//     "/:id",
//     zodValidation({ params: getAddressById }),
//     getAddressByIdController
// );
// addressRouter.put(
//     "/:id",
//     zodValidation({
//         params: getAddressById,
//         body: updateProductSchema
//     }),
//     updateAddressController
// );
// addressRouter.delete(
//     "/:id",
//     zodValidation({ params: getAddressById }),
//     deleteAddressController
// );
