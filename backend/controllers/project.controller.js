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
        if(!loggedInUser){
            return res.status(404).json({message:'Logged in user not found'});
        }
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

export const getAllProjects=async(req,res)=>{
    try{
        const loggedInUser=await userModel.findOne(
            {email:req.user.email}
        );
        if(!loggedInUser){
            return res.status(404).json({message:'Logged in user not found'});
        }

        const projects=await projectService.getAllProjectsByUserId({
            userId:loggedInUser._id
        });

        return res.status(200).json({projects});
    }catch(err){
        console.log(err);
        res.status(400).json({error:err.message||'Failed to fetch projects'})
    }
}

export const addUserToProject=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const {projectId,users,userId}=req.body;
        const loggedInUser=await userModel.findOne({
            email:req.user.email
        })
        const project=await projectService.addUserToProject({
            projectId,
            users,
            userId:loggedInUser._id
        });
        return res.status(200).json({project});

    }catch(err){
        console.log(err);
        res.status(400).json({error:err.message||'Failed to add user to project'})
    }
}

export const getProjectById=async(req,res)=>{
    const {projectId}=req.params;
    try{
        const project = await projectService.getProjectById({projectId});
        return res.status(200).json({project});
    }catch(err){
        console.log(err);
        res.status(400).json({error:err.message||'Failed to fetch project'});
    }
}