const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=6048f1bea65230c9380785bcb331729a&query=${latitude},${longitude}&units=m`;

  console.log(url);

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (response.body.error) {
      callback("Unable to find location.", undefined);
    } else {
      const data = response.body;

      const temperature = data.current.temperature;
      const precip = data.current.precip;
      const feelsLike = data.current.feelslike;

      callback(undefined, {
        temperature,
        precip,
        feelsLike,
      });
    }
  });
};

module.exports = forecast;
