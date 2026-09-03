import projectModel from '../models/project.model.js';
import userModel from '../models/user.model.js';
import mongoose from 'mongoose';

export const createProject = async ({
    name,userId
})=>{
    if(!name){
        throw new Error('Project name is required');
    }
    if(!userId){
        throw new Error('User ID is required');
    }
    const project =await projectModel.create({
        name,
        users:[userId]
    })
    return project;
}

export const getAllProjectsByUserId=async({userId})=>{
    if(!userId){
        throw new Error('UserId is required');
    }
    const allUserProjects=await projectModel.find({
        users:userId
    }).populate('users');
    return allUserProjects;
}

export const addUserToProject=async({projectId,users,userId})=>{
    if(!projectId){
        throw new Error('ProjectId is required');
    }
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error('Invalid projectId');
    }
    if(!users){
        throw new Error('Users is required');
    }
    if(!Array.isArray(users)||users.some(id=> !mongoose.Types.ObjectId.isValid(id))){
        throw new Error('Invalid userId in users array')
    }
    if(!userId){
        throw new Error('UserId is required');
    }

    const project=await projectModel.findOne({
        _id:projectId,
        users:userId
    })
    if(!project){
        throw new Error('User does not belong to this project');
    }
    const updatedProject=await projectModel.findOneAndUpdate({
        _id:projectId
    },{
        $addToSet:{
            users:{
                $each:users
            }
        }
    },{
        new :true
    })
    return updatedProject;
}

export const removeUserFromProject=async({projectId,userToRemoveId,userId})=>{
    if(!projectId){
        throw new Error('ProjectId is required');
    }
    if(!mongoose.Types.ObjectId.isValid(projectId) || !mongoose.Types.ObjectId.isValid(userToRemoveId)){
        throw new Error('Invalid projectId or userId');
    }
    if(!userId){
        throw new Error('UserId is required');
    }

    const project=await projectModel.findOne({
        _id:projectId,
        users:userId
    });
    if(!project){
        throw new Error('User does not belong to this project');
    }

    return projectModel.findOneAndUpdate({
        _id:projectId
    },{
        $pull:{users:userToRemoveId}
    },{
        new:true
    }).populate('users');
}

export const getProjectById=async({projectId})=>{
    if(!projectId){
        throw new Error('ProjectId is required')
    }
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error('Invalid project');
    }
    const project =await projectModel.findOne({
        _id:projectId
    }).populate('users')
    return project;
}