const User = require("../model/user");
const UserOTP = require("../model/userOtp");
const Activity = require("../model/activity");
const {checkAdmin, signToken, createSendToken, protect} = require("../helpers/auth");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");

exports.adminLogin = async (req, res) => {
    try {
        const Ip = req.ip.split(":");
      const { email, password } = req.body;
      console.log(email, password)
      if (!email || !password) {
        res.status(404).json({
          status: "success",
          message: "Enter Password Or Email",
        });
      } else {
          const user = await User.findOne({ email }).select("password");
          console.log(user)
          if(!user || !(await comparePassword(password, user.password))){    
                res.status(403).json({
                    status: "unauthorized",
                    message: "Invalid Username or Password",
                });
            }else{
                const activityText = await Activity.create({ user: user._id, activityType: "Login", ipAddress: `${Ip[3]}`  })
                const userText = await User.findById(user._id);
                userText.activity.push(activityText._id);
                await userText.save();
                userText.password = undefined;
                createSendToken(userText, 200, res);
            }
    }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "Error",
        message: "Internal Server Error",
      });
    }
};

exports.adminLogout = async(req, res) => {
    try {
        const { user } = req;
        const Ip = req.ip.split(":");
        const activityText = await Activity.create({ user: user, activityType: "Logout", ipAddress: `${Ip[3]}` });
        const userText = await User.findById(user._id);
        userText.activity.push(activityText._id) 
        await userText.save();
        res.status(200)
        .clearCookie("bearerToken")
        .json({
            status: 'success',
            message: 'Logout successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "Error",
            message: "Internal Server Error",
        })
    }
}

exports.dashboard = async (req, res) => {
    try {
      const user = req.user;
    //   user.password = undefined;
      res.status(200).json({ status: "success", message: "successful", user });
    } catch (error) {
      res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
  };

exports.adminRegister = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const encPass = await hashPassword(password);
        const userText = await User.create({
            userName,
            email,
            password: encPass,
            role: 'admin',
            isAdmin: true,
        })
        userText.password = undefined;
        res.status(200).json({
            status: "Success",
            message: "Admin Successfully Registered",
            data: userText
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "Error",
            message: "Internal Server Error",
        })
    }
}
