import isNumber from '../helpers/isNumber';

const validate = (req, res, next) => {
  if (isNumber(req.params.recipeId)) return next();
  return res.status(500).send({
    message: 'Server encountered an error! Invalid parameter'
  });
};

export default validate;
