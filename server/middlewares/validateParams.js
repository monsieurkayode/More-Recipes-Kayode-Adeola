import isNumber from '../helpers/isNumber';

const validate = (req, res, next) => {
  if (isNumber(req.params.recipeId)) return next();
  return res.status(500).send({
    message: 'You have entered an Invalid parameter'
  });
};

export default validate;
