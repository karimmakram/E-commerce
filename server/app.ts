import express from "express"
import cors from "cors"
import "./db/db.ts"
import userRouter from "./src/routers/user"
import {productRouters} from "./src/routers/productRouters"


const app = express()
app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(productRouters)


app.use((req,res)=>{
    res.send("Page Not found")
})

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log("server run from port ",PORT);
    
})
