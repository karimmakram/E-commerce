import {Router,Request,Response} from "express"
import {check, validationResult} from "express-validator"
import multer from "multer"
import Users from "../model/user"
import { NextFunction } from "connect"
import { SignCallback } from "jsonwebtoken"
import { arch } from "os"

const upload = multer({
    fileFilter(req:Request,file:Express.Multer.File,cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg|PNG)$/)){
            return cb(new Error('you must upload image'))
        }
         return cb(null,true)
    }
})
const userRouter = Router()

//register 
//POST

userRouter.post('/register',[
    check('name',"Name is required").not().isEmpty(),
    check('email',"email is required").isEmail(),
    // check('password,"password must more then 6 character').isLength({min:6})
    ],upload.single('image'),
    async(req :Request,res:Response)=>{
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).send(error);    
        }

        const {name,email,password}:{name:string,email:string,password:string} = req.body
        console.log(1);
        try{
            const user = await Users.findOne({email})
            if(user){
              res.status(400).send({error:"user exist"})
            }else{
                console.log(2);
                let token
                if(req.file){
                    console.log(3);
                    const image :Buffer = req.file.buffer
                    const user =new Users({email,password,name,image})
                    await user.save()
                }else{
                console.log(4);
                const user =new Users({email,password,name}) 
                await user.save()
                } 
                console.log(5);
                return res.status(200).send({msg:"user Added",token})
            }
        }
        catch(e){
            console.log(6);
            res.status(500).send({error:e.massege})
        }

    }
)

export default userRouter
