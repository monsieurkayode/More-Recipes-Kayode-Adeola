import isNumber from '../helpers/isNumber';
import errorHandler from '../helpers/responseHandler';

const validate = (req, res, next) => {
  if (isNumber(req.params.recipeId)) return next();
  return errorHandler(422, 'You have entered an invalid parameter', res);
};

export default validate;
