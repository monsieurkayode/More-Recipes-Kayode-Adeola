// Import module dependencies
import db from '../models/index';

// Assign variable to the database model
const Review = db.Review;

/**
 * 
 * @description controller function that handles posting reviews to recipes
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @returns {object} status message comment
 */
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
      comment: review.comment
    });
  })
  .catch(error => res.status(400).send(error));

export default postReview;
