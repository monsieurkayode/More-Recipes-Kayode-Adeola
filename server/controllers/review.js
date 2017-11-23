import db from '../models/index';
import { paginateReviews, paginateComments } from '../helpers/paginate';

const Review = db.Review,
  User = db.User;

/**
 * @description controller function that handles posting reviews to recipes
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 *
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
      review
    });
  })
  .catch(error => res.status(400).send(error));

const fetchRecipeReviews = (req, res) => {
  const { page, limit, offset } = paginateComments(req);
  return Review
    .findAndCountAll({ where:
      { recipeId: req.params.recipeId },
    include: [{
      model: User,
      attributes: ['username']
    }],
    limit,
    offset,
    order: [['id', 'DESC']],
    attributes: ['id', 'userId', 'comment', 'createdAt', 'updatedAt']
    })
    .then(reviews => res.status(200).send(paginateReviews(
      page,
      limit,
      'success',
      `Showing ${reviews.rows.length} of ${reviews.count} comments`,
      reviews,
    )))
    .catch(error => res.status(400).json(error));
};

const editReview = (req, res) => Review
  .findOne({ where:
    {
      userId: req.decoded.user.id,
      recipeId: req.params.recipeId,
      id: req.params.id
    }
  })
  .then((review) => {
    review
      .update({
        comment: req.body.comment || review.comment
      })
      .then(() => res.status(200).send({
        status: 'success',
        message: 'Comment updated successfully',
        review
      }));
  })
  .catch(error => res.status(400).json(error));

const deleteReview = (req, res) => Review
  .findOne({ where:
    {
      userId: req.decoded.user.id,
      recipeId: req.params.recipeId,
      id: req.params.id }
  })
  .then((review) => {
    review
      .destroy()
      .then(() => res.status(200).send({
        status: 'success',
        message: 'Your comment has been deleted',
      }));
  })
  .catch(error => res.status(400).json(error));

export {
  postReview,
  fetchRecipeReviews,
  editReview,
  deleteReview
};
