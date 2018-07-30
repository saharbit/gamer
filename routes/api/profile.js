const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const validateProfileInput = require("../../validation/profile");

const Profile = require("../../models/Profile");

const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Testes profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "profile Works" }));

// @route   GET api/profile
// @desc    Get current users' profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        return res.status(404).json({ profile: "There are no profiles" });
      }
      res.json(profiles);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no user for this profile" })
    );
});

// @route   POST api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this handle";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this handle";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no user for this profile" })
    );
});

// @route   POST api/profile
// @desc    Create user profile
// @access  Privatt
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.favorite) profileFields.favorite = req.body.favorite;
    if (typeof req.body.playing !== "undefined")
      profileFields.playing = req.body.playing.split(",");
    if (req.body.bio) profileFields.bio = req.body.bio;

    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitch) profileFields.social.twitch = req.body.twitch;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "Handle exists";
            res.status(400).json(errors);
          }

          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
