const express = require("express"),
  router = express.Router(),
  passport = require("passport");

// product model
const Product = require("../../models/products");
// profile model
const Profile = require("../../models/profile");

// validation files
const validateProductInput = require("../../validation/product");

// get all products existed

router.get("/", (req, res) => {
  Product.find()
    .then(product => res.json(product))
    .catch(err => res.status(404).json({ noproductfound: "no product exist" }));
});

// get a product by product_id
router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err =>
      res.status(404).json({ noproductfound: "no product found with this url" })
    );
});

// post new product // private route

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProductInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newProduct = new Product({
      seller: req.user.id,
      image: req.body.image,
      name: req.body.name,
      company: req.body.company,
      specs: req.body.specs,
      desc: req.body.desc,
      category: req.body.category,
      inventory: req.body.inventory,
      quantity: 0
    });

    newProduct.save().then(post => res.json(post));
  }
);

// delete a post / private route

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Product.findById(req.params.id)
        .then(product => {
          if (product.seller.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorised: "User not authorised" });
          }

          product.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ productnotfound: "Product not found" })
        );
    });
  }
);

// add reviews to products

router.post(
  "/reviews/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findById(req.params.id)
      .then(product => {
        const newReview = {
          text: req.body.text,
          commentBy: req.user.id
        };

        product.reviews.unshift(newReview);

        product.save().then(product => res.json(product));
      })
      .catch(err => res.status(404).json({ noproductfound: "no product found" }));
  }
);

// delete a review

router.delete(
  "/reviews/:id/:review_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findById(req.params.id)
      .then(product => {
        if (
          product.reviews.filter(
            review => review._id.toString() !== req.params.review_id
          ).length === 0
        ) {
          return res.status(404).json({ commentnotfound: "comment not exist" });
        }

        const remIndex = product.reviews
          .map(item => item._id.toString())
          .indexOf(req.params.review_id);

        product.reviews.splice(remIndex, 1);

        product.save().then(product => res.json(product));
      })
      .catch(err => res.status(404).json({ noproductfound: "no product found" }));
  }
);

// like a review on a product
/*
router.post(
  "/reviews/:id/like/:like_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.like_id }).then(profile => {
      Product.findById(req.params.like_id)
        .then(product => {
          //----------- Todo --------------------
        })
        .catch(err =>
          res.status(404).json({ productnotfound: "Product not found" })
        );
    }); 
  }
);

*/

module.exports = router;
