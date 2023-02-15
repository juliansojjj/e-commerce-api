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
exports.postAfterOrder = exports.deleteAddress = exports.updateAddress = exports.postAddress = exports.getOldAddress = exports.getUserAddresses = exports.deleteCartItem = exports.updateCartItemAmount = exports.postItemToCart = exports.getUserCart = void 0;
const cart_1 = __importDefault(require("../models/cart"));
const address_1 = __importDefault(require("../models/address"));
const order_1 = __importDefault(require("../models/order"));
const product_1 = __importDefault(require("../models/product"));
/*
- Cart controllers
- Address controllers
- Order controllers
*/
//----------CART----------
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
//----------Address----------
const getUserAddresses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const address = yield address_1.default.findAll({ where: { user_id: id } });
    if (address) {
        res.json({ address });
    }
    else {
        res.status(404).json({ msg: "No tiene direcciones" });
    }
});
exports.getUserAddresses = getUserAddresses;
const getOldAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const address = yield address_1.default.findByPk(id);
    if (address) {
        res.json({ address });
    }
    else {
        res.status(404).json({ msg: "No tiene direcciones" });
    }
});
exports.getOldAddress = getOldAddress;
const postAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (!body.user_id
        || !body.name_surname
        || !body.phone
        || !body.province
        || !body.postal_code
        || !body.street
        || !body.number)
        res.status(400).json('Rellene los campos');
    else
        try {
            const address = yield address_1.default.create(body);
            res.json({ address });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ msg: "Revise the error" });
        }
});
exports.postAddress = postAddress;
const updateAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    if (!body.user_id
        || !body.name_surname
        || !body.phone
        || !body.province
        || !body.postal_code
        || !body.street
        || !body.number)
        res.status(400).json('Rellene los campos');
    else
        try {
            const address = yield address_1.default.findByPk(id);
            if (address) {
                yield address.update(body)
                    .then(() => res.json(address));
            }
            else
                return res.status(404).json({ msg: 'Este producto no estaba en su carrito' });
        }
        catch (err) {
            console.log(err);
        }
});
exports.updateAddress = updateAddress;
const deleteAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const address = yield address_1.default.findByPk(id);
        if (address) {
            address.destroy()
                .then(() => res.json(address));
        }
        else
            return res.status(404).json({ msg: 'No existe esa dirección' });
    }
    catch (err) {
        console.log(err);
    }
});
exports.deleteAddress = deleteAddress;
//----------Orders----------
const postAfterOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    console.log(id);
    console.log(body);
    //comprobacion de campos
    if (!body.id ||
        !body.payment_option ||
        !body.send_option ||
        !body.address_id ||
        !body.items) {
        res.status(400).json('Informacion incompleta');
    }
    else {
        //comprobacion precios y cantidades
        let totalPrice = 0;
        Promise.all(body.items.map((unit) => {
            const fun = new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
                yield cart_1.default.update({ order_id: body.id }, { where: { user_id: id, item_id: unit.productId } });
                const product = yield product_1.default.findByPk(unit.productId);
                const itemPrice = unit.amount * (product === null || product === void 0 ? void 0 : product.dataValues.price);
                totalPrice += itemPrice;
                resolve(true);
            }));
            return fun;
        }))
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`DESPUES de primer${totalPrice}`);
            if (totalPrice && body.send_option !== 'local') {
                const userAddress = yield address_1.default.findByPk(body.address_id);
                const userPostalCode = userAddress === null || userAddress === void 0 ? void 0 : userAddress.dataValues.postal_code;
                const sendPrice = yield fetchSendPrice(userPostalCode);
                console.log(`evnio:${sendPrice}`);
                totalPrice += sendPrice;
                try {
                    const order = yield order_1.default.create({
                        id: body.id,
                        payment_option: body.payment_option,
                        send_option: body.send_option,
                        address_id: body.address_id,
                        user_id: id,
                        user_discharged: 0,
                        post_dispatched: 0,
                        user_received: 0,
                        total_price: totalPrice,
                        send_price: sendPrice
                    });
                    res.json({ order });
                }
                catch (err) {
                    console.log(err);
                }
            }
            else if (totalPrice)
                try {
                    const order = yield order_1.default.create({
                        id: body.id,
                        payment_option: body.payment_option,
                        send_option: body.send_option,
                        address_id: body.address_id,
                        user_id: id,
                        user_discharged: 0,
                        post_dispatched: 0,
                        user_received: 0,
                        total_price: totalPrice,
                        send_price: 0
                    });
                    res.json({ order });
                }
                catch (err) {
                    console.log(err);
                }
        }));
    }
});
exports.postAfterOrder = postAfterOrder;
const fetchSendPrice = (userPostalCode) => __awaiter(void 0, void 0, void 0, function* () {
    const sendPrice = new Promise(resolve => {
        setTimeout(() => {
            // api de correo argentino o distribuidor del local
            resolve(parseInt(userPostalCode) + 150);
        }, 300);
    });
    return sendPrice;
});
//# sourceMappingURL=checkout%20copy.js.map