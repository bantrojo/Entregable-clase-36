const express=require('express');
const productRouter = require('./routes/productRouter');
const cartRouter=require('./routes/cartRouter');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const dotenv=require('dotenv').config();
const app=express();
//import


const admin=true;
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname +'/public'));
app.use(cookieParser());
app.use('/',productRouter);
app.use('/',cartRouter);

///login 
app.use(session({
    secret:"15432",
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:30000
    }
}))

app.get('/login',(req,res)=>{
    if(req.session.username) return res.send("You are already loged")
    let {nombre}=req.query;
    req.session.username=nombre;
    res.send("Welcome "+nombre);
})




const PORT=process.env.PORT||8080
app.listen(PORT,(req,res)=>console.log(`Listening on PORT ${PORT}`));