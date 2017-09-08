import db from '../models/index';

const Review = db.Review;

const postReview = (req, res) => Review
  .create({
    recipeId: req.params.recipeId,
    userId: req.decoded.user.id,
    comment: req.body.comment
  })
  .then((review) => {
    res.status(201).send({
      status: 'success',
      message: 'Review successfully posted',
      id: review.id,
      comment: review.comment
    });
  })
  .catch(error => res.status(400).send(error));

export default postReview;
