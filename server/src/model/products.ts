import mongoose from 'mongoose'
import {prop,Typegoose,ModelType,InstanceType,instanceMethod, arrayProp} from 'typegoose'


class Product extends Typegoose{
    @prop({
        required:true,
        trim:true,   
    })
    name?:string;

    @prop({
        required:true,
        min:1
    })
    price?:Number

    @prop({
        required:false,
        min:0,
        max:100,
        default:0
    })
    discount?:Number

    @arrayProp({_id:true,items:mongoose.Types.Buffer})
    images?:Buffer[]

    @instanceMethod
    toJSON(this:InstanceType<Product>){
        const data = this 
        const product = data.toObject()
        delete product.images
        return product
    }
}   
export const   productModel = new Product().getModelForClass(Product)


