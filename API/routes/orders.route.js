const express =require('express')
const routes = express.Router()
const Order =require('../models/order.model')
const mongoose=require('mongoose')
const OrdersController=require('../controller/order.controller')

routes.get('/',OrdersController.orders_get_All)
 
//saving data

routes.post('/',OrdersController.Orders_create);

//getting single data
routes.get('/:orderID',OrdersController.order_get_single);

routes.patch('/:orderID',OrdersController.Orders_update);

routes.delete('/:orderID',OrdersController.Orders_delete)
module.exports=routes