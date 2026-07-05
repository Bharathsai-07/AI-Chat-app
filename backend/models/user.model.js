import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        minLength:[6,'must be 6 chars'],
        maxLength:[50,'no longer than 50 chars']
    },
    password:{
        type:String,
        select:false,
    }
})
userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}
userSchema.methods.isValidPassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateJWT=function(){
    return jwt.sign({email:this.email},process.env.JWT);
}

const User=mongoose.model('user',userSchema);

export default User;