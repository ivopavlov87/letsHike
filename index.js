const mongoose = require('mongoose');
const express = require('express');
const app = express();
const passport = require("passport");

const db = require('./config/keys').mongoURI
const users = require("./routes/api/users");
const hikes = require("./routes/api/hikes");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

//config for passport:
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/hikes", hikes);

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server is running on port ${port}`));