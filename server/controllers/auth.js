const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.userCreate = (req, res) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created",
          result: result
        });
      })
      .catch(() => {
        res.status(500).json({
          message: "Invalid user credentials!"
        });
      });
  });
};

exports.userLogin = (req, res) => {
  let fetchedUser;
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h"
        }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(() => {
      return res.status(401).json({
        message: "Incorrect email or password!"
      });
    });
};
