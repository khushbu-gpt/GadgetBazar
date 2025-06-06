"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = sendResponse;
function sendResponse(resObj, res = {}) {
    const { data = null, status = "success", status_code = 200, message = "operation success" } = res;
    return resObj.status(status_code).json({
        data,
        status_code,
        message,
        status
    });
}
