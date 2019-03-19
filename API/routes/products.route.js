const express =require('express')
const routes = express.Router()
const product_controller=require('../controller/product.controller')

routes.get('/',product_controller.get_All);

routes.post('/',product_controller.product_save);

routes.get('/:productID',product_controller.get_single_product);


routes.patch('/:productID',product_controller.update_product);

routes.delete('/:productID',product_controller.delete_product);
module.exports=routes