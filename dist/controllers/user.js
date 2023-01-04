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
exports.deleteUser = exports.getUsers = exports.signInUser = exports.addUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name.trim() || !email.trim() || !password.trim()) {
        res.status(400).json({ msg: 'Complete los campos' });
    }
    else {
        const mail = yield user_1.default.findOne({ where: { email: email } });
        if (mail) {
            res.status(409).json({ msg: 'El usuario existe' });
        }
        else {
            const hashPass = yield bcrypt_1.default.hash(password, 10);
            const user = yield user_1.default.create({ name, email, password: hashPass });
            res.json({ user });
        }
    }
});
exports.addUser = addUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email.trim() || !password.trim()) {
        res.status(400).json({ msg: 'Complete los campos' });
    }
    else {
        const user = yield user_1.default.findOne({ where: { email: email } });
        if (user) {
            const hashPass = user.dataValues.password;
            const resUser = {
                name: user.dataValues.name,
                email: user.dataValues.email,
                role: user.dataValues.role
            };
            yield bcrypt_1.default.compare(password, hashPass)
                .then((result) => {
                if (result) {
                    const token = jsonwebtoken_1.default.sign({ email: email }, process.env.SECRET_KEY);
                    res.json({ token, resUser });
                    /* para agreagar periodo de tiempo
                    jwt.sign({email:email},
                        process.env.SECRET_KEY!, {expiresIn:'10000'}) 10 segundos medidos en milis
                    */
                }
                else
                    res.status(400).json({ msg: 'Contraseña incorrecta' });
            });
        }
        else {
            res.status(404).json({ msg: 'No existe ese usuario' });
        }
    }
});
exports.signInUser = signInUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll();
    res.json({ users });
});
exports.getUsers = getUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (user) {
        user.destroy().then(() => res.json(user));
    }
    else {
        res.status(404).json({ msg: 'No existe ese usuario' });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map