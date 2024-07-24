import type { Request, Response } from "express";
import Task from "../models/Task";
import Project from "../models/Project";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      task.project = req.project.id;

      req.project.tasks.push(task.id);

      res.send("tarea creada correctamente");
      await Promise.allSettled([task.save(), req.project.save()]);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).send("Internal Server Error");
    }
  };

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project.id }).populate(
        "project",
      );
      res.json(tasks);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).send("Internal Server Error");
    }
  };

  static getTaskById = async (req: Request, res: Response) => {
    try {
      res.json(req.task);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).send("Internal Server Error");
    }
  };
  static updateTask = async (req: Request, res: Response) => {
    try {
      req.task.set(req.body);
      await req.task.save();
      res.send("Task updated");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }


  static deleteTask = async (req: Request, res: Response) => {
    try {
      
      req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task.id.toString())
    
      await Promise.allSettled([req.task.deleteOne(), req.project.save()]);

      res.send("Task removed");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  static updateStatus = async (req: Request, res: Response) => {
    try {
      
      const { status} =req.body
      req.task.status = status
      
      await req.task.save()

      res.send("Task status updated");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

}