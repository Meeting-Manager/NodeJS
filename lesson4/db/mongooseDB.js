let mongoose=require('mongoose');
// const server='srv1:27017' ;
// //const mongooseDB= '212648802Miri&Tami'
const dotenv=require('dotenv');
dotenv.config()
const db=process.env.DB_CONN;

class MongooseDB{
    constructor(){
        this._connect();
    }


   async _connect() {
       try{
            await mongoose.connect(`mongodb://${db}`)
            console.log(`Database connection successful`);
       }
        catch(err){
            console.error(`Database connection error`);
        }
    }
     
}

module.exports = new MongooseDB();
