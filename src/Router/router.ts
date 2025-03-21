import { Router } from "express";
import * as TodoController from '../Controller/TodoController';


const router = Router();
router.get('/',TodoController.loadHome)
router.post('/add-task/:title',TodoController.addTask);
router.delete('/delete-task/:taskId',TodoController.deleteTask);
router.patch('/complete-task/:taskId',TodoController.completeTask);
router.put('/edit-task',TodoController.editTask);

export default router;

