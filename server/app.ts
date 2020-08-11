import express from "express"
import cors from "cors"
const app = express()
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("test")
})

app.use((req,res)=>{
    res.send("Page Not found")
})

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log("server run from port ",PORT);
    
})
