import {Request,Response} from 'express'
import {productModel} from '../model/products'
import {validationResult} from "express-validator"

export class productController{
    public async addProduct(req:Request,res:Response){
        try{
            if(req.user.role!==1){
                return res.status(400).json({error:`you don't have permssion to add product`})
            }else{
                let images:Buffer[]=[]
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

    public async getAllproductes(req:Request,res:Response){
        try{
            const productes =await productModel.find({})
            if(productes){
                return res.send(productes)
            }
            else 
                return res.json({message:'not have product to show'})
        }
        catch(e){
            res.status(400).json({error:e})
        }
    }
    public async deleteProduct(req:Request,res:Response){
        const _id = req.params.id
        if(req.user.role !==1)
            return res.status(400).json({message:'you dont have permession to delete product'})
        try{
            const product =await productModel.findByIdAndDelete({_id})
            if(product){
                return res.send(product.name)
            }
            res.json({message:'invalid ID'})
        }
        catch(E){
            res.status(400).json({error:E})
        }
    }
}