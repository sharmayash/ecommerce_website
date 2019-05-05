const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  path = require("path"),
  cors = require("cors"),
  passport = require("passport");

// importing routes files

const users = require("./routes/api/users"),
  profile = require("./routes/api/profile"),
  products = require("./routes/api/products");

const app = express();

// body parser middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));

app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// db configurations
const db = require("./config/keys").mongoURI;

// connect to mongodb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("mongoDb connected"))
  .catch(err => console.log(err));

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/products", products);

// ============ PASSPORT SETUP ==============

app.use(passport.initialize());

// require passport config file

require("./config/passport")(passport);

const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`server running on port ${port}`));
