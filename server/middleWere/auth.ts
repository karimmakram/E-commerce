import Users from "../src/model/user"
import user from "../src/classes/user"
import jsonwebtoken  from "jsonwebtoken" 
import {Request,Response,NextFunction} from "express"
declare global
{ namespace Express{
    export interface Request{
        user:user,
        token : string
 
   }
   }
}

 const auth = async (req:Request,res:Response,next:NextFunction)=>{
   try{
        if(req.header('Authorization')){
        const token =(String(req.header('Authorization'))).replace('Bearer ','')
        console.log(token);
        const data:any =jsonwebtoken.verify(token,String(process.env.secret))
        console.log(data);
        const user = await Users.findOne({_id:data._id,'tokens.token':token})
        console.log(3);
        if(!user){
            console.log(4);
            throw new Error("problem with Authorization")
        }
        req.token  = token
        req.user = user
        next()
        }else{
            throw new Error("problem with Authorization")
        }
    }
    catch(e){
        res.status(400).send(e.message)
    }

}

export default auth

