import projectModel from '../models/project.model.js';
import * as projectService from '../services/project.service.js';
import {validationResult} from 'express-validator';
import userModel from '../models/user.model.js';

export const createProject = async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const {name}=req.body;
        const loggedInUser=await userModel.findOne({email:req.user.email})
        const userId=loggedInUser._id;
    
    
        const newProject=await projectService.createProject({
            name,
            userId
        });
        res.status(201).json(newProject);
    }catch(error){
        console.log(error);
        if (error && (error.code === 11000 || error.name === 'MongoError')) {
            return res.status(409).json({message: 'Project name already exists'});
        }
        res.status(400).json({message: error.message || 'Failed to create project'});
    }
}