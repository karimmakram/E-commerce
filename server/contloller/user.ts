import {Request,Response} from 'express'
import Users from '../model/user'
import userclass from "../classes/user"
import {validationResult} from "express-validator"
export class userController {
     public  async AddUser(req:Request,res:Response){
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).send(error);    
        }
        const {name,email,password}:{name:string,email:string,password:string} = req.body
        try{
            const user = await Users.findOne({email})
            if(user){
              res.status(400).send({error:"user exist"})
            }else{
                let token
                if(req.file){
                    const image :Buffer = req.file.buffer
                    const user =new Users({email,password,name,image})
                    await user.save()
                }else{
                const user =new Users({email,password,name}) 
                await user.save()
                }
                return res.status(200).send({msg:"user Added",token})
            }
        }
        catch(e){
            res.status(500).send({error:e.massege})
        }

    }

    public async signin (req:Request,res:Response){
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).send(error)
        }
        try{
            const {email,password}:{email:string,password:string}=req.body
            const user = await userclass.login(email,password)
            const token =await user.generateAuthToken()
            res.status(200).send({user,token})
        }catch(e){
            res.status(500).send({error:e.message})
        }
    }
}