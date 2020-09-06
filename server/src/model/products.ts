import mongoose from 'mongoose'
import {prop,Typegoose,ModelType,InstanceType,instanceMethod} from 'typegoose'
import { ObjectID } from 'bson';

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

    @prop()
    images?:[{
        image?:Buffer
        }
    ]
}   
export const   productModel = new Product().getModelForClass(Product)


