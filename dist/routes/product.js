"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const products_1 = require("../controllers/products");
exports.router = (0, express_1.Router)();
exports.router.get('/', products_1.getProducts);
exports.router.get('/:id', products_1.getProduct);
exports.router.get('/search/:name', products_1.getProductByName);
exports.router.get('/models/:SN', products_1.getProductsBySN);
exports.router.get('/model/:name', products_1.getProductByType);
exports.router.get('/categories/all', products_1.getProductCategories);
exports.router.get('/category/:name', products_1.getProductByCategory);
exports.router.get('/category/search/:name', products_1.getProductByNameInCategory);
exports.router.post('/', products_1.postProduct);
exports.router.put('/:id', products_1.putProduct);
exports.router.delete('/:id', products_1.deleteProduct);
exports.default = exports.router;
//# sourceMappingURL=product.js.map