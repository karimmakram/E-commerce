import mongoose from "mongoose"
import user from "../classes/user"
import bcrypt from "bcrypt"
import jsonwebtoken from"jsonwebtoken"

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:Buffer
    },
    role:{
        type:Number,
        default:0
    },
    history:{
        type:Array,
        default:[]
    },
    tokens:
        [{
            token:{
                type:String,
                required:true
            }
        }]
},{timestamps:true})

userSchema.pre('save',async function(next){
    const user:any = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
        console.log("pass");
        
    }
    next()
})

userSchema.methods.generateAuthToken =async function(){
    const user = this 
    const token = jsonwebtoken.sign({_id:user._id.toString()},String(process.env.secret))
    console.log(token);
    user.tokens =  user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.methods.toJSON =function(){
    const user = this
    const userData = user.toObject()
    delete userData.tokens
    delete userData.image
    delete userData.password
    return userData
}

const Users = mongoose.model<user>('users',userSchema)
export default Users