"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const favorites_1 = require("../controllers/favorites");
exports.router = (0, express_1.Router)();
exports.router.get('/:id', favorites_1.getUserFavorites);
exports.router.get('/item/:id', favorites_1.getItemFavorites);
exports.router.post('/', favorites_1.postFavorite);
exports.router.delete('/:id', favorites_1.deleteFavorite);
exports.default = exports.router;
//# sourceMappingURL=favorite%20copy.js.map