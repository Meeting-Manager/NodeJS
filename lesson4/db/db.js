const {MongoClient} = require('mongodb');
//const {mongodb} = require('mongodb');
const connectionString= "mongodb://srv1:27017";

//const client = new MongoClient(connectionString);

class dataBase{
    
   
    constructor(){
      console.log('init db');
    }  
    
   async connect(){
       const client = new MongoClient(connectionString, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
         });
   
       let connected = await client.connect();

       this.db = connected.db("212648802Miri&Tami");
       
       console.log("DB Connected!")
   };
   
     getDB(){
         return this.db;
     }
   }
   
   
     module.exports = new dataBase();