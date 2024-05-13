const express = require('express');
const router = express.Router();

const  authenticate = require('../middleware/authenticate')
const simpleReviewController = require('../controllers/RatingController');

router.post('/ratings',authenticate, simpleReviewController.createSimpleReview);
router.get('/products/:productId/ratings',authenticate, simpleReviewController.getAllSimpleReviews);
router.get('/ratings/:id',authenticate, simpleReviewController.getSimpleReviewById);
router.get('/ratings/:productId/average', simpleReviewController.getSimpleReviewAverage);
router.put('/ratings/:id',authenticate, simpleReviewController.updateSimpleReview);
router.delete('/ratings/:id',authenticate, simpleReviewController.deleteSimpleReview);

module.exports = router;
