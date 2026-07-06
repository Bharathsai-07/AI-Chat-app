import jwt from 'jsonwebtoken';
import redisClient from '../services/redis.service.js';

export const authUser=async(req,res,next)=>{
    try{
        const token=req.cookies.token||req.headers.authorization.split(' ')[1];
        console.log(token);
        if(!token){
            return res.status(401).send({error:'Unauthorized user'});
        }
        const isBlacklisted=await redisClient.get(token);
        if(isBlacklisted){
            res.cookies.clear('token');
            return res.status(401).send({error:'Unauthorized user'});
        }
        const decoded=jwt.verify(token,process.env.JWT);
        req.user=decoded;
        next();    
    }catch(err){
    res.status(401).send({error:'Unauthorized user'})
}
}