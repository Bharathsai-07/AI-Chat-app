import jwt from 'jsonwebtoken';
import redisClient from '../services/redis.service.js';

export const authUser=async(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization || '';
        const token=req.cookies.token||authHeader.split(' ')[1];
        if(!token){
            return res.status(401).send({error:'Unauthorized user'});
        }

        try {
            const isBlacklisted=await redisClient.get(token);
            if(isBlacklisted){
                res.clearCookie('token');
                return res.status(401).send({error:'Unauthorized user'});
            }
        } catch (redisError) {
            console.warn('Redis blacklist check skipped:', redisError.message);
        }

        const decoded=jwt.verify(token,process.env.JWT);
        req.user=decoded;
        next();    
    }catch(err){
    res.status(401).send({error:'Unauthorized user'})
}
}