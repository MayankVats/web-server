const path = require("path");
const express = require("express");
const hbs = require("hbs");

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
  res.send({
    forecast: "It is sunny.",
    location: "New Delhi",
  });
});

app.get("*", (req, res) => {
  res.send("Error: 404");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
