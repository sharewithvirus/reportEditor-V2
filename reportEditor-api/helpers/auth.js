const User = require("../model/user")
const jwt = require("jsonwebtoken");
const fs = require("fs");

const signToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };

exports.userJWTTokenForVerify = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  };

exports.createSendToken = async (admin, statusCode, res) => {
    const token = signToken(admin._id, admin.role);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 62 * 62 * 1000
      ),
      httpOnly: true,
    };
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
    res.cookie("bearer", token, cookieOptions);
    res.status(statusCode).json({
      status: "success",
      message: "Login Successfully",
      data: {
        userData: admin,
        token,
      },
    });
  };

exports.verifyUserJWTToken = async (token) => {
  return decoded = jwt.verify(token, process.env.JWT_SECRET);
}

exports.protect = async (req, res, next) => {
    try {
      let token;
      if (req.headers.cookie && req.headers.cookie.startsWith("bearer")) {
        token = req.headers.cookie.split("=")[1];
        if (!token) {
          res.status(401).json({
            status: "unauthorized",
            message: "you are not logged in ! please log in to get access",
          });
        } else {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          currentAdmin = await User.findById(decoded.id);
          if (!currentAdmin) {
            res.status(404)
            .clearCookie("bearer")
            .json({
              status: "not found",
              message: "User not found",
            });
          } else {
            currentAdmin.password = undefined;
            req.user = currentAdmin;
            next();
          }
        }
      } else {
        res.status(404).json({ status: "not found", message: "User Not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({
        status: "unauthorized",
        message: "you are not logged in ! please log in to get error access",
      });
    }
  };

exports.checkAdmin = async (id) => {
    try {
        const userText = await User.findById(id).select("isAdmin");
        return userText.isAdmin;
    } catch (error) {
        console.log(error)
    }
}

// exports.verifyEmail = ()