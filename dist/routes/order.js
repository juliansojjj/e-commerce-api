"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const orders_1 = require("../controllers/orders");
exports.router = (0, express_1.Router)();
exports.router.get('/:id', orders_1.getUniqueOrder);
exports.router.get('/cart/:id', orders_1.getOrderCart);
exports.router.get('/user/:id', orders_1.getUserOrders);
exports.default = exports.router;
//# sourceMappingURL=order.js.map