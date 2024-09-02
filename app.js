const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("66d5bdfcaf954a86a8d0297a")
    .then((user) => {
      if (!user) {
        console.log("User not found!");
        return next(new Error("User not found!"));
      }
      console.log(user);
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log("Error fetching user:", err);
      next(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://abatandivine:oaHYdESlf0GJ5oGU@divinecluster.755fe.mongodb.net/shop?retryWrites=true&w=majority&appName=DivineCluster"
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        console.log("User not found, creating new one...");
        user = new User({
          name: "Abatan Divine",
          email: "abatandivine@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      } else {
        console.log("User found:", user);
      }
    });
    console.log("Connected to MongoDB!");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
