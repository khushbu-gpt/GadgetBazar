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
exports.createAddressController = createAddressController;
exports.updateAddressController = updateAddressController;
exports.getAddressController = getAddressController;
exports.getAddressByIdController = getAddressByIdController;
exports.deleteAddressController = deleteAddressController;
const addressService = __importStar(require("./address.service"));
const sendResponse_1 = require("../../shared/utils/sendResponse");
const AppError_1 = require("../../shared/utils/AppError");
async function createAddressController(req, res, next) {
    try {
        const newaddress = await addressService.createAddress(req.body);
        (0, sendResponse_1.sendResponse)(res, {
            data: newaddress,
            status_code: 201,
            message: "Address created!",
        });
    }
    catch (error) {
        next(error);
    }
}
async function updateAddressController(req, res, next) {
    try {
        const { id } = req.params;
        const updateAddress = await addressService.updateAddress(req.body, { id });
        if (!updateAddress)
            next(new AppError_1.AppError("Address is required!", 400));
        (0, sendResponse_1.sendResponse)(res, {
            data: updateAddress,
            status_code: 200,
            message: "Address updated!",
        });
    }
    catch (error) {
        next(new AppError_1.AppError("update Address failed", 500));
    }
}
async function getAddressController(req, res, next) {
    try {
        const { uid } = req.params;
        const Address = await addressService.getAddress(uid);
        if (!Address)
            next(new AppError_1.AppError("Address not found!", 404));
        (0, sendResponse_1.sendResponse)(res, {
            data: Address,
            status_code: 200,
            message: "Address retrieve!",
        });
    }
    catch (error) {
        next(new AppError_1.AppError("Address retrieve failed", 500));
    }
}
async function getAddressByIdController(req, res, next) {
    try {
        const { id } = req.params;
        const Address = await addressService.getAddressById({ id });
        if (!Address)
            next(new AppError_1.AppError("Address not found!", 400));
        (0, sendResponse_1.sendResponse)(res, {
            data: Address,
            status_code: 200,
            message: "Address retrieve!",
        });
    }
    catch (error) {
        next(new AppError_1.AppError("Address retrieve failed", 500));
    }
}
async function deleteAddressController(req, res, next) {
    try {
        const { id } = req.params;
        const Address = await addressService.deleteAddress({ id });
        if (!Address)
            next(new AppError_1.AppError("Address not found!", 404));
        (0, sendResponse_1.sendResponse)(res, {
            data: Address,
            status_code: 200,
            message: "Address retrieve!",
        });
    }
    catch (error) {
        next(new AppError_1.AppError("Address retrieve failed"));
    }
}
