"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = require("express-jwt");
function getTokenFromHeaders(req) {
    // Check if the token is available on the request Headers
    if (req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer") {
        // Get the encoded token string and return it
        const token = req.headers.authorization.split(" ")[1];
        return token;
    }
    return null;
}
const isAuthenticated = (0, express_jwt_1.expressjwt)({
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
    requestProperty: "payload",
    getToken: getTokenFromHeaders,
});
exports.default = isAuthenticated;
