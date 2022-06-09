var express = require('express');
var router = express.Router();
var ProductController = require('../controllers/ProductController.js');

/*
 * GET
 */
router.get('/', ProductController.list);



/*
 * GET
 */
//router.getByCategoryId('/category', ProductController.show);

/*
 * POST
 */
router.post('/', ProductController.create);

/*
 * PUT
 */
router.put('/:id', ProductController.update);

/*
 * DELETE
 */
router.delete('/:id', ProductController.remove);

module.exports = router;
