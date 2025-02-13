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
exports.updateOrderSucursal = exports.fulfillOrderPayment = exports.getOrderProduct = exports.getOrderCart = exports.getUniqueOrder = exports.getUserOrders = void 0;
const order_1 = __importDefault(require("../models/order"));
const cart_1 = __importDefault(require("../models/cart"));
const order_product_1 = __importDefault(require("../models/order_product"));
/*
- Cart controllers
- Address controllers
- Order controllers
*/
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const order = yield order_1.default.findAll({ where: { user_id: id } });
    if (order) {
        res.json({ order });
    }
    else {
        res.status(404).json({ msg: "No existe esa orden" });
    }
});
exports.getUserOrders = getUserOrders;
const getUniqueOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const order = yield order_1.default.findByPk(id);
    if (order) {
        res.json({ order });
    }
    else {
        res.status(404).json({ msg: "No existe esa orden" });
    }
});
exports.getUniqueOrder = getUniqueOrder;
const getOrderCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const order = yield cart_1.default.findAll({ where: { order_id: id } });
    if (order) {
        res.json({ order });
    }
    else {
        res.status(404).json({ msg: "No existe tal carrito" });
    }
});
exports.getOrderCart = getOrderCart;
const getOrderProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const orderProduct = yield order_product_1.default.findByPk(id);
    if (orderProduct) {
        res.json({ orderProduct });
    }
    else {
        res.status(404).json({ msg: "No existe producto" });
    }
});
exports.getOrderProduct = getOrderProduct;
const fulfillOrderPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const order = yield order_1.default.findByPk(id);
    if (order) {
        order.update({ user_discharged: 1 })
            .then(() => res.json({ order }))
            .catch(err => res.status(404).json({ msg: err }));
    }
    else {
        res.status(404).json({ msg: "No existe esa orden" });
    }
});
exports.fulfillOrderPayment = fulfillOrderPayment;
const updateOrderSucursal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    console.log(body);
    const order = yield order_1.default.findByPk(id);
    if (order) {
        order.update(body)
            .then(() => res.json({ order }))
            .catch(err => res.status(404).json({ msg: err }));
    }
    else {
        res.status(404).json({ msg: "No existe esa orden" });
    }
});
exports.updateOrderSucursal = updateOrderSucursal;
//# sourceMappingURL=orders.js.map