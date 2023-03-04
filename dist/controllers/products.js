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
exports.deleteProduct = exports.putProduct = exports.postProduct = exports.getProductByType = exports.getProduct = exports.getProducts = void 0;
const favorite_1 = __importDefault(require("../models/favorite"));
const product_1 = __importDefault(require("../models/product"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.default.findAll();
    const favorites = yield favorite_1.default.findAll();
    console.log(favorites);
    res.json(products);
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const product = yield product_1.default.findByPk(id);
    if (product) {
        res.json({ product });
    }
    else {
        res.status(404).json({ msg: "No existe ese producto" });
    }
});
exports.getProduct = getProduct;
const getProductByType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    const array = name.split('-');
    const type = array[0];
    const id = array[1];
    const product = yield product_1.default.findOne({ where: { id: id, type: type } });
    if (product) {
        res.json({ product });
    }
    else {
        res.status(404).json({ msg: "No existe ese usuario" });
    }
});
exports.getProductByType = getProductByType;
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (!body.serialNumber.trim()) {
        res.status(400).json({ msg: 'Introduzca el número de serie del producto' });
    }
    else
        try {
            const serialNumber = yield product_1.default.findOne({ where: { serialNumber: body.serialNumber } });
            if (serialNumber) {
                res.status(409).json({ msg: 'El producto ya existe' });
            }
            else {
                const product = yield product_1.default.create(body);
                res.json({ product });
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ msg: "Revise the error" });
        }
});
exports.postProduct = postProduct;
const putProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const product = yield product_1.default.findByPk(id);
    if (product)
        try {
            const serialNumber = yield product_1.default.findOne({ where: { serialNumber: body.serialNumber } });
            if (serialNumber)
                res.status(409).json({ msg: 'El producto ya existe' });
            else {
                yield product.update(body)
                    .then(() => res.json(product));
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ msg: "Revise the error" });
        }
    else
        res.status(404).json({ msg: 'No existe el producto' });
});
exports.putProduct = putProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield product_1.default.findByPk(id);
        if (product) {
            product.destroy().then(() => res.json(product));
        }
        else
            return res.status(404).json({ msg: 'No existe el producto' });
    }
    catch (err) {
        console.log(err);
    }
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=products.js.map