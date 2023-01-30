"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const checkout_1 = require("../controllers/checkout");
exports.router = (0, express_1.Router)();
exports.router.get('/cart/:id', checkout_1.getUserCart);
exports.router.post('/cart', checkout_1.postItemToCart);
exports.router.put('/cart/:id', checkout_1.updateCartItemAmount);
exports.router.delete('/cart/:id', checkout_1.deleteCartItem);
exports.default = exports.router;
//# sourceMappingURL=checkout.js.map