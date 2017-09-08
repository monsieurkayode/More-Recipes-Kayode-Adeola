const errorHandler = (error, res) => {
  res.status(error.code).send({
    status: 'fail',
    message: error.message,
  });
};

export default errorHandler;
