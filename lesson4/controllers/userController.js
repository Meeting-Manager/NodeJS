const { ObjectId } = require('mongodb');
// const db=require('../db/db');
const db1=require('../db/mongooseDB');

module.exports.getAllUsers=async function(req,res){
   
    res.send(await db.getDB().collection('users').find().toArray());
};

module.exports.getUserById=async function(req,res){
   
    res.send(await db.getDB().collection('users').findOne(ObjectId(req.params.id)));
};
module.exports.addUser=async function(req,res){
    const{firstName,lastName}=req.body;
    const user={
        firstName:firstName,
        lastName:lastName
    };
   res.send(await db.getDB().collection('users').insertOne(user));
};

module.exports.updateUser=async function(req,res){
    try{
    const oldUser= {_id:ObjectId(req.params.id)};
    const{firstName,lastName}=req.body;
    const newUser={$set:{
        firstName,
        lastName
    }};
    
    res.send(await db.getDB().collection('users').updateOne(oldUser,newUser) +'success!');
    }
    catch(error){
        next(error)
        }
};
module.exports.deleteUser=async function(req,res){
   
    res.send(await db.getDB().collection('users').deleteOne(req.body));
};



