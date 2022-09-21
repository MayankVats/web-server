const request = require("request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidmF0czAxMSIsImEiOiJja3puMmNoZ3owNHFjMm9sY2tka2EzcngyIn0.iZBvwafIiUP4ly4DADvicQ&limit=1`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      const data = response.body;
      const [longitude, latitude] = data.features[0].center;
      const placeName = data.features[0].place_name;

      callback(undefined, {
        longitude,
        latitude,
        placeName,
      });
    }
  });
};

module.exports = geoCode;
