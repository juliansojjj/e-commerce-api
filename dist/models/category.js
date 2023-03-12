"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Category = connection_1.default.define('Category', {
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    disabled: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
exports.default = Category;
//# sourceMappingURL=category.js.map