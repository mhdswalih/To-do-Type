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
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTask = exports.completeTask = exports.deleteTask = exports.addTask = exports.loadHome = void 0;
const TodoModel_1 = require("../Model/TodoModel");
let manager = new TodoModel_1.TaskManager();
const loadHome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tasks = manager.getAlltask();
        res.render('todo', { tasks });
    }
    catch (error) {
        console.log(error);
    }
});
exports.loadHome = loadHome;
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params, 'this is from controller');
        let title = req.params.title;
        manager.addTask(title);
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.addTask = addTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = parseInt(req.params.id);
        manager.deleteTask(id);
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteTask = deleteTask;
const completeTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.body.id;
        manager.completeTask(id);
        res.sendStatus(200);
    }
    catch (error) {
    }
});
exports.completeTask = completeTask;
const editTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = parseInt(req.params.id);
        let title = req.params.title;
        manager.editTask(id, title);
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.editTask = editTask;
