import {Router,Request,Response} from "express"
import {check} from "express-validator"
import {upload} from '../../middleWere/multerUpload'
import auth from "../../middleWere/auth"
import {productModel} from '../model/products'
import {productController} from '../contloller/productController'


export const productRouters = Router()
const productCn =new productController()
productRouters.post('/product',auth,upload.array('images',4),productCn.addProduct)
productRouters.get('/product',auth,productCn.getAllproductes)
productRouters.delete('/product/:id',auth,productCn.deleteProduct)