const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController.js');

/*
 * GET
 */
router.get('/', OrderController.list);

/*
 * POST
 */
router.post('/', OrderController.create);

/*
 * PUT
 */
router.put('/:id', OrderController.update);

/*
 * DELETE
 */
router.delete('/:id', OrderController.remove);

module.exports = router;
