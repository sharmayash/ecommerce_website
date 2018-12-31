const express = require("express"),
  mongoose = require("mongoose");

// importing routes files

const users = require("./routes/api/users"),
  profile = require("./routes/api/profile"),
  products = require("./routes/api/products");

const app = express();

// db configurations
const db = require("./config/keys").mongoURI;

// connect to mongodb
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongoDb connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("hello"));

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/products", products);

const port = process.env.PORT || 1000;

app.listen(port, () => console.log(`server running on port ${port}`));
