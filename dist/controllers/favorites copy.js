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
exports.deleteFavorite = exports.postFavorite = exports.getItemFavorites = exports.getUserFavorites = void 0;
const favorite_1 = __importDefault(require("../models/favorite"));
const getUserFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const favorite = yield favorite_1.default.findAll({ where: { user_id: id } });
    if (favorite) {
        res.json({ favorite });
    }
    else {
        res.status(404).json({ msg: "No existe ese usuario" });
    }
});
exports.getUserFavorites = getUserFavorites;
const getItemFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = id.split('-');
    const user_id = data[0];
    const item_id = data[1];
    console.log(user_id, item_id);
    const favorite = yield favorite_1.default.findOne({ where: { user_id: user_id, item_id: item_id } });
    if (favorite) {
        res.json('TRUE');
    }
    else {
        res.status(404).json('FALSE');
    }
});
exports.getItemFavorites = getItemFavorites;
const postFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (!body.user_id || !body.item_id)
        res.status(400).json('Rellene los campos de usuario e item');
    else
        try {
            const product = yield favorite_1.default.create(body);
            res.json({ product });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ msg: "Revise the error" });
        }
});
exports.postFavorite = postFavorite;
const deleteFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = id.split('-');
    const user_id = data[0];
    const item_id = data[1];
    console.log(user_id, item_id);
    try {
        const favorite = yield favorite_1.default.findOne({ where: { user_id: user_id, item_id: item_id } });
        if (favorite) {
            favorite.destroy().then(() => res.json(favorite));
        }
        else
            return res.status(404).json({ msg: 'No le dio like a esto antes' });
    }
    catch (err) {
        console.log(err);
    }
});
exports.deleteFavorite = deleteFavorite;
//# sourceMappingURL=favorites%20copy.js.map