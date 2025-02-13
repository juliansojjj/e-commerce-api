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
exports.deleteProduct = exports.putProduct = exports.getProductCategories = exports.getProductByCategory = exports.postProduct = exports.getProductsBySN = exports.getProductByType = exports.getProductByNameInCategory = exports.getProductByName = exports.getProduct = exports.getProducts = void 0;
const sequelize_1 = require("sequelize");
const favorite_1 = __importDefault(require("../models/favorite"));
const product_1 = __importDefault(require("../models/product"));
const category_1 = __importDefault(require("../models/category"));
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
const getProductByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    const product = yield product_1.default.findAll({
        where: {
            name: { [sequelize_1.Op.like]: `%${name}%` }
        }
    });
    if (product) {
        res.json({ product });
    }
    else {
        res.status(404).json({ msg: "No hay ningún valor asociado" });
    }
});
exports.getProductByName = getProductByName;
const getProductByNameInCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    const array = name.split('---');
    const category = array[0];
    const search = array[1];
    const product = yield product_1.default.findAll({
        where: {
            category: category,
            name: { [sequelize_1.Op.like]: `%${search}%` }
        }
    });
    if (product) {
        res.json({ product });
    }
    else {
        res.status(404).json({ msg: "No hay ningún valor asociado" });
    }
});
exports.getProductByNameInCategory = getProductByNameInCategory;
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
        res.status(404).json({ msg: "No existe ese producto" });
    }
});
exports.getProductByType = getProductByType;
const getProductsBySN = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { SN } = req.params;
    const product = yield product_1.default.findAll({ where: { serialNumber: SN } });
    if (product) {
        res.json({ product });
    }
    else {
        res.status(404).json({ msg: "No existe ese producto" });
    }
});
exports.getProductsBySN = getProductsBySN;
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
const getProductByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    const product = yield product_1.default.findAll({
        where: {
            category: name
        }
    });
    if (product) {
        res.json({ product });
    }
    else {
        res.status(404).json({ msg: "No hay ningún valor asociado" });
    }
});
exports.getProductByCategory = getProductByCategory;
const getProductCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_1.default.findAll();
    if (category) {
        res.json({ category });
    }
    else {
        res.status(404).json({ msg: "Hubo un error con las categorías" });
    }
});
exports.getProductCategories = getProductCategories;
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