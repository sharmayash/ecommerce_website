const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),  
  keys = require("../../config/keys"),
  User = require("../../models/Users");

// register / sign up the user

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(userExist => {
    if (userExist) {
      console.log("user Exist");
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// login route

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // find user by email

  User.findOne({ email }).then(user => {
    // check for user email

    if (!user) {
      console.log("User Not Found");
      return res.status(404);
    }

    // check for password
    // bcrypt compares the password in db with entered password in login form

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //res.json({ msg: 'success' });
        // if they match then grab the id and name from db and assign to local payload object keys

        const payload = { id: user.id, name: user.name };

        // jwt checks for payload and access keys and creates sessions of assigned particular time .

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 86400 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        console.error("Incorrect Password");
        return res.status(404);
      }
    });
  });
});

// shows current user info.
// protected route

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);


module.exports = router;
