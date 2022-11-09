const User = require("../model/user");
const Department = require("../model/department");
// const { hashPassword, comparePassword } = require("../helpers/bcrypt");

exports.createDepartment = async (req, res) => {
    try {
        console.log(req.body);
        const { name, description } = req.body;
        if(!name){
            res.status(200).json({
                status: 'error',
                message: "Department Name required",
            })
            return;
        }else{
            const newDepartment = await Department.create({name, description});
            res.status(200).json({
                status: 'success',
                message: "Department Created Successfully",
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

exports.getAllDepartments = async (req, res) => {
    try {
        const allDepartments = await Department.find({}).sort({ _id : -1}); 
        res.status(200).json({
            status: 'success',
            message: 'Department List Fetched Successfully',
            data: allDepartments,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        })
    }
}

exports.departmentStatusUpdate = async (req, res) => {
    try {
        const { deptId } = req.body;
        const deptStatus = await Department.findById(deptId).select("status");
        await Department.findByIdAndUpdate(deptStatus._id, {status: !deptStatus.status});
        res.status(200).json({
            status: "success",
            message: "Department Status updated successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        })
    }
}

exports.updateDepartment = async (req, res) => {
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