const express =require('express')
const app=express()
const morgan=require('morgan')
const bodyParser=require('body-parser')
const dbConfig =require('./API/config/database.config');
const mongoose =require('mongoose');

//importing routes which will handle requests
const productRoutes=require('./API/routes/products.route')
const orderRoutes=require('./API/routes/orders.route')
const userRoutes=require('./API/routes/user.routes')
//midelware that will log request
app.use(morgan('dev'))
//to parse URL

app.use(bodyParser.urlencoded({extended:true}))
//to parse JSON
app.use(bodyParser.json())

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//handling  cros
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin ,X-Requested-with, Content-type ,Accept ,Authorization')
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,GET,DELETE')
        return res.status(200).json({})
    }
 next()   

})


//using routes to handle req
app.use('/products' ,productRoutes);
app.use('/order',orderRoutes);
app.use('/user',userRoutes)
//handle error , bad routes ..
app.use((req,res,next)=>{
    const error=new Error('Not found');
    error.status=404;
    next(error);
})

app.use((error,req,res,next)=>{
res.status(error.status || 500).json({
    error:{message: error.message }
})
})
module.exports=app