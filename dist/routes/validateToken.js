"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token && token.startsWith('Bearer')) {
        const bearerToken = token.slice(7);
        // si usamos sola la funcion hace un throw de jwt error (está arriba en el index de la funcion) 
        // y detiene todo si es erroneo
        // Para personalizarlo tenemos que usar try/catch (es útil para casos donde funciuone NO son promesas)
        try {
            const validate = jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY);
            next();
        }
        catch (err) {
            res.status(400).json({ error: 'Invalid token' });
            //console.log(err)
        }
    }
    else {
        res.status(400).json({ error: 'Access denied' });
    }
};
exports.default = validateToken;
//# sourceMappingURL=validateToken.js.map