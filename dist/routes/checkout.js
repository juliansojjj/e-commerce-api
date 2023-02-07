"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const checkout_1 = require("../controllers/checkout");
const checkout_2 = require("../controllers/checkout");
exports.router = (0, express_1.Router)();
exports.router.get('/cart/:id', checkout_1.getUserCart);
exports.router.post('/cart', checkout_1.postItemToCart);
exports.router.put('/cart/:id', checkout_1.updateCartItemAmount);
exports.router.delete('/cart/:id', checkout_1.deleteCartItem);
exports.router.get('/address/:id', checkout_2.getUserAddresses);
exports.router.get('/address/old/:id', checkout_2.getOldAddress);
exports.router.post('/address', checkout_2.postAddress);
exports.router.put('/address/:id', checkout_2.updateAddress);
exports.router.delete('/address/:id', checkout_2.deleteAddress);
exports.default = exports.router;
//# sourceMappingURL=checkout.js.map