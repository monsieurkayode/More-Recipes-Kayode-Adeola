import validator from 'validator';

import db from '../models/index';
import { errorHandler } from '../helpers/responseHandler';

const Review = db.Review;

const validateComment = (req, res, next) => {
  const { comment } = req.body;
  if (!comment || validator.isEmpty(comment)) {
    return (errorHandler(400, 'Comment cannot be empty', res));
  }
  next();
};

const reviewExists = (req, res, next) => {
  Review
    .find({ where:
      {
        recipeId: req.params.recipeId,
        id: req.params.id
      }
    })
    .then((review) => {
      if (!review) {
        return errorHandler(404, 'Review not found', res);
      }
      if (review && req.decoded.user.id !== review.userId) {
        return errorHandler(
          403, 'Your request is understood but not permitted', res
        );
      }
      next();
    })
    .catch(() => errorHandler(500, 'An error occured!', res));
};

export { validateComment, reviewExists };
