const User = require("../model/user");
const Activity = require("../model/activity");

exports.getAllActivityOfUser = async (req, res) => {
    try {
        const { _id } = req.user;
        console.log(_id)
        const allActivity = await Activity.find({ user : _id })
        .populate({
            path: "user",
            select: "userName"
        })
        .sort({ _id: -1 });
        res.status(200).json({
            status: 'success',
            message: 'All Activity List Fetched Successfully',
            data: allActivity,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        })
    }
}