const Review = require('../models/Review');

// create
exports.addComment = async (req, res) => {
  const { productId } = req.params;
  const { user, comment , image} = req.body;

  const newReview = new Review({
    user: user, 
    product: productId, 
    comment: comment,
    image: '',
  });

  newReview.save()
    .then((review) => {
      res.json({ message: 'Avis ajouté avec succès', review });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'avis', error });
    });
};


//get all 
exports.getAllComments = async (req, res) => {    const { productId } = req.params;
  
    Review.find({ product: productId })
      .populate('user', 'Firstname Lastname') 
      .exec()
      .then((reviews) => {
        res.json(reviews);
      })
      .catch((error) => {
        res.status(500).json({ message: 'Erreur lors de la récupération des avis', error });
      });
  };


  // update
  exports.updateComment = async (req, res) => {
    const { reviewId } = req.params;
    const { comment,image } = req.body;
  
    Review.findByIdAndUpdate(reviewId, {comment,image }, { new: true })
      .exec()
      .then((updatedReview) => {
        res.json({ message: 'Rating added', review: updatedReview });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'avis', error });
      });
  };


  // delete
  exports.deleteComment = async (req, res) => {
    const { reviewId } = req.params;
  
    Review.findByIdAndDelete(reviewId)
      .exec()
      .then(() => {
        res.json({ message: 'Rating deleted' });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'avis', error });
      });
  };


