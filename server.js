const express = require("express");
const bodyParser = require("body-parser");
const placesRoute = require("./routes/places-routes");
const userRoute = require("./routes/users-routes");
const app = express();
const HttpError = require("./modals/http-error");

app.get("/", (req, res) => {
  res.redirect("/api/places");
});

app.use(bodyParser.json());
app.use("/api/places", placesRoute);
app.use("/user", userRoute);
app.use((req, res, next) => {
  return next(new HttpError("no such a route!!!", 404));
});
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message, statusCode: error.code });
});
app.listen(5000, (err) => {
  if (err) throw err;
  console.log("app hited port 5000");
});
