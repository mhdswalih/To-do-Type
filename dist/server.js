"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const router_1 = __importDefault(require("./Router/router"));
let port = 4200;
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use('/', router_1.default);
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "./view"));
app.use((req, res, next) => {
    console.log(req.body);
    next();
});
app.use(express_1.default.static(path_1.default.join(__dirname, "../src/public")));
app.use(express_1.default.static(path_1.default.join(__dirname, "../dist/public")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(((0, morgan_1.default)('dev')));
app.listen(port, () => {
    console.log(`server running`);
});
