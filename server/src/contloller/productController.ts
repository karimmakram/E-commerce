import {Request,Response} from 'express'
import {productModel} from '../model/products'
import {validationResult} from "express-validator"

export class productController{
    public async addProduct(req:Request,res:Response){
        try{
            if(req.user.role!==1){
                return res.status(400).json({error:`you don't have permssion to add product`})
            }else{
                let images:Array<Buffer> =[]
                if(req.files){
                    const files:any = req.files 
                    files.forEach((file:Express.Multer.File) => {
                        images.push(file.buffer)
                    });
                }
                const {name,price,discount}:{name:string,price:Number,discount:Number}=req.body
                const product = new productModel({name,price,discount,images})
                await product.save()
                res.send(product)
            }
        }
        catch(e){
            res.status(400).json({error:e.message});
            
        }
    }
}