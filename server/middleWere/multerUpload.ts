import multer from'multer'
import {Request,Response} from 'express'

export const upload = multer({
    storage:multer.memoryStorage(),
    fileFilter(req:Request,file:Express.Multer.File,cb){
        // if(!file.originalname.match(/\.(png|jpg|jpeg|PNG)$/)){
           if(!file.mimetype.startsWith('image')){ 
            return cb(new Error('you must upload image'))
        }
         return cb(null,true)
    }
})