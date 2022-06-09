const OrderModel = require('../models/OrderModel.js');

/**
 * OrderController.js
 *
 * @description :: Server-side logic for managing Orders.
 */

 /**
     * OrderController.list()
     */
module.exports.list = async function (req, res,next) {
    try{
     const Orders=await OrderModel.find();
     res.send(Orders);
    }
    catch(err){
        next(err)
    };

}

    /**
     * OrderController.show()
     */
     module.exports.show=async function (req, res,next) {
         try{
        const id = req.params.id;

        await OrderModel.findOne({_id: id}) 
        if (!Order) {
             res.send(
              'No such Order');
        }
        res.send(Order);
        }
         catch(err){
            next(err)
        }
          
     } 
       
   
    /**
     * OrderController.create()
     */
     module.exports.create=async function (req, res,next) {
        try{ 
            const order = new OrderModel({
			sum : req.body.sum,
			date : req.body.date,
			user : req.body.user,
			items : req.body.items
        });
        let newOrder;
  
        newOrder= await order.save();
        res.send(newOrder)
        //return res.status(201).json(Order);
    }
    catch(err){
        next(err)
    }  

      
}

    /**
     * OrderController.update()
     */
     module.exports.update=async function (req, res,next) {
        try{   
         const id = req.params.id;

        const Order=await OrderModel.findOne({_id: id});
            if (!Order) {
                return res.status(404).json({
                    message: 'No such Order'
                });
            }

            Order.sum = req.body.sum ? req.body.sum : Order.sum;
			Order.date = req.body.date ? req.body.date : Order.date;
			Order.Order = req.body.Order ? req.body.Order : Order.Order;
			Order.items = req.body.items ? req.body.items : Order.items;

            await Order.save();
                 res.send(Order);
                 
     }
     catch(err)
     {
        next(err)
     }
    }  
    /**
     * OrderController.remove()
     */
     module.exports.remove= async function (req, res,next) {
    try{ 
        const id = req.params.id;
        await OrderModel.findByIdAndRemove(id) ;
        res.send()        
    }
    catch(err){
        next(err)
    }
}
