import CustomError from '../helpers/CustomError.js';
const getWeather = (req, res, next) => {
  const { cityName } = req.body;

  if (!cityName) {
    return next(
      new CustomError(
        'There is no cityName property in your request.body. Request.body JSON Model: {"cityName":"Amsterdam"}',
        400
      )
    );
  }
  return res.status(200).json({
    success: false,
    data: cityName,
  });
};

export default getWeather;
