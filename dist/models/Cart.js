"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Cart = connection_1.default.define('Cart', {
    user_id: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    item_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    order_item_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    order_id: {
        type: sequelize_1.DataTypes.STRING
    },
    amount: {
        type: sequelize_1.DataTypes.NUMBER
    }
});
exports.default = Cart;
//# sourceMappingURL=cart.js.map