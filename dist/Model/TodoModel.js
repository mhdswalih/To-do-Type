"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManager = exports.Task = void 0;
class List {
    constructor(id, title, status) {
        this.id = id;
        this.title = title;
        this.status = status;
    }
}
class Task extends List {
}
exports.Task = Task;
class TaskManager {
    constructor() {
        this.tasks = [];
        this.nextId = 1;
    }
    addTask(title) {
        const task = new Task(this.nextId++, title, 'pending');
        this.tasks.push(task);
        return task;
    }
    getAlltask() {
        return this.tasks;
    }
    getTaskById(id) {
        return this.tasks.find((item) => item.id === id);
    }
    editTask(id, title) {
        const task = this.getTaskById(id);
        if (task) {
            task.title = title;
        }
    }
    completeTask(id) {
        const task = this.getTaskById(id);
        if (task) {
            task.status = task.status === 'done' ? 'pending' : 'done';
        }
    }
    deleteTask(id) {
        const index = this.tasks.findIndex((item) => item.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }
}
exports.TaskManager = TaskManager;
