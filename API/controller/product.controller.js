const Product=require('../models/product.model')
const mongoose=require('mongoose')

exports.get_All=(req,res,next)=>{
    
    Product.find().exec().then(result=>{
      
        if(result){
            const response={
                count :result.length,
                products :result.map(doc =>{
                    return {
                        name :doc.name,
                        price :doc.price,
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
   
}

exports.product_save=(req,res,next)=>{
    
    const product =new Product({
        _id:new mongoose.Types.ObjectId(),
        name :req.body.name ,
        price :req.body.price
    })
    //save data
    product.save().then(result=>{
        console.log(result)
        const response={
            count :1,
            products : 
                  {
                    name :result.name,
                    price :result.price,
                    _id:result._id ,
                    request:{
                        url :'http://localhost:3000/products/'+result._id ,
                        type:'POST'
                    }
                }
        }
        res.status(200).json({response});
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
           });
    }) 
}

exports.get_single_product=(req,res,next)=>{
    var id=req.params.productID

    //finding data by id
    Product.findById(id).then(result=>{
        console.log(result)
       
        if(result){
            const response={
                count :1,
                products : 
                      {
                        name :result.name,
                        price :result.price,
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
                message:'product don t exist'
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

exports.update_product=(req,res,next)=>{
    var id=req.params.productID
    const updateOps={}
    for( ops of req.body){
        updateOps[ops.propName]=ops.value
    }

    res.update({_id:id},{$set:updateOps}).exec()
    .then(result=>{
        console.log(result)
        res.status(200).json({result})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            message:err
        })
    })
}

exports.delete_product=(req,res,next)=>{
    var id=req.params.productID
   
    Product.remove({_id:id}).exec().then(result=>{
        console.log(result)
       if(result){
       const response={
            count :1,
            products :   {
                    name :result.name,
                    price :result.price,
                    _id:result._id ,
                    request:{
                        type:'DELETE'
                    }
                }
        }
            res.status(200).json({result});
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