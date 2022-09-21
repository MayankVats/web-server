const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

console.log(__dirname);

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Mayank Vats",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Mayank Vats",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is the help page",
    name: "Mayank Vats",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address.",
    });
  }

  geoCode(req.query.address, (error, { latitude, longitude } = {}) => {
    if (error) {
      res.send({
        error,
      });
      console.log("Geocode: ", error);
    } else {
      forecast(
        latitude,
        longitude,
        (error, { temperature, precip, feelsLike }) => {
          if (error) {
            res.send({
              error,
            });
            console.log("Error: ", error);
          } else {
            res.send({
              temperature,
              precip,
              feelsLike,
              location: req.query.address,
            });
          }
        }
      );
    }
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    message: "Help article not found.",
    name: "Mayank Vats",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    message: "Page cannot be found.",
    name: "Mayank Vats",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
