const errorHandler = (err) => {
  switch (err) {
    case 400:
      err.message = 'Bad request';
      break;
    default:
      return err;
  }
};

export default errorHandler;

