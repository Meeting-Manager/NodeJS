const CategoryModel = require('../models/CategoryModel.js');

/**
 * CategoryController.js
 *
 * @description :: Server-side logic for managing Categorys.
 */

 /**
     * CategoryController.list()
     */
module.exports.list = async function (req, res,next) {
    try{
     const Categorys=await CategoryModel.find();
     res.send(Categorys);
    }
    catch(err){    
        next(err);  
    };
}
    
   
    /**
     * CategoryController.create()
     */
     module.exports.create=async function (req, res,next) {
       try{
            const Category = new CategoryModel({
			name : req.body.name
			
        });
   
       await  Category.save();
       res.send(Category);
    }
    catch(err){
        next(err);       
    }          
      
}

    /**
     * CategoryController.update()
     */
     module.exports.update=async function (req, res,next) {
        const id = req.params.id;
        try{
        const Category=await CategoryModel.findOne({_id: id});
            if (!Category) {
                return res.status(404).json({
                    message: 'No such Category'
                });
            }

        Category.name = req.body.name ? req.body.name : Category.name;
			
           
        await Category.save() ;
        res.send(Category);
        
                
     }
     catch(err)
     {
        next(err);
    
     }
    }  
    /**
     * CategoryController.remove()
     */
     module.exports.remove=async function (req, res,next) {
       

        try{ 
            const id = req.params.id;
            await CategoryModel.findByIdAndRemove(id) ;
            res.send();
        }
        catch(err){
            next(err);

         
        }
}
