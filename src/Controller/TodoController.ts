import { Request,Response } from "express";
import { TaskManager } from "../Model/TodoModel";

let manager = new TaskManager();

export const loadHome = async(req:Request,res:Response)=>{
    try {
        let tasks = manager.getAlltask()
        res.render('todo',{tasks})
    } catch (error) {
        console.log(error);
        
    }
}

export const addTask = async(req:Request,res:Response)=>{
    try {
        
        let title:string = req.params.title;
        manager.addTask(title)
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        
    }
}

export const deleteTask = async(req:Request,res:Response)=>{
    try {
        let id:number =parseInt(req.params.taskId);
        manager.deleteTask(id);
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        
    }
}

export const completeTask = async(req:Request,res:Response)=>{
    try {
        let id: number =parseInt(req.params.taskId);
        manager.completeTask(id);
        res.sendStatus(200)
    } catch (error) {
        
    }
}

export const editTask = async(req:Request,res:Response)=>{
    try {        
        let id: number = parseInt(req.params.id);
        let title :string = req.params.title;
        manager.editTask(id,title);
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        
    }
}