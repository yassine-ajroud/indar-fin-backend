const express = require('express');
const router = express.Router();
const reclamationController = require('../controllers/ReclamationController');
const  authenticate = require('../middleware/authenticate')


router.post('/reclamations',authenticate, reclamationController.createReclamation);
router.get('/reclamations/all/:id',authenticate, reclamationController.getAllReclamations);
router.get('/reclamations/:id',authenticate, reclamationController.getReclamationById);
router.put('/reclamations/:id',authenticate, reclamationController.updateReclamation);
router.delete('/reclamations/:id',authenticate, reclamationController.deleteReclamation);

module.exports = router;