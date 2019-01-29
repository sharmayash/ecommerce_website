const express = require("express"),
  router = express.Router(),
  passport = require("passport");

// Load database models

const Profile = require("../../models/profile");

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
    if (req.body.accountType) profileFields.accountType = req.body.accountType;

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

// adding items to wishlist

router.post(
  "/wishlist",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newWish = {
        name: req.body.name,
        brand: req.body.brand
      };
      profile.wishlist.unshift(newWish);
      profile.save().then(profile => res.json(profile));
    });
  }
);

router.delete(
  "/wishlist/:wish_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // find index of wished product to delete
        const index = profile.wishlist
          .map(prod => prod.id)
          .indexOf(req.params.wish_id);

        // remove product from wishlist array
        profile.wishlist.splice(index, 1);

        // save new wishlist Array to db
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
