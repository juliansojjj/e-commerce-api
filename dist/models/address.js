"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Address = connection_1.default.define('Address', {
    user_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    name_surname: {
        type: sequelize_1.DataTypes.STRING
    },
    phone: {
        type: sequelize_1.DataTypes.STRING
    },
    province: {
        type: sequelize_1.DataTypes.STRING
    },
    postal_code: {
        type: sequelize_1.DataTypes.STRING
    },
    street: {
        type: sequelize_1.DataTypes.STRING
    },
    number: {
        type: sequelize_1.DataTypes.NUMBER
    },
    department: {
        type: sequelize_1.DataTypes.STRING
    },
    note: {
        type: sequelize_1.DataTypes.STRING
    },
});
exports.default = Address;
//# sourceMappingURL=address.js.map