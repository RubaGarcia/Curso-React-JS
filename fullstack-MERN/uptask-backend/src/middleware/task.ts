import { NextFunction, Response, Request } from "express";
import Task, { ITask } from "../models/Task";
import { IPVersion } from "express-validator/lib/options";



declare global{
    namespace Express{
        interface Request{
            task:ITask
        }
    }
}



export async function taskExists(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error("Task not found");
      return res.status(404).json({ error: error.message });
    }
    req.task = task;
    next();
  } catch (error) {
    return res.status(500).json({ error: "Hubo un error-middleware-TASK" });
  }
}

export function taskBelongsToProject(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    if (req.task.project.toString() !== req.project.id.toString()) {
        const error = new Error("Bad request---middleware--task doesn't belong to project");
        return res.status(400).json({ error: error.message });
      }
    next()
}
