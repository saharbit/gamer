const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const passport = require("passport");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connection Succesful"))
  .catch(err => console.log(err));

// Passport auth
app.use(passport.initialize());

// Passport strategy config
require("./config/passport.js")(passport);

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Port: " + port);
});
