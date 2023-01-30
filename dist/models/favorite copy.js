"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Favorite = connection_1.default.define('Favorite', {
    user_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    item_id: {
        type: sequelize_1.DataTypes.NUMBER
    }
});
exports.default = Favorite;
//# sourceMappingURL=favorite%20copy.js.map