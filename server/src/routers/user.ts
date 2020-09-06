import {Router,Request,Response} from "express"
import {check} from "express-validator"
import multer from "multer"
import auth from "../../middleWere/auth"
import {userController} from '../contloller/user' 
import user from "../classes/user"

const upload = multer({
    storage:multer.memoryStorage(),
    fileFilter(req:Request,file:Express.Multer.File,cb){
        // if(!file.originalname.match(/\.(png|jpg|jpeg|PNG)$/)){
           if(!file.mimetype.startsWith('image')){ 
            return cb(new Error('you must upload image'))
        }
         return cb(null,true)
    }
})
const userRouter = Router()
const controller:userController = new userController()


//register 
//POST

userRouter.post('/user',[
    check('name',"Name is required").not().isEmpty(),
    check('email',"email is required").isEmail(),
    // check('password,"password must more then 6 character').isLength({min:6})
    ],upload.single('image'),controller.AddUser
)

//login 
//post

userRouter.post('/login',[
    check('email',"please enter valid email").isEmail(),
    check('password',"invalid password").isLength({min:6})
],controller.signin)



userRouter.delete('/user',auth,controller.deleteUser)
userRouter.patch('/user',auth,controller.updataUser)
export default userRouter
