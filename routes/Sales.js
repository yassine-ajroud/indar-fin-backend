const express = require('express');
const router = express.Router();
const saleController = require('../controllers/SalesController');
const  authenticate = require('../middleware/authenticate')

router.post('/sales/create',authenticate, saleController.recordSale);
router.get('/sales/:userId',authenticate, saleController.getAllSales);
router.get('/sales/one/:id',authenticate, saleController.getSaleById);
router.put('/sales/one/:id',authenticate, saleController.updateSale);
router.delete('/sales/one/:id',authenticate, saleController.deleteSale);


module.exports = router;

