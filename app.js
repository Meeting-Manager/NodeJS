
const dotenv=require('dotenv');
dotenv.config();
const logging=require('./logging')
const express =require('express');
const { format } = require('express/lib/response');
const app =express();
const port=process.env.PORT;
//const user=require('./routes/user');
const user=require('./routes/UserRoutes');
const category=require('./routes/CategoryRoutes');
const order=require('./routes/OrderRoutes');
const product=require('./routes/ProductRoutes');
const path=require('path')
// const db=require('./db/db');
const db=require('./lesson4/db/mongooseDB');
const { default: mongoose } = require('mongoose');
const logger = require('./logging');
//mongoose.set("toJSON",{virtuals:true});




db._connect();

app.use(express.static("./lesson4/Static"));
app.use(express.json());
app.use('/user',user);
app.use('/category',category);
app.use('/order',order);
app.use('/product',product);
app.use((err, req, res, next) => {
    debugger;
    logger.error(err)
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
app.use((req,res)=>{
    console.error(`page not found ${req.url}`);
    res.status(404).sendFile(path.join(__dirname,'/lesson4/Static/pageNotFound.html'))

})
console.log(port)
app.listen(port,()=>{console.log('the server is up')});