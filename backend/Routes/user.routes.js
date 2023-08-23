const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");

const userRoutes = express.Router();

userRoutes.get("/", async (req, res) => {
  let users = await userModel.find();
  res.status(200).send(users);
});

userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let userFound = await userModel.findOne({ email: email });
    if (!userFound) {
      res.send(200).send({ msg: "User not found" });
    } else {
      console.log(userFound);
      bcrypt.compare(
        password,
        userFound.password,
        async function (err, result) {
          if (result) {
            try {
              const token = await jwt.sign(
                { foo: "bar", userId: userFound._id },
                "cuvette",
                {
                  algorithm: "HS256",
                }
              );
              res.status(200).send({ msg: "login successful", token });
            } catch (error) {
              res
                .status(500)
                .send({ msg: "error while generating token", error });
            }
          } else {
            res.status(400).send({ msg: "error while login" });
          }
        }
      );
    }
  } catch (error) {
    res.status(400).send({ msg: "error while login", error: error });
  }
});

userRoutes.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let userFound = await userModel.findOne({ email });
    if (!userFound) {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          res.status(500).send({ msg: "error while hashing password" });
          return;
        }
        try {
          await userModel.create({
            name,
            email,
            password: hash,
          });
          res.status(200).send({ msg: "signup successful" });
        } catch (error) {
          console.log(error);
          res.status(500).send({ msg: "error while creating user", error });
        }
      });
    } else {
      res.status(400).send({ msg: "user already exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "error in signup", error });
  }
});

module.exports = { userRoutes };
