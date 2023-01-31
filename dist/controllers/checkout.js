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
exports.deleteCartItem = exports.updateCartItemAmount = exports.postItemToCart = exports.getUserCart = void 0;
const cart_1 = __importDefault(require("../models/cart"));
const getUserCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cart = yield cart_1.default.findAll({ where: { user_id: id } });
    if (cart) {
        res.json({ cart });
    }
    else {
        res.status(404).json({ msg: "No existe ese usuario" });
    }
});
exports.getUserCart = getUserCart;
const postItemToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (!body.user_id || !body.item_id)
        res.status(400).json('Rellene los campos de usuario e item');
    else
        try {
            const cart = yield cart_1.default.create(body);
            res.json({ cart });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ msg: "Revise the error" });
        }
});
exports.postItemToCart = postItemToCart;
const updateCartItemAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const data = id.split('-');
    const user_id = data[0];
    const item_id = data[1];
    console.log(user_id, item_id);
    try {
        const cart = yield cart_1.default.findOne({ where: { user_id: user_id, item_id: item_id } });
        if (cart) {
            yield cart.update(body)
                .then(() => res.json(cart));
        }
        else
            return res.status(404).json({ msg: 'Este producto no estaba en su carrito' });
    }
    catch (err) {
        console.log(err);
    }
});
exports.updateCartItemAmount = updateCartItemAmount;
const deleteCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = id.split('-');
    const user_id = data[0];
    const item_id = data[1];
    console.log(user_id, item_id);
    try {
        const cart = yield cart_1.default.findOne({ where: { user_id: user_id, item_id: item_id } });
        if (cart) {
            cart.destroy().then(() => res.json(cart));
        }
        else
            return res.status(404).json({ msg: 'Este producto no estaba en su carrito' });
    }
    catch (err) {
        console.log(err);
    }
});
exports.deleteCartItem = deleteCartItem;
//# sourceMappingURL=checkout.js.map