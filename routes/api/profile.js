const express = require("express"),
  router = express.Router(),
  passport = require("passport");

// Load database models

const Profile = require("../../models/profile");
const Product = require("../../models/products");

// import validation files

const validateProfileInput = require("../../validation/profile");

// get current user profile // private route

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "email"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "User profile not exist";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// create user profile

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};

    profileFields.user = req.user.id;
    if (req.body.username) profileFields.username = req.body.username;
    if (req.body.address) profileFields.address = req.body.address;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // profile already exist then update it
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // create one profile
        Profile.findOne({ username: req.body.username }).then(profile => {
          if (profile) {
            errors.username = "Username Already Exist";
            return res.status(404).json(errors);
          }

          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// get all wishlisted products

router.get(
  "/wishlist/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile =>
      res.json(profile.wishlist)
    );
  }
);

// adding items to wishlist

router.post(
  "/wishlist/:prod_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Product.findById(req.params.prod_id)
          .then(product => {
            profile.wishlist.unshift(product);
            profile.save().then(profile => res.json(profile));
          })
          .catch(err => res.status(404).json(err));
      })
      .catch(err => console.log(err));
  }
);

// delete an item from wishlist

router.delete(
  "/wishlist/:wish_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // find index of wished product to delete
        const index = profile.wishlist.findIndex(
          item => item._id == req.params.wish_id
        );

        // remove product from wishlist array
        profile.wishlist.splice(index, 1);

        // save new wishlist Array to db
        profile.save().then(profile => res.json(profile.wishlist));
      })
      .catch(err => res.status(400).json(err));
  }
);

// get all products in cart

router.get(
  "/cart",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile =>
      res.json(profile.cart)
    );
  }
);

// adding item to cart

router.post(
  "/cart/:prod_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Product.findById(req.params.prod_id)
          .then(product => {
            profile.cart.unshift(product);
            profile.save().then(profile => res.json(profile));
          })
          .catch(err => res.status(404).json(err));
      })
      .catch(err => console.log(err));
  }
);

// delete an item from cart

router.delete(
  "/cart/:cart_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // find index of wished product to delete
        const index = profile.cart.findIndex(
          item => item._id == req.params.cart_id
        );

        // remove product from wishlist array
        profile.cart.splice(index, 1);

        // save new wishlist Array to db
        profile.save().then(profile => res.json(profile.cart));
      })
      .catch(err => res.status(400).json(err));
  }
);

// // increase item quantity in product

// router.post(
//   "/product/quantity_up/:prod_id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Product.findById(req.params.prod_id)
//       .then(product => {
//         product.quantity++;
//         product.save().then(() => res.json(product.quantity));
//       })
//       .catch(err => res.status(400).json(err));
//   }
// );

module.exports = router;
