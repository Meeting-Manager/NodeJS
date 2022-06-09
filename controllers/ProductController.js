const ProductModel = require('../models/ProductModel.js');

/**
 * ProductController.js
 *
 * @description :: Server-side logic for managing Products.
 */
 module.exports.list = async function (req, res,next) {
try{
    const ids=Object.values(req.query)
    let products=[];
    if(ids.length>0){
        for(const id of ids){
                const p=await ProductModel.find({
                category:id
            });
            p.forEach(p=>products.push(p))
        };
    }
    else{
        products=await ProductModel.find();
    }
        res.send(products);
}
catch(err){
     next(err)
 }
 
 }
//  module.exports.list = async function (req, res) {

//     try{
//         let products;
//         const categoryId=req.query.category;
//         if(categoryId)
//             products=await ProductModel.find({"category":categoryId});
//         else
//             products=await ProductModel.find();

//         return res.json(products);
//         }
//     catch(err){
//             return res.status(500).json({
//                 message: 'Error when getting Product.',
//                 error: err
//         });
//     }
//  }
    // /**
    //  * ProductController.show() getByCategoryId
    //  */
    //  module.exports.show= function (req, res) {
    // } 
      
  
    /**
     * ProductController.create()
     */
     module.exports.create=async function (req, res,next) {
     try{  
          const Product = new ProductModel({
			name : req.body.name,
			description : req.body.description,
			price : req.body.price,
			category : req.body.category,
			imgName : req.body.imgName
        });
    
         await Product.save();
        res.send(Product);
    }
    catch(err){
        next(err)
    }          
      
}
    
    /**
     * ProductController.update()
     */
     module.exports.update=async function (req, res,next) {
        try{ 
        const id = req.params.id;

        const Product=await ProductModel.findOne({_id: id});
            if (!Product) {
                return res.status(404).json({
                    message: 'No such Product'
                });
            }

            Product.name = req.body.name ? req.body.name : Product.name;
			Product.description = req.body.description ? req.body.description : Product.description;
			Product.price = req.body.price ? req.body.price : Product.price;
			Product.category = req.body.category ? req.body.category : Product.category;
			Product.imgName = req.body.imgName ? req.body.imgName : Product.imgName;
			
            await Product.save() ;
            res.send(Product);
           
     }
     catch(err)
     {
        next(err)
     }
    }  
    
    /**
     * ProductController.remove()
     */
     module.exports.remove=async  function (req, res,next) {

        try{
            const id = req.params.id;
            await ProductModel.findByIdAndRemove(id) ;
            return res.status(204).json();
         }
        catch(err){
        next(err)
        }
}
