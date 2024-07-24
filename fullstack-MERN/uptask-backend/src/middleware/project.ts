import { NextFunction, Response, Request } from "express";
import Project, { IProject } from "../models/Project";
import { IPVersion } from "express-validator/lib/options";



declare global{
    namespace Express{
        interface Request{
            project:IProject
        }
    }
}



export async function projectExists(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      const error = new Error("Project not found");
      return res.status(404).json({ error: error.message });
    }
    req.project = project;
    next();
  } catch (error) {
    return res.status(500).json({ error: "Hubo un error---middleware-PROJECT" });
  }
}
