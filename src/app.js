const path = require("path");
const express = require("express");

console.log(__dirname);

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

// app.get("", (req, res) => {
//   res.send("<h1>Weather!</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Mayank",
//       age: 23,
//     },
//     {
//       name: "Nidhi",
//       age: 23,
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About page!</h1>");
// });

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is sunny.",
    location: "New Delhi",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
