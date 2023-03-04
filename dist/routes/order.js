"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const orders_1 = require("../controllers/orders");
exports.router = (0, express_1.Router)();
exports.router.get('/:id', orders_1.getUniqueOrder);
exports.router.get('/cart/:id', orders_1.getOrderCart);
exports.router.get('/user/:id', orders_1.getUserOrders);
exports.router.get('/product/:id', orders_1.getOrderProduct);
exports.router.put('/fulfill/:id', orders_1.fulfillOrderPayment);
exports.router.put('/sucursal/:id', orders_1.updateOrderSucursal);
exports.default = exports.router;
//# sourceMappingURL=order.js.map