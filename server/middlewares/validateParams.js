import isNumber from '../helpers/isNumber';

const validate = (req, res, next) => {
  if (isNumber(req.params.recipeId)) return next();
  return res.status(400).send({
    message: 'Method not allowed'
  });
};

export default validate;
