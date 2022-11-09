const User = require("../model/user");
const Role = require("../model/role")
const Department = require("../model/department");
// const { hashPassword, comparePassword } = require("../helpers/bcrypt");

exports.createRole = async (req, res) => {
    try {
        const { name, department, access } = req.body;
        if(!name, !department, !access) {
            res.status(200).json({
                status: 'error',
                message: "All Fields are Require",
            })
            return;
        }else{
            const newRole = await Role.create({name, department, access});
            res.status(200).json({
                status: 'success',
                message: "Role Created Successfully",
                data: newRole,
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        })
    }
}

exports.getAllRole = async (req, res) => {
    try {
        const allRole = await Role.find({})
        .populate({
            path: "department",
            select: "name"
        })
        .sort({ _id : -1}); 
        res.status(200).json({
            status: 'success',
            message: 'Role List Fetched Successfully',
            data: allRole,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        })
    }
}

exports.roleStatusUpdate = async (req, res) => {
    try {
        const { roleId } = req.body;
        const deptStatus = await Role.findById(roleId).select("status");
        await Role.findByIdAndUpdate(deptStatus._id, {status: !deptStatus.status});
        res.status(200).json({
            status: "success",
            message: "Role Status updated successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        })
    }
}

exports.updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        console.log(id, name, description)
        if(!name){
            res.status(200).json({
                status: 'error',
                message: "Department Name required",
            })
            return;
        }else{
            const newDepartment = await Department.findByIdAndUpdate({ _id: id },{name, description}, { new: true });
            res.status(200).json({
                status: 'success',
                message: "Department Updated Successfully",
                data: newDepartment,
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        })
    }
}