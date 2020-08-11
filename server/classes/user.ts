import mongoose from "mongoose"
import jsonwebtoken from "jsonwebtoken";

class user extends mongoose.Document{
  async  generateAuthToken(){
            const user = this 
            const token = jsonwebtoken.sign({_id:user._id},String(process.env.secret_token))
            console.log(token);
            return token
        
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
    
}

export default user