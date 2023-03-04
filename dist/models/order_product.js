"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const OrderProduct = connection_1.default.define('Order_Product', {
    item_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    order_id: {
        type: sequelize_1.DataTypes.STRING
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    type: {
        type: sequelize_1.DataTypes.STRING
    },
    price: {
        type: sequelize_1.DataTypes.NUMBER
    },
    serialNumber: {
        type: sequelize_1.DataTypes.STRING
    },
    image: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.default = OrderProduct;
//# sourceMappingURL=order_product.js.map