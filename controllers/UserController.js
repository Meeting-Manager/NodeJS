const UserModel = require('../models/UserModel.js');
const logger= require('../logging')
/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */

 /**
     * UserController.list()
     */
module.exports.list = async function (req, res,next) {
    try{
     const Users=await UserModel.find();
     res.send(Users);
    }
    catch(err){
        next(err)
    };
}

    /**
     * UserController.show()
     */
     module.exports.show=async function (req, res,next) {
      try{

      // logger.info('its a problem!');
        const name = req.params.name;
        const password = req.params.password;
        const user=await UserModel.findOne({"name": name, "password":password}).populate('orders');
        //const user2=await UserModel.findOne({"name": name, "password":password}).populate({path:'orders',select:"sum"});
        res.send(user)
      }
        catch(err){
            next(err)
        }  
       
     }
    /**
     * UserController.create()
     */
     module.exports.create=async function (req, res,next) {
       try{
            const User = new UserModel({
            name : req.body.name,
            mail : req.body.mail,
            password : req.body.password,
            address : req.body.address
        });
    
        await User.save();
        res.send(User)    
    }
    catch(err){
        next(err)
    }          
}

    /**
     * UserController.update()
     */
     module.exports.update=async function (req, res,next) {
        try{  
            const id = req.params.id;
            const User=await UserModel.findOne({_id: id});
            if (!User) {
                res.send('No such User');
            }
            User.name = req.body.name ? req.body.name : User.name;
			User.mail = req.body.mail ? req.body.mail : User.mail;
			User.password = req.body.password ? req.body.password : User.password;
			User.adress = req.body.adress ? req.body.adress : User.adress;

            await User.save() ;
            res.send(User);
     }
     catch(err)
     {
        next(err)
     }
    }  
    /**
     * UserController.remove()
     */
     module.exports.remove= async function (req, res,next) {
        

        try{
            const id = req.params.id;
            await UserModel.findByIdAndRemove(id) ;
            res.send();
         }
        catch(err){
            next(err)
        }
    }
