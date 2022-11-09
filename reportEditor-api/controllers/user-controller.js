const User = require("../model/user");
const UserOTP = require("../model/userOtp");
const Activity = require("../model/activity");
const {createSendToken, userJWTTokenForVerify, verifyUserJWTToken} = require("../helpers/auth");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");

const { sendInviteMail } = require("../helpers/emailMessaging")

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

exports.getAllUsers = async (req, res) => {
    try {
        const userList = await User.find({ isAdmin: false })
        .select("userName email emailVerified userStatus role department access")
        .populate({
            path: "department",
            select: "name"
        })
        .populate({
            path: "access",
            select: "name"
        })
        res.status(200).send({
            status: "success",
            message: "All User List",
            data: userList
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Internal Server Error"
        })
    }
}

exports.createUser = async (req, res) => {
    try {
        const { userName, email, department, access } = req.body;
        const checkUser = await User.findOne({ email });
            if(checkUser){
                res.status(204)
                .json({
                    status: 'success',
                    message: 'User Already Registered',
                })
                return;
            }
        const userText = await User.create({
            userName,
            email,
            department,
            access
        })
        const userToken = userJWTTokenForVerify(userText._id)
        await sendInviteMail(email, userToken)
        res.status(201).json({
            status: "Success",
            message: "User Created and Invitation Send Successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "Error",
            message: "Internal Server Error",
        })
    }
}

exports.verifyUserToken = async (req, res) => {
    try {
        const { token } = req.params;
        const tokenData = await verifyUserJWTToken(token);
        if(!tokenData.userId){
            res.status(404).json({
                status: 'success',
                message: 'Email Invite Expired'
            })
            return;
        }
        const userText = await User.findByIdAndUpdate({ _id: tokenData.userId }, { emailVerified: true }, { new: true});
        const userToken = userJWTTokenForVerify(userText._id);
        res.status(200)
        .json({
            status: 'success',
            message: 'User Verified Successfully',
            data: userText,
            token: userToken
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "Error",
            message: "Internal Server Error",
        })
    }
}

exports.createUserPassword = async (req, res) => {
    try {
        const { _id, token, password } = req.body;

        const tokenData = await verifyUserJWTToken(token);
        if(!tokenData.userId){
            res.status(404).json({
                status: 'success',
                message: 'user Not Verified'
            })
            return;
        }
        const pass2 = await hashPassword(password);
        const userText = await User.findByIdAndUpdate({ _id: _id }, {  password: pass2,  userStatus: true }, { new: true});
        res.status(200).json({
            status: 'success',
            message: 'User Password Created successfully',
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

exports.changeUserStatus = async (req, res) => {
    try {
        console.log("API Hit")
        const { userId } = req.body;
        const userTextStatus = await User.findById({ _id: userId}).select("userStatus");
        console.log(userTextStatus)
        const userText = await User.findByIdAndUpdate({ _id: userId },{ userStatus: !userTextStatus.userStatus }, { new: true});
        res.status(200)
        .json({
            status: 'success',
            message: 'User Status Updated Successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "Error",
            message: "Internal Server Error",
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { _id, userName, department, access } = req.body;
        const userText = await User.findByIdAndUpdate({ _id: _id},{
            userName,
            department,
            access
        })
        res.status(200).json({
            status: "Success",
            message: "User Updated Successfully",
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