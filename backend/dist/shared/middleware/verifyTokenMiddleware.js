"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyAccessTokenMiddleWare = void 0;
const jsontoken_1 = require("../utils/jsontoken");
const VerifyAccessTokenMiddleWare = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authorization header missing or malformed" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = (0, jsontoken_1.decodeToken)(token);
        req.user = decoded;
        next();
    }
    catch (err) {
        console.error("Token verification failed:", err);
        return res.status(401).json({ error: "Invalid access token", status_code: 401 });
    }
};
exports.VerifyAccessTokenMiddleWare = VerifyAccessTokenMiddleWare;
