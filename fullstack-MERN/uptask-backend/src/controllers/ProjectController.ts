import type { Request, Response } from 'express'    
import Project from '../models/Project'

export class ProjectController{


    static createProject = async (req:Request, res: Response) => {

        const project = new Project(req.body)

        console.log(req.body)
        // res.send('proyecto creado')
        try {
            await project.save()
            res.send('proyecto creado')
        } catch (error) {
            console.log(error)
            // res.status(500).send('An error has occurred')
            
        }
    }



    static getAllProjects = async (req:Request, res: Response) => {
        try {
            const projects = await Project.find({})
            res.json(projects)
        } catch (error) {
            console.log(error)
            // res.status(500).send('An error has occurred')
        }
    }


    static getProjectById = async (req:Request, res: Response) => {
        // console.log(req.body)
        const{id} = req.params
        // console.log(id)
        try {
            const project = await (await Project.findById(id)).populate('tasks')
    
            if(!project){
                const error = new Error('Project not found')
                return res.status(404).json({error: error.message})
            
            }
    
            res.json(project)
        } catch (error) {
            console.log(error)
            res.status(500).send('An error has occurred')
        }
    }

    static updateProject = async (req:Request, res: Response) => {
        // console.log(req.body)
        const{id} = req.params
        // console.log(id)
        try {
            const project = await Project.findByIdAndUpdate(id, req.body)
            if(!project){
                const error = new Error('Project not found')
                return res.status(404).json({error: error.message})
            }
            
            await project.save()
            res.send ('Project updated')
        } catch (error) {
            console.log(error)
            res.status(500).send('An error has occurred')
        }
    }

    static deleteProject = async (req:Request, res: Response) => {
        // console.log(req.body)
        const{id} = req.params
        // console.log(id)
        try {
            const project = await Project.findById(id)
            
            if(!project){
                const error = new Error('Project not found')
                return res.status(404).json({error: error.message})
            }
            await project.deleteOne()

            // await project.save()
            res.send ('Project deleted')
        } catch (error) {
            console.log(error)
            res.status(500).send('An error has occurred')
        }
    }

}