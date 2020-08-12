import mongoose from "mongoose"
import jsonwebtoken from "jsonwebtoken";
import Users from "../model/user"
import bcrypt from "bcrypt"
class user extends mongoose.Document{
     
    static async login(email:string,password:string){
        const user =await Users.findOne({email})
        if(!user){
            throw new Error("unable to login")
        }
    
       const isMatch:boolean = await bcrypt.compare(password,user.password)
       if(!isMatch){
        throw new Error("unable to login")
       }
       return user
    }
    name:string
    email:string
    password:string
    image:Buffer
    role:number
    history:[]
    tokens:[{token:string}]
    constructor(name:string,email:string,password:string,image:Buffer,role:number,history:[],tokens:[{token:""}]){
        super()
        this.name = name
        this.email = email
        this.password= password
        this.role = role
        this.image =image
        this.history = history
        this.tokens = tokens
    }

    public  generateAuthToken = async()=>{}

    
}

export default user