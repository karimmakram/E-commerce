import mongoose from 'mongoose'
import {prop,Typegoose,ModelType,InstanceType} from 'typegoose'

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

    @prop({maxlength:4})
    images?:[{
        image?:Buffer
    }]
}   

export const   productModel = new Product().getModelForClass(Product)


