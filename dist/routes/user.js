"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_1 = require("../controllers/user");
const validateToken_1 = __importDefault(require("./validateToken"));
exports.router = (0, express_1.Router)();
exports.router.get('/', validateToken_1.default, user_1.getUsers);
exports.router.post('/', user_1.addUser);
exports.router.post('/sign', user_1.signInUser);
exports.router.post('/oAuthSign', user_1.oAuth);
exports.router.delete('/:id', validateToken_1.default, user_1.deleteUser);
exports.default = exports.router;
//# sourceMappingURL=user.js.map