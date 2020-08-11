import mongoose from "mongoose"
const db :string = String(process.env.Db_url)
mongoose.connect(db,
{
    useNewUrlParser:true,useFindAndModify:false,useCreateIndex:true,useUnifiedTopology:true
})