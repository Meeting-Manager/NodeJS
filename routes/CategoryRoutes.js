const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController.js');

/*
 * GET
 */
router.get('/', CategoryController.list);

/*
 * POST
 */
router.post('/', CategoryController.create);

/*
 * PUT
 */
router.put('/:id', CategoryController.update);

/*
 * DELETE
 */
router.delete('/:id', CategoryController.remove);

module.exports = router;
