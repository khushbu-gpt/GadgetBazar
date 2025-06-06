"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodValidation = void 0;
const zod_1 = require("zod");
const AppError_1 = require("../utils/AppError");
const zodValidation = (schema) => (req, res, next) => {
    try {
        if (schema.body)
            schema.body.parse(req.body);
        if (schema.query)
            schema.query.parse(req.query);
        if (schema.params)
            schema.params.parse(req.params);
        next();
    }
    catch (error) {
        console.error(error);
        if (error instanceof zod_1.ZodError) {
            const errors = error.errors.map((e) => (`${e.path.join(".")},${e.message}`));
            return next(new AppError_1.AppError(` ${errors}`, 400));
        }
        return next(new AppError_1.AppError("Validation failed"));
    }
};
exports.zodValidation = zodValidation;
