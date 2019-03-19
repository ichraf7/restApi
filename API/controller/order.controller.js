const Order =require('../models/order.model')
const Product =require('../models/product.model')
const mongoose=require('mongoose')

exports.orders_get_All=(req,res,next)=>{
    Order.find().populate('product').exec().then(result=>{
    console.log(result)
        if(result){
            const response={
                count :result.length,
                Orders :result.map(doc =>{
                    return {
                        productID :doc.product,
                        quantity :doc.quantity,
                        _id:doc._id ,
                        request:{
                            url :'http://localhost:3000/products/'+doc._id ,
                            type:'GET'
                        }
                    }
    
                })
            }
            console.log(response)
            res.status(200).json({response});
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            message:err||'error has been occured while retreiving data'
        })
    })
};
exports.Orders_create=(req,res,next)=>{

    Product.findById(req.body.product).exec().then(result=>{
        console.log(result)
        if (result){
            const order=new Order({
                quantity:req.body.quantity ,
                product :req.body.product,
                _id:new mongoose.Types.ObjectId(),
            })
            order.save()
            .then(result=>{
                res.status(200).json({order});
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({ message:err||'error has been occured while saving data'})
            })
        }
        else if(!result){
         res.status(404).json({ message:'product don t exist'})
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({ message:err||'error has been occured while finding data'})
    })
}

exports.order_get_single=(req,res,next)=>{
    var id=req.params.orderID
 
    Order.findById(id).exec().then(result=>{
        console.log(result)
       
        if(result){
            const response={
                count :1,
                order: 
                      {
                        productID :result.product,
                        quantity :result.quantity,
                        _id:result._id ,
                        request:{
                            url :'http://localhost:3000/products/'+result._id ,
                            type:'GET'
                        }
                    }
            }
            res.status(200).json({response});
        }
        else{
            res.status(404).json({
                message:'order don t exist'
               });
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
}
exports.Orders_delete=(req,res,next)=>{
    var id=req.params.orderID
    Order.remove({_id:id}).exec().then(result=>{
       console.log(result)
       if(result){
       const response={
            count :1,
            Orders :{
            
                    productID :result.product,
                    quantity :result.quantity,
                    _id:result._id ,
                    request:{
                        type:'delete'
                    }
                }
        }
            res.status(200).json({response});
        }
        else{
            res.status(404).json({
                message:' product with id'+id+'don t exists',
               });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
           });
    })
}

exports.Orders_update=(req,res,next)=>{
    var id=req.params.orderID
    res.status(200).json({
     message:' Update work',
     ID:id
    });
};