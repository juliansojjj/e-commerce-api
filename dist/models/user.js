"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const User = connection_1.default.define('User', {
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    role: {
        type: sequelize_1.DataTypes.STRING
    },
    oAuth: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    verified: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
exports.default = User;
//# sourceMappingURL=user.js.map