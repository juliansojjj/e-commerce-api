"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Order = connection_1.default.define('Order', {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    user_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    payment_option: {
        type: sequelize_1.DataTypes.STRING
    },
    send_option: {
        type: sequelize_1.DataTypes.STRING
    },
    address_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    tracking_code: {
        type: sequelize_1.DataTypes.STRING
    },
    user_discharged: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    post_dispatched: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    user_received: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    total_price: {
        type: sequelize_1.DataTypes.NUMBER
    },
    send_price: {
        type: sequelize_1.DataTypes.NUMBER
    },
    sucursal: {
        type: sequelize_1.DataTypes.STRING
    },
    sucursal_received: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
});
exports.default = Order;
//# sourceMappingURL=order.js.map