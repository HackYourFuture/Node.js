import CustomError from '../helpers/CustomError.js';

const customErrorHandler = (err, req, res, next) => {
  if (err.status === 400) {
    err.name = 'Bad Request';
  }
  return res.status(err.status).json({
    message: `${err.name} : ${err.message}`,
  });
};

export default customErrorHandler;
