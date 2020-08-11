import Users from "../model/user"
import jsonwebtoken  from "jsonwebtoken" 
import bcrypt from "bcrypt"
import {Request,Response,NextFunction} from "express"

export const auth = async (req:Request,res:Response,next:NextFunction)=>{
   try{
        if(req.header('Authorization')){
        const token =(String(req.header('Authorization'))).replace('Bearer ','')
        const data = jsonwebtoken.verify(token,String(process.env.secret))
        const user = await Users.findOne({_id:data._id,'tokens.token':token})
        if(!user){
            throw new Error("problem with Authorization")
        }
        req.token = token
        req.user = user
        next()
        }else{
            throw new Error("problem with Authorization")
        }
    }
    catch(e){
        throw new Error(e)
    }

}


