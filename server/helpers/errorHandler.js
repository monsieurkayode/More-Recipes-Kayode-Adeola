const errorHandler = (err, status) => {
  switch (err.statusCode) {
    case 400:
      err.message = 'Bad request';
      break;
    default:
      return err;
  }
};

export default errorHandler;

