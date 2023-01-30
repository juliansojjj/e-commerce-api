"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../routes/product"));
const user_1 = __importDefault(require("../routes/user"));
const favorite_1 = __importDefault(require("../routes/favorite"));
const checkout_1 = __importDefault(require("../routes/checkout"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.paths = {
            products: '/api/products',
            users: '/api/users',
            favorites: '/api/favorites',
            checkout: '/api/checkout'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Database connected');
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //BODY
        this.app.use(express_1.default.json());
        //Public folder
        this.app.use(express_1.default.static('public')); //nombre de carpeta
    }
    routes() {
        this.app.use(this.paths.products, product_1.default);
        this.app.use(this.paths.users, user_1.default);
        this.app.use(this.paths.favorites, favorite_1.default);
        this.app.use(this.paths.checkout, checkout_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('server running on ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map