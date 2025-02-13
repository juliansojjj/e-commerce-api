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
exports.oAuth = exports.deleteUser = exports.getUsers = exports.signInUser = exports.verifyUser = exports.checkVerifyUser = exports.addUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name.trim() || !email.trim() || !password.trim()) {
        res.status(400).json({ msg: 'Complete los campos' });
    }
    else {
        let transport = nodemailer_1.default.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "cfa6b0e9678646",
                pass: "ff07a70726955f"
            }
        });
        const mail = yield user_1.default.findOne({ where: { email: email } });
        if (mail) {
            res.status(409).json({ msg: 'El usuario existe' });
        }
        else {
            const hashPass = yield bcrypt_1.default.hash(password, 10);
            const user = yield user_1.default.create({ name, email, password: hashPass, oAuth: 0, verified: 0 });
            res.json({ user });
            const message = {
                from: 'noreply@flagon.com',
                to: email,
                subject: 'Verifique su cuenta',
                text: `Verificá tu cuenta para poder usarla:\nhttp://localhost:3000/verify/${user === null || user === void 0 ? void 0 : user.dataValues.id}?external=true`,
                html: `
                <body style="font-family:Trebuchet MS">
                    <h2>Flagon</h2>
                    <h3>Verificá tu nueva cuenta para empezar</h3>
                    <a href="http://localhost:3000/verify/${user === null || user === void 0 ? void 0 : user.dataValues.id}?external=true">En este link</a>
                </body>`
            };
            transport.sendMail(message, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(info);
                }
            });
        }
    }
});
exports.addUser = addUser;
const checkVerifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (user) {
            res.json(user);
        }
        else
            return res.status(404).json({ msg: 'No existe tal usuario' });
    }
    catch (err) {
        console.log(err);
    }
});
exports.checkVerifyUser = checkVerifyUser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (user) {
            if (user.dataValues.verify == 1) {
                return res.status(404).json({ msg: 'El usuario ya está verificado' });
            }
            else
                yield user.update({ verified: 1 })
                    .then(() => res.json(user));
        }
        else
            return res.status(404).json({ msg: 'No existe tal usuario' });
    }
    catch (err) {
        console.log(err);
    }
});
exports.verifyUser = verifyUser;
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
                id: user.dataValues.id,
                name: user.dataValues.name,
                email: user.dataValues.email,
                role: user.dataValues.role
            };
            yield bcrypt_1.default.compare(password, hashPass)
                .then((result) => {
                if (result) {
                    res.json(resUser);
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
const oAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* dos casos de REGISTRO
    1- se registra con oAuth y YA tennia una cuenta con ese mail: va a vincular el usuario con el oauth.
    2- se registra con oAuth y NO tenia una cuenta antes: se crea una cuenta especial

    ÚNICO caso de login
    - verifica si existe la cuenta, SINO la crea, y vamos al paso de arriba
    */
    const { name, email } = req.body;
    const user = yield user_1.default.findOne({ where: { email: email } });
    if (user) {
        yield user.update({ oAuth: 1 })
            .then(() => res.json({
            id: user.dataValues.id,
            name: user.dataValues.name,
            email: user.dataValues.email,
            role: user.dataValues.role
        }));
    }
    else {
        const user = yield user_1.default.create({ name, email, password: '@', oAuth: 1, role: 'client' });
        res.json({
            id: user.dataValues.id,
            name: user.dataValues.name,
            email: user.dataValues.email,
            role: user.dataValues.role
        });
    }
});
exports.oAuth = oAuth;
//# sourceMappingURL=user.js.map