"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddress = exports.updateAddress = exports.getAddress = exports.getAddressById = exports.createAddress = void 0;
const AppError_1 = require("../../shared/utils/AppError");
const address_model_1 = require("./address.model");
const createAddress = async (data) => {
    return await address_model_1.AddressModel.create(data);
};
exports.createAddress = createAddress;
const getAddressById = async (id) => {
    return await address_model_1.AddressModel.findById(id);
};
exports.getAddressById = getAddressById;
const getAddress = async (uid) => {
    const address = await address_model_1.AddressModel.find({ id: uid }).lean();
    if (!address)
        throw new AppError_1.AppError("Address not found", 400);
    return address;
};
exports.getAddress = getAddress;
const updateAddress = async (data, id) => {
    const address = await address_model_1.AddressModel.findByIdAndUpdate(id, data, { new: true });
    if (!address)
        throw new AppError_1.AppError("Address not found", 400);
    return address;
};
exports.updateAddress = updateAddress;
const deleteAddress = async (id) => {
    const address = await address_model_1.AddressModel.findByIdAndDelete(id);
    if (!address)
        throw new AppError_1.AppError("Address not found", 404);
    return address;
};
exports.deleteAddress = deleteAddress;
