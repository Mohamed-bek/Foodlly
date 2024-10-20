"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearTokenCookie = exports.setTokenCookie = void 0;
const cookie_1 = require("cookie");
const setTokenCookie = (res, token) => {
    const cookie = (0, cookie_1.serialize)("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        path: "/",
    });
    res.setHeader("Set-Cookie", cookie);
};
exports.setTokenCookie = setTokenCookie;
const clearTokenCookie = (res) => {
    const cookie = (0, cookie_1.serialize)("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
    });
    res.setHeader("Set-Cookie", cookie);
};
exports.clearTokenCookie = clearTokenCookie;
//# sourceMappingURL=JwtUtilitis.js.map